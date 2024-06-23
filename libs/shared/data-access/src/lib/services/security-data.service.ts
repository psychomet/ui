import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  JWTRefreshResponse,
  RefreshRequest,
} from '@fusionauth/typescript-client';

@Injectable({
  providedIn: 'root',
})
export class SecurityDataService {
  constructor(private httpClient: HttpClient) {}

  getUserInfo() {
    return this.httpClient.get(`.`);
  }

  logout() {
    return this.httpClient.post(`.`, {});
  }

  refreshAccessToken(request?: RefreshRequest) {
    return this.httpClient.post<JWTRefreshResponse>(
      `/api/auth/refresh`,
      request
    );
  }
}
