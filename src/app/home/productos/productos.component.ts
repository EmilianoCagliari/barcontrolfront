import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  private _Products: ProductInterface[] = [];

  
  public get products() : ProductInterface[] {
    return this._Products;
  }
  

  rowEdit: Number | null = null;
  loading: boolean = true;


  constructor(
    private readonly productService: ProductService,
    private readonly brandService: BrandService,
    private readonly router: Router
  ) {
    this.brandService.getBrands();

  }



  ngOnInit(): void {


    this.productService.getProducts()
    .subscribe({
      next: (products: ProductInterface[]) => {
        this._Products = products;
        console.log(this._Products);
        
      },
      error: (err) => {
        this.router.navigate(['/asdadas']);
        throw new Error(err);
      },
      complete: () => {
        this.loading = false;
      }

    })


  }

  editRow(idx: number) {
    this.rowEdit = idx;
  }

  saveRow(idx: number) {

    this.rowEdit = null; // Desactivar la edición

    Swal.fire({
      title: 'Quiere guardar los cambios?',
      background: '#ECECFC',
      icon: 'info',
      iconColor: '#1B1A5B',
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#37C234',
      showDenyButton: true,
      denyButtonColor: '#2F2DA0',
      denyButtonText: `Cancelar`,
      color: '#1B1A5B',
      allowOutsideClick: false

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Datos Guardados!', '', 'success')
        Swal.fire({
          title: 'Datos Guardados!',
          background: '#ECECFC',
          icon: 'success',
          iconColor: '#37C234',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#37C234',
          color: '#1B1A5B',

        });

      } else if (result.isDenied) {
        console.log("Denegado");

        Swal.fire({
          title: 'Datos no guardados.',
          background: '#ECECFC',
          icon: 'error',
          iconColor: '#D30E0E',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#37C234',
          color: '#1B1A5B',

        });
      }
    })

  }


}
