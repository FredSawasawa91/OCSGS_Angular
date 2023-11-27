import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  formGroup!: FormGroup;
  
  constructor(private api: ApiService, private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<AddUserComponent>){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  addUser(){
    if(this.formGroup.valid){
      this.api.addUser(this.formGroup.value)
      .subscribe({
        next: (result) => {
          console.log(result);
          alert(result.message);
          this.formGroup.reset();
          this.matDialogRef.close();
        },
        error: (err) => {
          alert('Error adding user')
        }
      })
    }
  }
}
