import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, filter, switchMap, take } from 'rxjs';

import {
  LocalStorageService,
  SecurityDataService,
  SecurityStateService,
} from '@ui/shared/data-access';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const securityDataService = inject(SecurityDataService);
  const securityStateService = inject(SecurityStateService);
  const router = inject(Router);
  let isRefreshing = false;
  let authReq = req;
  const refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  const addTokenHeader = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    }); // Adjust the header key and prefix according to your backend requirements
  };

  const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject.next(null);

      return securityDataService.refreshAccessToken().pipe(
        switchMap(({ token, refreshToken, refreshTokenId }) => {
          isRefreshing = false;
          localStorageService.set(
            'auth',
            JSON.stringify({ token, refreshToken, refreshTokenId })
          );
          refreshTokenSubject.next(token);
          return next(addTokenHeader(request, token));
        }),
        catchError((err) => {
          isRefreshing = false;
          localStorageService.remove('auth');
          securityStateService.setState('signedIn', false);
          securityStateService.setState('me', undefined);
          router.navigate(['/', 'auth', 'login']);
          throw new Error(err);
        })
      );
    }

    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(addTokenHeader(request, token)))
    );
  };

  const authToken = localStorageService.get('auth');
  if (authToken) {
    const authTokenParsed = JSON.parse(authToken);
    authReq = addTokenHeader(req, authTokenParsed.token);
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/auth')
      ) {
        return handle401Error(req, next);
      }
      throw new Error(error);
    })
  );
};
