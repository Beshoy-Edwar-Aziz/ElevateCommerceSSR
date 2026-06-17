import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfo } from './user-info';
import { provideTranslateService } from '@ngx-translate/core';
import {
  MOCK_ADDRESSES,
  MOCK_RETURN_VALUE_TOKEN,
  MOCK_TOKEN,
} from '../../../../shared/utilities/testing';
import { Auth } from '../../../../core/auth/services/auth';
import { of } from 'rxjs';
import { AddressesService } from '../../services/addresses-service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserAddress } from '../user-address/user-address';
import { Mocked } from 'vitest';

describe('UserInfo', () => {
  let component: UserInfo;
  let fixture: ComponentFixture<UserInfo>;
  let de: DebugElement;
  let mockAuthService: any;
  let mockAddressService: Partial<Mocked<AddressesService>>;
  beforeEach(async () => {
    mockAuthService = {
      getToken: vi.fn().mockReturnValue(MOCK_TOKEN),
      decodeToken: vi.fn().mockReturnValue(MOCK_RETURN_VALUE_TOKEN),
    };
    mockAddressService = {
      getAddresses: vi.fn().mockReturnValue(of({ data: MOCK_ADDRESSES })),
      deleteAddress: vi.fn().mockReturnValue(of({ data: [] })),
    };
    await TestBed.configureTestingModule({
      imports: [UserInfo],
      providers: [
        provideTranslateService(),
        { provide: Auth, useValue: mockAuthService },
        { provide: AddressesService, useValue: mockAddressService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfo);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create app-address component', () => {
    const addressCard = de.query(By.css('app-address-card'));
    const addressCardlength = de.queryAll(By.css('app-address-card'));
    expect(addressCard).toBeTruthy();
    expect(addressCardlength.length).toBe(1);
  });
  it('should show form for adding addresses', () => {
    const btn = de.query(By.css('.open-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    const formComponent = de.query(By.css('app-user-address'));
    expect(formComponent).toBeTruthy();
    expect(component.userAddressComponent).toBe(UserAddress);
  });
  it('should close form on closing it through user-address component', () => {
    const btn = de.query(By.css('.open-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    const closeBtn = de.query(By.css('app-user-address .close-btn'));
    closeBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.userAddressComponent).toBe(null);
    const formComponent = de.query(By.css('app-user-address'));
    expect(formComponent).toBeFalsy();
  });
  it('should delete the address card on pushing a button', async () => {
    const addressCard = de.query(By.css('app-address-card'));
    expect(addressCard).toBeTruthy();
    const deleteBtn = de.query(By.css('app-address-card .delete-btn'));
    deleteBtn.nativeElement.click();
    fixture.detectChanges();
    expect(mockAddressService.deleteAddress).toHaveBeenCalledWith(MOCK_ADDRESSES[0]._id);
    expect(mockAddressService.deleteAddress).toHaveBeenCalledOnce();
    const addressCardTotal = de.queryAll(By.css('app-address-card'));
    expect(addressCardTotal.length).toBe(0);
  });
});
