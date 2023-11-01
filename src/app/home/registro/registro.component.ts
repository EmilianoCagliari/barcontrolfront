import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  balanza: boolean;

  private valorMaximo = 10000;

  public peso: number = 0;
  private randomValueSubscription!: Subscription;




  constructor(
    private webSocketService: WebsocketService,
    
  ) {
    this.balanza = this.webSocketService.getScaleConected();
  }

  




  ngOnInit() {
    // Simular cambios aleatorios en el valor del indicador cada segundo
    this.randomValueSubscription = interval(1000).subscribe(() => {
      // Generar un valor aleatorio dentro del rango (0 a 10000 gramos)
      //  this.peso = Math.floor(Math.random() * (this.valorMaximo + 1));
      if (this.peso == this.valorMaximo) {
        this.peso = 0;
      } else {
        this.peso = this.peso + 1000;
      }

    });

    this.webSocketService.scaleConected$.subscribe((valor) => {
      this.balanza = valor;
    });


  }

  ngOnDestroy() {
    // Asegúrate de desuscribirte del Observable al destruir el componente
    if (this.randomValueSubscription) {
      this.randomValueSubscription.unsubscribe();
    }
  }


}
