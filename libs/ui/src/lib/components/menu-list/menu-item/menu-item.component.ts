import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: '[nex-menu-item]',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemUI {
  @Input() active = false;

  @HostBinding('class.active')
  get isActive() {
    return this.active;
  }
}
