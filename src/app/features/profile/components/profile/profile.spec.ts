import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile } from './profile';
import { provideToastr } from 'ngx-toastr';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { provideTranslateService } from '@ngx-translate/core';
import { Mocked } from 'vitest';
import { CartService } from '../../../cart/services/cart-service';
import { MOCK_CART } from '../../../../shared/utilities/testing';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;
  let mockCartService:Partial<Mocked<CartService>>;
  beforeEach(async () => {
    mockCartService = {
      getLoggedUserCart:vi.fn().mockReturnValue(of(MOCK_CART))
    }
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers:[provideToastr(),{provide:ActivatedRoute,useValue:{
        paramMap:of(convertToParamMap({})),
        params:of({}),
        queryParams:of({}),
        fragment:of(null)
      }},provideTranslateService(),{provide:CartService,useValue:mockCartService}]
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
