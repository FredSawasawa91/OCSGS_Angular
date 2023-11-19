import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environments';

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentAuthServiceService {

  constructor(private http:HttpClient) { }

  login(data: LoginData): Observable<any>{
    console.log("I am server")
    return this.http.post(`${baseUrl}/student_login`, data);
  }

  loggedIn(){
    return !!localStorage.getItem('student_token');
  }
}
