import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product/product';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.css'
})
export class ProductReportComponent implements OnInit  {

  @Input() product!: Product;


  ngOnInit(): void {
    console.log(this.product);    
  }

}
