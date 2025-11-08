import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CheckboxUI } from './checkbox.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<nex-checkbox
    [label]="label"
    [checked]="checked"
    [disabled]="disabled"
  ></nex-checkbox>`,
  standalone: true,
  imports: [CheckboxUI],
})
class TestHostComponent {
  label = 'Aceito os termos';
  checked = false;
  disabled = false;
}

describe('CheckboxUI', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    // Corrige erro do ControlValueAccessor
    fixture.debugElement.children[0].componentInstance.onChange = jest.fn();
    fixture.debugElement.children[0].componentInstance.onTouched = jest.fn();
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    const checkbox = fixture.debugElement.query(By.directive(CheckboxUI));
    expect(checkbox).toBeTruthy();
  });

  it('deve renderizar o label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Aceito os termos');
  });

  it('deve refletir o estado checked', () => {
    host.checked = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(input.checked).toBeTruthy();
  });

  it('deve refletir o estado disabled', () => {
    host.disabled = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(input.disabled).toBeTruthy();
  });

  it('deve emitir evento ao alterar valor', () => {
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    jest.spyOn(
      fixture.debugElement.children[0].componentInstance,
      'onInputChange'
    );
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(
      fixture.debugElement.children[0].componentInstance.onInputChange
    ).toHaveBeenCalled();
  });
});
