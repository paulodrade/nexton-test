import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ErrorUI } from './error.component';

@Component({
  template: `<nex-error>Mensagem de erro</nex-error>`,
  standalone: true,
  imports: [ErrorUI],
})
class TestHostComponent {}

describe('ErrorUI', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    const error = fixture.nativeElement.querySelector('nex-error');
    expect(error).toBeTruthy();
  });

  it('deve renderizar a mensagem de erro projetada', () => {
    const error = fixture.nativeElement.querySelector('nex-error');
    expect(error.textContent).toContain('Mensagem de erro');
  });
});
