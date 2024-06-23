import { Route } from '@angular/router';

import { MainComponent } from './main.component';

export const mainRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@ui/shell/feature/layout').then((c) => c.LayoutComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/dashboard',
          },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('@ui/shell/feature/dashboard').then(
                (c) => c.DashboardComponent
              ),
          },
        ],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@ui/auth/feature/main').then((c) => c.mainRoutes),
      },
      {
        path: 'health',
        loadComponent: () =>
          import('@ui/shell/feature/health-check').then(
            (c) => c.HealthCheckComponent
          ),
      },
    ],
  },
];
