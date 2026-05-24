import { UpdateCartNumbersService } from './../../services/update-cart-numbers-service';
import { Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Cart } from '../../models/Cart.interface';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../cart-item/cart-item';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-list',
  imports: [CurrencyPipe, CartItem,RouterLink,TranslatePipe],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css',
})
export class CartList implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly updateCartService = inject(UpdateCartNumbersService);
  private readonly toastrService = inject(ToastrService);
  private destroy = inject(DestroyRef);
  cartDetails = signal<Cart>({} as Cart);
  @Output() close = new EventEmitter();
  getUserCart() {
    this.cartService.getLoggedUserCart().pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: (res) => {
        this.cartDetails.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeCartItem(id:string){
    this.cartService.removeCartItem(id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        this.cartDetails.set(res);
        this.toastrService.success(res.message,"Success");
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  updateItemQty(id:string,count:number){
    this.cartService.updateCartQty(id,count).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails.set(res);
        this.toastrService.success(res.message,"Success");
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  emptyCart(){
    this.cartService.deleteEntireCart().pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        console.log(res);
       this.cartDetails.set(res);
      this.toastrService.success(res.message,"Success");
      this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  closeDrawer(){
    this.close.emit(true);
  }
  ngOnInit(): void {
    this.getUserCart();
  }
  ngAfterContentChecked() {
    this.updateCartService.cartDetails.subscribe({
      next: (res: any) => {
        if(res!=null){
          this.cartDetails.set(res);
        }
      },
    });
  }
}
