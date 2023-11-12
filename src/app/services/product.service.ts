import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url: string = `${env.apiUrl}/products`;



  private _registerProduct: Product | undefined;
  registerProduct$ = new Subject<Product | undefined>();;


  constructor(
    private http: HttpClient
  ) { }


  public getRegisterProduct(): Product | undefined {
    return this._registerProduct;
  }

  public setRegisterProduct( prod: Product | undefined): void {
    this._registerProduct = prod;
    this.registerProduct$.next(this._registerProduct);
  }





// API requests  

  getProductByBarcode(barcode: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const param = new HttpParams({
      fromString: `bc=${barcode}`
    })
    return this.http.get<ProductInterface>(`${this._url}/p`, { params: param, headers: headers })

  }


  getProducts() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ProductInterface[]>(this._url, { headers: headers });

  }




}
