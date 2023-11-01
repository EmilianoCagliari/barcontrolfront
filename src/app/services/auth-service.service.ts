import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { env } from 'src/environments/environment';

interface UserLogin {
  email: string,
  password: string
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  
  constructor(
    private http: HttpClient
  ) { }



  login( userData: UserLogin  ): Observable<any>  {

    return from(this.http.post(`${env.apiUrl}/auth/login`, userData));


    // console.log("usuario:", userData.email);
    // console.log("password:", userData.password);
    

    //  this.http.post(`${query}/auth`, )
  }



}