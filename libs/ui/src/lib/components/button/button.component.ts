import { Component, Input, HostBinding } from '@angular/core';
import { IconModule } from '@nexton-test/icons';

/**
 * Available button themes.
 * - 'primary': Main button.
 * - 'secondary': Secondary button.
 * - 'toggle': Toggle button.
 * - 'destructive': Destructive action button.
 * - 'link': Button with link appearance.
 * - 'icon': Icon-only button.
 */
type ButtonTheme = 'primary' | 'secondary' | 'toggle' | 'destructive' | 'link';

/**
 * Available button sizes.
 * - 'sm': Small.
 * - 'md': Medium (default).
 * - 'lg': Large.
 */
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button variant types.
 * - 'solid': Solid background.
 * - 'outline': Border only.
 * - 'hollow': Transparent background.
 */
type ButtonVariant = 'solid' | 'outline' | 'hollow';

/**
 * NexUI button component.
 * Allows configuration of theme, size, type, light mode, and disabled state.
 *
 * @example
 * <nex-button [theme]="'primary'" [size]="'md'" [variant]="'solid'" [disabled]="true"></nex-button>
 */
@Component({
  selector: '[nex-button]',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [IconModule],
})
export class ButtonUI {
  @HostBinding('class')
  get hostClasses(): string {
    const classes = [
      'button',
      this.lightMode ? 'button--light-mode' : '',
      this.disabled ? 'button--theme-disabled' : this.theme,
      this.variant,
      this.size,
    ];
    return classes.filter(Boolean).join(' ');
  }
  /**
   * Enables light mode for the button.
   * @default false
   */
  @Input() lightMode = false;

  /**
   * Disables the button.
   * @default false
   */
  @Input() disabled = false;

  @Input() loading = false;

  /**
   * Sets the button variant.
   * Accepts: 'solid', 'outline', 'hollow'.
   * @param variant Button variant.
   */
  @Input() set variant(variant: ButtonVariant) {
    this._variant = `button--variant-${variant ?? 'solid'}`;
  }
  get variant(): string {
    return this._variant;
  }

  /**
   * Sets the button theme.
   * Accepts: 'primary', 'secondary', 'toggle', 'destructive', 'link', 'icon'.
   * @param theme Button theme.
   */
  @Input() set theme(theme: ButtonTheme) {
    this._theme = `button--theme-${theme ?? 'primary'}`;
  }
  get theme(): string {
    return this._theme;
  }

  /**
   * Sets the button size.
   * Accepts: 'sm', 'md', 'lg', 'xl'.
   * @param size Button size.
   */
  @Input() set size(size: ButtonSize) {
    this._size = `button--size-${size ?? 'xl'}`;
  }
  get size(): string {
    return this._size;
  }

  /**
   * Default button theme.
   * @private
   */
  _theme = 'button--theme-primary';

  /**
   * Default button size.
   * @private
   */
  _size = 'button--size-xl';

  /**
   * Default button variant.
   * @private
   */
  _variant = 'button--variant-solid';
}
