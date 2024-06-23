import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

export type LocalStorageTypeMap = {
  auth: string;
};

export type LocalStorageLocationBasedTypeMap = {};

const PREFIX = 'openBanking_';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private location: Location) {}

  public set<K extends keyof LocalStorageTypeMap>(
    key: K,
    value: LocalStorageTypeMap[K]
  ): void {
    const keyName = this.keyName(key);
    localStorage.setItem(keyName, JSON.stringify(value));
  }

  public setForCurrentLocation<
    K extends keyof LocalStorageLocationBasedTypeMap
  >(key: K, value: LocalStorageLocationBasedTypeMap[K]) {
    const compositeKey = this.getLocationBasedKey(key);
    this.set(compositeKey as any, value);
  }

  public setForSession<K extends keyof LocalStorageTypeMap>(
    key: K,
    value: LocalStorageTypeMap[K]
  ): void {
    const keyName = this.keyName(key);
    sessionStorage.setItem(keyName, JSON.stringify(value));
  }

  public get<K extends keyof LocalStorageTypeMap>(
    key: K
  ): LocalStorageTypeMap[K] | null {
    const keyName = this.keyName(key);
    const item =
      sessionStorage.getItem(keyName) || localStorage.getItem(keyName);
    let result: any;
    try {
      result = JSON.parse(item || 'null');
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(
        `Could not parse the localStorage value for "${key}" (${item})`
      );
    }
    return result;
  }

  public getForCurrentLocation<
    K extends keyof LocalStorageLocationBasedTypeMap
  >(key: K): LocalStorageLocationBasedTypeMap[K] {
    const compositeKey = this.getLocationBasedKey(key);
    return this.get(compositeKey as any);
  }

  public remove(key: keyof LocalStorageTypeMap): void {
    const keyName = this.keyName(key);
    sessionStorage.removeItem(keyName);
    localStorage.removeItem(keyName);
  }

  private getLocationBasedKey(key: string) {
    const path = this.location.path();
    return key + path;
  }

  private keyName(key: keyof LocalStorageTypeMap): string {
    return `${PREFIX}_${key}`;
  }
}
