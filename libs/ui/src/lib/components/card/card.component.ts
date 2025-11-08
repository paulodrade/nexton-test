import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * NexUI card component.
 * Used to group content in a visual container with card appearance.
 * Supports header, content, and footer areas.
 *
 * @example
 * <nex-card>
 *   <div card-header>Title</div>
 *   <div>Card content</div>
 *   <div card-footer>Actions</div>
 * </nex-card>
 */
@Component({
  selector: 'nex-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardUI {}
