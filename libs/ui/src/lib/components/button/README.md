# NexUI Button Component

A flexible and accessible button component for Angular, supporting multiple themes, sizes, and variants.

## Features

- Multiple themes: `primary`, `secondary`, `toggle`, `destructive`, `link`, `icon`
- Variants: `solid`, `outline`, `hollow`
- Sizes: `sm`, `md`, `lg`, `xl`
- Light mode and disabled state
- Loading indicator and icon support

## Usage

```html
<!-- Basic usage -->
<button nex-button>Default Button</button>

<!-- Themed button -->
<button nex-button [theme]="'primary'">Primary</button>
<button nex-button [theme]="'secondary'">Secondary</button>
<button nex-button [theme]="'destructive'">Delete</button>

<!-- Variant and size -->
<button nex-button [variant]="'outline'" [size]="'sm'">Small Outline</button>
<button nex-button [variant]="'hollow'" [size]="'xl'">Extra Large Hollow</button>

<!-- Light mode and disabled -->
<button nex-button [lightMode]="true">Light Mode</button>
<button nex-button [disabled]="true">Disabled</button>

<!-- Loading and icon -->
<button nex-button [loading]="true">
  <nex-icon icon="refresh"></nex-icon>
  Loading...
</button>
```

## Selector

- `[nex-button]` (attribute selector, use on `<button>` elements)

## Inputs

| Name        | Type                                                                        | Default     | Description                                      |
| ----------- | --------------------------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `theme`     | `'primary' \| 'secondary' \| 'toggle' \| 'destructive' \| 'link' \| 'icon'` | `'primary'` | Button theme                                     |
| `variant`   | `'solid' \| 'outline' \| 'hollow'`                                          | `'solid'`   | Button variant                                   |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl'`                                              | `'xl'`      | Button size                                      |
| `lightMode` | `boolean`                                                                   | `false`     | Enables light mode styling                       |
| `disabled`  | `boolean`                                                                   | `false`     | Disables the button                              |
| `loading`   | `boolean`                                                                   | `false`     | Shows a loading spinner and disables interaction |

## Template Structure

```html
<span class="button__icon">
  @if(loading) {
  <nex-icon icon="refresh" [spin]="true"></nex-icon>
  }
  <ng-content select="nex-icon"></ng-content>
</span>
<span class="button__text">
  <ng-content></ng-content>
</span>
```

- The icon slot displays a spinner when `loading` is true, or any projected `<nex-icon>`.
- The text slot displays the button label/content.

## Styling

- Styles are defined in `button.component.scss`.
- The component uses BEM-like class modifiers for theme, size, and variant.
- Supports dark and light modes.

## Accessibility

- Use with native `<button>` for best accessibility.
- The `disabled` input sets the native `disabled` attribute.

## Dependencies

- Requires `@nexton-test/icons` for icon support.

## Example

```html
<button nex-button [theme]="'primary'" [variant]="'solid'" [size]="'md'">
  <nex-icon icon="apps"></nex-icon>
  Apps
</button>
```
