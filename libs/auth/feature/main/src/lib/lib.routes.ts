import { Route } from '@angular/router';

export const mainRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('@ui/auth/feature/login').then((c) => c.LoginComponent),
  },
];
