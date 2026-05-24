import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/Cart.interface';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe,TranslatePipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  @Input({required:false}) cartItem!:Product
  @Output() removeItem = new EventEmitter<string>();
  @Output() updateItem = new EventEmitter<{
    count:number,
    id:string
}>();
  onRemoveItem(){
    this.removeItem.emit(this.cartItem.product._id);
  }
  onUpdateItem(count:number){
    this.updateItem.emit({count:count,id:this.cartItem.product._id})
  }
}
