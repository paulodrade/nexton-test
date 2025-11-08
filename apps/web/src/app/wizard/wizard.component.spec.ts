import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardComponent } from './wizard.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;

  beforeEach(async () => {
    const httpClientMock = {
      get: () => of([]),
    };
    await TestBed.configureTestingModule({
      imports: [WizardComponent],
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable and enable the form when busy changes', () => {
    component.wizardService.busy = true;
    expect(component.wizardForm.disabled).toBe(true);
    component.wizardService.busy = false;
    expect(component.wizardForm.enabled).toBe(true);
  });

  it('should mark all fields as dirty on submit', () => {
    const spy = jest.spyOn(component.wizardForm, 'markAllAsDirty');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update selected schema and scroll to section', () => {
    const schema = { id: '1', name: 'Test', sections: [] };
    component.sections = {
      nativeElement: { scrollIntoView: jest.fn() },
    };
    component.onSchemaSelected(schema as any);
    expect(component.currentSchema).toEqual(schema);
    expect(component.sections.nativeElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should not scroll if sections is undefined', () => {
    const schema = { id: '2', name: 'NoScroll', sections: [] };
    component.sections = undefined as any;
    expect(() => component.onSchemaSelected(schema as any)).not.toThrow();
    expect(component.currentSchema).toEqual(schema);
  });

  it('should not set busy if form is invalid on submit', () => {
    component.wizardForm.get('schema')?.setErrors({ required: true });
    component.wizardService.busy = false;
    component.onSubmit();
    expect(component.wizardService.busy).toBe(false);
  });

  it('should set busy if form is valid on submit', () => {
    component.wizardForm.get('schema')?.setValue('any');
    component.wizardForm.setErrors(null);
    component.wizardForm.markAsDirty();
    component.wizardService.busy = false;
    component.onSubmit();
    expect(component.wizardService.busy).toBe(true);
  });

  it('should react to isBusy$ observable on ngOnInit', () => {
    const spyDisable = jest.spyOn(
      component.wizardForm.controls.schema,
      'disable'
    );
    const spyEnable = jest.spyOn(
      component.wizardForm.controls.schema,
      'enable'
    );
    component.ngOnInit();
    component.wizardService.busy = true;
    expect(spyDisable).toHaveBeenCalled();
    component.wizardService.busy = false;
    expect(spyEnable).toHaveBeenCalled();
  });

  it('should subscribe to schemas$ observable', (done) => {
    component.schemas$.subscribe((schemas) => {
      expect(Array.isArray(schemas)).toBe(true);
      done();
    });
  });
});
