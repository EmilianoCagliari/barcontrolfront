import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/environments/environment';
import { WeightRegister } from '../interfaces/weight_register';

@Injectable({
  providedIn: 'root'
})
export class WeightRegisterService {

  constructor(
    private http: HttpClient
  ) { }



  registerWeight(regWeight: WeightRegister) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Convertir solo la propiedad 'weight' a cadena
    const regWeightJsonString = JSON.stringify({
      ...regWeight,
      weight: String(regWeight.weight) // Convertir 'weight' a cadena
    });



    return this.http.post(`${env.apiUrl}/weight-register`, regWeightJsonString, { headers: headers });
  }



}
