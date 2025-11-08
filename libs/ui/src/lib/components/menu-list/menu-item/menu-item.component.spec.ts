import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemUI } from './menu-item.component';

describe('MenuItemUI', () => {
  let component: MenuItemUI;
  let fixture: ComponentFixture<MenuItemUI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemUI],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemUI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
