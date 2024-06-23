import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { catchError, of, switchMap, tap } from 'rxjs';

import {
  SecurityDataService,
  SecurityStateService,
} from '@ui/shared/data-access';

export const authGuard = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const securityStateService = inject(SecurityStateService);
  const securityDataService = inject(SecurityDataService);

  const handleUserInfo = (userInfo: object) => {
    securityStateService.setState('me', userInfo);
    securityStateService.setState('signedIn', true);
  };
  // return of(true);
  return securityStateService
    .select((state) => state.signedIn)
    .pipe(
      switchMap((signedIn) => {
        if (signedIn) return of(true);
        else
          return securityDataService.getUserInfo().pipe(
            tap((userInfo) => handleUserInfo(userInfo)),
            catchError(() =>
              router.navigate(['/', 'auth', 'login'], {
                queryParams: {
                  redirectUrl: state.url,
                },
              })
            )
          );
      })
    );
};
