import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardSectionComponent } from './wizard-section.component';

describe('WizardSectionComponent', () => {
  let component: WizardSectionComponent;
  let fixture: ComponentFixture<WizardSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
