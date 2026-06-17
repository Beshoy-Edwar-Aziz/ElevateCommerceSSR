import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrders } from './user-orders';
import { provideTranslateService } from '@ngx-translate/core';
import { Mocked } from 'vitest';
import { Auth } from '../../../../core/auth/services/auth';
import {
  MOCK_GET_LOGGED_USER_ORDERS,
  MOCK_LOGGED_USER_ORDERS,
  MOCK_RETURN_VALUE_TOKEN,
  MOCK_TOKEN,
} from '../../../../shared/utilities/testing';
import { OrderService } from '../../../orders/services/order-service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UserOrders', () => {
  let component: UserOrders;
  let fixture: ComponentFixture<UserOrders>;
  let mockAuthService: Partial<Mocked<Auth>>;
  let mockOrderService: Partial<Mocked<OrderService>>;
  let de:DebugElement;
  beforeEach(async () => {
    mockAuthService = {
      getToken: vi.fn().mockReturnValue(MOCK_TOKEN),
      decodeToken: vi.fn().mockReturnValue(MOCK_RETURN_VALUE_TOKEN),
    };
    mockOrderService = {
      getLoggedUserOrders: vi.fn().mockReturnValue(of( MOCK_LOGGED_USER_ORDERS )),
    };
    await TestBed.configureTestingModule({
      imports: [UserOrders],
      providers: [
        provideTranslateService(),
        { provide: OrderService, useValue: mockOrderService },
        { provide: Auth, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserOrders);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should call orderService method oninit', ()=>{
    fixture.detectChanges();
    const spy = vi.spyOn(mockOrderService,'getLoggedUserOrders');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(component.userData.id);
    expect(component.loggedUserOrdersList()).toEqual(MOCK_LOGGED_USER_ORDERS);
  })
  it('should display No Orders Available Message', async ()=>{
    mockOrderService.getLoggedUserOrders?.mockReturnValue(of([]));
    fixture.detectChanges();
    expect(component.loggedUserOrdersList()).toEqual([]);
    const emptyMsg = de.query(By.css('.unavailable-msg'));
    expect(emptyMsg).toBeTruthy();
  })
});
