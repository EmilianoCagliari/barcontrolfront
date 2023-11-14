import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { WeightRegisterService } from 'src/app/services/weight-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit {


  isEmpty: boolean = false;

  scanActive: boolean;

  scannedData: string = "";

  Toast = Swal.mixin({
    toast: true,
    position: 'top',
    iconColor: 'white',
    background: '#7C7AEC',
    color: '#fff',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,


  })

  //Search Input value
  @ViewChild('barcode') barcode: ElementRef | undefined;
  constructor(
    private readonly productService: ProductService,
    private readonly wrService: WeightRegisterService
  ) {

    this.scanActive = this.wrService.getScannerActive();

  }



  ngOnInit(): void {

    //Estado de activo el componente Scanner
    this.wrService.scannerActive$.subscribe( (active) =>{
      this.scanActive = active
    })

    //Estado del dato cargado del scanner
    this.wrService.scannedBarcode$.subscribe(
      (data) => this.scannedData = data
    );
  }



  isActive() {
    console.log("isActive:", !this.scanActive);
    this.wrService.setScannerActive(!this.scanActive);
  }

  onSubmit() {

    let bcData: string = this.barcode?.nativeElement.value;

    if (bcData.length == 0) {
      this.isEmpty = true;
    } else {

      console.log('Valor Barcode:', bcData);

      this.productService.getProductByBarcode(bcData)
        .subscribe({
          next: (data: Product) => {
            console.log(data == null);
            if (data != null) {
              this.productService.setRegisterProduct(data);
              this.Toast.fire({
                icon: 'success',
                title: 'Producto econtrado!'
              })
              this.wrService.setScannerActive(false);
              this.wrService.setScannedBarcode("");


            } else {
              this.Toast.fire({
                background: '#D30E0E',
                icon: 'warning',
                title: 'Producto no econtrado!'
              })

              this.wrService.setScannedBarcode("");
            }


          },
          error: (err) => {
            throw new Error(err);
          }
        });


    }





  }
}
