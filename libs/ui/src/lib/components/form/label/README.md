# NexUI Label Component

A simple label component for Angular forms, supporting association with input elements.

## Features

- Projects label content for form fields
- Supports association with input elements via `forId`

## Usage

```html
<nex-label forId="username-input">Username</nex-label> <input id="username-input" type="text" />
```

## Selector

- `<nex-label>` (element selector)

## Inputs

| Name    | Type   | Default | Description                                |
| ------- | ------ | ------- | ------------------------------------------ |
| `forId` | string | —       | Associates the label with an input element |

## Template Structure

```html
<label [for]="forId" class="label">
  <ng-content></ng-content>
</label>
```

- The label element wraps projected content and associates with an input if `forId` is provided.

## Styling

- Styles are defined in `label.component.scss`.
- The component uses BEM-like class names for structure.

## Example

```html
<nex-label forId="email-input">Email</nex-label> <input id="email-input" type="email" />
```
