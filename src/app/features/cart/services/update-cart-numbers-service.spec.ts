import { TestBed } from '@angular/core/testing';

import { UpdateCartNumbersService } from './update-cart-numbers-service';

describe('UpdateCartNumbersService', () => {
  let service: UpdateCartNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCartNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
