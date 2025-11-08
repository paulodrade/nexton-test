# NexUI Select Component

A flexible select (dropdown) component for Angular forms, supporting labels, error messages, and integration with Angular forms API.

## Features

- Works with Angular forms (ControlValueAccessor)
- Supports label, placeholder, disabled, required, and value
- Customizable options
- Slots for custom label and error messages
- Chevron icon for dropdown indicator

## Usage

```html
<nex-select
  [label]="'Choose an option'"
  [options]="[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]"
  [placeholder]="'Select...'"
  [value]="selected"
  [disabled]="false"
  [required]="true"
  (valueChange)="onChange($event)"
></nex-select>

<!-- With custom label and error message -->
<nex-select [options]="options">
  <nex-label>Pick one</nex-label>
  <nex-error *ngIf="hasError">Selection required.</nex-error>
</nex-select>
```

## Selector

- `<nex-select>` (element selector)

## Inputs

| Name          | Type                                    | Default | Description                      |
| ------------- | --------------------------------------- | ------- | -------------------------------- |
| `options`     | Array<{ label: string; value: string }> | []      | Array of select options          |
| `label`       | string                                  | ""      | Label displayed above the select |
| `placeholder` | string                                  | ""      | Placeholder text                 |
| `disabled`    | boolean                                 | false   | Disables the select              |
| `required`    | boolean                                 | false   | Marks the select as required     |
| `value`       | any                                     | null    | Selected value                   |

## Template Structure

```html
@if(label){
<nex-label>{{ label }}</nex-label>
}
<ng-content select="nex-label"></ng-content>
<div class="select__container">
  <select class="select" [disabled]="disabled" [required]="required" (change)="onInputChange($any($event.target).value)">
    @if (placeholder) {
    <option selected hidden>{{ placeholder }}</option>
    } @for (option of options; track option.value) {
    <option [value]="option.value">{{ option.label }}</option>
    }
  </select>
  <div class="select__chevron">
    <nex-icon icon="chevron-down"></nex-icon>
  </div>
</div>
<ng-content select="nex-error"></ng-content>
```

- The label is displayed above the select if provided.
- The `nex-label` slot allows projecting a custom label.
- The `nex-error` slot allows projecting error messages below the select.
- The chevron icon indicates the dropdown.

## Styling

- Styles are defined in `select.component.scss`.
- The component uses BEM-like class names for structure.

## Example

```html
<nex-select
  [options]="[
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]"
  [value]="selected"
></nex-select>
```
