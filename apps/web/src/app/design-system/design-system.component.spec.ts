import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignSystem } from './design-system.component';
import { ActivatedRoute } from '@angular/router';

// Polyfill fetch para ambiente de teste Node
beforeAll(() => {
  global.fetch =
    global.fetch ||
    (() =>
      Promise.resolve({
        text: () => Promise.resolve(''),
      }));
});

describe('DesignSystem', () => {
  let component: DesignSystem;
  let fixture: ComponentFixture<DesignSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignSystem],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
