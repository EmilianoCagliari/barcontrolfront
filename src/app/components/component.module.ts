import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HeaderComponent } from './header/header.component';
import { IconsModule } from './icons/icons.module';



@NgModule({
  declarations: [
    ButtonComponent,
    CarouselComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    ButtonComponent,
    CarouselComponent,
    HeaderComponent

  ]
})
export class ComponentModule { }
