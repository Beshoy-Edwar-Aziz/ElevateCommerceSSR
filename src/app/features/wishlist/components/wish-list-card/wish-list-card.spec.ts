import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListCard } from './wish-list-card';

describe('WishListCard', () => {
  let component: WishListCard;
  let fixture: ComponentFixture<WishListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishListCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WishListCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
