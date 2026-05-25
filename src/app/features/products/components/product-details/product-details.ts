import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { SpecifiedProduct } from '../../models/specified-product';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../cart/services/cart-service';
import { UpdateCartNumbersService } from '../../../cart/services/update-cart-numbers-service';
import { ReviewList } from '../../../reviews/components/review-list/review-list';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, CarouselModule, ReviewList, ReactiveFormsModule, TranslatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private readonly router = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly updateCartNumber = inject(UpdateCartNumbersService);
  private readonly toastrService = inject(ToastrService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private destroy = inject(DestroyRef);
  productId!: string;
  product = signal<SpecifiedProduct>({} as SpecifiedProduct);
  getProductDetails(id: string) {
    this.productService
      .getSpecificProduct(id)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: ({ data }) => {
          this.product.set(data);
           this.updateMetaAndTitle(this.product());
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addToCart() {
    this.cartService.AddProductToCart(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.updateCartNumber.cartDetails.emit(res);
        this.cartService.cartCounter.set(res.numOfCartItems);
        this.toastrService.success(res.message, 'Success');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateMetaAndTitle(product: SpecifiedProduct) {
    this.title.setTitle(product.title);
    this.meta.updateTag({ property: 'og:title', content: product.title });
    this.meta.updateTag({ property: 'og:description', content: product.description });
    this.meta.updateTag({ property: 'og:image', content: product.imageCover });
    this.meta.updateTag({ property: 'og:type', content: 'product' });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://elevatecommercessr.vercel.app/#/user/productDetail/${product._id}`,
    });
    this.meta.updateTag({ name: 'description', content: product.description });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: (currentRoute) => {
        this.productId = currentRoute.get('id')!;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getProductDetails(this.productId);

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-arrow-left text-main"></i>',
      '<i class="fa-solid fa-arrow-right text-main"></i>',
    ],
    lazyLoad: true,
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
    nav: true,
    rtl: true,
  };
  thumbOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-arrow-left text-main"></i>',
      '<i class="fa-solid fa-arrow-right text-main"></i>',
    ],
    lazyLoad: true,
    responsive: {
      0: {
        items: 5,
      },
      400: {
        items: 5,
      },
      740: {
        items: 5,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
    rtl: true,
    skip_validateItems: true,
    margin: 4,
  };
}
