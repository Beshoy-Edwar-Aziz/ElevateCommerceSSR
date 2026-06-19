import { of, Subject, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { provideTranslateService } from '@ngx-translate/core';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { DebugElement, DestroyRef } from '@angular/core';
import { Mocked } from 'vitest';
import { ProductService } from '../../../products/services/product-service';
import { MOCK_CATEGORIES, MOCK_PRODS } from '../../../../shared/utilities/testing';
import { CategoriesService } from '../../../categories/services/categories-service';
import { WishListService } from '../../../wishlist/services/wish-list-service';
import { By } from '@angular/platform-browser';
import { ProductCarousel } from '../product-carousel/product-carousel';
import { CategoriesCarousel } from '../categories-carousel/categories-carousel';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let de:DebugElement;
  let mockProductService:Partial<Mocked<ProductService>>;
  let mockCategoriesService:Partial<Mocked<CategoriesService>>;
  let mockWishListService:Partial<Mocked<WishListService>>

  beforeEach(async () => {
    mockProductService = {
      getProducts:vi.fn().mockReturnValue(of({data:MOCK_PRODS}))
    };
    mockCategoriesService = {
      getAllCategories:vi.fn().mockReturnValue(of({data:MOCK_CATEGORIES}))
    }
    mockWishListService = {
      getWishList:vi.fn().mockReturnValue(of(MOCK_PRODS))
    }

    await TestBed.configureTestingModule({
      imports: [Home],
      providers:[provideTranslateService(),provideToastr(),provideRouter([]),{provide:ProductService,useValue:mockProductService},
      {provide:CategoriesService,useValue:mockCategoriesService},{provide:WishListService,useValue:mockWishListService},
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    de = fixture.debugElement;

  });

  it('should create and initalize products and categories', () => {
    fixture.detectChanges();
    expect(mockProductService.getProducts).toHaveBeenCalledOnce();
    expect(mockCategoriesService.getAllCategories).toHaveBeenCalledOnce();
    expect(component).toBeTruthy();
  });
  it('should have length',()=>{
    fixture.detectChanges();
    expect(component.products().length).toBe(MOCK_PRODS.length);
    expect(component.categories().length).toBe(MOCK_CATEGORIES.length);
    const productInst = de.query(By.directive(ProductCarousel)).componentInstance;
    const categoriesInst = de.query(By.directive(CategoriesCarousel)).componentInstance;
    expect(productInst.productData).toBe(MOCK_PRODS);
    expect(categoriesInst.categoriesList).toBe(MOCK_CATEGORIES);
  });
  it('should destroy products and categories',()=>{
    const prod = new Subject<{data:any[]}>();
    const cat = new Subject<{data:any[]}>();
    mockProductService.getProducts?.mockReturnValue(prod);
    mockCategoriesService.getAllCategories?.mockReturnValue(cat);
    component.getAllProds();
    fixture.destroy();
    prod.next({data:MOCK_PRODS});
    cat.next({data:MOCK_CATEGORIES});
    expect(component.products()).toEqual([]);
    expect(component.categories()).toEqual([]);
  });
  it('should handle error',()=>{
    mockProductService.getProducts?.mockReturnValue(throwError(()=>new Error('Token is null')));
    const spy = vi.spyOn(console,'log').mockImplementation(()=>{});
    component.getAllProds();
    expect(spy).toHaveBeenCalledOnce();
    expect(component.products()).toEqual([]);
  });
});
