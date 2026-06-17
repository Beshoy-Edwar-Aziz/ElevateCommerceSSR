import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Receipt } from './receipt';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';
import { Auth } from '../../../../core/auth/services/auth';
import { MOCK_RETURN_VALUE_TOKEN, MOCK_TOKEN } from '../../../../shared/utilities/testing';
import { OrderService } from '../../services/order-service';
import { input, inputBinding, signal } from '@angular/core';
import { of } from 'rxjs';
import { Mocked } from 'vitest';

describe('Receipt', () => {
  let component: Receipt;
  let fixture: ComponentFixture<Receipt>;
  let mockAuthService: Partial<Mocked<Auth>>;
  let mockOrderService: Partial<Mocked<OrderService>>;
  let shipping = signal<any>({});
  beforeEach(async () => {
    shipping.set({})
    mockAuthService = {
      getToken: vi.fn().mockReturnValue(MOCK_TOKEN),
      decodeToken: vi.fn().mockReturnValue(MOCK_RETURN_VALUE_TOKEN),
    };
    mockOrderService = {
      createCashCheckout: vi.fn().mockReturnValue(of()),
    };
    await TestBed.configureTestingModule({
      imports: [Receipt],
      providers: [
        provideTranslateService(),
        provideRouter(routes),
        { provide: Auth, useValue: mockAuthService },
        { provide: OrderService, useValue: mockOrderService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Receipt, {
      bindings: [inputBinding('shippingAddress', shipping)],
    });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invoke checkout for cash', () => {
    const spy = vi.spyOn(component, 'checkoutForCash');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
  });
  it('should create a checkout cash', () => {
    shipping.set({
      valid: true,
      value: {
        details: 'adw',
        city: 'adwwa',
        phone: '01201493556',
      },
    });
    fixture.detectChanges();
    expect(component.shippingAddress().valid).toBe(true);
    expect(mockOrderService.createCashCheckout).toHaveBeenCalledOnce();
  });
  it('should not create a checkout cash', () => {
    shipping.set({
      valid: false
    });
    fixture.detectChanges();
    expect(component.shippingAddress().valid).toBe(false);
    expect(mockOrderService.createCashCheckout).toHaveBeenCalledTimes(0);
  });
});
