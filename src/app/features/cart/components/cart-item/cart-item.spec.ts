import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItem } from './cart-item';
import { provideTranslateService } from '@ngx-translate/core';
import { MOCK_CART } from '../../../../shared/utilities/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CartItem', () => {
  let component: CartItem;
  let fixture: ComponentFixture<CartItem>;
  let de: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItem],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItem);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.componentRef.setInput('cartItem', MOCK_CART.data.products[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit id to remove product from cart-list', () => {
    const spy = vi.spyOn(component.removeItem, 'emit');
    const btn = de.query(By.css('.remove-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(MOCK_CART.data.products[0].product._id);
  });
  it('should emit id and count to update qty of a cart item', () => {
    const spy = vi.spyOn(component.updateItem, 'emit');
    const btn = de.query(By.css('.update-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith({
      count: MOCK_CART.data.products[0].count + 1,
      id: MOCK_CART.data.products[0].product._id,
    });
  });
});
