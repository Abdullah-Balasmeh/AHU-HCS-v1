import { TestBed } from '@angular/core/testing';

import { DiabtetesRecordService } from './diabtetes-record.service';

describe('DiabtetesRecordService', () => {
  let service: DiabtetesRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiabtetesRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
