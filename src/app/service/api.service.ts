import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRequestsStudent(){

    const token = localStorage.getItem('student_token');
    const header = new HttpHeaders({ 'Authorization': `${token}` });
    const options = {
       headers: header,
    };

    return this.http.get<any>(`${baseUrl}/clearance/student`, options)
  }

  getRequestsStaff() {
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.get<any>(`${baseUrl}/clearance/staff`, options)
  }

  addUser(data: any): Observable<any>{
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };
    
    return this.http.post(`${baseUrl}/staff`, data, options);
  }

  editUser(data: any, id: number): Observable<any>{
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };
    
    return this.http.patch(`${baseUrl}/staff/`+id, data, options);
  }

  getUsers() {
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.get<any>(`${baseUrl}/staff`, options)
  }

  getUser(id: number) {
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.get<any>(`${baseUrl}/staff/staff/`+id, options)
  }

  deleteUser(id: number){
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.delete<any>(`${baseUrl}/staff/`+id, options)
  }

  createRequests(){
    const token = localStorage.getItem('student_token');
    const header = new HttpHeaders({ 'Authorization': `${token}` });
    const options = {
       headers: header,
    };

    return this.http.post<any>(`${baseUrl}/clearance`, '', options)
  }

  approveRequest(data: any, id: number){
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.put<any>(`${baseUrl}/clearance/staff/`+id, data, options)
  }

  rejectRequest(data: any, id: number){
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.put<any>(`${baseUrl}/clearance/staff/`+id, data, options)
  }

  getStudentProfileDetails(){

    const token = localStorage.getItem('student_token');
    const header = new HttpHeaders({ 'Authorization': `${token}` });
    const options = {
       headers: header,
    };

    return this.http.get<any>(`${baseUrl}/student`, options)
  }

  getStaffProfileDetails(){

    const token = localStorage.getItem('staff_token');
    const header = new HttpHeaders({ 'Authorization': `${token}` });
    const options = {
       headers: header,
    };

    return this.http.get<any>(`${baseUrl}/staff/staff/byid`, options)
  }

  getClearanceDetails(){

    const token = localStorage.getItem('student_token');
    const header = new HttpHeaders({ 'Authorization': `${token}` });
    const options = {
       headers: header,
    };

    return this.http.get<any>(`${baseUrl}/clearance/student/requests`, options)
  }

  getApprovedStudents(){
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.get<any>(`${baseUrl}/student/cleared_students`, options)
  }

  getApprovedStudentsByType(){
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.get<any>(`${baseUrl}/student/cleared_students_by_type`, options)
  }

  updateStudent(data: any){
    const token = localStorage.getItem('student_token');
    const header = new HttpHeaders({ 'Authorization': `${token}` });
    const options = {
       headers: header,
    };

    return this.http.put(`${baseUrl}/student`, data, options);
  }

  updateStaff(data: any){
    const token = localStorage.getItem('staff_token');
    const header = new HttpHeaders({ 'Authorization': `${token}` });
    const options = {
       headers: header,
    };

    return this.http.patch(`${baseUrl}/staff`, data, options);
  }

}
