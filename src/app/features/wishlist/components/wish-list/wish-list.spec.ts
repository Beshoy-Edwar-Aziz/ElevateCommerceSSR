import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishList } from './wish-list';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService } from '@ngx-translate/core';
import { Mocked } from 'vitest';
import { WishListService } from '../../services/wish-list-service';
import { of } from 'rxjs';
import { MOCK_CART, MOCK_PRODS } from '../../../../shared/utilities/testing';
import { CartService } from '../../../cart/services/cart-service';
import { DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { WishListCard } from '../wish-list-card/wish-list-card';

describe('WishList', () => {
  let component: WishList;
  let fixture: ComponentFixture<WishList>;
  let mockWishListService: Partial<Mocked<WishListService>>;
  let mockCartService: Partial<Mocked<CartService>>;
  let de: DebugElement;
  beforeEach(async () => {
    mockWishListService = {
      getWishList: vi.fn().mockReturnValue(of({ data: MOCK_PRODS })),
      deleteWishList: vi.fn().mockReturnValue(of({ data: [] })),
    };
    mockCartService = {
      AddProductToCart: vi.fn().mockReturnValue(of(MOCK_CART)),
      cartCounter: signal<number>(0) as any,
    };
    await TestBed.configureTestingModule({
      imports: [WishList],
      providers: [
        provideToastr(),
        provideTranslateService(),
        { provide: WishListService, useValue: mockWishListService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WishList);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(mockWishListService.getWishList).toHaveBeenCalledOnce();
    expect(component).toBeTruthy();
  });
  it('should add product to cart', () => {
    const child = de.query(By.directive(WishListCard));
    const cardInst = child.componentInstance;
    cardInst.productId.emit(MOCK_PRODS[0]._id);
    fixture.detectChanges();
    expect(mockCartService.AddProductToCart).toHaveBeenCalledOnce();
    expect(mockCartService.AddProductToCart).toHaveBeenCalledWith(MOCK_PRODS[0].id);
  });
  it('should remove product from wishList', async () => {
    mockWishListService.getWishList?.mockReturnValue(of({ data: [] }));
    const child = de.query(By.directive(WishListCard));
    const cardInst = child.componentInstance;
    cardInst.productIdForDelete.emit(MOCK_PRODS[0]._id);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(mockWishListService.deleteWishList).toHaveBeenCalledOnce();
    expect(mockWishListService.deleteWishList).toHaveBeenCalledWith(MOCK_PRODS[0]._id);
    expect(mockWishListService.getWishList).toHaveBeenCalledTimes(2);
    expect(component.wishList().length).toBe(0);
  });
});
