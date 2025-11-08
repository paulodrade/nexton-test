import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardHomeComponent } from './wizard-home.component';
import { of } from 'rxjs';

describe('WizardHomeComponent', () => {
  let component: WizardHomeComponent;
  let fixture: ComponentFixture<WizardHomeComponent>;

  beforeEach(async () => {
    const httpClientMock = {
      get: () => of([]),
    };
    const { HttpClient } = await import('@angular/common/http');
    await TestBed.configureTestingModule({
      imports: [WizardHomeComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientMock },
        {
          provide: (await import('@angular/router')).ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map() } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
