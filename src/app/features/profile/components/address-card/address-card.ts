import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  UserAddressInterface } from '../../models/user-address-interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-address-card',
  imports: [TranslatePipe],
  templateUrl: './address-card.html',
  styleUrl: './address-card.css',
})
export class AddressCard {
  @Input({required:true}) userAddress!:UserAddressInterface;
  @Output() deleteItem = new EventEmitter<string>();
  deleteAddress(){
    this.deleteItem.emit(this.userAddress._id);
    console.log(this.userAddress._id);
  }
}
