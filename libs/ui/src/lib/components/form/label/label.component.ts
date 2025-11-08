import { Component, Input } from '@angular/core';

/**
 * NexUI label component.
 * Angular form label component.
 *
 * @example
 * <nex-label forId="input-id">Label text</nex-label>
 *
 * @selector nex-label
 */
@Component({
  selector: 'nex-label',
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelUI {
  @Input() forId?: string;
}
