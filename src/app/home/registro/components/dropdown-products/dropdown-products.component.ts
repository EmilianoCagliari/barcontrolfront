import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown-products',
  templateUrl: './dropdown-products.component.html',
  styleUrls: ['./dropdown-products.component.css']
})
export class DropdownProductsComponent {



  isMenuOpen: boolean = false;


  constructor(
    private elRef: ElementRef
  ) {

  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.isMenuOpen) {

      // Verifica si el clic ocurrió fuera del cuadro de elementos.
      if (!this.elRef.nativeElement.contains(event.target)) {
        this.isMenuOpen = false; // Cierra el cuadro de elementos.
      }
    }
  }

}
