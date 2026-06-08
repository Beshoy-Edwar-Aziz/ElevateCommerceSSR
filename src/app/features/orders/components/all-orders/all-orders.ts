import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessages } from '../../../../shared/components/validation-messages/validation-messages';
import { FlowbiteService } from '../../../../core/services/flowbite';
import { CartService } from '../../../cart/services/cart-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cart } from '../../../cart/models/Cart.interface';
import { CurrencyPipe, NgComponentOutlet } from '@angular/common';
import { OrderService } from '../../services/order-service';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { UpdateCartNumbersService } from '../../../cart/services/update-cart-numbers-service';
import { Router } from '@angular/router';
import { Receipt } from '../receipt/receipt';
import { productsInterface } from '../../../products/models/products-interface';
import { Footer } from '../../../../shared/components/footer/footer';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-all-orders',
  imports: [ReactiveFormsModule,ValidationMessages, CurrencyPipe,Navbar,NgComponentOutlet,Footer,TranslatePipe],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css',
})
export class AllOrders implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly cartUpdateService = inject(UpdateCartNumbersService);
  readonly destroy = inject(DestroyRef);
  shippingAddress!:FormGroup;
  createdOrderDetails:WritableSignal<any>= signal<any>({});
  finalCartList:WritableSignal<Cart>= signal<Cart>({} as Cart);
  productNameArr:WritableSignal<productsInterface[]>=signal<productsInterface[]>([] as productsInterface[]);
  receiptComponent = Receipt;

  formInit(){
   this.shippingAddress= this.formBuilder.group({
    details:this.formBuilder.control('',[Validators.minLength(5),Validators.maxLength(30),Validators.required]),
    phone:this.formBuilder.control('',[Validators.pattern("01[0-2,5]{1}[0-9]{8}"),Validators.required]),
    city:this.formBuilder.control('',[Validators.minLength(5),Validators.maxLength(25),Validators.required])
    })
  }
  getLoggedCartUser(){
    this.cartService.getLoggedUserCart().pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:(res)=>{
        this.finalCartList.set(res);
        this.productNameArr.set(res.data.products);
        this.cartUpdateService.cartDetails.emit(res);
      }
    })
  }

  checkoutForVisa(){
    if(this.shippingAddress.valid){
      this.orderService.createVisaCheckout(this.finalCartList().cartId,this.shippingAddress.value).pipe(takeUntilDestroyed(this.destroy)).subscribe({
        next:(res)=>{
          console.log(res);
          location.href=res.session.url;
        }
      })
    }
  }
  ngOnInit(): void {
    this.formInit();
    this.getLoggedCartUser();
  }

}
