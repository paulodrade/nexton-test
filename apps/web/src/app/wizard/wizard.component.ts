/**
 * Main Wizard component.
 * Handles schema selection, navigation, and form state.
 * Uses reactive forms and integrates with WizardService for busy state management.
 */
import {
  Component,
  inject,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { MenuListModule } from '@nexton-test/ui/components';

import { SchemaService } from '@nexton-test/core/services';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Schema } from '@nexton-test/core/interfaces';
import { Observable } from 'rxjs';
import { WizardService } from './wizard.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  imports: [MenuListModule, ReactiveFormsModule, RouterOutlet],
})
export class WizardComponent implements OnInit {
  /**
   * ChangeDetectorRef for manual view updates.
   */
  private cdr = inject(ChangeDetectorRef);

  /**
   * Reference to the wizard sections element (used for scrolling).
   */
  @ViewChild('sections') sections!: ElementRef<HTMLElement>;

  /**
   * Service to fetch available schemas.
   */
  schemaService = inject(SchemaService);

  /**
   * Service for wizard state management (busy, etc).
   */
  wizardService = inject(WizardService);

  /**
   * Observable with the list of available schemas.
   */
  schemas$: Observable<Schema[]> = this.schemaService.getSchemas();

  /**
   * Currently selected schema.
   */
  currentSchema: Schema | null = null;

  /**
   * FormControl for schema selection.
   * Agora com validação required.
   */
  schemaInput = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  /**
   * Main wizard form group.
   */
  wizardForm = new FormGroup({
    schema: this.schemaInput,
  });

  /**
   * Observable indicating if the wizard is busy.
   */
  isBusy$ = this.wizardService.isBusy$;

  /**
   * Initializes the component and observes busy state to enable/disable the form.
   */
  ngOnInit(): void {
    this.wizardService.isBusy$.subscribe((isBusy) => {
      if (isBusy) {
        Object.values(this.wizardForm.controls).forEach((control) =>
          control.disable()
        );
      } else {
        Object.values(this.wizardForm.controls).forEach((control) =>
          control.enable()
        );
      }
      this.cdr.markForCheck();
    });
  }

  /**
   * Handles form submission.
   * Marks all fields as dirty and sets busy state if valid.
   */
  onSubmit() {
    this.wizardForm.markAllAsDirty();

    if (this.wizardForm.valid) {
      this.wizardService.busy = true;
    }
  }

  /**
   * Called when a schema is selected.
   * Updates the current schema and scrolls to the section element.
   * @param schema The selected schema
   */
  onSchemaSelected(schema: Schema) {
    this.currentSchema = schema;
    this.sections?.nativeElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
