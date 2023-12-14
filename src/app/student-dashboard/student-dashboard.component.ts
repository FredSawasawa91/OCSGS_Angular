import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { StudentProfileComponent } from '../student-profile/student-profile.component';
import { Alignment, Margins } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  getClearanceDetails(){
    this.api.getClearanceDetails()
      .subscribe({
        next: (res) => {
          console.log(res.clearance);
          const clearances = res.clearance;

        // Check if clearances array is not empty
        if (clearances && clearances.length > 0) {
          const firstStudentFullName = clearances[0].student_fullname;
          const firstStudentNumber = clearances[0].student_number;
          const firstStudentProgram = clearances[0].program;

          clearances.forEach((clearance: { status: any; }, index: number) => {
            console.log(`Student ${index + 1} Full Name: ${clearance.status}`);

            let dd = {
              content: [
                {
                  text: 'FINAL YEAR CLEARANCE REQUEST REPORT',
                  style: 'header',
                  alignment: 'center' as Alignment
                },
                {
                  text: `Student Name: ${firstStudentFullName}`,
                  style: 'subheader'
                },
                {
                  text: `Student Number: ${firstStudentNumber}`,
                  style: 'subheader'
                },
                {
                  text: `Program: ${firstStudentProgram}`,
                  style: 'subheader'
                },
                {
                  table: {
                    headerRows: 1,
                    widths: [ '*', '*', '*' ],
                    //headers: ['Type', 'Status', 'Student Fullname'],
                    heights: [20],
                    body:
                      [[{text:'TYPE', style: 'tableHeader'}, {text: 'STATUS', style: 'tableHeader'}, {text: 'APPROVED/REJECTED BY', style: 'tableHeader'}]].concat(
                        clearances.map((item: { type: any; status: any; staff_fullname: any; }) => [
                        this.capitalizeFirstLetter(item.type),
                        this.capitalizeFirstLetter(item.status),
                        item.staff_fullname
                      ])) 
                  },
                  style: 'table'
                }
              ],
              styles: {
                header: {
                  fontSize: 18,
                  bold: true,
                  alignment: 'justify' as Alignment,
                  margin: [0, 0, 0, 20] as Margins
                },
                subheader: {
                  fontSize: 14,
                  bold: true,
                  alignment: 'left' as Alignment,
                  margin: [0, 10, 0, 0] as Margins
                },
                table: {
                  margin: [0, 20, 0, 0] as Margins,
                  widths: [ '*', 'auto', 100, '*' ]
                },
                tableHeader: {
                  bold: true,
                  fontSize: 13,
                  color: 'black'
                }
              }
            };
        
            pdfMake.createPdf(dd).open();


          });
        } else {
          console.log('No clearance data available.');
        }

        },
        error: (e) => {
          alert('Failed to retrieve data');
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

  openProfileDialog() {
    const dialogRef = this.dialog.open(StudentProfileComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(){
    localStorage.removeItem('student_token');
    this.router.navigate(['']);    
  }
  
}
