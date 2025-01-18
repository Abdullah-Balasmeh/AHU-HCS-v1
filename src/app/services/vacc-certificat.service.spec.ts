import { TestBed } from '@angular/core/testing';

import { VaccCertificatService } from './vacc-certificat.service';

describe('VaccCertificatService', () => {
  let service: VaccCertificatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccCertificatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
