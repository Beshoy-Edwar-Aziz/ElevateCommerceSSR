import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerficationCode } from './verfication-code';

describe('VerficationCode', () => {
  let component: VerficationCode;
  let fixture: ComponentFixture<VerficationCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerficationCode],
    }).compileComponents();

    fixture = TestBed.createComponent(VerficationCode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
