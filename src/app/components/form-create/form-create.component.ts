import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/interfaces/brand';
import { BrandInterface } from 'src/app/interfaces/brand.interface';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { WeightRegisterService } from 'src/app/services/weight-register.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {

  //Variables de cambios a español y tipo de input
  private _wordES = [
    {
      name: "nombre",
      inputType: "text",
    },
    {
      price: "precio",
      inputType: "number"
    },
    {
      quantity: "cantidad",
      inputType: "number"
    },
    {
      brand_id: "marca",
      inputType: "select",
    },
    {
      type: "tipo",
      inputType: "text"
    },
    {
      initialWeight: "peso inicial",
      inputType: "number"
    },
    {
      barcode: "codigo de barra",
      inputType: "number"
    },
    {
      distributor: "distribuidor",
      inputType: "text"
    },
    {
      surname: "apellido",
      inputType: "text"
    },
    {
      email: "correo",
      inputType: "email"
    },
    {
      password: "contraseña",
      inputType: "password"
    },
    {
      role: "rol",
      inputType: "select"
    },
    {
      isActive: "activo",
      inputType: "checkbox"
    },
  ]

  //Loader
  isLoading: boolean = false;
  //Formulario de creacion
  form!: FormGroup;
  //Objeto para acumular los campos
  formControls: any = {};

  //Routa de origen
  clase: string = "";
  claseProp: string[] = [];
  htmlNames: string[] = [];
  htmlType: string[] = [];
  htmlBtnTitleString: string = "";

  brands: any = [];

  //Dato escaneado si es el formulario crear producto
  scannedData: string = "";

  //bandera para el scanner
  scanActive:boolean;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly brandService: BrandService,
    private readonly wrService:WeightRegisterService
  ) {
    
    //Controlar y obtener la ruta para cambiar el titulo y boton del formulario
    this.router.events.subscribe(() => {
      let currentUrl = this.router.url.replace('/home/', '');

      switch (currentUrl) {
        case 'create/product':
          this.htmlBtnTitleString = "Crear Producto"
          break;
        case 'create/user':
          this.htmlBtnTitleString = "Crear Usuario"
          break;
        case 'create/brand':
          this.htmlBtnTitleString = "Crear Marca"
          break;
        case 'create/report':
          this.htmlBtnTitleString = "Crear Reporte"
          break;
      }
    });

    this.scanActive = this.wrService.getScannerActive();

  }



  isActive() {
    console.log("isActive:", !this.scanActive);
    this.wrService.setScannerActive(!this.scanActive);
    if(this.scannedData.length > 0 ) {
      this.scannedData = "";
    }
    
  }

  ngOnInit(): void {

    this.wrService.scannerActive$.subscribe( (active) =>{
      this.scanActive = active
    })

    //Obtener el dato escaneado
    this.wrService.scannedBarcode$.subscribe(
      (data) => {
        // console.log("ScannedData en Formulario:", data);
        this.scannedData = data  
        this.wrService.setScannerActive(!this.scanActive); 
      });



    //Modificacion de ruta a capitalize
    let ruta = this.route.snapshot.paramMap.get('item')!.toString();
    this.clase = ruta[0].toUpperCase() + ruta.slice(1);

    // console.log("CLASE:", this.clase);

    if (this.clase !== "Report") {
      
      //Llamar marcas si eligen crear una o relacionado a brand_id
      this.brandService.getBrands().subscribe({
        next: (brands: BrandInterface[]) => {
          // console.log(brands);
          this.brands = brands;
        }
      });

      // console.log("BRANDS:", this.brands)
      // Creacion de los campos a controlar FormBuilder.
      this.generateForm();
    }

  }


  //Funcion para generar el formulario dinamico
  generateForm() {


    //Verificar y en base al tipo de clase se genera el formulario.
    switch (this.clase) {

      case "Product":
        let prodClass = new Product();
        Object.keys(prodClass).forEach(
          (p, i) => {
            // console.log(p);
            // console.log("Obj Key:", p.valueOf());
            const idx = Object.keys(prodClass).indexOf(p);
            // console.log("userClass Value:", typeof Object.values(prodClass)[idx]);

            if (typeof Object.values(prodClass)[idx] === 'number') {
              this.formControls[p] = [`${Object.values(prodClass)[idx]}`, [Validators.required]];
            } else {
              this.formControls[p] = [`${Object.values(prodClass)[idx]}`, [Validators.required]];
            }



            this.claseProp.push(p);
          }
        );

        this.changeNameField(this.claseProp);
        this.form = this.formBuilder.group(this.formControls);

        break;

      case "Brand":

        let brandClass = new Brand();
        Object.keys(brandClass).forEach(
          (p, i) => {
            // console.log("Obj Key:", p.valueOf());
            this.formControls[p] = ['', [Validators.required]];

            this.claseProp.push(p);
          }
        );

        this.changeNameField(this.claseProp);
        this.form = this.formBuilder.group(this.formControls);

        break;

      case "User":

        let userClass = new User();
        Object.keys(userClass).forEach(
          (p, i) => {

            // console.log("Obj Key:", p.valueOf());
            // console.log("TypeOf Key", typeof Object.values(userClass)[i]);
            // console.log("userClass Prop:", p);
            const idx = Object.keys(userClass).indexOf(p);

            // console.log("userClass Value:", typeof Object.values(userClass)[idx]);

            if (typeof Object.values(userClass)[idx] === 'boolean') {
              this.formControls[p] = [Object.values(userClass)[idx], [Validators.required]];
            } else {
              this.formControls[p] = [`${Object.values(userClass)[idx]}`, [Validators.required]];
            }



            this.claseProp.push(p);
          }
        );

        this.changeNameField(this.claseProp);
        // console.log("formbuilder:", this.formControls);

        this.form = this.formBuilder.group(this.formControls);

        break;
      default:
        break;
    }

  }

  async onSubmit() {
    // this.isLoading = true;
    // Manejar la lógica cuando se envía el formulario
    // let rawData = this.form.getRawValue();
    // console.log("rawData:", rawData);
    let data = this.form.value;
    console.log("FormData:", data);
    
    switch (this.clase) {
      case "Product":

        //Creacion de objeto acorde al tipo.
        const prod = new Product(
        data.name,
        data.price,
        parseInt(data.quantity),
        parseInt(data.brand_id),
        data.type,
        data.initialWeight,
        data.barcode
        );


        this.productService.createProduct(prod)
          .subscribe({
            next: (response: any) => {
              console.log(response);
              this.isLoading = false;
              let status = response.status;
              let msg = "";
              if (status !== 200) {
                msg = response.message;
              }
              Swal.fire({
                title: (status === 200) ? 'Producto creado!' : 'Error al crear producto',
                html: `${msg}`,
                background: '#ECECFC',
                icon: (status === 200) ? 'success' : 'info',
                iconColor: (status === 200) ? '#37C234' : '#4441E5',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#37C234',
                color: '#1B1A5B',
              }).then( (result) => {
                if( (status === 200)  && result.isConfirmed){

                  this.form.reset();
                  this.form.get('brand_id')!.setValue('0');

                }
              });

            },
            error: (err) => {
              console.log("Error", err);


              this.isLoading = false;
              Swal.fire({
                title: `${err.statusText}`,
                html: `${err.error.msg}`,
                background: '#ECECFC',
                icon: 'error',
                iconColor: '#D30E0E',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#37C234',
                color: '#1B1A5B',
              });
            }
          })

        break;


      case "Brand":

        this.brandService.createBrand(data)
          .subscribe({
            next: (response: any) => {
              console.log(response);
              this.isLoading = false;
              let status = response.status;
              let msg = "";
              if (status !== 200) {
                msg = response.response.response.msg;
              }
              Swal.fire({
                title: (status === 200) ? 'Producto creado!' : 'Error al crear product',
                html: `${msg}`,
                background: '#ECECFC',
                icon: (status === 200) ? 'success' : 'info',
                iconColor: (status === 200) ? '#37C234' : '#4441E5',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#37C234',
                color: '#1B1A5B',
              });

            },
            error: (err) => {
              console.log("Error", err);


              this.isLoading = false;
              Swal.fire({
                title: `${err.error.error}`,
                html: `${err.error.message}`,
                background: '#ECECFC',
                icon: 'error',
                iconColor: '#D30E0E',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#37C234',
                color: '#1B1A5B',
              });
            }
          })

        break;


      case "User":

        this.userService.createUser(data)
          .subscribe({
            next: (response: any) => {
              console.log(response);
              this.isLoading = false;
              let status = response.status;
              let msg = "";
              if (status !== 200) {
                msg = response.response.response.msg;
              }
              Swal.fire({
                title: (status === 200) ? 'Usuario creado!' : 'Error al crear usuario',
                html: `${msg}`,
                background: '#ECECFC',
                icon: (status === 200) ? 'success' : 'info',
                iconColor: (status === 200) ? '#37C234' : '#4441E5',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#37C234',
                color: '#1B1A5B',
              });

            },
            error: (err) => {
              console.log("Error", err);


              this.isLoading = false;
              Swal.fire({
                title: `${err.error.error}`,
                html: `${err.error.message}`,
                background: '#ECECFC',
                icon: 'error',
                iconColor: '#D30E0E',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#37C234',
                color: '#1B1A5B',
              });
              // throw new Error(err);
            }
          })

        break;

      default:
        break;
    }



  }



  //funcion privada para cambiar el nombre de las tablas en ingles a español para los inputs html.
  private changeNameField(names: string[]) {

    //Array de nombres de propiedades de la clase
    names.forEach(
      (n) => {

        //Array que acumula la traduccion y el valor del inputType
        this._wordES.forEach((obj) => {

          //Si el objeto iterado tiene la propiedad del nombre de la clase entonces continua
          if (obj.hasOwnProperty(n)) {

            //Verificamos el indice del objeto a buscar que tenga el nombre de la propiedad de la clase.
            const idx = Object.keys(obj).indexOf(n);

            //Se agrega al array htmlNames el valor traducido
            this.htmlNames.push(Object.values(obj)[idx]);
            //Se agrega al array htmlType el inputType para generar el tipo de input en el html
            this.htmlType.push(obj.inputType);

          }

        })

      }
    )

  }

}
