import { Component, Input, forwardRef } from '@angular/core';
import { InputBase } from '../input-base';
import { LabelModule } from '../label';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nex-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports: [LabelModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUI),
      multi: true,
    },
  ],
})
export class InputUI extends InputBase {
  /**
   * Input type (text, password, email, tel).
   * @Input
   */
  @Input() type: 'text' | 'number' | 'password' | 'email' | 'tel' = 'text';
}
