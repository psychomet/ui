import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import fa from '@angular/common/locales/fa';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { en_US, fa_IR, provideNzI18n } from 'ng-zorro-antd/i18n';

import { APP_CONFIGURATION_TOKEN } from '@ui/shared/data-access';
import { AppConfigurationType } from '@ui/shared/util';

import { apiInterceptor } from './api.interceptor';
import { authInterceptor } from './auth.interceptor';
import { mainRoutes } from './lib.routes';

registerLocaleData(fa);

const shellProviders = (env: AppConfigurationType) => [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(mainRoutes, withComponentInputBinding()),
  provideNzI18n(fa_IR as typeof en_US),
  provideAnimationsAsync(),
  provideHttpClient(withInterceptors([apiInterceptor, authInterceptor])),
  provideAppConfig(env),
];

function provideAppConfig(env: AppConfigurationType) {
  return { provide: APP_CONFIGURATION_TOKEN, useValue: env };
}

export { shellProviders };
