import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StaffProfileComponent } from '../staff-profile/staff-profile.component';
import Swal from 'sweetalert2';
import * as XLXS from 'xlsx';

export interface requestAction {
  status: string;
  email: string;
  comment?: string | null
}

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.css'
})
export class StaffDashboardComponent implements OnInit {

  user_role: string | null | undefined;

  displayedColumns: string[] = ['student_number', 'fullname', 'program', 'type', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router){}

  ngOnInit(): void {
    this.user_role = localStorage.getItem('role');
    this.getClearanceRequest();
  }

  getClearanceRequest() {
    this.api.getRequestsStaff()
    .subscribe({
        next: (results) => {
          this.dataSource = new MatTableDataSource(results.clearance);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        },
        error: (err) => {
          alert('Failed to retrieve data!!');
        }
      })
  }

  filteredClearanceRequest(program: string) {
    this.api.getRequestsStaff()
    .subscribe({
        next: (results) => {      
          let filteredResults = results.clearance.filter((clearance: { program: string; }) => clearance.program === program)
          this.dataSource = new MatTableDataSource(filteredResults);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        },
        error: (err) => {
          alert('Failed to retrieve data!!');
        }
      })
  }

  approveRequest(id: number, email: string){

    const data: requestAction = {
      status: 'approved',
      email: email
    };

    Swal.fire({
      title: 'Approve request',
      text: 'Are you sure you want to approve the selected request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.approveRequest(data, id).
      subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire('Success', 'Request approved', 'success');
      },
      error: () => {
        Swal.fire('Error', 'Error', 'error');
      }
      }) 
      } else {
        Swal.fire('Cancelled', 'Cancelled', 'info');
      }
    });
  }

  rejectRequest(id: number, email: string){
    Swal.fire({
      title: 'Reject request',
      text: 'Are you sure you want to reject the selected request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
      
          const { value: text } = await Swal.fire({
            input: "text",
            inputLabel: "Comment",
            inputPlaceholder: "Type your comment...",
            inputAttributes: {
              "aria-label": "Type your comment here"
            },
            showCancelButton: true
          });
          if (text) {
            //Swal.fire(text);
            const data: requestAction = {
              status: 'rejected',
              email: email,
              comment: text
            };

            this.api.approveRequest(data, id).
            subscribe({
            next: (res) => {
              console.log(res);
              Swal.fire('Success', 'Request rejected', 'success');
            },
            error: () => {
              Swal.fire('Error', 'Error', 'error');
            }
            })
          }
      } else {
        Swal.fire('Cancelled', 'Cancelled', 'info');
      }
    });

    /*const confirmReject = confirm('Reject student request?');

    if (confirmReject) {
      this.api.approveRequest(data, id).
    subscribe({
      next: (res) => {
        console.log(res)
        alert('Request rejected!!');
      },
      error: () => {
        alert('Error!!!');
      }
    })
    }*/
  }

  openProfileDialog() {
    const dialogRef = this.dialog.open(StaffProfileComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getApprovedStudents(){
    this.api.getApprovedStudents()
    .subscribe({
        next: (results) => {
          console.log(results.Students);
          
          const ws = XLXS.utils.json_to_sheet(results.Students);
          const wb = XLXS.utils.book_new();
          XLXS.utils.book_append_sheet(wb, ws, 'Approved Students');

          XLXS.writeFile(wb, 'Approved Students.xlsx');
        },
        error: (err) => {
          console.log(err);
          alert('Failed to retrieve data!!');
        }
      })
  }

  getApprovedStudentsByType(){
    this.api.getApprovedStudentsByType()
    .subscribe({
        next: (results) => {
          console.log(results.Students);
          //this.dataSource = new MatTableDataSource(results.staff);
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort; 
        },
        error: (err) => {
          console.log(err);
          alert('Failed to retrieve data!!');
        }
      })
  }

  logout(){
    localStorage.removeItem('staff_token');
    this.router.navigate(['staff_login']);    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
