import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly httpClient = inject(HttpClient);
  createCashCheckout(cartId:string,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
   return this.httpClient.post(enviroments.baseurl+'orders/'+cartId,{
      shippingAddress
    })
  }
  createVisaCheckout(cartId:string,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
    return this.httpClient.post(enviroments.baseurl+'orders/checkout-session/'+cartId+'?url=https://elevatecommercessr.vercel.app/#',{
      shippingAddress
    })
  }
  getLoggedUserOrders(userId:string):Observable<any>{
    return this.httpClient.get(enviroments.baseurl+'orders/user/'+userId);
  }
}
