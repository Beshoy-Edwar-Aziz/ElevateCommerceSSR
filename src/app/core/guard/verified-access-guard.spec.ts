import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifiedAccessGuard } from './verified-access-guard';

describe('verifiedAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => verifiedAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
