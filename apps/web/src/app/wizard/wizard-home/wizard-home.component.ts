/* Angular core imports */
import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* Third-party and project imports */
import { Schema } from '@nexton-test/core/interfaces';
import { SchemaService } from '@nexton-test/core/services';
import type { IconName } from '@nexton-test/icons';
import {
  CardModule,
  RadioGroupModule,
  ButtonModule,
} from '@nexton-test/ui/components';

@Component({
  selector: 'app-wizard-home',
  imports: [
    CardModule,
    RadioGroupModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './wizard-home.component.html',
  styleUrl: './wizard-home.component.scss',
})
export class WizardHomeComponent implements OnInit {
  schemaService = inject(SchemaService);

  // ===========================
  // Public fields
  // ===========================
  options: { label: string; value: string; icon?: IconName }[] = [];

  // ===========================
  // Outputs
  // ===========================
  @Output() onSchemaSelected = new EventEmitter<Schema>();

  schemaInput = new FormControl();

  ngOnInit(): void {
    this.schemaService.getSchemas().subscribe((schemas) => {
      this.options =
        schemas?.map((schema: Schema) => ({
          label: schema.title,
          value: schema.id,
          icon: schema.icon as IconName,
        })) || [];
    });
  }

  // // ===========================
  // // Public methods
  // // ===========================
  // onSelectSchema(): void {
  //   const currentSchemaId = this.schemaInput.value;
  //   const currentSchema = this.schemas?.find(
  //     (schema) => schema.id === currentSchemaId
  //   );
  //   if (this.schemaInput.value) {
  //     this.onSchemaSelected.emit(currentSchema);
  //   }
  // }
}
