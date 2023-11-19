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
export class StaffAuthServiceService {

  constructor(private http:HttpClient) { }

  login(data: LoginData): Observable<any>{
    console.log("I am server")
    return this.http.post(`${baseUrl}/staff_login`, data);
  }

  /*logout(): void {
    localStorage.removeItem('staff_token');
    this.loggedIn = false;
  }*/

  loggedIn(){
    return !!localStorage.getItem('staff_token');
  }
}
