import { Component, Input } from '@angular/core';
import { CardUI } from '../card/card.component';
import { InputUI } from './input/input.component';
import { RadioGroupUI } from './radio-group/radio-group.component';
import { normalizeName } from '@nexton-test/core/utils';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorUI } from './error/error.component';

export interface FormField {
  id: number | string;
  label: string;
  type: string;
  value?: any;
  required?: boolean;
  name?: string | undefined;
  options?: Array<string | { value: string; label: string; icon?: string }>;
  formControl: FormControl<any>;
}

@Component({
  selector: 'nex-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [CardUI, InputUI, RadioGroupUI, ReactiveFormsModule, ErrorUI],
})
export class FormUI {
  @Input() fields: Array<FormField> = [];

  get normalizedSchema() {
    const schema = this.fields.map((field) => {
      let name = field.name;
      if (field.type === 'radio') {
        name = field.name
          ? field.name
          : field.label
          ? normalizeName(field.label)
          : undefined;
      }

      return {
        ...field,
        required: !!field.required,
        name,
        options:
          field.type === 'radio'
            ? (field.options ?? []).map((opt: any) =>
                typeof opt === 'string'
                  ? { value: opt, label: opt }
                  : { value: opt.value, label: opt.label, icon: opt.icon }
              )
            : undefined,
      };
    });
    return schema;
  }
}
