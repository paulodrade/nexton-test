import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Section } from '@nexton-test/core/interfaces';
import { FormField, FormUI } from '@nexton-test/ui/components';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { normalizeName } from '@nexton-test/core/utils';
import { ButtonUI } from '@nexton-test/ui/components/button/button.component';
import { AsyncPipe } from '@angular/common';
import { WizardService } from '../wizard.service';

@Component({
  selector: 'app-wizard-section',
  standalone: true,
  imports: [FormUI, ButtonUI, ReactiveFormsModule, AsyncPipe],
  templateUrl: './wizard-section.component.html',
  styleUrls: ['./wizard-section.component.scss'],
})
export class WizardSectionComponent {
  wizardService = inject(WizardService);

  private _section!: Section;

  @Input()
  set section(value: Section) {
    this._section = value;
    this.createFields();
  }
  get section(): Section {
    return this._section;
  }

  private _formGroup!: FormGroup;
  @Input()
  set formGroup(value: FormGroup) {
    this._formGroup = value;
    this.createFields();
  }
  get formGroup(): FormGroup {
    return this._formGroup;
  }
  @Input() first = false;
  @Input() last = false;

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  localFormGroup = new FormGroup({});
  fields: FormField[] = [];
  isBusy$ = this.wizardService.isBusy$;

  private createFields() {
    if (!this.section?.fields || !this.formGroup) {
      this.fields = [];
      return;
    }
    this.fields = this.section.fields.map((field) => {
      const validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      const name =
        field.name ||
        (field.label ? normalizeName(field.label) : undefined) ||
        '';
      const formControl = new FormControl('', validators);

      if (!this.formGroup.contains(name)) {
        this.formGroup.addControl(name, formControl);
      }
      return {
        ...field,
        formControl,
        name,
      };
    });
  }

  goToNextSection() {
    if (this.localFormGroup.valid) {
      this.next.emit();
    }
  }

  goToPreviousSection() {
    this.previous.emit();
  }

  isAllFieldsValid(): boolean {
    for (const field of this.fields) {
      if (field.formControl.invalid) {
        return true;
      }
    }

    return false;
  }
}
