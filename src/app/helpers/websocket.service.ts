import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }


  private _scaleConected: boolean = false;
  scaleConected$ = new Subject<boolean>();


  public getScaleConected(): boolean {
    return this._scaleConected;
  }

  public setScaleConected( status: boolean ): void {
    this._scaleConected = status;
    this.scaleConected$.next(this._scaleConected);
  }


}
