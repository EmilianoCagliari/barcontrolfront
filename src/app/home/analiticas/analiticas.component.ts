import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product/product';
import { ProductService } from 'src/app/services/product.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
@Component({
  selector: 'app-analiticas',
  templateUrl: './analiticas.component.html',
  styleUrls: ['./analiticas.component.css']
})
export class AnaliticasComponent {

  productos: Product[] = [];
  loading: boolean = false;
  prodReportSelected: boolean = false;
  prod!: Product;

  constructor(private readonly productService: ProductService) {
  }

  buscarProducto(termino: string) {

    if (termino.length >= 1) {
      // console.log("termino:", termino);
      this.loading = true;

      this.productService.getProductByName(termino)
        .subscribe({
          next: (prod: any) => {
            this.loading = false;
            this.productos = prod.rows;
            console.log(prod.rows);
            
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
      this.productos = [];
      
    }




  }


  productSelected( prod: Product) {
    this.prodReportSelected = !this.prodReportSelected;
    this.prod = prod;    
  }

}
