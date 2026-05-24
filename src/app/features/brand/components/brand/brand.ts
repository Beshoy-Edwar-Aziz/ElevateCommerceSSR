import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandService } from '../../services/brand-service';
import { brandInterface } from '../../models/brand-interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brand',
  imports: [TranslatePipe],
  templateUrl: './brand.html',
  styleUrl: './brand.css',
})
export class Brand implements OnInit {
  private readonly brandService = inject(BrandService);
  brandList:WritableSignal<brandInterface>= signal<brandInterface>({} as brandInterface);
  getBrands(){
    this.brandService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandList.set(res);
      }
    })
  }
  ngOnInit(): void {
    this.getBrands();
  }
}
