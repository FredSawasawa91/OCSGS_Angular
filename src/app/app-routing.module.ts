import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { AuthGuard } from './guard/staff-auth.guard';
import { StudentAuthGuard } from './guard/student-auth.guard';

const routes: Routes = [
  {
    path:'', 
    component:StudentLoginComponent
  },
  {
    path:'student_login', 
    component:StudentLoginComponent
  },
  {
    path:'staff_login', 
    component:StaffLoginComponent
  },
  {
    path:'student_register', 
    component:StudentRegisterComponent
  },
  {
    path:'student_dashboard', 
    component:StudentDashboardComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path:'staff_dashboard', 
    component:StaffDashboardComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [StudentLoginComponent, StaffLoginComponent, StudentRegisterComponent]
