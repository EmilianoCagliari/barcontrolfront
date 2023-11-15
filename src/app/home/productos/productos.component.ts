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


  private _idxRegistro: number = 10;
  
  private _Products: Product[] = [];
  private _ProductCount: number = 0;
  
  
  public pages: any[] = [];


  private _currentPage: number;
  currentPage$ = new Subject<number>();;

  
  public getCurentPage(): number {
    return this._currentPage;
  }

  public setCurrentPage( idx: number ): void {
    this._currentPage = idx;
    this.currentPage$.next(this._currentPage);
  }




  public currentPage() {
    return Math.floor(this._idxRegistro / 10);
  }
  
  public get products() : Product[] {
    return this._Products;
  }

  
  public get productCount() : number {
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
    this._currentPage = this.currentPage();
  }



  ngOnInit(): void {

    this.currentPage$.subscribe( (valor) => {
      this.setCurrentPage(valor);
    })

    this.productService.getProducts()
    .subscribe({
      next: (products: ProductResponse) => {
        this._Products = products.rows;
        this._ProductCount = products.count;
        this.pages = new Array( (products.count % this._idxRegistro) );
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

  prevPage(){

  }

  nextPage() {
    this.loading = true;
    const offset: number = this._idxRegistro + (  (this.currentPage() != 1) ? 10 : 0 );
    console.log('nextPage:', this._idxRegistro);
    this.productService.getProducts( offset ).subscribe({
      next: (p: ProductResponse) => {
        this._Products = p.rows;
        this._ProductCount = p.count;
        this.pages = new Array( (p.count % this._idxRegistro) );
        this.loading = false;
        this.setCurrentPage( this.currentPage() );
      },
      error: (err) => {
        throw new Error(err);
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
