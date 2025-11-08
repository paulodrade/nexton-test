import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class InputBase implements ControlValueAccessor {
  @Output() valueChange = new EventEmitter<string>();

  @Input() value: any;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() required = false;
  @Input() name: string | undefined;

  _disabled = false;

  @Input()
  set disabled(value: boolean) {
    if (typeof value !== 'boolean') {
      return;
    }
    this._disabled = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  protected onChange!: (_: any) => void;
  protected onTouched!: () => void;

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Handles value selection/input.
   * @param val New value.
   */
  onInputChange(val: string) {
    if (!this.disabled) {
      this.value = val;
      this.onChange(val);
      this.onTouched();
      this.valueChange.emit(val);
    }
  }
}
