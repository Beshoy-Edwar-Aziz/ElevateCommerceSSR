import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { ReviewService } from '../../services/review-service';
import { ReviewsInterface } from '../../models/Reviews.interface';
import { ReviewItem } from '../review-item/review-item';
import { Auth } from '../../../../core/auth/services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessages } from '../../../../shared/components/validation-messages/validation-messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-review-list',
  imports: [ReviewItem, ReactiveFormsModule, ValidationMessages, TranslatePipe],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css',
})
export class ReviewList implements OnInit {
  private readonly authService = inject(Auth);
  private readonly reviewService = inject(ReviewService);
  private readonly fb = inject(FormBuilder);
  private destroy = inject(DestroyRef);
  reviewEdit!: FormGroup;
  reviewPosting!: FormGroup;

  reviewList = signal<ReviewsInterface[]>([]);
  decodedTokenId!: string;
  isOpened = signal<boolean>(false);
  reviewId!: string;
  @Input() productId!:string;
  ngOnInit(): void {
    console.log(this.reviewList());
    this.getUserIdToken();
    this.formInit();
    this.getReviews(this.productId);
  }
  getUserIdToken() {
    const decoded: any = this.authService.decodeToken(this.authService.getToken());
    this.decodedTokenId = decoded.id;
    console.log(this.decodedTokenId);
  }
  getReviews(id: string) {
    this.reviewService.getReviewsForSpecificProduct(id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: ({ data }) => {
        console.log(data);
        this.reviewList.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  submitFormCreate() {
    if(this.reviewPosting.valid){
    this.reviewService
      .createReviewsForSpecificProduct(this.productId, this.reviewPosting.value).pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getReviews(this.productId);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    console.log(this.reviewPosting.value);
  }
  formInit() {
    this.reviewPosting = this.fb.group({
      review: this.fb.control('', [Validators.required]),
      rating: this.fb.control('', [Validators.required, Validators.max(5), Validators.min(0)]),
    });
    this.reviewEdit= this.fb.group({
      review: this.fb.control('', [Validators.required]),
      rating: this.fb.control('', [Validators.required, Validators.max(5), Validators.min(0)])
    })
  }
  submitForm() {
    this.reviewService.editReview(this.reviewId, this.reviewEdit.value).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: (res) => {
        console.log(res);
        this.getReviews(this.productId);
        this.isOpened.set(false);
        this.reviewPosting.setValue({review:'',rating:''})
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(this.reviewPosting.value);
  }
  editUserReview(reviewId: string, productId: string) {
    this.reviewId = reviewId;
    this.productId = productId;
    console.log(reviewId, productId);
    this.isOpened.set(true);
  }
}
