import { CategoriesService } from './../../../categories/services/categories-service';
import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MainCarousel } from '../main-carousel/main-carousel';
import { ProductCarousel } from '../product-carousel/product-carousel';
import { ProductService } from '../../../products/services/product-service';
import { productsInterface } from '../../../products/models/products-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesCarousel } from '../categories-carousel/categories-carousel';
import { categoriesInterface } from '../../../categories/models/categories-interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [MainCarousel,ProductCarousel,CategoriesCarousel,TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly productList = inject(ProductService);
  private readonly categoriesService = inject(CategoriesService);
  private destroy = inject(DestroyRef)
  products:WritableSignal<productsInterface[]> = signal<productsInterface[]>([]);
  categories:WritableSignal<categoriesInterface[]> = signal<categoriesInterface[]>([]);
   getAllProds() {
    this.productList.getProducts().pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: ({ data }) => {

        this.products.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCategories(){
    this.categoriesService.getAllCategories().pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:({data})=>{
        this.categories.set(data);

      }
    })
  }
  ngOnInit(): void {
   this.getAllProds();
   this.getCategories();
  }
}
