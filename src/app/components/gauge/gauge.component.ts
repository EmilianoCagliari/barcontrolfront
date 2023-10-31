import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent {


  private valorMaximo = 10000;
  private anguloMaximo = 90;

  anguloTransform: string;
  private _valorIndicador: number;


  constructor() {
    this.anguloTransform = `rotate(${-this.anguloMaximo}deg)`;
    this._valorIndicador = 1;
  }


  @Input()
  set valorIndicador(valor: number) {
    this._valorIndicador = valor;
    this.calcularAnguloRotacion();
  }


  calcularAnguloRotacion(): void {

    //Calculo para tener el angulo del indicador entre -90deg y 90deg
    const angulo = ((this._valorIndicador - this.valorMaximo / 2) / (this.valorMaximo / 2)) * this.anguloMaximo;
    console.log("Angulo:", angulo);
    this.anguloTransform = `rotate(${angulo}deg)`;
  }

}
