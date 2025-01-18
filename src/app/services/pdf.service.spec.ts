import { TestBed } from '@angular/core/testing';

import { VacPdfService } from './pdf.service';

describe('VacPdfService', () => {
  let service: VacPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
