import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListCard } from './wish-list-card';
import { provideTranslateService } from '@ngx-translate/core';
import { MOCK_PRODS } from '../../../../shared/utilities/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('WishListCard', () => {
  let component: WishListCard;
  let fixture: ComponentFixture<WishListCard>;
  let de:DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishListCard],
      providers:[provideTranslateService()]
    }).compileComponents();

    fixture = TestBed.createComponent(WishListCard);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.componentRef.setInput('wishList',MOCK_PRODS[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit product id to add product to cart', ()=>{
    const spy = vi.spyOn(component.productId,'emit');
    const btn  = de.query(By.css('.add-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(MOCK_PRODS[0]._id);
  });
  it('should emit product id to remove product from wishList',()=>{
    const spy = vi.spyOn(component.productIdForDelete,'emit');
    const btn = de.query(By.css('.delete-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(MOCK_PRODS[0]._id);
  })
});
