# NexUI Checkbox Component

A customizable checkbox component for Angular forms, supporting labels, error messages, and integration with Angular forms API.

## Features

- Works with Angular forms (ControlValueAccessor)
- Supports label, checked, disabled, readonly, required, and value
- Slot for error messages

## Usage

```html
<nex-checkbox [checked]="isChecked" [label]="'Accept terms'" [disabled]="false" [required]="true" [value]="1"></nex-checkbox>

<!-- With error message -->
<nex-checkbox [label]="'Accept terms'">
  <nex-error *ngIf="hasError">This field is required.</nex-error>
</nex-checkbox>
```

## Selector

- `<nex-checkbox>` (element selector)

## Inputs

| Name       | Type    | Default | Description                      |
| ---------- | ------- | ------- | -------------------------------- |
| `checked`  | boolean | false   | Whether the checkbox is checked  |
| `label`    | string  | ""      | Label displayed next to checkbox |
| `disabled` | boolean | false   | Disables the checkbox            |
| `readonly` | boolean | false   | Makes the checkbox readonly      |
| `required` | boolean | false   | Marks the checkbox as required   |
| `value`    | any     | null    | Value associated with the input  |

## Template Structure

```html
<label class="checkbox label">
  <input class="checkbox__input input" type="checkbox" [checked]="checked" [disabled]="disabled" [required]="required" (change)="onInputChange($event.target.value)" />
  {{ label }}
</label>
<ng-content select="nex-error"></ng-content>
```

- The label wraps the checkbox input and displays the label text.
- The `nex-error` slot allows projecting error messages below the checkbox.

## Styling

- Styles are defined in `checkbox.component.scss`.
- The component uses BEM-like class names for structure.

## Example

```html
<nex-checkbox [label]="'Subscribe'" [checked]="true"></nex-checkbox>
```
