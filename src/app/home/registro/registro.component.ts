import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

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

}
