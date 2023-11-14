import { Pipe, PipeTransform } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { BrandInterface } from '../interfaces/brand.interface';

@Pipe({
  name: 'brandPipe'
})
export class BrandPipe implements PipeTransform {

  brandName: string = "";
  constructor(
    private readonly brandService: BrandService
  ){

  }


  transform(id: Number): string {

    console.log("Ingresando al transform del pipe", id);
    
    this.brandService.brands.forEach( (b) => {
       if(b.id == id) {
        this.brandName = b.name;
        console.log(b.name);
        
        return
       }
    })
    return this.brandName;
  }
  
}
