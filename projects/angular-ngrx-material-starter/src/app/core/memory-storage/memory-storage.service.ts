import { Injectable } from '@angular/core';

const APP_PREFIX = 'ANMS-';

@Injectable({
  providedIn: 'root'
})
export class MemoryStorageService {
  private static readonly map: Map<string, string> = new Map<string, string>();

  public static loadInitialState(): any {
    return {};
  }

  public setItem(key: string, value: any): void {
    MemoryStorageService.map.set(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  public getItem(key: string): any | undefined {
    const item: string | undefined = MemoryStorageService.map.get(
      `${APP_PREFIX}${key}`
    );
    if (item) {
      return JSON.parse(item);
    }

    return undefined;
  }

  public removeItem(key: string): void {
    MemoryStorageService.map.delete(`${APP_PREFIX}${key}`);
  }

  /** Tests that MemoryStorage exists, can be written to, and read from. */
  public testMemoryStorage(): void {
    const testValue = 'testValue';
    const testKey = 'testKey';
    const errorMessage = 'memoryStorage did not return expected value';

    this.setItem(testKey, testValue);
    const retrievedValue = this.getItem(testKey);
    this.removeItem(testKey);

    if (retrievedValue !== testValue) {
      throw new Error(errorMessage);
    }
  }
}
