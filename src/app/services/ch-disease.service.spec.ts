import { TestBed } from '@angular/core/testing';

import { ChDiseaseService } from './ch-disease.service';

describe('ChDiseaseService', () => {
  let service: ChDiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChDiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
