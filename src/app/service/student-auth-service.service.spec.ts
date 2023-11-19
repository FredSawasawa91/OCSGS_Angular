import { TestBed } from '@angular/core/testing';

import { StudentAuthServiceService } from './student-auth-service.service';

describe('StudentAuthServiceService', () => {
  let service: StudentAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
