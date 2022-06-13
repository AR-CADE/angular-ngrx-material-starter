import { TestBed } from '@angular/core/testing';

import { MemoryStorageService } from './memory-storage.service';

describe('MemoryStorageService', () => {
  let service: MemoryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryStorageService]
    });
    service = TestBed.inject(MemoryStorageService);
  });

  afterEach(() => sessionStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testMemoryStorage should be executable', () => {
    spyOn(service, 'testMemoryStorage');
    service.testMemoryStorage();
    expect(service.testMemoryStorage).toHaveBeenCalled();
  });

  it('should get, set, and remove the item', () => {
    service.setItem('TEST', 'item');
    expect(service.getItem('TEST')).toEqual('item');
    service.removeItem('TEST');
    expect(service.getItem('TEST')).toEqual(undefined);
  });
});
