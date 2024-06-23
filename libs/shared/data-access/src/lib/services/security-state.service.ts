import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export const initialState: any = {
  me: undefined,
  signedIn: false,
};

@Injectable({
  providedIn: 'root',
})
export class SecurityStateService {
  private state: any = initialState;
  private readonly stateSubject = new BehaviorSubject<any>(
    initialState
  );

  constructor() {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'clientState', {
        get: () => this.stateSubject.value,
      });
    }
  }

  setState<T extends keyof any>(
    key: string,
    value: any[T]
  ) {
    this.state[key] = value;
    this.stateSubject.next(this.state);
  }

  select<R>(selector: (state: any) => R): Observable<R> {
    return this.stateSubject.pipe(map(selector), distinctUntilChanged());
  }
}
