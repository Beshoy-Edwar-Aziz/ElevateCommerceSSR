import { Component, DestroyRef, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { OrdersInterface } from '../../models/orders-interface';
import { OrderService } from '../../services/order-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Product } from '../../../cart/models/Cart.interface';
import { Auth } from '../../../../core/auth/services/auth';
import { TokenInterface } from '../../../../core/auth/models/token-interface';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-receipt',
  imports: [DatePipe,CurrencyPipe,RouterLink,TranslatePipe],
  templateUrl: './receipt.html',
  styleUrl: './receipt.css',
})
export class Receipt implements OnInit  {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(Auth);
  shippingAddress = input<any>();
  cartId = input<string>();
  products = input<Product[]>();
  destroy = inject(DestroyRef);
  orderData:WritableSignal<OrdersInterface>= signal<OrdersInterface>({} as  OrdersInterface);
  userData!:TokenInterface;
  checkoutForCash(){
    if(this.shippingAddress().valid){
    this.orderService.createCashCheckout(this.cartId()!,this.shippingAddress().value).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:({data})=>{
        this.orderData.set(data);
      }
    })
  }
  }
  ngOnInit(): void {
    this.checkoutForCash();
    this. userData = this.authService.decodeToken(this.authService.getToken());
    console.log(this.userData);
  }

}
