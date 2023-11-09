import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent {


  //Formulario de creacion
  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      type: ['', [Validators.required]],
      initialWeight: ['', [Validators.required]],
      barcode: ['', [Validators.required]],
    });

    console.log( this.route.snapshot.paramMap.get('item'));
  }


  async onSubmit() {

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



}
