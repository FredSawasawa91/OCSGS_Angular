import { CanActivate, Router } from '@angular/router';
import { StaffAuthServiceService } from '../service/staff-auth-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private staffAuthService: StaffAuthServiceService,
    private router: Router){}

    canActivate(): boolean {
      if (this.staffAuthService.loggedIn()){
        return true
      } else {
        this.router.navigate(['staff_login'])
        return false
      }
    }
}



//export const staffAuthGuard: CanActivateFn = (route, state) => {
  
//  return true;
//};
