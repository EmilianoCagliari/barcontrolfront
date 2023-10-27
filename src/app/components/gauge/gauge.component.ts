import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent {

  @Input() valorIndicador: number = 1;

  private valorMaximo = 10000;
  private anguloMaximo = 90;


  calcularAnguloRotacion(): string {

    //Calculo para tener el angulo del indicador entre -90deg y 90deg
    const angulo = ((this.valorIndicador - this.valorMaximo / 2) / (this.valorMaximo / 2)) * this.anguloMaximo;
    console.log("Angulo:", angulo);
    return `rotate(${angulo}deg)`;
  }

}
