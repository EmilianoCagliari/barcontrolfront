import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { env } from 'src/environments/environment';

import { HomeRoutingModule } from './home-routing.module';
import { ComponentModule } from '../components/component.module';

import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';
import { AnaliticasComponent } from './analiticas/analiticas.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { SearchProductComponent } from './registro/components/search-product/search-product.component';
import { ScannerComponent } from './registro/components/scanner/scanner.component';

import { NgxScannerQrcodeModule, LOAD_WASM  } from 'ngx-scanner-qrcode';
import { BrandPipe } from '../pipes/brand.pipe';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));
const config: SocketIoConfig = { url: `${env.socketUrl}`, options: {} };


@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    RegistroComponent,
    AnaliticasComponent,
    AjustesComponent,
    SearchProductComponent,
    ScannerComponent,
    BrandPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ComponentModule,
    NgxScannerQrcodeModule,
    SocketIoModule.forRoot(config)
  ], 
  exports: [],
  providers: []
})
export class HomeModule { }
