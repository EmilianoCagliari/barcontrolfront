import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product/product';
import { ProductInterface } from 'src/app/interfaces/product/product.interface';
import { ProductResponse } from 'src/app/interfaces/product/productResponse.interface';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {



  private _Products: Product[] = [];
  private _ProductCount: number = 0;

  private _idxRegistro: number;


  public pages: any[] = [];


  private _currentPage: number;


  public currentPage(): number {
    return this._currentPage;
  }

  public get products(): Product[] {
    return this._Products;
  }


  public get productCount(): number {
    return this._ProductCount;
  }






  rowEdit: Number | null = null;
  loading: boolean = true;


  constructor(
    private readonly productService: ProductService,
    private readonly brandService: BrandService,
    private readonly router: Router
  ) {
    this.brandService.getBrands();
    this._currentPage = 1; // Inicia en la página 1
    this._idxRegistro = 0; // Inicia en el índice 0
  }


  public changePage(page: number) {
    this._currentPage = page;
    this._idxRegistro = (page - 1) * 10; // Ajusta el índice de registro en consecuencia
  }

  ngOnInit(): void {


    this.productService.getProducts()
      .subscribe({
        next: (p: ProductResponse) => {
          this._Products = p.rows;
          this._ProductCount = p.count;
          console.log(p.count);

          this.pages = new Array((Math.ceil(p.count / 10)));
          console.log(this.pages);

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

  prevPage() {
    this.loading = true;
    this.changePage(this._currentPage - 1);
    console.log('prevPage:', this._idxRegistro);
    this.productService.getProducts(this._idxRegistro).subscribe({
      next: (p: ProductResponse) => {
        this._Products = p.rows;
        this._ProductCount = p.count;
        this.pages = new Array((Math.ceil(p.count / 10)));
        this.loading = false;
      },
      error: (err) => {
        throw new Error(err);
      }
    });
  }

  nextPage() {
    this.loading = true;
    this.changePage(this._currentPage + 1);
    console.log('prevPage:', this._idxRegistro);
    this.productService.getProducts(this._idxRegistro).subscribe({
      next: (p: ProductResponse) => {
        this._Products = p.rows;
        this._ProductCount = p.count;
        this.pages = new Array((Math.ceil(p.count / 10)));
        this.loading = false;
      },
      error: (err) => {
        throw new Error(err);
      }
    });
  }

  editRow(idx: number) {
    this.rowEdit = idx;
  }

  saveRow(data: any) {

    console.log("SAVE ROW - Data:", data);
      
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
