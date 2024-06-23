import { registerLocaleData } from '@angular/common';
import fa from '@angular/common/locales/fa';
import { ApplicationConfig } from '@angular/core';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { shellProviders } from '@ui/shell/feature/main';

import { environment } from '../environments/environment';

registerLocaleData(fa);

export const appConfig: ApplicationConfig = {
  providers: shellProviders(environment),
};
