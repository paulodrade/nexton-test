# NexUI Radio Group Component

A flexible radio group component for Angular forms, supporting labels, error messages, icons, and integration with Angular forms API.

## Features

- Works with Angular forms (ControlValueAccessor)
- Supports label, disabled, required, value, and custom options
- Options can include icons
- Slots for custom label and error messages

## Usage

```html
<nex-radio-group
  [label]="'Choose an option'"
  [options]="[
    { value: 'a', label: 'Option A', icon: 'apps' },
    { value: 'b', label: 'Option B' }
  ]"
  [value]="selected"
  [disabled]="false"
  [required]="true"
  (valueChange)="onChange($event)"
></nex-radio-group>

<!-- With custom label and error message -->
<nex-radio-group [options]="options">
  <nex-label>Pick one</nex-label>
  <nex-error *ngIf="hasError">Selection required.</nex-error>
</nex-radio-group>
```

## Selector

- `<nex-radio-group>` (element selector)

## Inputs

| Name       | Type                                                   | Default | Description                           |
| ---------- | ------------------------------------------------------ | ------- | ------------------------------------- |
| `options`  | Array<{ value: string; label: string; icon?: string }> | []      | Array of radio options                |
| `label`    | string                                                 | ""      | Label displayed above the radio group |
| `disabled` | boolean                                                | false   | Disables all radio buttons            |
| `required` | boolean                                                | false   | Marks the group as required           |
| `value`    | any                                                    | null    | Selected value                        |

## Template Structure

```html
@if(label){
<nex-label>{{ label }}</nex-label>
}
<ng-content select="nex-label"></ng-content>
<div class="radio__group">
  @if (name && options.length) { @for (option of options; track option.value) {
  <label class="radio label">
    @if(option.icon) {
    <nex-icon class="radio__icon" [icon]="option.icon"></nex-icon>
    }
    <input class="radio__input input" type="radio" [name]="name" [value]="option.value" [checked]="option.value === value" [disabled]="disabled" [required]="required" (change)="onInputChange(option.value)" />
    {{ option.label }}
  </label>
  } }
</div>
@if(disabled === false){
<ng-content select="nex-error"></ng-content>
}
```

- The label is displayed above the group if provided.
- The `nex-label` slot allows projecting a custom label.
- Each option renders a radio input and optional icon.
- The `nex-error` slot allows projecting error messages below the group.

## Styling

- Styles are defined in `radio-group.component.scss`.
- The component uses BEM-like class names for structure.

## Example

```html
<nex-radio-group
  [options]="[
    { value: 'yes', label: 'Yes', icon: 'check' },
    { value: 'no', label: 'No', icon: 'close' }
  ]"
  [value]="selected"
></nex-radio-group>
```
