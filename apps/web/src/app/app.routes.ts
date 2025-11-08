import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'wizard',
    loadChildren: () =>
      import('./wizard/wizard.routes').then((m) => m.WIZARD_ROUTES),
  },
  {
    path: 'design-system',
    loadChildren: () =>
      import('./design-system/design-system.router').then(
        (m) => m.DESIGN_SYSTEM_ROUTES
      ),
  },
];
