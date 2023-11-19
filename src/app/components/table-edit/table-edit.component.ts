import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product/product';
import { ProductInterface } from 'src/app/interfaces/product/product.interface';
import { ProductResponse } from 'src/app/interfaces/product/productResponse.interface';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrl: './table-edit.component.css'
})
export class TableEditComponent {

  // TODO: Transformar la operatoria de la tabla actua de productos a dinamico acorde a lo solicitado.

  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  private _Products: Product[] = [];
  private _ProductCount: number = 0;

  private _idxRegistro: number;

  private valorOriginal: any;

  public pages: any[] = [];


  private _currentPage: number;


  rowEdit: number | null = null;
  loading: boolean = true;


  constructor(
    private cdr: ChangeDetectorRef,
    private readonly productService: ProductService,
    private readonly brandService: BrandService,
    private readonly router: Router
  ) {
    this._currentPage = 1; // Inicia en la página 1
    this._idxRegistro = 0; // Inicia en el índice 0

    this.screenWidth = window.innerWidth;

    if (this.brandService.getBrandsArr.length == 0) {
      this.brandService.getBrands().subscribe({
        next: (brands) => {
          this.brandService.setbrands(brands);
        }
      })
    }

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

  public currentPage(): number {
    return this._currentPage;
  }

  public get products(): Product[] {
    return this._Products;
  }


  public get productCount(): number {
    return this._ProductCount;
  }


  public changePage(page: number) {
    this._currentPage = page;
    this._idxRegistro = (page - 1) * 10; // Ajusta el índice de registro en consecuencia
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
    this.valorOriginal = { ...this.products[idx] }; // Guarda una copia del valor original
  }

  saveRow(data: Product) {

    console.log("SAVE ROW - Data:", typeof data);


    this.rowEdit = null; // Desactivar la edición


    if (!this.isEqualObject(data, this.valorOriginal)) {

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
          this.loading = true;
          //Objeto a enviar removiendo propiedades opcionales.
          const prodUpdate: Product = {
            name: data.name,
            price: data.price.toString(),
            quantity: data.quantity,
            brand_id: data.brand_id,
            type: data.type,
            initialWeight: data.initialWeight.toString(),
            barcode: data.barcode,
          };
          console.log(prodUpdate);

          const id: number = data.id ?? 0;
          this.productService.updateProduct(id, prodUpdate).subscribe({
            next: (resp: any) => {

              this.loading = false;

              Swal.fire({
                title: 'Registro Actualizado!',
                background: '#ECECFC',
                icon: 'success',
                iconColor: '#37C234',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#37C234',
                color: '#1B1A5B',

              }).then(resp => {
                if (resp.isConfirmed) {
                  this.rowEdit = null;
                  this.cdr.detectChanges();
                }
              });

            },
            error: (err) => {
              this.loading = false;
              console.log(err);

              if (this.rowEdit !== null) {
                console.log("Cancel:", this.valorOriginal);

                this.products[this.rowEdit] = { ...this.valorOriginal }; // Restaura el valor original
                this.rowEdit = null;
                this.cdr.detectChanges(); // Actualiza la vista
              }

              Swal.fire({
                title: 'Error al guardar los registros.',
                html: err,
                background: '#ECECFC',
                icon: 'error',
                iconColor: '#D30E0E',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#37C234',
                color: '#1B1A5B',
              })
            }
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
          }).then(resp => {
            if (resp.isConfirmed) {
              if (this.rowEdit !== null) {
                console.log("Cancel:", this.valorOriginal);

                this.products[this.rowEdit] = { ...this.valorOriginal }; // Restaura el valor original
                this.rowEdit = null;
                this.cdr.detectChanges(); // Actualiza la vista
              }
            }
          });
        }
      })
    }





  }

  deleteRow(idx: number, id: number | undefined) {

    const delId: number = id ?? 0;


    Swal.fire({
      title: 'Esta seguro que quiere eliminar el registro?',
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
      if (result.isConfirmed) {
        this.productService.deleteProduct(delId).subscribe({
          next: (resp: any) => {

            Swal.fire({
              title: 'Registro Eliminado.',
              background: '#ECECFC',
              icon: 'success',
              iconColor: '#37C234',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#37C234',
              color: '#1B1A5B',

            }).then(resp => {
              if (resp.isConfirmed) {
                this.products.splice(idx, 1);
                this.cdr.detectChanges();
              }
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error al realizar la peticion',
              html: `${err}`,
              background: '#ECECFC',
              icon: 'error',
              iconColor: '#D30E0E',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#37C234',
              color: '#1B1A5B',
            })
          }
        })
      }
    });


  }


  // ===========================================================================================================================

  private isEqualObject(objeto1: any, objeto2: any): boolean {
    // Obtener las claves de ambos objetos
    const clavesObjeto1 = Object.keys(objeto1);
    const clavesObjeto2 = Object.keys(objeto2);

    // Verificar si las longitudes de las claves son iguales
    if (clavesObjeto1.length !== clavesObjeto2.length) {
      return false;
    }

    // Iterar sobre las claves y comparar los valores
    for (const clave of clavesObjeto1) {
      if (objeto1[clave] !== objeto2[clave]) {
        return false;
      }
    }

    // Si todas las comparaciones fueron exitosas, los objetos son iguales
    return true;
  }



}
