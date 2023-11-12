import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';
import { AnaliticasComponent } from './analiticas/analiticas.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentModule } from '../components/component.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { env } from 'src/environments/environment';
import { BrandPipe } from '../pipes/brand.pipe';
import { SearchProductComponent } from './registro/components/search-product/search-product.component';


const config: SocketIoConfig = { url: `${env.socketUrl}`, options: {} };


@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    RegistroComponent,
    AnaliticasComponent,
    AjustesComponent,
    SearchProductComponent,
    BrandPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ComponentModule,
    SocketIoModule.forRoot(config)
  ], 
  exports: [],
  providers: []
})
export class HomeModule { }
