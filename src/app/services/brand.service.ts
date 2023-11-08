import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../interfaces/brand.interface';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private _url: string = `${env.apiUrl}/brands`;
  private _brands: Brand[] = [];

  constructor(
    private http: HttpClient
  ) { }


  public get brands(): Brand[] {
    return this._brands;
  }




  getBrands() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Brand[]>(this._url, { headers: headers })
      .subscribe({
        next: (brands: Brand[]) => {
          this._brands = brands;
        }
      })


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
