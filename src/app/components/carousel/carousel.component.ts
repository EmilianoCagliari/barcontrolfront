import { Component, Input } from '@angular/core';

interface CarouselImage {
  url: string;
  alt: string;
  active: boolean;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  images: CarouselImage[] = [
    { url: "../../../assets/carrousel/img1.jpg", alt: "Estanteria", active: true },
    { url: "../../../assets/carrousel/img2.jpg", alt: "Botellas", active: false },
    { url: "../../../assets/carrousel/img3.jpg", alt: "Coctel", active: false },
    { url: "../../../assets/carrousel/img4.jpg", alt: "bar", active: false }
  ];

  currentIndex = 0;


  ngOnInit() {
    // Llama a la función para cambiar automáticamente el valor cada cierto tiempo
    this.startCarouselSlide();
  }



  //Carrousel slide
  startCarouselSlide() {
    const interval = 2000; // Cambiar cada 3 segundos (ajusta según tus necesidades)
    setInterval(() => {

      //Si la imagen actual esta activo y el siguiente elemento existe
      if (this.images[this.currentIndex].active && (this.currentIndex + 1 < this.images.length)) {
        this.images[this.currentIndex].active = false;
        this.currentIndex++;
        this.images[this.currentIndex].active = true;
      } else {
        this.images[this.currentIndex].active = false;
        this.currentIndex = 0;
        this.images[this.currentIndex].active = true;
      }
    }, interval);
  }

}
