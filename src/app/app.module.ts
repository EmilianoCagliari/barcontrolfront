import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ComponentModule } from './components/component.module';
import { HomeComponent } from './home/home.component';
import { IconsModule } from './components/icons/icons.module';
import { HomeModule } from './home/home.module';
import { LocalstorageService } from './services/localstorage.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    ReactiveFormsModule,
    IconsModule,
    HomeModule
  ],
  providers: [
    LocalstorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
