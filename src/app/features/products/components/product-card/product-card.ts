import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { productsInterface } from '../../models/products-interface';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'product-card',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: false }) product!: productsInterface;
  @Input() wishList!:productsInterface[];
  @Output() productId = new EventEmitter<string>();
  @Output() productIdForWishList = new EventEmitter<string>();
  onAddToCart() {
    this.productId.emit(this.product._id);
  }
  onAddToWishList(){
    this.productIdForWishList.emit(this.product._id);

  }
  isProducts():boolean{
    return this.product?this.wishList?.some(item=>item?._id===this.product?._id):false;

  }
}
