import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public email: string = "";

  constructor(
    private http: HttpClient
  ) { }


  getUsers() {
    return this.http.get(`${env.apiUrl}/auth/users`);
  }

  getUserByMail(email: string) {

    let queryParam: string = `?email=${email}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User[]>(`${env.apiUrl}/users` + queryParam, { headers: headers });

  }
}
