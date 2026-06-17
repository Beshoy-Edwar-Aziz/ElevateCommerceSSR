import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, Mocked } from 'vitest';
import { UserAddress } from './user-address';
import { provideTranslateService } from '@ngx-translate/core';
import { AddressesService } from '../../services/addresses-service';
import { of } from 'rxjs';
import { MOCK_ADDRESSES, MOCK_NEW_ADDRESSES } from '../../../../shared/utilities/testing';
import { DebugElement, signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserAddressInterface } from '../../models/user-address-interface';

describe('UserAddress', () => {
  let component: UserAddress;
  let fixture: ComponentFixture<UserAddress>;
  let mockAddressService: Partial<Mocked<AddressesService>>;
  let de: DebugElement;

  let mockSignal: WritableSignal<UserAddressInterface[]>;
  beforeEach(async () => {
    mockAddressService = {
      addAddress: vi.fn().mockReturnValue(of({ data: MOCK_NEW_ADDRESSES })),
    };

    await TestBed.configureTestingModule({
      imports: [UserAddress],
      providers: [
        provideTranslateService(),
        { provide: AddressesService, useValue: mockAddressService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddress);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    mockSignal = signal(MOCK_ADDRESSES);
    fixture.componentRef.setInput('address', mockSignal);
    fixture.componentRef.setInput('closeForm', vi.fn());
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add address', async () => {
    const spy = vi.spyOn(mockAddressService, 'addAddress');
    const closeSpy = vi.spyOn(component,'closeForm');
    component.addressForm.setValue({
      name: 'Bosh',
      details: 'Cairo,Egypt',
      phone: '01201493556',
      city: 'Cairo',
    });
    fixture.detectChanges();
    expect(component.addressForm.valid).toBe(true);
    const btn = de.query(By.css('.submit-btn'));
    expect(btn.nativeElement.disabled).toBe(false);
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith({
      name: 'Bosh',
      details: 'Cairo,Egypt',
      phone: '01201493556',
      city: 'Cairo',
    });
    expect(component.address()).toEqual(MOCK_NEW_ADDRESSES);
    expect(closeSpy).toHaveBeenCalledOnce();
  });
  it('should not add address while the form is invalid', () => {
    const spy = vi.spyOn(mockAddressService, 'addAddress');
    component.addressForm.setValue({
      name: 'Bosh',
      details: 'Cairo,Egypt',
      phone: '0120',
      city: 'Cairo',
    });
    fixture.detectChanges();
    expect(component.addressForm.valid).toBe(false);
    const btn = de.query(By.css('.submit-btn'));
    expect(btn.nativeElement.disabled).toBe(true);
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(0);

    expect(component.address()).toEqual(MOCK_ADDRESSES);
  });
  it("should display loading indicator on button",()=>{
     component.addressForm.setValue({
      name: 'Bosh',
      details: 'Cairo,Egypt',
      phone: '01201493556',
      city: 'Cairo',
    });
    fixture.detectChanges();
    const btn = de.query(By.css('.submit-btn'))
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.isLoading()).toBeFalsy();
  })
});
