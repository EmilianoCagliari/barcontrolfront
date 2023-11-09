import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url: string = `${env.apiUrl}/products`;




  constructor(
    private http: HttpClient
  ) { }


  getProducts() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ProductInterface[]>(this._url, { headers: headers });

  }




}
