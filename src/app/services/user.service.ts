import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/environments/environment';
import { UserInterface } from '../interfaces/user/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public email: string = "";

  constructor(
    private http: HttpClient
  ) { }


  createUser( user: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      return this.http.post(`${env.apiUrl}/users`, user ,{ headers: headers } );
  }


  getUsers() {
    return this.http.get(`${env.apiUrl}/users`);
  }

  getUserByMail(email: string) {

    let queryParam: string = `?email=${email}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserInterface>(`${env.apiUrl}/users` + queryParam, { headers: headers });

  }
}
