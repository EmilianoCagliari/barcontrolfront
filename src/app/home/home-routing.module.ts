import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';
import { AnaliticasComponent } from './analiticas/analiticas.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { parentActiveGuardGuard } from '../guards/parent-active-guard.guard';
import { AuthComponent } from '../auth/auth.component';
import { FormCreateComponent } from '../components/form-create/form-create.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [parentActiveGuardGuard]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [parentActiveGuardGuard]
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [parentActiveGuardGuard]
  },
  {
    path: 'analiticas',
    component: AnaliticasComponent,
    canActivate: [parentActiveGuardGuard]
  },
  {
    path: 'ajustes',
    component: AjustesComponent,
    canActivate: [parentActiveGuardGuard]
  },
  {
    path: 'create/:item',
    component: FormCreateComponent,
    canActivate: [parentActiveGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
