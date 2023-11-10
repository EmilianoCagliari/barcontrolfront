import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/interfaces/brand';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
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

  }



  ngOnInit(): void {

    //Modificacion de ruta a capitalize
    let ruta = this.route.snapshot.paramMap.get('item')!.toString();
    this.clase = ruta[0].toUpperCase() + ruta.slice(1);

    // console.log("CLASE:", this.clase);

    if(this.clase !== "Report"){

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
            // console.log("Obj Key:", p.valueOf());
            this.formControls[p] = ['', [Validators.required]];

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

        this.changeNameField( this.claseProp );
        this.form = this.formBuilder.group(this.formControls);

        break;

      case "User":

        let userClass = new User();
        Object.keys(userClass).forEach(
          (p, i) => {

            // console.log("Obj Key:", p.valueOf());
            // console.log("TypeOf Key", typeof Object.values(userClass)[i]);
            console.log("userClass Prop:", p);
            const idx = Object.keys(userClass).indexOf(p);

            console.log("userClass Value:", typeof Object.values(userClass)[idx] );

            if(typeof Object.values(userClass)[idx] === 'boolean'){
              this.formControls[p] = [ Object.values(userClass)[idx], [Validators.required]];
            } else {
              this.formControls[p] = [ `${Object.values(userClass)[idx]}`, [Validators.required]];
            }
            

            this.claseProp.push(p);
          }
        );

        this.changeNameField(this.claseProp);
        console.log("formbuilder:", this.formControls);
        
        this.form = this.formBuilder.group(this.formControls);

        break;
      default:
        break;
    }

  }

  async onSubmit() {

    // Manejar la lógica cuando se envía el formulario
    console.log(this.form.value);

    let timerInterval: any;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()!.querySelector("b");
        timerInterval = setInterval(() => {
          timer!.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });


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
