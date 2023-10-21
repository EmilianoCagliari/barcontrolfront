import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

interface UserLogin {
  email: string,
  password: string
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  
  url: string = "http://localhost:3000/auth";
  
  constructor(private http: HttpClient) { }



  login( userData: UserLogin  ): Observable<any>  {

    return from(this.http.post(`${this.url}/login`, userData));


    // console.log("usuario:", userData.email);
    // console.log("password:", userData.password);
    

    //  this.http.post(`${query}/auth`, )
  }



}