import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private readonly httpClient = inject(HttpClient);
  wishListAdded:WritableSignal<string[]>=signal<string[]>([]);
  addToWishList(productId:string):Observable<any>{
    return this.httpClient.post(enviroments.baseurl + 'wishlist',{
      productId
    })
  }
  getWishList():Observable<any>{
    return this.httpClient.get(enviroments.baseurl + 'wishlist')
  }
  deleteWishList(wishListId:string):Observable<any>{
    return this.httpClient.delete(enviroments.baseurl + 'wishlist/' + wishListId)
  }
}
