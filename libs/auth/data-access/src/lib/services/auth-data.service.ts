import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { LoginResponseType } from '@ui/auth/util';
import { APP_CONFIGURATION_TOKEN } from '@ui/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  private http = inject(HttpClient);
  private environment = inject(APP_CONFIGURATION_TOKEN);

  login(
    loginId: string,
    password: string,
    applicationId = this.environment.applicationId
  ) {
    return this.http.post<LoginResponseType>('/api/auth/public/login', {
      loginId,
      password,
      applicationId,
      noJWT: false,
    });
  }
}
