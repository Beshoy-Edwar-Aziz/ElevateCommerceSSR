import { ComponentFixture, DeferBlockState, TestBed } from '@angular/core/testing';

import { ProductCarousel } from './product-carousel';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService } from '@ngx-translate/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, Subject } from 'rxjs';
import { DebugElement, EventEmitter, signal } from '@angular/core';
import { Mocked } from 'vitest';
import { WishListService } from '../../../wishlist/services/wish-list-service';
import { MOCK_CART, MOCK_PRODS } from '../../../../shared/utilities/testing';
import { UpdateCartNumbersService } from '../../../cart/services/update-cart-numbers-service';
import { CartService } from '../../../cart/services/cart-service';
import { By } from '@angular/platform-browser';
import { ProductCard } from '../../../products/components/product-card/product-card';

describe('ProductCarousel', () => {
  let component: ProductCarousel;
  let fixture: ComponentFixture<ProductCarousel>;
  let de: DebugElement;
  let mockWishListService: Partial<Mocked<WishListService>>;
  let mockUpdateCartService: Mocked<UpdateCartNumbersService>;
  let mockCartService: Partial<Mocked<CartService>>;
  beforeEach(async () => {
    mockWishListService = {
      getWishList: vi.fn().mockReturnValue(of({ data: MOCK_PRODS })),
      addToWishList: vi.fn().mockReturnValue(of()),
    };
    mockUpdateCartService = {
      cartDetails: new EventEmitter<number>() as any,
    };
    mockCartService = {
      AddProductToCart: vi.fn().mockReturnValue(of({ data: MOCK_CART })),
      cartCounter: signal<number>(0) as any,
    };
    await TestBed.configureTestingModule({
      imports: [ProductCarousel],
      providers: [
        provideToastr(),
        provideTranslateService(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
            params: of({}),
            queryParams: of({}),
            fragment: of(null),
          },
        },
        { provide: WishListService, useValue: mockWishListService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCarousel);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.componentRef.setInput('productData', MOCK_PRODS);
    // await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invoke add to cart', async () => {
    fixture.detectChanges();
    const defer = await fixture.getDeferBlocks();
    await Promise.all(defer.map((block) => block.render(DeferBlockState.Complete)));
    fixture.detectChanges();
    expect(component.productData).toEqual(MOCK_PRODS);
    const productCard = de.query(By.directive(ProductCard));
    const inst = productCard.componentInstance;
    inst.productId.emit(MOCK_PRODS[0]._id);
    fixture.detectChanges();
    expect(mockCartService.AddProductToCart).toHaveBeenCalledOnce();
    expect(mockCartService.AddProductToCart).toHaveBeenCalledWith(MOCK_PRODS[0]._id);
  });
  it('should invoke add product to wishlist', async () => {
    fixture.detectChanges();

    const defer = await fixture.getDeferBlocks();
    await Promise.all(defer.map((block) => block.render(DeferBlockState.Complete)));
    fixture.detectChanges();
    expect(component.productData).toEqual(MOCK_PRODS);
    const productCard = de.query(By.directive(ProductCard));
    const inst = productCard.componentInstance;
    inst.productIdForWishList.emit(MOCK_PRODS[0]._id);
    expect(mockWishListService.addToWishList).toHaveBeenCalledOnce();
    expect(mockWishListService.addToWishList).toHaveBeenCalledWith(MOCK_PRODS[0]._id);
  });
  it('should destroy component', () => {
    const subject = new Subject<{ data: any[] }>();
    mockWishListService.getWishList?.mockReturnValue(subject);
    fixture.destroy();
    subject.next({ data: MOCK_PRODS });
    expect(component.wishListProds()).toEqual([]);
  });
});
