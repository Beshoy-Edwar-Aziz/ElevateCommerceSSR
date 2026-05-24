import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { categoriesInterface } from '../../../categories/models/categories-interface';
import { CategoryCard } from '../../../categories/components/category-card/category-card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-carousel',
  imports: [CarouselModule,CategoryCard,TranslatePipe],
  templateUrl: './categories-carousel.html',
  styleUrl: './categories-carousel.css',
})
export class CategoriesCarousel {
  @Input({required:true}) categoriesList!:categoriesInterface[];
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 200,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    lazyLoad: true,
    autoHeight: false,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
    rtl:true
  };

}
