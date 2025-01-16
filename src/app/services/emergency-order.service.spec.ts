import { TestBed } from '@angular/core/testing';

import { EmergencyOrderService } from './emergency-order.service';

describe('EmergencyOrderService', () => {
  let service: EmergencyOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
