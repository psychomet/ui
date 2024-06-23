import { InjectionToken } from '@angular/core';

import { AppConfigurationType } from '@ui/shared/util';

export const APP_CONFIGURATION_TOKEN = new InjectionToken<AppConfigurationType>(
  'AppConfiguration'
);
