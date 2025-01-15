import { TestBed } from '@angular/core/testing';

import { BPRecordService } from './bprecord.service';

describe('BPRecordService', () => {
  let service: BPRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BPRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
