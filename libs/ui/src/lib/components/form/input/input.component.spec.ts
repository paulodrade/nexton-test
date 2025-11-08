import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { InputUI } from './input.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<nex-input
    [label]="label"
    [type]="type"
    [placeholder]="placeholder"
    [disabled]="disabled"
  ></nex-input>`,
  standalone: true,
  imports: [InputUI],
})
class TestHostComponent {
  label = 'Nome';
  type: any = 'text';
  placeholder = 'Digite seu nome';
  disabled = false;
}

describe('InputUI', () => {
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
    const input = fixture.debugElement.query(By.directive(InputUI));
    expect(input).toBeTruthy();
  });

  it('deve renderizar o label', () => {
    const label = fixture.nativeElement.querySelector('nex-label');
    expect(label.textContent).toContain('Nome');
  });

  it('deve refletir o type', () => {
    host.type = 'email';
    fixture.detectChanges();
    const inputEl = fixture.nativeElement.querySelector('input');
    expect(inputEl.type).toBe('email');
  });

  it('deve refletir o placeholder', () => {
    host.placeholder = 'Novo placeholder';
    fixture.detectChanges();
    const inputEl = fixture.nativeElement.querySelector('input');
    expect(inputEl.placeholder).toBe('Novo placeholder');
  });

  it('deve refletir o estado disabled', () => {
    host.disabled = true;
    fixture.detectChanges();
    const inputEl = fixture.nativeElement.querySelector('input');
    expect(inputEl.disabled).toBeTruthy();
  });

  it('deve emitir evento ao alterar valor', () => {
    const inputEl = fixture.nativeElement.querySelector('input');
    jest.spyOn(
      fixture.debugElement.children[0].componentInstance,
      'onInputChange'
    );
    inputEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(
      fixture.debugElement.children[0].componentInstance.onInputChange
    ).toHaveBeenCalled();
  });
});
