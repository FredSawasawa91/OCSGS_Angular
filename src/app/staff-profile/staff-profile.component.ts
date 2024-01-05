import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.css'
})
export class StaffProfileComponent implements OnInit {

  formGroup!: FormGroup;
  
  constructor(private api: ApiService, private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<StaffProfileComponent>){}

  ngOnInit(): void {
    this.getStaffProfileDetails()
    this.initForm()
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl({value: '', disabled: true}, [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  getStaffProfileDetails(){
    this.api.getStaffProfileDetails()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.formGroup.controls['fullname'].setValue(res.staff.fullname);
        this.formGroup.controls['email'].setValue(res.staff.email);
        this.formGroup.controls['role'].setValue(res.staff.role);
      },
      error: (e) => {
        alert('Failed to retrieve profile details');
      }
    })
  }

  updateUser(){
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
          this.api.updateStaff(this.formGroup.value)
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
