import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RadioGroupUI } from './radio-group.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<nex-radio-group
    [options]="options"
    [label]="label"
    [disabled]="disabled"
    [name]="name"
  ></nex-radio-group>`,
  standalone: true,
  imports: [RadioGroupUI],
})
class TestHostComponent {
  label = 'Escolha uma opção';
  name = 'grupo';
  disabled = false;
  options = [
    { value: 'a', label: 'Opção A' },
    { value: 'b', label: 'Opção B' },
  ];
}

describe('RadioGroupUI', () => {
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
    const group = fixture.debugElement.query(By.directive(RadioGroupUI));
    expect(group).toBeTruthy();
  });

  it('deve renderizar o label', () => {
    const label = fixture.nativeElement.querySelector('nex-label');
    expect(label.textContent).toContain('Escolha uma opção');
  });

  it('deve renderizar todas as opções', () => {
    const radios = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    );
    expect(radios.length).toBe(2);
    expect(radios[0].value).toBe('a');
    expect(radios[1].value).toBe('b');
  });

  it('deve refletir o estado disabled', () => {
    host.disabled = true;
    fixture.detectChanges();
    const radios = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    );
    expect(radios[0].disabled).toBeTruthy();
    expect(radios[1].disabled).toBeTruthy();
  });

  it('deve emitir evento ao selecionar opção', () => {
    const radios = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    );
    jest.spyOn(
      fixture.debugElement.children[0].componentInstance,
      'onInputChange'
    );
    radios[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(
      fixture.debugElement.children[0].componentInstance.onInputChange
    ).toHaveBeenCalledWith('b');
  });
});
