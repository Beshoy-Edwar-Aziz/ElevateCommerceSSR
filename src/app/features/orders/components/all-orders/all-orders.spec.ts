import {
  MOCK_CART,
  MOCK_GET_LOGGED_USER_ORDERS,
  MOCK_RETURN_VALUE_TOKEN,
  MOCK_TOKEN,
} from './../../../../shared/utilities/testing';
import { ComponentFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { AllOrders } from './all-orders';
import { DebugElement } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { By } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';
import { Auth } from '../../../../core/auth/services/auth';
import { CartService } from '../../../cart/services/cart-service';
import { of } from 'rxjs';
import { Navbar } from '../../../../shared/components/navbar/navbar';

describe('AllOrders', () => {
  let component: AllOrders;
  let fixture: ComponentFixture<AllOrders>;
  let de: DebugElement;
  let mockOrdersService: any;
  let mockAuthService: any;
  let mockCartService: any;
  beforeEach(async () => {
    mockOrdersService = {
      getLoggedUserOrders: vi.fn(),
      createCashCheckout: vi.fn(),
      createVisaCheckout:vi.fn()
    };
    mockAuthService = {
      getToken: vi.fn(),
      decodeToken: vi.fn(),
    };
    mockCartService = {
      getLoggedUserCart: vi.fn(),
    };
    mockAuthService.getToken.mockReturnValue(MOCK_TOKEN);
    mockAuthService.decodeToken.mockReturnValue(MOCK_RETURN_VALUE_TOKEN);
    mockOrdersService.getLoggedUserOrders.mockReturnValue(of(MOCK_GET_LOGGED_USER_ORDERS));
    mockOrdersService.createCashCheckout.mockReturnValue(of(MOCK_GET_LOGGED_USER_ORDERS));
    mockCartService.getLoggedUserCart.mockReturnValue(of(MOCK_CART));
    mockOrdersService.createVisaCheckout.mockReturnValue(of());
    await TestBed.configureTestingModule({
      imports: [AllOrders, Navbar],
      providers: [
        { provide: OrderService, useValue: mockOrdersService },
        provideToastr(),
        provideTranslateService(),
        provideRouter(routes),
        { provide: Auth, useValue: mockAuthService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AllOrders);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create receipt component on clicking checkout for cash', async () => {
    component.shippingAddress.setValue({
      details: '123 street city',
      city: 'Cairo',
      phone: '01201493556',
    });
    fixture.detectChanges();
    const btn = de.query(By.css('.cash-btn'));
    btn.nativeElement.click();
    expect(btn.nativeElement.disabled).toBeFalsy();
    const deferedRec = await fixture.getDeferBlocks();
    await deferedRec[0].render(DeferBlockState.Complete);
    await fixture.whenStable();
    const recieptComponent = de.query(By.css('app-receipt'));
    expect(recieptComponent).toBeTruthy();
  });
  it('should call checkout with visa', async () => {
    const spy = vi.spyOn(component,'checkoutForVisa');
    component.shippingAddress.setValue({
      details: '123 street city',
      city: 'Cairo',
      phone: '01201493556',
    });
    fixture.detectChanges();
    const btn = de.query(By.css('.visa-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalledOnce();
  });
  it('should not submit form in case of fields being empty',()=>{
    const cashBtn = de.query(By.css('.cash-btn'));
    const visaBtn = de.query(By.css('.visa-btn'));
    cashBtn.nativeElement.click();
    visaBtn.nativeElement.click();
    fixture.detectChanges();
    expect(cashBtn.nativeElement.disabled).toBe(true);
    expect(visaBtn.nativeElement.disabled).toBe(true);
  })
  it('should display Order is Empty message',()=>{
    component.finalCartList.set({data:{products:[]}} as any);
    fixture.detectChanges();
    const msg = de.query(By.css('.order-empty-msg'));
    expect(msg.nativeElement.textContent).toContain('Order is Empty')
  })
});
