# NexUI Card Component

A simple and flexible card container for grouping content in Angular applications.

## Features

- Visual container for grouping related content
- Supports header, body, and footer slots via attributes
- Customizable content structure

## Usage

```html
<nex-card>
  <div nex-card-header>Card Title</div>
  <div nex-card-body>Main content goes here.</div>
  <div>Additional content without a slot.</div>
  <div nex-card-footer>
    <button nex-button>Action</button>
  </div>
</nex-card>
```

## Selector

- `<nex-card>` (element selector)

## Slots

| Attribute         | Description                      |
| ----------------- | -------------------------------- |
| `nex-card-header` | Projects content into the header |
| `nex-card-body`   | Projects content into the body   |
| `nex-card-footer` | Projects content into the footer |
| (no attribute)    | Projects content into the body   |

## Template Structure

```html
<div class="nex-card">
  <ng-content select="[nex-card-header]"></ng-content>
  <div class="nex-card-content">
    <ng-content select="[nex-card-body]"></ng-content>
    <ng-content></ng-content>
  </div>
  <ng-content select="[nex-card-footer]"></ng-content>
</div>
```

- Content with `nex-card-header` is rendered in the card header area.
- Content with `nex-card-body` or no attribute is rendered in the card body.
- Content with `nex-card-footer` is rendered in the card footer area.

## Styling

- Styles are defined in `card.component.scss`.
- The component uses BEM-like class names for structure.

## Example

```html
<nex-card>
  <div nex-card-header>Profile</div>
  <div nex-card-body>
    <p>User details and information.</p>
  </div>
  <div nex-card-footer>
    <button nex-button>Edit</button>
  </div>
</nex-card>
```
