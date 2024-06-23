import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { APP_CONFIGURATION_TOKEN } from '@ui/shared/data-access';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const appConfiguration = inject(APP_CONFIGURATION_TOKEN);

  if (req.url.startsWith('/api')) {
    req = req.clone({
      url: appConfiguration.apiUrl + req.url.slice('/api'.length),
    });
  }

  req = req.clone({
    headers: req.headers.set('Accept', 'application/json'),
  });

  return next(req);
};
