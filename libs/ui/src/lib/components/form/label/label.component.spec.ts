import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LabelUI } from './label.component';

@Component({
  template: `<nex-label [forId]="forId">Meu label</nex-label>`,
  standalone: true,
  imports: [LabelUI],
})
class TestHostComponent {
  forId?: string = 'input-id';
}

describe('LabelUI', () => {
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
    const label = fixture.nativeElement.querySelector('label');
    expect(label).toBeTruthy();
  });

  it('deve renderizar o texto projetado', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Meu label');
  });

  it('deve refletir o atributo for', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.getAttribute('for')).toBe('input-id');
  });

  it('não deve definir o atributo for se forId não for passado', () => {
    host.forId = undefined;
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.getAttribute('for')).toBe('undefined');
  });
});
