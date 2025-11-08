/**
 * NexUI select component.
 * Angular form select component that extends InputBase.
 *
 * @example
 * <nex-select
 *   [options]="[{ label: 'Option 1', value: '1' }]"
 *   [label]="''"
 *   [placeholder]="''"
 *   [readonly]="false"
 *   [value]="null"
 *   [disabled]="false"
 * ></nex-select>
 *
 * @selector nex-select
 * @extends InputBase
 */

import { Component, Input, forwardRef } from '@angular/core';
import { IconUI } from '@nexton-test/icons';
import { InputBase } from '../input-base';
import { LabelModule } from '../label';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nex-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [LabelModule, IconUI],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectUI),
      multi: true,
    },
  ],
})
export class SelectUI extends InputBase {
  /**
   * List of select options.
   * Each option should have a label and a value.
   */
  @Input() options: Array<{ label: string; value: string }> = [];
}
