import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth-service.service';
import { parentActiveGuardGuard } from './guards/parent-active-guard.guard';

/*  Declaracion de rutas  */
const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [parentActiveGuardGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule),
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
