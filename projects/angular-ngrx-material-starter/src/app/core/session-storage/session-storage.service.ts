import { Injectable } from '@angular/core';

const APP_PREFIX = 'ANMS-';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  public static loadInitialState(): any {
    return Object.keys(sessionStorage).reduce(
      (state: any, storageKey: string) => {
        if (storageKey.indexOf(APP_PREFIX) >= 0) {
          const stateKeys: Array<string> = storageKey
            .replace(APP_PREFIX, '')
            .toLowerCase()
            .split('.')
            .map((key: string) =>
              key
                .split('-')
                .map((token: string, index: number) =>
                  index === 0
                    ? token
                    : token.charAt(0).toUpperCase() + token.slice(1)
                )
                .join('')
            );
          let currentStateRef: any = state;
          stateKeys.forEach((key: string, index: number) => {
            if (index === stateKeys.length - 1) {
              const item: string | null = sessionStorage.getItem(storageKey);
              if (item) {
                currentStateRef[key] = JSON.parse(item);
              }

              return;
            }
            currentStateRef[key] = currentStateRef[key] || {};
            currentStateRef = currentStateRef[key];
          });
        }

        return state;
      },
      {}
    );
  }

  public setItem(key: string, value: any): void {
    sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  public getItem(key: string): any | undefined {
    const item: string | null = sessionStorage.getItem(`${APP_PREFIX}${key}`);
    if (item) {
      return JSON.parse(item);
    }

    return undefined;
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  /** Tests that sessionStorage exists, can be written to, and read from. */
  public testSessionStorage(): void {
    const testValue = 'testValue';
    const testKey = 'testKey';
    const errorMessage = 'sessionStorage did not return expected value';

    this.setItem(testKey, testValue);
    const retrievedValue = this.getItem(testKey);
    this.removeItem(testKey);

    if (retrievedValue !== testValue) {
      throw new Error(errorMessage);
    }
  }
}
