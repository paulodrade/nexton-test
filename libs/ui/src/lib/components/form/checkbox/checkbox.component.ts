import { Component, Input, forwardRef } from '@angular/core';
import { InputBase } from '../input-base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * NexUI checkbox component.
 * Angular form checkbox component that extends InputBase.
 *
 * @example
 * <nex-checkbox
 *   [checked]="true"
 *   [label]="''"
 *   [placeholder]="''"
 *   [readonly]="false"
 *   [value]="null"
 *   [disabled]="false"
 * ></nex-checkbox>
 *
 * @selector nex-checkbox
 * @extends InputBase
 */
@Component({
  selector: 'nex-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxUI),
      multi: true,
    },
  ],
})
export class CheckboxUI extends InputBase {
  /**
   * Whether the checkbox is checked.
   * @Input
   */
  @Input() checked = false;
}
