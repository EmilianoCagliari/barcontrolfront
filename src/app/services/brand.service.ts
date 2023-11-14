import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandInterface } from '../interfaces/brand.interface';
import { env } from 'src/environments/environment';
import { Brand } from '../interfaces/brand';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private _url: string = `${env.apiUrl}/brands`;

  
  private _brands: Brand[] = [];
  brands$ = new Subject<Brand[]>();

  constructor(
    private http: HttpClient
  ) { }

  public getBrandsArr(): Brand[] {
    return this._brands;
  }

  public setbrands(value: Brand[]): void {
    this._brands = value;
    this.brands$.next(this._brands);
  }


  


  createBrand( brand: string ) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      return this.http.post(`${env.apiUrl}/brands`, brand ,{ headers: headers } );
  }



  getBrands() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Brand[]>(this._url, { headers: headers });

  }




  // getBrandName(id: Number): string {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });

  //   this.http.get<Brand>(this._url + `/${id}`, { headers: headers }).subscribe(
  //     b => {
  //       this._brandName = b.name;
  //     }
  //   );

  //   return this._brandName;
  // }
}
