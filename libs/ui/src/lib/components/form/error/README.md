# NexUI Error Component

A simple component for displaying error messages in Angular forms.

## Features

- Projects error messages in forms
- Minimal and accessible

## Usage

```html
<nex-error> Invalid value. </nex-error>
```

## Selector

- `<nex-error>` (element selector)

## Template Structure

```html
<ng-content></ng-content>
```

- Projects any content as the error message.

## Styling

- Styles are defined in `error.component.scss`.
- The component uses BEM-like class names for structure.

## Example

```html
<nex-error> This field is required. </nex-error>
```
