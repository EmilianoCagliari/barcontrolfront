import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product/product.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Product } from '../interfaces/product/product';
import { ProductResponse } from '../interfaces/product/productResponse.interface';

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
    return this.http.get<Product>(`${this._url}/p`, { params: param, headers: headers })

  }

  getProductByName( name: string ) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const param = new HttpParams({
      fromString: `name=${name}`
    })
    return this.http.get<Product>(`${this._url}/name`, { params: param, headers: headers })

  }


  getProductsWithPagination( pagination: number ) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log("PAGINACION:", pagination);
    
    const params = new HttpParams({
      fromString: `p=${pagination}`
    })

    return this.http.get<ProductResponse>(this._url, {params: params,  headers: headers });

  }

  createProduct( p: Product) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      return this.http.post(`${env.apiUrl}/products`, p ,{ headers: headers } );
  }

  updateProduct( id:number, p: Product ) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch(`${env.apiUrl}/products/${id}`, p ,{ headers: headers } );
  }

  deleteProduct(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${env.apiUrl}/products/${id}`,{ headers: headers } );

  }


}
