import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLogin: boolean = false;
  // errorLogin: boolean = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    iconColor: 'white',
    background: '#D30E0E',
    color: '#fff',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  })


  //Formulario de login
  loginForm: FormGroup;

  isEmailNotValid: Boolean | undefined = false;
  isPasswordNotValid: Boolean | undefined = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localstorage: LocalstorageService

  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  async onSubmit() {


    //Redireccion sin nada de validación.
    // this.router.navigate(['home/inicio']);


    // console.log("onSubmit");
    // console.log(this.loginForm.get('email')?.valid);

    this.isEmailNotValid = !this.loginForm.get('email')?.valid;
    this.isPasswordNotValid = !this.loginForm.get('password')?.valid;

    //Una vez activada la alerta 3 segundos para desaparecer.
    setTimeout(() => {
      this.isEmailNotValid = false;
      this.isPasswordNotValid = false;
    }, 3000);

    if (this.loginForm.valid) {


      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      // console.log('loginForm', this.loginForm.value);

      this.authService.login(this.loginForm.value)
        .subscribe({
          next: response => {
            // Manejar la respuesta de la solicitud HTTP

            this.isLogin = true;
            console.log('Respuesta:', response);
            setTimeout(() => {
              this.isLogin = false;

              this.localstorage.setItem("token", response['access_token']);
              this.router.navigate(['home/inicio']);
            }, 2000);

          },
          error: async (err) => {

            await this.Toast.fire({
              icon: 'error',
              title: `${err.error.message}`
            })

          }
        });







      //   setTimeout(() => {
      //     this.errorLogin = false;
      //     // this.router.navigate(['home/inicio']);
      //   }, 2000);
      //   // Realizar la lógica de autenticación aquí, por ejemplo, enviar los datos al servidor
      //   // console.log('Correo electrónico:', email);
      //   // console.log('Contraseña:', password);
      // }
    }
  }


}
