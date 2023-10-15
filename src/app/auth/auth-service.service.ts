import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  query: string = "http://localhost:3000/auth";
  
  // constructor(private http: HttpClient) { }



  // login( ) {
  //   // this.http.post(`${query}/auth`, )
  // }



}