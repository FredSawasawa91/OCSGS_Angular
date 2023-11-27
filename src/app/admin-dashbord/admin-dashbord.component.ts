import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';

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
  
  getUsers() {
    this.api.getUsers()
    .subscribe({
        next: (results) => {
          console.log(results);
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
    console.log(id);
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
