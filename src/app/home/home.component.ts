import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { LocalstorageService } from '../helpers/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productBtn: boolean = false;

  constructor(
    private readonly router:Router,
    private readonly localstorage: LocalstorageService
  ){
    this.router.events.subscribe(() => {
      this.productBtn = this.router.url === '/home/productos'; // Cambia '/pagina1' por la ruta en la que quieras mostrar el botón.
    });
  }
 

  Logout(){

    this.localstorage.LocalClearData();
    this.router.navigate(['#']);
  }

}
