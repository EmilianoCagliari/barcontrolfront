import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/environments/environment';
import { WeightRegister } from '../interfaces/weight_register';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeightRegisterService {

  private _scannedBarcode: string = "";
  scannedBarcode$ = new Subject<string>();

  private _scannerActive: boolean = false;
  scannerActive$ = new Subject<boolean>();


  constructor(
    private http: HttpClient
  ) { }



  public getScannerActive(): boolean {
    return this._scannerActive;
  }

  public setScannerActive(value: boolean): void {
    this._scannerActive = value;
    this.scannerActive$.next(this._scannerActive);
  }

  public getScannedBarcode(): string {
    return this._scannedBarcode;
  }

  public setScannedBarcode(value: string ): void {
    this._scannedBarcode = value;
    this.scannedBarcode$.next(this._scannedBarcode);
  }





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
