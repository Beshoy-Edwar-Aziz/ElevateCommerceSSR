import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCard } from './address-card';
import { provideTranslateService } from '@ngx-translate/core';
import { DebugElement} from '@angular/core';
import {  MOCK_ADDRESSES } from '../../../../shared/utilities/testing';
import { By } from '@angular/platform-browser';

describe('AddressCard', () => {
  let component: AddressCard;
  let fixture: ComponentFixture<AddressCard>;
  let de:DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressCard],
      providers:[provideTranslateService()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressCard);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.componentRef.setInput('userAddress',MOCK_ADDRESSES[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should trigger delete address on clicking the delete btn',()=>{
    const spy = vi.spyOn(component.deleteItem,'emit');
    const btn = de.query(By.css('.delete-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(MOCK_ADDRESSES[0]._id);
  })
});
