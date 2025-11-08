# NexUI Input Component

A flexible input component for Angular forms, supporting labels, error messages, and multiple input types.

## Features

- Works with Angular forms (ControlValueAccessor)
- Supports label, placeholder, disabled, required, and value
- Multiple input types: text, number, password, email, tel
- Slots for custom label and error messages

## Usage

```html
<nex-input [type]="'text'" [label]="'Username'" [placeholder]="'Enter your username'" [disabled]="false" [required]="true"></nex-input>

<!-- With custom label and error message -->
<nex-input [type]="'email'">
  <nex-label>Email address</nex-label>
  <nex-error *ngIf="hasError">Invalid email.</nex-error>
</nex-input>
```

## Selector

- `<nex-input>` (element selector)

## Inputs

| Name          | Type                                                 | Default | Description                     |
| ------------- | ---------------------------------------------------- | ------- | ------------------------------- |
| `type`        | 'text' \| 'number' \| 'password' \| 'email' \| 'tel' | 'text'  | Input type                      |
| `label`       | string                                               | ""      | Label displayed above the input |
| `placeholder` | string                                               | ""      | Placeholder text                |
| `disabled`    | boolean                                              | false   | Disables the input              |
| `required`    | boolean                                              | false   | Marks the input as required     |
| `value`       | any                                                  | null    | Value of the input              |

## Template Structure

```html
@if(label){
<nex-label>{{ label }}</nex-label>
}
<ng-content select="nex-label"></ng-content>
<input #inputElement class="input" [type]="type" [placeholder]="placeholder" [name]="name" [disabled]="disabled" [required]="required" (change)="onInputChange($any($event.target).value)" />
<ng-content select="nex-error"></ng-content>
```

- The label is displayed above the input if provided.
- The `nex-label` slot allows projecting a custom label.
- The `nex-error` slot allows projecting error messages below the input.

## Styling

- Styles are defined in `input.component.scss`.
- The component uses BEM-like class names for structure.

## Example

```html
<nex-input [type]="'password'" [label]="'Password'" [required]="true"></nex-input>
```
