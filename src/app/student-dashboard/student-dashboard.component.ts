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
import { mca_logo } from '../../assets/img';

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

  student_name: string | null | undefined;

  displayedColumns: string[] = ['type', 'status', 'staff_comment'];
  dataSource = new MatTableDataSource<Requests>([]);

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.student_name = localStorage.getItem('student_name');
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
          const clearances = res.clearance;
          console.log(clearances);

        // Check if clearances array is not empty
        if (clearances && clearances.length > 0) {
          const firstStudentFullName = clearances[0].student_fullname;
          const firstStudentNumber = clearances[0].student_number;
          const firstStudentProgram = clearances[0].program;
          const year_joined = clearances[0].year_joined;

          //clearances.forEach((clearance: { status: any; }, index: number) => {
            //console.log(`Student ${index + 1} Full Name: ${clearance.status}`);

            let dd = {
              content: [
                {
                  image: mca_logo,
                  width: 200,
                  height: 200,
                  alignment: 'center' as Alignment, // Align the image to the center
                  margin: [0, 0, 0, 0] as Margins // Add margin to create space between the image and other content
                },
                { text: 'CLEARANCE FORM FOR YEAR FOUR STUDENTS', style: 'h1', margin: [0, 40, 0, 0] as Margins, alignment: 'center' as Alignment},
                { text: 'This is a mandatory form for all year four students before graduation. Please ensure you get cleared for you to be part of the graduation ceremony coming up.', margin: [0, 40, 0, 40] as Margins},
                {
                  table: {
                    layout: 'lightHorizontalLines', // Add horizontal lines
                    widths: ['*', '*', '*', '*'], // Set column widths
                    heights: [20, 20, 20, 20, 20, 20, 20, 20, 20], // Set row heights
                    alignment: 'center' as Alignment,
                    body: [
                      [
                        { text: 'Students Name:', bold: true, alignment: 'left' as Alignment },
                        { text: `${firstStudentFullName}`, colSpan: 2 },
                        {}
                      ],
                      [
                        { text: 'Students Number:', bold: true, alignment: 'left' as Alignment },
                        { text: `${firstStudentNumber}`, colSpan: 2 },
                        {}
                      ],
                      [
                        { text: 'Programme of Study:', bold: true, alignment: 'left' as Alignment },
                        { text: `${firstStudentProgram}`, colSpan: 2 },
                        {}
                      ],
                      [
                        { text: 'Year Joined:', bold: true, alignment: 'left' as Alignment },
                        { text: `${year_joined}`, colSpan: 2 },
                        {}
                      ],
                      [
                        { text: '', bold: true },
                        { text: `STAFF`, bold: true, alignment: 'left' as Alignment},
                        { text: `STATUS`, bold: true, alignment: 'left' as Alignment},
                        { text: `COMMENT`, alignment: 'left' as Alignment },
                      ],
                      [
                        { text: 'Library', bold: true, alignment: 'left' as Alignment },
                        { text: `${clearances[0].staff_fullname}`, alignment: 'left' as Alignment},
                        { text: `${clearances[0].status}`, alignment: 'left' as Alignment},
                        { text: '(Comment)', alignment: 'left' as Alignment },
                      ],
                      [
                        { text: 'Admissions', bold: true, alignment: 'left' as Alignment },
                        { text: `${clearances[2].staff_fullname}`, alignment: 'left' as Alignment},
                        { text: `${clearances[2].status}`, alignment: 'left' as Alignment},
                        { text: '(Comment)', alignment: 'left' as Alignment },
                      ],
                      [
                        { text: 'Research Coordinator', bold: true, alignment: 'left' as Alignment },
                        { text: `${clearances[3].staff_fullname}`, alignment: 'left' as Alignment},
                        { text: `${clearances[3].status}`, alignment: 'left' as Alignment},
                        { text: '(Comment)', alignment: 'left' as Alignment },
                      ],
                      [
                        { text: 'Accounts', bold: true, alignment: 'left' as Alignment },
                        { text: `${clearances[1].staff_fullname}`, alignment: 'left' as Alignment },
                        { text: `${clearances[1].status}`, alignment: 'left' as Alignment },
                        { text: '(Comment)', alignment: 'left' as Alignment  },
                      ],
                      [{}, 
                       {}, 
                       {}, 
                       { text: 'Campus Director', alignment: 'right' as Alignment }
                      ]
                    ]
                  },
                  style: 'table'
                }
              ],
              styles: {
                h1: {
                  fontSize: 22,
                  bold: true
                },
                table: {
                  alignment: 'center' as Alignment,
                  margin: [0, 20, 0, 0] as Margins,
                  //widths: [ '*', 'auto', 100, '*' ]
                }
              }
            };
        
            pdfMake.createPdf(dd).open();

          //});
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
    localStorage.removeItem('student_name');
    this.router.navigate(['']);    
  }
  
}
