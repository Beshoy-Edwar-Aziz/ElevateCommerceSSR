import { TestBed } from '@angular/core/testing';

import { FlowbiteService } from './flowbite';

describe('Flowbite', () => {
  let service: FlowbiteService;
  describe('FlowBite', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(FlowbiteService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
