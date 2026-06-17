import { productSample, WishList } from './testing-data';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach } from 'vitest';
import { ProductCard } from './product-card';
import { DebugElement } from '@angular/core';
import { productsInterface } from '../../models/products-interface';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;
  let de: DebugElement;
  let productId: string = 'awdawd';
  const product: productsInterface = productSample;
  const wish:productsInterface[] = WishList;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter(routes), provideTranslateService()],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.componentRef.setInput('product', product);
    fixture.componentRef.setInput('wishList',wish);
    fixture.detectChanges();
  });
  it('should create component', () => {
    expect(component).toBeDefined();
  });
  it('should emit value of product id', () => {
    const addWishListSpy = vi.spyOn(component.productIdForWishList, 'emit');
    const btn = de.query(By.css('.wish-btn'));
    btn?.nativeElement.click();
    fixture.detectChanges();
    expect(addWishListSpy).toHaveBeenCalledWith(productId);
    expect(addWishListSpy).toHaveBeenCalledOnce();
  });
  it('should emit value of id for onAddToCart', () => {
    const addProductToCartSpy = vi.spyOn(component.productId, 'emit');
    const btn = de.query(By.css('.prod-btn'));
    btn?.nativeElement.click();
    fixture.detectChanges();
    expect(addProductToCartSpy).toHaveBeenCalledWith(productId);

    expect(addProductToCartSpy).toHaveBeenCalledOnce();
  });
  it('should invoke isProduct() on wishlist element class', () => {
    const isProductSpyOn = vi.spyOn(component, 'isProducts');
    fixture.detectChanges();
    expect(isProductSpyOn).toHaveBeenCalledTimes(2);
  });
  it('should add class fa-solid to wishlist btn', ()=>{
     vi.spyOn(component,'isProducts').mockReturnValue(true);
    const btn = de.query(By.css('.wish-btn'));
    const data = component.isProducts();
    fixture.detectChanges();
    expect(data).toBe(true);

  })
});
