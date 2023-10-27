import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { LocalstorageService } from '../helpers/localstorage.service';
import { WebsocketService } from '../helpers/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productBtn: boolean = false;
  currentUrl: string = "";

  scaleConected: boolean;

  constructor(
    private readonly router: Router,
    private readonly localstorage: LocalstorageService,
    private webSocketService: WebsocketService
  ) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url.replace('/home/', '');
      this.productBtn = this.router.url === '/home/productos'; // Cambia '/pagina1' por la ruta en la que quieras mostrar el botón.
    });

    this.scaleConected = this.webSocketService.getScaleConected();
  }





  ngOnInit(): void {
    this.webSocketService.scaleConected$.subscribe((valor) => {
      this.scaleConected = valor;
    });
  }

  Logout() {

    this.localstorage.clearData();
    this.router.navigate(['#']);
  }

  scaleChangeStatus() {

    console.log("scaleChangeStatus");
    console.log("Scale Status:", this.scaleConected);

    this.webSocketService.setScaleConected(!this.webSocketService.getScaleConected())
  }
}
