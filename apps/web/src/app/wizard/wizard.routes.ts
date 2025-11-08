import { Routes } from '@angular/router';
import { WizardComponent } from './wizard.component';
import { WizardPagesComponent } from './wizard-pages/wizard-pages.component';
import { WizardHomeComponent } from './wizard-home/wizard-home.component';

/**
 * Route configuration for the Wizard feature.
 *
 * Structure:
 * - '' (root): Loads WizardComponent as the main container.
 *   - '' (child): Loads WizardHomeComponent (wizard home page).
 *   - 'new-request/:requestType': Loads WizardPagesComponent for a specific request type.
 */
export const WIZARD_ROUTES: Routes = [
  {
    path: '',
    component: WizardComponent,
    children: [
      {
        path: '',
        component: WizardHomeComponent,
      },
      {
        path: 'new-request/:requestType',
        component: WizardPagesComponent,
      },
    ],
  },
];
