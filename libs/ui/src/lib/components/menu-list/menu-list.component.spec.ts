import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MenuListUI } from './menu-list.component';

@Component({
  template: `
    <nex-menu-list>
      <div nex-menu-item>Item 1</div>
      <div nex-menu-item>Item 2</div>
    </nex-menu-list>
  `,
  standalone: true,
  imports: [MenuListUI],
})
class TestHostComponent {}

describe('MenuListUI', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    const menu = fixture.nativeElement.querySelector('.menu-list');
    expect(menu).toBeTruthy();
  });

  it('deve projetar os itens corretamente', () => {
    const items = fixture.nativeElement.querySelectorAll('[nex-menu-item]');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Item 1');
    expect(items[1].textContent).toContain('Item 2');
  });
});
