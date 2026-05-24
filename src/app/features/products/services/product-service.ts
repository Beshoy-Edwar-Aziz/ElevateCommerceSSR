import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  getProducts():Observable<any>{
    return this.httpClient.get(enviroments.baseurl+'products?page=1')
  }
  getSpecificProduct(id:string):Observable<any>{
    return this.httpClient.get(enviroments.baseurl+`products/${id}`)
  }
}
