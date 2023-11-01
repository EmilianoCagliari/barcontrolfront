import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';
import { AnaliticasComponent } from './analiticas/analiticas.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { AuthService } from '../auth/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentModule } from '../components/component.module';
import { DropdownProductsComponent } from './registro/components/dropdown-products/dropdown-products.component';



@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    RegistroComponent,
    AnaliticasComponent,
    AjustesComponent,
    DropdownProductsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ComponentModule
  ], 
  exports: [],
  providers: [
    AuthService
  ]
})
export class HomeModule { }
