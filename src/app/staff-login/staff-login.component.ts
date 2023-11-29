import { Component, OnInit } from '@angular/core';
import { StaffAuthServiceService } from '../service/staff-auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrl: './staff-login.component.css'
})
export class StaffLoginComponent implements OnInit {

  formGroup!: FormGroup;
  
  constructor(private staffAuthService: StaffAuthServiceService,
              private router: Router){}
  
  ngOnInit() {
    this.initForm()
  }
  
  initForm(){
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  staffLogin(){
    if(this.formGroup.valid){
      this.staffAuthService.login(this.formGroup.value).subscribe({
        next: (res) => {
          console.log(res.token);
          localStorage.setItem('staff_token', res.token);

          if(res.role == 'admin'){
            this.router.navigate(['admin_dashboard']);
            alert(res.message);
          } else {
            this.router.navigate(['staff_dashboard']);
            alert(res.message);
          }
        },
        error: (e) => {
          alert('Invalid email or password');
        }
      })
    }
  }

}
