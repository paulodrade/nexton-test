import { NgModule } from '@angular/core';
import { MenuListUI } from './menu-list.component';
import { MenuItemUI } from './menu-item/menu-item.component';

@NgModule({
  imports: [MenuListUI, MenuItemUI],
  exports: [MenuListUI, MenuItemUI],
})
export class MenuListModule {}
