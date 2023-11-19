import { TestBed } from '@angular/core/testing';

import { StaffAuthServiceService } from './staff-auth-service.service';

describe('StaffAuthServiceService', () => {
  let service: StaffAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
