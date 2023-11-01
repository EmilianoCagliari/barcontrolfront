import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { WebsocketService } from '../services/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  productBtn: boolean = false;
  currentUrl: string = "";

  scaleConected: boolean = false;


  Toast = Swal.mixin({
    toast: true,
    position: 'top',
    iconColor: 'white',
    background: '#2F2DA0',
    color: '#fff',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,


  })

  constructor(
    private readonly router: Router,
    private readonly localstorage: LocalstorageService,
    private readonly webSocketService: WebsocketService
  ) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url.replace('/home/', '');
      this.productBtn = this.router.url === '/home/productos'; // Cambia '/pagina1' por la ruta en la que quieras mostrar el botón.
    });
    this.webSocketService.socketConnect();

    this.webSocketService.scaleConected$.subscribe( async (valor) => {
      this.scaleConected = valor;

      (valor) ?
         await this.Toast.fire({
          icon: 'warning',
          title: 'Balanza conectada!'
        })
        :
        await this.Toast.fire({
          icon: 'warning',
          title: 'Balanza desconectada!'
        })
    });
  }


  Logout() {

    Swal.fire({
      title: 'Desea cerrar su sesión?',
      background: '#ECECFC',
      icon: 'question',
      iconColor: '#1B1A5B',
      confirmButtonText: 'Salir',
      confirmButtonColor: '#D30E0E',
      showDenyButton: true,
      denyButtonColor: '#2F2DA0',
      denyButtonText: `Cancelar`,
      color: '#1B1A5B',
      allowOutsideClick: false

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.webSocketService.exitSocketConn();
        this.localstorage.clearData();
        this.router.navigate(['#']);

      }
    })

  }


}
