import { TestBed } from '@angular/core/testing';

import { StudentRegistrationServiceService } from './student-registration-service.service';

describe('StudentRegistrationServiceService', () => {
  let service: StudentRegistrationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentRegistrationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
