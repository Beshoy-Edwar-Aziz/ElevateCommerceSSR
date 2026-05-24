import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly httpClient = inject(HttpClient);
  getReviewsForSpecificProduct(productId:string):Observable<any>{
    return this.httpClient.get(enviroments.baseurl+'products/'+productId+'/reviews');
  }
  createReviewsForSpecificProduct(productId:string,body:{review:string,rating:number}):Observable<any>{
    return this.httpClient.post(enviroments.baseurl+'products/'+productId+'/reviews',body);
  }
  editReview(reviewId:string,body:{review:string,rating:number}):Observable<any>{
    return this.httpClient.put(enviroments.baseurl+'reviews/'+reviewId,body)
  }
}
