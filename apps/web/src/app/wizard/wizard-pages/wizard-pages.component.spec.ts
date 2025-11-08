import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardPagesComponent } from './wizard-pages.component';
import { ActivatedRoute } from '@angular/router';
import { SchemaService } from '@nexton-test/core/services/schema.service';

describe('WizardPagesComponent', () => {
  let component: WizardPagesComponent;
  let fixture: ComponentFixture<WizardPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardPagesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map() } },
        },
        {
          provide: SchemaService,
          useValue: {
            getSchemaByType: () => require('rxjs').of(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSchemaByType with correct param', async () => {
    const schemaService = TestBed.inject(SchemaService);
    const spy = jest
      .spyOn(schemaService, 'getSchemaByType')
      .mockImplementation(() =>
        // Retorna Observable diretamente
        require('rxjs').of({ id: 'test', name: 'TestSchema' })
      );
    // Simula paramMap com requestType
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.paramMap = new Map([['requestType', 'test']]);
    await component.ngOnInit?.();
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should handle schema not found', async () => {
    const schemaService = TestBed.inject(SchemaService);
    jest
      .spyOn(schemaService, 'getSchemaByType')
      .mockImplementation(() => require('rxjs').of(null));
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.paramMap = new Map([['requestType', 'notfound']]);
    await component.ngOnInit?.();
    expect(component['schema']).toBeUndefined();
  });

  it('should handle service error gracefully', async () => {
    const schemaService = TestBed.inject(SchemaService);
    jest
      .spyOn(schemaService, 'getSchemaByType')
      .mockImplementation(() =>
        require('rxjs').throwError(() => new Error('fail'))
      );
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.paramMap = new Map([['requestType', 'error']]);
    // ngOnInit não lança erro, apenas executa
    expect(() => component.ngOnInit?.()).not.toThrow();
  });
});
