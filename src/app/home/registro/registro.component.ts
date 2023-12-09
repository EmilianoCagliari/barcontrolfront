import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product/product';
import { WeightRegister } from 'src/app/interfaces/weight_register/weight_register';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { WeightRegisterService } from 'src/app/services/weight-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  balanza: boolean;

  peso: number;

  product: Product | undefined;

  scanBarcode: string | undefined;

  scanActive: boolean;

  constructor(
    private webSocketService: WebsocketService,
    private productService: ProductService,
    private regWeightService: WeightRegisterService,
    private brandService: BrandService
  ) {
    //Estado de la balanza
    this.balanza = this.webSocketService.getScaleConected();
    //Estado del peso
    this.peso = this.webSocketService.getScaleWeight();

    //Estado boton escanear
    this.scanActive = this.regWeightService.getScannerActive();

    if (this.brandService.getBrandsArr.length == 0) {
      this.brandService.getBrands().subscribe({
        next: (brands) => {
          this.brandService.setbrands(brands);
        }
      })
    }
  }



  ngOnInit() {




    this.productService.registerProduct$.subscribe((product) => {
      console.log("Product", product);
      this.product = product;
    });

    //Al cargar el modulo verifica y esta constantemente atento a cambios en la conexion de la balanza.
    this.webSocketService.scaleConected$.subscribe((connected) => {
      this.balanza = connected;
    });

    this.webSocketService.scaleWeight$.subscribe((peso) => {
      this.peso = peso;
    })

    this.regWeightService.scannerActive$.subscribe((active) => {
      this.scanActive = active;
    })

  }


  onCreate() {

    const prodId: number = this.product!.id!.valueOf();
    const regPeso = parseFloat(this.peso.toFixed(2));
    console.log("Product ID:", prodId);

    const newReg = new WeightRegister();

    newReg.weight = regPeso;
    newReg.product_id = prodId;

    console.log("Obj WeightReg:", newReg);


    this.regWeightService.registerWeight(newReg).subscribe({
      next: (resp) => {

        Swal.fire({
          title: 'Peso registrado!',
          background: '#ECECFC',
          icon: 'success',
          iconColor: '#37C234',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#37C234',
          color: '#1B1A5B',
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.productService.setRegisterProduct(undefined);
          }
        });

      },
      error: (err) => {

        Swal.fire({
          title: 'Hubo un error al registrar el peso.',
          background: '#ECECFC',
          icon: 'error',
          iconColor: '#D30E0E',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#37C234',
          color: '#1B1A5B',
        });
        throw new Error(err);
      }
    })



  }





}
