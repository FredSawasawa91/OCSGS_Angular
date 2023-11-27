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

  getUsers() {
    const token = localStorage.getItem('staff_token');
    const headers = new HttpHeaders({ 'Authorization': `${token}` });
    const options = { headers: headers };

    return this.http.get<any>(`${baseUrl}/staff`, options)
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

}
