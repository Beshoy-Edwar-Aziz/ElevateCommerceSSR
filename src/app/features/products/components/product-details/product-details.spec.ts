import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetails } from './product-details';
import { provideToastr } from 'ngx-toastr';
import { MOCK_SPECIFIC_PRODUCT } from '../../../../shared/utilities/testing';
import { of } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { CartService } from '../../../cart/services/cart-service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Mocked } from 'vitest';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;
  let de:DebugElement;
  let mockProductServices: Partial<Mocked<ProductService>>;
  let mockCartService: Partial<Mocked<CartService>>;
  beforeEach(async () => {
    mockProductServices = {
      getSpecificProduct: vi.fn().mockReturnValue(of({ data: MOCK_SPECIFIC_PRODUCT })),
    };
    mockCartService = {
      AddProductToCart: vi.fn().mockReturnValue(of()),
    };
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideToastr(),
        { provide: ProductService, useValue: mockProductServices },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '6428ebc6dc1175abc65ca0b9' })),
            params: of({ id: '6428ebc6dc1175abc65ca0b9' }),
            queryParams: of({}),
            fragment: of(null),
          },
        },
        { provide: CartService, useValue: mockCartService },
        provideTranslateService(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call specific Product', async () => {
    expect(mockProductServices.getSpecificProduct).toHaveBeenCalledOnce();
    expect(mockProductServices.getSpecificProduct).toHaveBeenCalledWith(MOCK_SPECIFIC_PRODUCT.id);
  });
  it('should call addtocart on pressing the add to cart btn',()=>{
    const btn = de.query(By.css('.add-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(mockCartService.AddProductToCart).toHaveBeenCalledOnce();
    expect(mockCartService.AddProductToCart).toHaveBeenCalledWith(MOCK_SPECIFIC_PRODUCT.id);
  })
});
