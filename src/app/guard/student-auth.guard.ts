import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { StudentAuthServiceService } from '../service/student-auth-service.service';

@Injectable()
export class StudentAuthGuard implements CanActivate {
  constructor(private studentAuthService: StudentAuthServiceService,
    private router: Router){}

    canActivate(): boolean {
      if (this.studentAuthService.loggedIn()){
        return true
      } else {
        this.router.navigate(['student_login'])
        return false
      }
    }
}
/*export const studentAuthGuard: CanActivateFn = (route, state) => {
  return true;
};*/
