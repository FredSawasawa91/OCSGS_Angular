import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {

  formGroup!: FormGroup;
  
  constructor(private api: ApiService, private formBuilder: FormBuilder){}

  ngOnInit() {
    this.getStudentProfileDetails()
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

  getStudentProfileDetails(){
    this.api.getStudentProfileDetails()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.formGroup.controls['fullname'].setValue(res.student.fullname);
        this.formGroup.controls['student_number'].setValue(res.student.student_number);
        this.formGroup.controls['email'].setValue(res.student.email);
        this.formGroup.controls['program'].setValue(res.student.program);
      },
      error: (e) => {
        alert('Failed to retrieve profile details');
      }
    })
  }

  updateStudent(){
    Swal.fire({
      title: 'Update profile',
      text: 'Are you sure you want to update your profile?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.formGroup.valid){
          this.api.updateStudent(this.formGroup.value)
          .subscribe({
            next: (res) => {
              Swal.fire('Success', 'Profile updated successfully', 'success');
            }, 
            error: (e) => {
              Swal.fire('Error', 'Error. Profile not updated', 'error');
            }
          })
        } else {
          Swal.fire('Error', 'Form data not valid', 'info');
        }
      }
    })  
  }
}
