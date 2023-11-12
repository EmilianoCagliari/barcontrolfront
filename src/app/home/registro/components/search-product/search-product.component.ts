import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {


  isEmpty: boolean = false;

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
    private readonly productService: ProductService
  ) { }





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
            } else {
              this.Toast.fire({
                background: '#D30E0E',
                icon: 'warning',
                title: 'Producto no econtrado!'
              })
            }
  
  
          },
          error: (err) => {
            throw new Error(err);
          }
        });

    }


    


  }
}
