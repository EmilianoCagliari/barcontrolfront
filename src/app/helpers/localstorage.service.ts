import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }


  setItem( k:string, v:string): boolean {
    localStorage.setItem(k,v);
    
    
    return this.getItem(k);
  }

  getItem(k:string): boolean {
    
    return ( localStorage.getItem(k) != null );

  }

  deleteItem(): boolean {
    return true;
  }

  clearData() {
    localStorage.clear();
  }


}
