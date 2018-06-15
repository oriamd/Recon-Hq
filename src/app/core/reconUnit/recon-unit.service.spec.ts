import { TestBed, inject } from '@angular/core/testing';

import { ReconUnitService } from './recon-unit.service';

describe('ReconUnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReconUnitService]
    });
  });

  it('should be created', inject([ReconUnitService], (service: ReconUnitService) => {
    expect(service).toBeTruthy();
  }));
});
