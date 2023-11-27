import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

export interface Requests {
  completion_date?: string;
  createdAt: string;
  id: number;
  staff_comment?: string;
  status: string;
  studentId: number;
  student_id: number;
  type: string;
  updatedAt: string;
}

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  displayedColumns: string[] = ['type', 'status', 'staff_comment'];
  dataSource = new MatTableDataSource<Requests>([]);

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.getClearanceRequest();
  }

  getClearanceRequest() {
    this.api.getRequestsStudent()
      .subscribe({
        next: (results) => {
          this.dataSource.data = results.clearance;
        },
        error: (err) => {
          alert('Failed to retrieve data!!');
        }
      })
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(){
    localStorage.removeItem('student_token');
    this.router.navigate(['student_login']);    
  }
}
