import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentRegistrationServiceService } from '../service/student-registration-service.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css'
})
export class StudentRegisterComponent implements OnInit {
  public program!: string;
  options: string[] = ['BAAIS', 'BBME', 'BMIS', 'BMPR', 'BBFSM']

  formGroup!: FormGroup;
  
  constructor(private studentRegistrationService: StudentRegistrationServiceService, private formBuilder: FormBuilder){}

  ngOnInit() {
    this.initForm()
  }
  
  initForm(){
    this.formGroup = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      student_number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      program: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  studentRegister(){
    if(this.formGroup.valid){
      this.studentRegistrationService.registerStudent(this.formGroup.value).subscribe(result=>{
        //console.log(result);
        if(result.success){
          console.log(result);
          alert(result.message);
        } else if (!result.success) {
          alert('Registration failed');
        }
      })
    }
  }


}
