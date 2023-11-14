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
import { WarningComponent } from './warning/warning.component';
import { GaugeComponent } from './gauge/gauge.component';
import { OptionCardComponent } from './option-card/option-card.component';
import { FormCreateComponent } from './form-create/form-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScannerComponent } from './scanner/scanner.component';
import { NgxScannerQrcodeModule, LOAD_WASM  } from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));


@NgModule({
  declarations: [
    ButtonComponent,
    CarouselComponent,
    HeaderComponent,
    LoaderComponent,
    AlertComponent,
    NotFoundComponent,
    WorkInProgressComponent,
    WarningComponent,
    GaugeComponent,
    OptionCardComponent,
    FormCreateComponent,
    ScannerComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    ReactiveFormsModule,
    NgxScannerQrcodeModule
  ],
  exports: [
    ButtonComponent,
    CarouselComponent,
    HeaderComponent,
    LoaderComponent,
    AlertComponent,
    IconsModule,
    NotFoundComponent,
    WorkInProgressComponent,
    WarningComponent,
    GaugeComponent,
    OptionCardComponent,
    FormCreateComponent,
    ScannerComponent
  ]
})
export class ComponentModule { }
