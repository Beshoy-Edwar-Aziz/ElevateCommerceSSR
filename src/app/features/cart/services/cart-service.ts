import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroment';
import { Auth } from '../../../core/auth/services/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v2/cart';
  cartCounter:WritableSignal<number> = signal<number>(0);
  AddProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(
      this.baseUrl,
      {
        productId,
      },

    );
  }
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }
  removeCartItem(id:string):Observable<any>{
    return this.httpClient.delete(enviroments.baseurl+'cart/'+id);
  }
  updateCartQty(id:string,count:number):Observable<any>{
    return this.httpClient.put(this.baseUrl+`/${id}`,{
      count
    })
  }
  deleteEntireCart():Observable<any>{
    return this.httpClient.delete(this.baseUrl)
  }
  isThereCartItems():boolean{
    if(this.cartCounter()>0){
      console.log("true in cartservice")
      return true;
    }
    this.router.navigate(['/user/home']);
    return false
  }
}
