import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {



  //Formulario de login
  loginForm: FormGroup;

  isEmailNotValid: Boolean | undefined = false;
  isPasswordNotValid: Boolean | undefined = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onSubmit() {

    console.log("onSubmit");
    console.log(this.loginForm.get('email')?.valid);
    
    this.isEmailNotValid = !this.loginForm.get('email')?.valid;
    this.isPasswordNotValid = !this.loginForm.get('password')?.valid;


    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.router.navigate(['home']);
      // Realizar la lógica de autenticación aquí, por ejemplo, enviar los datos al servidor
      console.log('Correo electrónico:', email);
      console.log('Contraseña:', password);
    }
  }
}
