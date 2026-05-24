import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly httpClient = inject(HttpClient);
  getAllBrands(page:number=1):Observable<any>{
    return this.httpClient.get(enviroments.baseurl+'brands?page='+page);
  }
  getSpecificBrand(brandId:string):Observable<any>{
    return this.httpClient.get(enviroments.baseurl+'brands/'+brandId)
  }
}
