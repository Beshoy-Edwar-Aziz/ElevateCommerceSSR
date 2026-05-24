import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Auth } from '../../../../core/auth/services/auth';
import { TokenInterface } from '../../../../core/auth/models/token-interface';
import { NgComponentOutlet } from '@angular/common';
import { UserAddress } from '../user-address/user-address';
import { AddressesService } from '../../services/addresses-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserAddressInterface } from '../../models/user-address-interface';
import { AddressCard } from '../address-card/address-card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-info',
  imports: [NgComponentOutlet,UserAddress,AddressCard,TranslatePipe],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo implements OnInit {
  private readonly authService = inject(Auth);
  private readonly AddressService = inject(AddressesService);
  private destroy = inject(DestroyRef);
  userData!:TokenInterface;
  userAddressComponent:any = null;
  addresses:WritableSignal<UserAddressInterface[]>= signal<UserAddressInterface[]>([]);
  getUserInfo(){
    this.userData =  this.authService.decodeToken(this.authService.getToken());
  }
  getUserAddresses(){
    this.AddressService.getAddresses().pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next:({data})=>{
        this.addresses.set(data);
      }
    })
  }
  deleteUserAddress(id:string){
    this.AddressService.deleteAddress(id).pipe(takeUntilDestroyed(this.destroy)).subscribe((res)=>{this.addresses.set(res.data)})
  }
  openComponent(){
    this.userAddressComponent = UserAddress;
  }
  closeComponent(){
    this.userAddressComponent = null;
  }
  ngOnInit(): void {
    this.getUserInfo();
    this.getUserAddresses();
  }
}
