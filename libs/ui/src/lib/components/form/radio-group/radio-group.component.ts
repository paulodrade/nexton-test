import { Component, Input, forwardRef } from '@angular/core';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBase } from '../input-base';
import { IconName, IconUI } from '@nexton-test/icons';
import { LabelUI } from '../label/label.component';

/**
 * NexUI radio group component.
 * Angular radio group component that extends InputBase.
 * Propagates 'disabled' and 'name' inputs to all child radios for accessibility.
 *
 * @example
 * <nex-radio-group
 *   [options]="[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]"
 *   [label]="''"
 *   [placeholder]="''"
 *   [readonly]="false"
 *   [value]="null"
 *   [disabled]="false"
 *   (valueChange)="onChange($event)"
 * ></nex-radio-group>
 *
 * @selector nex-radio-group
 * @extends InputBase
 */
@Component({
  selector: 'nex-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  imports: [IconUI, ReactiveFormsModule, LabelUI],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupUI),
      multi: true,
    },
  ],
})
export class RadioGroupUI extends InputBase {
  /**
   * Array of radio options.
   * Each option should have a value and a label.
   */
  @Input() options: { value: string; label: string; icon?: IconName }[] = [];
}
