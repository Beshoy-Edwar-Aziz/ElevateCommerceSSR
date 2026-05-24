import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReviewsInterface } from '../../models/Reviews.interface';
import { Auth } from '../../../../core/auth/services/auth';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-review-item',
  imports: [TranslatePipe],
  templateUrl: './review-item.html',
  styleUrl: './review-item.css',
})
export class ReviewItem  {
  @Input() review!:ReviewsInterface;
  @Input() decodedTokenId!:string;
  @Output() reviewId = new EventEmitter<{reviewId:string,productId:string}>();
  sendReviewId(){
    this.reviewId.emit({reviewId:this.review._id,productId:this.review.product});
  }
}
