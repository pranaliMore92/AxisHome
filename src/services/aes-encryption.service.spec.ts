import { TestBed } from '@angular/core/testing';

import { AesEncryptionService } from './aes-encryption.service';

describe('AesEncryptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AesEncryptionService = TestBed.get(AesEncryptionService);
    expect(service).toBeTruthy();
  });
});
