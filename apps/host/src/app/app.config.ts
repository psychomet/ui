import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import fa from '@angular/common/locales/fa';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { en_US, fa_IR, provideNzI18n } from 'ng-zorro-antd/i18n';

import { appRoutes } from './app.routes';

registerLocaleData(fa);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideNzI18n(fa_IR as typeof en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
