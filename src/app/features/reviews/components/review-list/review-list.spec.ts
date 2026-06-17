import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewList } from './review-list';
import { provideTranslateService } from '@ngx-translate/core';
import { Mocked } from 'vitest';
import { Auth } from '../../../../core/auth/services/auth';
import {
  MOCK_RETURN_VALUE_TOKEN,
  MOCK_REVIEW,
  MOCK_TOKEN,
} from '../../../../shared/utilities/testing';
import { ReviewService } from '../../services/review-service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ReviewList', () => {
  let component: ReviewList;
  let fixture: ComponentFixture<ReviewList>;
  let mockAuthService: Partial<Mocked<Auth>>;
  let mockReviewService: Partial<Mocked<ReviewService>>;
  let de: DebugElement;
  beforeEach(async () => {
    mockAuthService = {
      getToken: vi.fn().mockReturnValue(MOCK_TOKEN),
      decodeToken: vi.fn().mockReturnValue(MOCK_RETURN_VALUE_TOKEN),
    };
    mockReviewService = {
      getReviewsForSpecificProduct: vi.fn().mockReturnValue(of({data:[MOCK_REVIEW]})),
      editReview: vi.fn().mockReturnValue(of()),
      createReviewsForSpecificProduct: vi.fn().mockReturnValue(of()),
    };
    await TestBed.configureTestingModule({
      imports: [ReviewList],
      providers: [
        provideTranslateService(),
        { provide: Auth, useValue: mockAuthService },
        { provide: ReviewService, useValue: mockReviewService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('productId', MOCK_REVIEW.product);
        component.reviewId = MOCK_REVIEW._id;
    de = fixture.debugElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    const spy = vi.spyOn(mockReviewService,'getReviewsForSpecificProduct');
    expect(spy).toHaveBeenCalledOnce();
    expect(component).toBeTruthy();
  });
  it('should create a review', () => {
    const spy = vi.spyOn(mockReviewService, 'createReviewsForSpecificProduct');
    component.reviewPosting.setValue({
      review: 'awdawnda',
      rating: '5',
    });
    fixture.detectChanges();
    const btn = de.query(By.css('.create-review-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.reviewPosting.valid).toBeTruthy();
    expect(spy).toHaveBeenCalledOnce();
  });
  it('should edit a review', () => {
    const spy = vi.spyOn(mockReviewService, 'editReview');
    component.reviewEdit.setValue({
      review: 'awdawnda',
      rating: '5',
    });
    fixture.detectChanges();
    expect(component.reviewEdit.invalid).toBeFalsy();
    component.isOpened.set(true);
    fixture.detectChanges();
    const btn = de.query(By.css('.edit-review-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(component.reviewId,{
      review: 'awdawnda',
      rating: '5',
    })
  });
});
