import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environments';

interface RegisterData {
  fullname: String;
  student_number: String;
  email: String;
  program: String;
  password: String;
}

@Injectable({
  providedIn: 'root'
})

export class StudentRegistrationServiceService {

  constructor(private http:HttpClient) { }

  registerStudent(data: RegisterData): Observable<any>{
    return this.http.post(`${baseUrl}/student`, data);
  }
}
