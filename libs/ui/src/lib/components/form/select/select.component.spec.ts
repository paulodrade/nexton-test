import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SelectUI } from './select.component';
import { By } from '@angular/platform-browser';

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
  template: `<nex-select
    [options]="options"
    [label]="label"
    [placeholder]="placeholder"
    [disabled]="disabled"
  ></nex-select>`,
  standalone: true,
  imports: [SelectUI],
})
class TestHostComponent {
  label = 'Selecione';
  placeholder = 'Escolha uma opção';
  disabled = false;
  options = [
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
  ];
}

describe('SelectUI', () => {
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

  it('deve criar o componente', () => {
    const select = fixture.debugElement.query(By.directive(SelectUI));
    expect(select).toBeTruthy();
  });

  it('deve renderizar o label', () => {
    const label = fixture.nativeElement.querySelector('nex-label');
    expect(label.textContent).toContain('Selecione');
  });

  it('deve renderizar as opções', () => {
    const options = fixture.nativeElement.querySelectorAll('select option');
    expect(options.length).toBe(3); // placeholder + 2 opções
    expect(options[1].textContent).toContain('Opção 1');
    expect(options[2].textContent).toContain('Opção 2');
  });

  it('deve renderizar o placeholder', () => {
    const options = fixture.nativeElement.querySelectorAll('select option');
    expect(options[0].textContent).toContain('Escolha uma opção');
    expect(options[0].hidden).toBeTruthy();
  });

  it('deve refletir o estado disabled', () => {
    host.disabled = true;
    fixture.detectChanges();
    const selectEl = fixture.nativeElement.querySelector('select');
    expect(selectEl.disabled).toBeTruthy();
  });

  it('deve emitir evento ao alterar valor', () => {
    const selectEl = fixture.nativeElement.querySelector('select');
    jest.spyOn(
      fixture.debugElement.children[0].componentInstance,
      'onInputChange'
    );
    // Garante que onChange/onTouched estão registrados para evitar erro de TypeError
    fixture.debugElement.children[0].componentInstance.registerOnChange(
      jest.fn()
    );
    fixture.debugElement.children[0].componentInstance.registerOnTouched(
      jest.fn()
    );
    selectEl.value = '2';
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(
      fixture.debugElement.children[0].componentInstance.onInputChange
    ).toHaveBeenCalledWith('2');
  });
});
