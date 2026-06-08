import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach } from 'vitest';
import { ProductList } from './product-list';
import { ProductCard } from '../product-card/product-card';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';
import { DebugElement } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { productsInterface } from '../../models/products-interface';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { enviroments } from '../../../../../enviroments/enviroment';
import { ProductService } from '../../services/product-service';

describe('ProductList', () => {
  let fixture: ComponentFixture<ProductList>;
  let component: ProductList;
  let de: DebugElement;
  let prod!: productsInterface;
  let httpMock:HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList, ProductCard],
      providers: [provideRouter(routes), provideToastr(), provideTranslateService(),ProductService,provideHttpClient(),provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    httpMock = TestBed.inject(HttpTestingController);
    prod = {
      _id: 'ada',
      brand: { _id: 'daw', image: 'adwad', name: 'awd', slug: 'dwawd' },
      category: { _id: 'adw', image: 'ad', name: 'awd', slug: 'awdw' },
      createdAt: 'awd',
      description: 'daw',
      id: 'awd',
      imageCover: 'awd',
      images: [],
      price: 222,
      quantity: 23,
      ratingsAverage: 5,
      ratingsQuantity: 4,
      slug: 'awd',
      sold: 32,
      subcategory: [{ _id: 'adw', category: 'ad', name: 'daw', slug: 'ad' }],
      title: 'awd',
      updatedAt: 'awd',
    };
    fixture.detectChanges();
  });
  it('should create component',()=>{
    expect(component).toBeDefined();
  })
  it('should display product-card component', () => {
    const childComponent = de.nativeElement.querySelectorAll('product-card');
    expect(childComponent).toBeTruthy();
  });
  it('should display no products available msg', () => {
    component.products.set([]);
    fixture.detectChanges();
    const msg = de.query(By.css('.no-prods'));
    expect(msg).toBeTruthy();
    expect(msg?.nativeElement.textContent).toContain('No Products Found');
  });
  it('should retrieve products from api', async()=>{
    let prodReq = httpMock.expectOne(enviroments.baseurl+'products?page=1');
    let wishReq = httpMock.expectOne(enviroments.baseurl+'wishlist');
    let mockRes = prod;
    let mockRes2 = prod;
    await fixture.whenStable();
    fixture.detectChanges();
    prodReq.flush(mockRes);
    wishReq.flush(mockRes2);
    httpMock.verify();
  })

});
