import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  formGroup!: FormGroup;
  user_id: number;

  constructor(private api: ApiService, 
    private formBuilder: FormBuilder, 
    private matDialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.user_id = this.data.user_id;
    }


  ngOnInit(): void {
    this.initForm()
    this.fetchUserDetails()
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  editUser(){
    Swal.fire({
      title: 'Update User',
      text: 'Are you sure you want to update user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.formGroup.valid){
          this.api.editUser(this.formGroup.value, this.user_id)
          .subscribe({
            next: (res) => {
              Swal.fire('Success', 'User updated successfully', 'success');
            }, 
            error: (e) => {
              Swal.fire('Error', 'Error. User not updated', 'error');
            }
          })
        } else {
          Swal.fire('Error', 'Form data not valid', 'info');
        }
      }
    })
  }

  fetchUserDetails() {
    this.api.getUser(this.user_id)
      .subscribe({
        next: (userDetails) => {
          // Populate the form with the retrieved user details
          this.formGroup.controls['fullname'].setValue(userDetails.staff.fullname);
          this.formGroup.controls['email'].setValue(userDetails.staff.email);
          this.formGroup.controls['role'].setValue(userDetails.staff.role);
        },
        error: (err) => {
          console.error('Error fetching user details', err);
        }
      });
  }
}
