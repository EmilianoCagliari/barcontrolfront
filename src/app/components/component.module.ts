import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HeaderComponent } from './header/header.component';
import { IconsModule } from './icons/icons.module';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';



@NgModule({
  declarations: [
    ButtonComponent,
    CarouselComponent,
    HeaderComponent,
    LoaderComponent,
    AlertComponent,
    NotFoundComponent,
    WorkInProgressComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    ButtonComponent,
    CarouselComponent,
    HeaderComponent,
    LoaderComponent,
    AlertComponent,
    IconsModule,
    NotFoundComponent,
    WorkInProgressComponent

  ]
})
export class ComponentModule { }
