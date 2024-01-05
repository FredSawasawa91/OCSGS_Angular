import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { StaffProfileComponent } from '../staff-profile/staff-profile.component';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../edit-user/edit-user.component';

/*export interface staffResponse {
  createdAt: string,
  email: string,
  fullname: string,
  id: number,
  password: string,
  role: string,
  updatedAt: string
}*/

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent implements OnInit {

  displayedColumns: string[] = ['fullname', 'email', 'role', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService, private router: Router){}

  ngOnInit(): void {
    this.getUsers();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%', // Set the width to 40%
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditUserProfileDialog(user_id: number) {
    const dialogRef = this.dialog.open(EditUserComponent, {data: {user_id: user_id}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openProfileDialog() {
    const dialogRef = this.dialog.open(StaffProfileComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  getUsers() {
    this.api.getUsers()
    .subscribe({
        next: (results) => {
          this.dataSource = new MatTableDataSource(results.staff);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        },
        error: (err) => {
          console.log(err);
          alert('Failed to retrieve users!!');
        }
      })
  }

  deleteUser(id: number){
    Swal.fire({
      title: 'Delete User',
      text: 'Are you sure you want to delete selected user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteUser(id)
          .subscribe({
          next: (res) => {
            Swal.fire('Success', `${res.message}`, 'success');
          },
          error: (e) => {
            Swal.fire('Error', 'User not deleted', 'error');
      }
    })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logout(){
    localStorage.removeItem('staff_token');
    this.router.navigate(['staff_login']);    
  }
}
