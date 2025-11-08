import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonUI } from './button.component';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve('<svg></svg>'),
    })
  ) as jest.Mock;
});

afterAll(() => {
  // @ts-expect-error: Node.js does not have fetch, this disables the mock after tests
  global.fetch = undefined;
});

@Component({
  template: `<button
    nex-button
    [theme]="theme"
    [size]="size"
    [variant]="variant"
    [disabled]="disabled"
    [loading]="loading"
    [lightMode]="lightMode"
  >
    Test Button
  </button>`,
  standalone: true,
  imports: [ButtonUI],
})
class TestHostComponent {
  theme = 'primary';
  size = 'md';
  variant = 'solid';
  disabled = false;
  loading = false;
  lightMode = false;
}

describe('ButtonUI', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const button = fixture.debugElement.query(By.directive(ButtonUI));
    expect(button).toBeTruthy();
  });

  it('should render projected text', () => {
    const buttonText = fixture.nativeElement.querySelector('.button__text');
    expect(buttonText.textContent).toContain('Test Button');
  });

  it('should apply theme, size and variant classes', () => {
    host.theme = 'secondary';
    host.size = 'sm';
    host.variant = 'outline';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.directive(ButtonUI));
    const classList = button.nativeElement.className;
    expect(classList).toContain('button--theme-secondary');
    expect(classList).toContain('button--size-sm');
    expect(classList).toContain('button--variant-outline');
  });

  it('should show loading icon when loading is true', () => {
    host.loading = true;
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector(
      'nex-icon[icon="refresh"]'
    );
    expect(icon).toBeTruthy();
  });

  it('should apply disabled class when disabled', () => {
    host.disabled = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.directive(ButtonUI));
    expect(button.nativeElement.className).toContain('button--theme-disabled');
  });

  it('should apply light mode class when lightMode is true', () => {
    host.lightMode = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.directive(ButtonUI));
    expect(button.nativeElement.className).toContain('button--light-mode');
  });
});
