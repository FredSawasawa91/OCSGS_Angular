import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentAuthServiceService } from '../service/student-auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent implements OnInit {
  
  formGroup!: FormGroup;
  
  constructor(private studentAuthService: StudentAuthServiceService,
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

  studentLogin(){
    if(this.formGroup.valid){
      this.studentAuthService.login(this.formGroup.value).subscribe({
        next: (res) => {
          localStorage.setItem('student_token', res.token);
          localStorage.setItem('student_name', res.student_name);  
          this.router.navigate(['student_dashboard'])
          alert(res.message);
        },
        error: (e) => {
          alert('Invalid email or password');
        }
        
      })
    }
  }
}
