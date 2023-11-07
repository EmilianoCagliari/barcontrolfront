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

  private _isLoggedIn: boolean = false;
  
  constructor(
    private http: HttpClient
  ) { }


  isLoggedIn() {
    return this._isLoggedIn;
  }

  login( userData: UserLogin  ): Observable<any>  {

    let data: Observable<any> = from(this.http.post(`${env.apiUrl}/auth/login`, userData));

    if(data != null) {
      this._isLoggedIn = true;
    }
    return data;



    // console.log("usuario:", userData.email);
    // console.log("password:", userData.password);
    

    //  this.http.post(`${query}/auth`, )
  }



}