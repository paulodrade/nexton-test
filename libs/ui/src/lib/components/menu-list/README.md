# NexUI Menu List Component

A simple container component for rendering a list of menu items in Angular applications.

## Features

- Projects menu items using the `[nex-menu-item]` attribute
- Provides consistent styling for menu lists

## Usage

```html
<nex-menu-list>
  <div nex-menu-item>Item 1</div>
  <div nex-menu-item>Item 2</div>
  <div nex-menu-item>Item 3</div>
</nex-menu-list>
```

## Selector

- `<nex-menu-list>` (element selector)

## Slots

| Attribute       | Description                     |
| --------------- | ------------------------------- |
| `nex-menu-item` | Projects content as a menu item |

## Template Structure

```html
<div class="menu-list">
  <ng-content select="[nex-menu-item]"></ng-content>
</div>
```

- Content with the `nex-menu-item` attribute is rendered as a menu item inside the list.

## Styling

- Styles are defined in `menu-list.component.scss`.
- The component uses BEM-like class names for structure.

## Example

```html
<nex-menu-list>
  <div nex-menu-item>Profile</div>
  <div nex-menu-item>Settings</div>
  <div nex-menu-item>Logout</div>
</nex-menu-list>
```
