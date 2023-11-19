import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environments/environments';

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
}
