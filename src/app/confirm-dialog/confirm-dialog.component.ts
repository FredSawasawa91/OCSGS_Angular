import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  constructor(private api: ApiService){}

  action(){
    this.api.createRequests().
    subscribe({
      next:(res)=>{
        alert('Successfully requested for clearance');
      },
      error:(e)=>{
        console.log(e);
        alert('Error requesting for clearance');
      }
    })
  }

}
