import { EventEmitter, Injectable, signal } from '@angular/core';
import { Cart } from '../models/Cart.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateCartNumbersService {
  cartDetails=new EventEmitter<Cart>();
}
