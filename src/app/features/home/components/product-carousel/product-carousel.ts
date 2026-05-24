import { Component, DestroyRef, inject, Input, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductList } from '../../../products/components/product-list/product-list';
import { productsInterface } from '../../../products/models/products-interface';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { CartService } from '../../../cart/services/cart-service';
import { UpdateCartNumbersService } from '../../../cart/services/update-cart-numbers-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { WishListService } from '../../../wishlist/services/wish-list-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-carousel',
  imports: [CarouselModule, ProductList, RouterLink, ProductCard,TranslatePipe],
  templateUrl: './product-carousel.html',
  styleUrl: './product-carousel.css',
})
export class ProductCarousel {
  private readonly cartService = inject(CartService);
  private readonly countUpdate = inject(UpdateCartNumbersService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);
  private destroy = inject(DestroyRef);
  wishListProds:WritableSignal<productsInterface[]>=signal<productsInterface[]>([]);
  @Input() productData!: productsInterface[];
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
   addProductToCart(id:string){
    this.cartService.AddProductToCart(id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        console.log(res);
        this.countUpdate.cartDetails.emit(res);
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  addProductToWishList(id:string){
    this.wishListService.addToWishList(id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message,"Success");
        this.getProductWishList();
      }
    })
  }
  getProductWishList(){
    this.wishListService.getWishList().pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        this.wishListProds.set(res.data);
      }
    })
  }
   ngOnInit(): void {
    this.getProductWishList();
   }
}
