import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product/product';
import { ProductInterface } from 'src/app/interfaces/product/product.interface';
import { ProductResponse } from 'src/app/interfaces/product/productResponse.interface';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

 
}
