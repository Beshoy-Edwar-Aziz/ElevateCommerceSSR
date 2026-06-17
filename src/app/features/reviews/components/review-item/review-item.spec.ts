import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewItem } from './review-item';
import { MOCK_REVIEW } from '../../../../shared/utilities/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';

describe('ReviewItem', () => {
  let component: ReviewItem;
  let fixture: ComponentFixture<ReviewItem>;
  let de:DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewItem],
      providers:[provideTranslateService()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewItem);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.componentRef.setInput('review',MOCK_REVIEW);
    fixture.componentRef.setInput('decodedTokenId',MOCK_REVIEW.user._id);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit reviewId and productId',()=>{
    const spy = vi.spyOn(component.reviewId,'emit');
    const btn = de.query(By.css('.review-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith({reviewId:MOCK_REVIEW._id,productId:MOCK_REVIEW.product});
  })
});
