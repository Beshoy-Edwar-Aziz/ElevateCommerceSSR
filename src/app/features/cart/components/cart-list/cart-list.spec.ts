import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartList } from './cart-list';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService } from '@ngx-translate/core';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { bindNodeCallback, of } from 'rxjs';
import { Mocked } from 'vitest';
import { Auth } from '../../../../core/auth/services/auth';
import {
  MOCK_CART,
  MOCK_CART_EMPTY,
  MOCK_CART_UPDATE,
  MOCK_RETURN_VALUE_TOKEN,
  MOCK_TOKEN,
} from '../../../../shared/utilities/testing';
import { CartService } from '../../services/cart-service';
import { DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CartItem } from '../cart-item/cart-item';
import { routes } from '../../../../app.routes';

describe('CartList', () => {
  let component: CartList;
  let fixture: ComponentFixture<CartList>;
  let de: DebugElement;
  let mockAuthService: Partial<Mocked<Auth>>;
  let mockCartService: Partial<Mocked<CartService>>;
  beforeEach(async () => {
    mockAuthService = {
      getToken: vi.fn().mockReturnValue(MOCK_TOKEN),
      decodeToken: vi.fn().mockReturnValue(MOCK_RETURN_VALUE_TOKEN),
    };
    mockCartService = {
      getLoggedUserCart: vi.fn().mockReturnValue(of(MOCK_CART)),
      removeCartItem: vi.fn().mockReturnValue(of(MOCK_CART_EMPTY)),
      updateCartQty:vi.fn().mockReturnValue(of(MOCK_CART_UPDATE)),
      deleteEntireCart:vi.fn().mockReturnValue(of(MOCK_CART_EMPTY)),
      cartCounter: signal<number>(0) as any,
    };
    await TestBed.configureTestingModule({
      imports: [CartList],
      providers: [
        provideToastr(),
        provideTranslateService(),
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
            param: of({}),
            fragment: of(null),
            queryParams: of({}),
          },
        },
        { provide: Auth, useValue: mockAuthService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartList);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(mockCartService.getLoggedUserCart).toHaveBeenCalledOnce();
    expect(component).toBeTruthy();
  });
  it('should delete cart item', () => {
    const child = de.query(By.directive(CartItem));
    const childInst = child.componentInstance;
    childInst.removeItem.emit(MOCK_CART.data.products[0].product._id);
    fixture.detectChanges();
    expect(mockCartService.removeCartItem).toHaveBeenCalledOnce();
    expect(mockCartService.removeCartItem).toHaveBeenCalledWith(
      MOCK_CART.data.products[0].product._id,
    );
    expect(component.cartDetails().data.products.length).toBe(0);
  });
  it('should update cart item qty',()=>{
    const child = de.query(By.directive(CartItem));
    const childInst = child.componentInstance;
    childInst.updateItem.emit({count:2,id:MOCK_CART.data.products[0].product._id});
    fixture.detectChanges();
    expect(mockCartService.updateCartQty).toHaveBeenCalledOnce();
    expect(mockCartService.updateCartQty).toHaveBeenCalledWith(MOCK_CART.data.products[0].product._id,2);
    expect(component.cartDetails().data.products[0].count).toBe(2);
  });
  it("should empty Cart",()=>{
    const btn = de.query(By.css('.empty-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(mockCartService.deleteEntireCart).toHaveBeenCalledOnce();
    expect(component.cartDetails().data.products.length).toBe(0);
    expect(component.cartDetails().numOfCartItems).toBe(0);
  });
  it('should close drawer',()=>{
    const spy = vi.spyOn(component.close,'emit');
    const btn = de.query(By.css('.close-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
  })
});
