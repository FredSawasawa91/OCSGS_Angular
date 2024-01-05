import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

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
    if(this.formGroup.valid){
      this.api.editUser(this.formGroup.value, this.user_id)
      .subscribe({
        next: (result) => {
          alert(result.message);
          this.formGroup.reset();
          this.matDialogRef.close();
        },
        error: (err) => {
          alert('Error updating user details')
        }
      })
    }
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
