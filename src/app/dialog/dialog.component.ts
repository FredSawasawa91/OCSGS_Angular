import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  constructor(private api: ApiService){}

  addRequests(){
    this.api.createRequests().
    subscribe({
      next:(res)=>{
        alert(res.message);
      },
      error:(e)=>{
        console.log(e);
        alert('The request you are trying to create already exists.');
      }
    })
  }

}
