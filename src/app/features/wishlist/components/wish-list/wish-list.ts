import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { WishListCard } from '../wish-list-card/wish-list-card';
import { WishListService } from '../../services/wish-list-service';
import { productsInterface } from '../../../products/models/products-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '../../../cart/services/cart-service';
import { UpdateCartNumbersService } from '../../../cart/services/update-cart-numbers-service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wish-list',
  imports: [WishListCard,TranslatePipe],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList {
  private readonly wishListService = inject(WishListService);
  private readonly destroy = inject(DestroyRef);
  private readonly cartService = inject(CartService);
  private readonly updateCart = inject(UpdateCartNumbersService);
  private readonly toastrService = inject(ToastrService);
  wishList: WritableSignal<productsInterface[]> = signal<productsInterface[]>([]);
  getProductWishList() {
    this.wishListService
      .getWishList()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (res) => {
          this.wishList.set(res.data);
        },
      });
  }
  addProductToCart(id: string) {
    this.cartService
      .AddProductToCart(id)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (res) => {
          this.cartService.cartCounter.set(res.numOfCartItems);
          this.updateCart.cartDetails.emit(res);
          this.toastrService.success('Product Successfully Added To Your Cart', 'Success');
          this.deleteWishList(id);
          this.getProductWishList();
        },
      });
  }
  deleteWishList(id:string){
    this.wishListService.deleteWishList(id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message,"Success");
        this.getProductWishList();
      }
    })
  }
  ngOnInit(): void {
    this.getProductWishList();
  }
}
