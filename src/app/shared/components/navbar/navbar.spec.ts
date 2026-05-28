import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it } from 'vitest';
import { Navbar } from './navbar';
import { DebugElement } from '@angular/core';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
let fixture:ComponentFixture<Navbar>;
let de:DebugElement;
let el:HTMLElement;
let component:Navbar;
let toastr : ToastrService;
describe('Navbar',()=>{
  beforeEach(async()=>{
     await TestBed.configureTestingModule({
      imports:[Navbar],
      providers:[ToastrService, provideToastr(), provideRouter(routes)]
    }).compileComponents();
    toastr = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(Navbar); // creating a fixture of component
    de = fixture.debugElement; // accessing DOM
    el = de.nativeElement; // access DOM API
    component = fixture.componentInstance; // Accessing properties inside component
    fixture.detectChanges();
  })
  it('Should Create Component',()=>{
    expect(fixture.componentInstance).toBeDefined();
  })
  it('Should Create Nav Element',()=>{
    const nav = el.querySelector('nav');
    expect(nav).toBeDefined();
  })
})
