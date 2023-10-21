import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }


  LocalSetItem( k:string, v:string): boolean {
    localStorage.setItem(k,v);
    
    
    return this.LocalGetItem(k);
  }

  LocalGetItem(k:string): boolean {
    
    return ( localStorage.getItem(k) != null );

  }

  LocalDeleteItem(): boolean {
    return true;
  }

  LocalClearData() {
    localStorage.clear();
  }


}
