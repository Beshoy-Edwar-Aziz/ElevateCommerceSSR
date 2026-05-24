import { Component, EventEmitter, Input, Output} from '@angular/core';
import { productsInterface } from '../../../products/models/products-interface';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'wishListCard',
  imports: [CurrencyPipe,TranslatePipe],
  templateUrl: './wish-list-card.html',
  styleUrl: './wish-list-card.css',
})
export class WishListCard{
  @Input() wishList!:productsInterface
  @Output() productId = new EventEmitter<string>();
  @Output() productIdForDelete = new EventEmitter<string>();
  sendProductId(){
    this.productId.emit(this.wishList.id);
  }
  deleteProductId(){
    this.productIdForDelete.emit(this.wishList.id);
  }
}
