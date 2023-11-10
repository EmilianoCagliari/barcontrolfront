import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  balanza: boolean;

  private valorMaximo = 10000;

  peso: number;
  // private randomValueSubscription!: Subscription;




  constructor(
    private webSocketService: WebsocketService
  ) {
    //Estado de la balanza
    this.balanza = this.webSocketService.getScaleConected();
    //Estado del peso
    this.peso = this.webSocketService.getScaleWeight();
  }



  ngOnInit() {

    //Al cargar el modulo verifica y esta constantemente atento a cambios en la conexion de la balanza.
    this.webSocketService.scaleConected$.subscribe((connected) => {
      this.balanza = connected;
    });

    this.webSocketService.scaleWeight$.subscribe((peso) => {
      // console.log("Peso registro:", peso.toFixed(2));      
      this.peso = peso;
    })

  }


  onSubmit() {
    let timerInterval: any;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()!.querySelector("b");
        timerInterval = setInterval(() => {
          timer!.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }



}
