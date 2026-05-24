import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-carousel',
  imports: [CarouselModule,TranslatePipe],
  templateUrl: './main-carousel.html',
  styleUrl: './main-carousel.css',
})
export class MainCarousel {
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplaySpeed:200,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '',
      '',
    ],
    lazyLoad: true,
    autoHeight:false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
    rtl:true
  };
}
