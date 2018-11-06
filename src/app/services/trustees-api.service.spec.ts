import { TestBed } from '@angular/core/testing';

import { TrusteesApiService } from './trustees-api.service';

describe('TrusteesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrusteesApiService = TestBed.get(TrusteesApiService);
    expect(service).toBeTruthy();
  });
});
