import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {



  //Formulario de login
  loginForm: FormGroup;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      // Realizar la lógica de autenticación aquí, por ejemplo, enviar los datos al servidor
      console.log('Correo electrónico:', email);
      console.log('Contraseña:', password);
    }
  }
}
