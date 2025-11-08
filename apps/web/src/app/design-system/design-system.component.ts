import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  InputModule,
  RadioGroupModule,
  CheckboxModule,
  LabelModule,
  ErrorModule,
  ButtonModule,
  SelectModule,
  CardModule,
  MenuListModule,
} from '@nexton-test/ui/components';

import { IconUI } from '@nexton-test/icons';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-design-system',
  imports: [
    InputModule,
    RadioGroupModule,
    CheckboxModule,
    LabelModule,
    ErrorModule,
    ButtonModule,
    CardModule,
    IconUI,
    SelectModule,
    FormsModule,
    MenuListModule,
    RouterLink,
  ],
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
})
export class DesignSystem {
  activeSection: 'selects' | 'inputs' | 'radios' | 'checkboxes' | 'buttons' =
    'selects';

  @ViewChild('selectsSection', { static: false })
  selectsSection?: ElementRef<HTMLElement>;

  @ViewChild('inputsSection', { static: false })
  inputsSection?: ElementRef<HTMLElement>;

  @ViewChild('radiosSection', { static: false })
  radiosSection?: ElementRef<HTMLElement>;

  @ViewChild('checkboxesSection', { static: false })
  checkboxesSection?: ElementRef<HTMLElement>;

  @ViewChild('buttonsSection', { static: false })
  buttonsSection?: ElementRef<HTMLElement>;

  scrollToSection(
    section: 'selects' | 'inputs' | 'radios' | 'checkboxes' | 'buttons'
  ) {
    this.activeSection = section;
    let el: HTMLElement | undefined;
    if (section === 'selects') el = this.selectsSection?.nativeElement;
    if (section === 'inputs') el = this.inputsSection?.nativeElement;
    if (section === 'radios') el = this.radiosSection?.nativeElement;
    if (section === 'checkboxes') el = this.checkboxesSection?.nativeElement;
    if (section === 'buttons') el = this.buttonsSection?.nativeElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
