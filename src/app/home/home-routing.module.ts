import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';
import { AnaliticasComponent } from './analiticas/analiticas.component';
import { AjustesComponent } from './ajustes/ajustes.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,    
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'analiticas',
    component: AnaliticasComponent
  },
  {
    path: 'ajustes',
    component: AjustesComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
