import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CarouselComponent } from './carousel/carousel.component';



@NgModule({
  declarations: [
    ButtonComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    CarouselComponent

  ]
})
export class ComponentModule { }
