import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';
import { ProductCard } from '../product-card/product-card';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';
import { DebugElement, Component } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService } from '@ngx-translate/core';
import { CartService } from '../../../cart/services/cart-service';

describe('ProductList', () => {
  let fixture: ComponentFixture<ProductList>;
  let component: ProductList;
  let de: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList, ProductCard],
      providers: [provideRouter(routes), provideToastr(), provideTranslateService()],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });
  it('should display product-card component', () => {
    const component = de.nativeElement.querySelectorAll('product-card');
    expect(component).toBeTruthy();
  });

});
