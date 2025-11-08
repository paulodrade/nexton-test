import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemaService } from '@nexton-test/core/services/schema.service';
import {
  CardModule,
  ButtonModule,
  MenuListModule,
} from '@nexton-test/ui/components';
import { Schema, Section } from '@nexton-test/core/interfaces';
import { FormGroup } from '@angular/forms';
import { WizardSectionComponent } from '../wizard-section/wizard-section.component';

@Component({
  selector: 'app-wizard-pages',
  standalone: true,
  imports: [CardModule, ButtonModule, MenuListModule, WizardSectionComponent],
  templateUrl: './wizard-pages.component.html',
  styleUrl: './wizard-pages.component.scss',
})
export class WizardPagesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private schemaService = inject(SchemaService);

  formGroup: FormGroup = new FormGroup({});

  schema?: Schema;
  sections: Section[] = [];

  activeSection: Section | null = null;
  requestType: string | null = null;

  ngOnInit(): void {
    this.requestType = this.route.snapshot.paramMap.get('requestType');
    if (this.requestType) {
      this.schemaService
        .getSchemaByType(this.requestType)
        .subscribe((schema) => {
          if (schema) {
            this.schema = schema;
            this.sections = this.schema.sections;
            this.activeSection = this.sections[0];
          }
        });
    }
  }

  scrollToSection(section: Section): void {
    this.activeSection = section;
    document
      .getElementById(section.id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  goToNextSection(i: number): void {
    const nextPage = this.sections[i + 1];
    if (nextPage) {
      this.activeSection = nextPage;
      document
        .getElementById(nextPage.id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goToPreviousSection(i: number): void {
    const prevPage = this.sections[i - 1];
    if (prevPage) {
      this.activeSection = prevPage;
      document
        .getElementById(prevPage.id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
