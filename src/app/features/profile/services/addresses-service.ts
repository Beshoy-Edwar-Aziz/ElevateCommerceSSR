import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private readonly httpClient = inject(HttpClient);
  addAddress(userAddress:{name:string,details:string,phone:string,city:string}):Observable<any>{
    return this.httpClient.post(enviroments.baseurl + 'addresses' , userAddress);
  }
  getAddresses():Observable<any>{
    return this.httpClient.get(enviroments.baseurl+'addresses');
  }
  deleteAddress(id:string):Observable<any>{
    return this.httpClient.delete(enviroments.baseurl+'addresses/'+id)
  }
}
