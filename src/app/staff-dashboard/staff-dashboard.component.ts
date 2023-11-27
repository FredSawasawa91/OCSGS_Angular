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

export interface requestAction {
  status: string;
  email: string
}

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.css'
})
export class StaffDashboardComponent implements OnInit {

  displayedColumns: string[] = ['student_number', 'fullname', 'program', 'type', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router){}

  ngOnInit(): void {
    this.getClearanceRequest();
  }

  getClearanceRequest() {
    this.api.getRequestsStaff()
    .subscribe({
        next: (results) => {
          //console.log(results);
          this.dataSource = new MatTableDataSource(results.clearance);
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

    console.log(id)
    this.api.approveRequest(data, id).
    subscribe({
      next: (res) => {
        console.log(res);
        alert('Request approved!!');
      },
      error: () => {
        alert('Error!!');
      }
    })
  }

  rejectRequest(id: number, email: string){
    
    console.log(id);
    const data: requestAction = {
      status: 'rejected',
      email: email
    };

    console.log(id)
    this.api.approveRequest(data, id).
    subscribe({
      next: (res) => {
        console.log(res)
        alert('Request rejected!!');
      },
      error: () => {
        alert('Error!!');
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
