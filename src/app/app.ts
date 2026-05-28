import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ecommerceProject');
  protected readonly translate = inject(TranslateService);
  protected readonly platform = inject(PLATFORM_ID);
  ngOnInit(){
    if(isPlatformBrowser(this.platform)){
      const storedLang:string|null = localStorage.getItem('lang')
      if(storedLang){
        this.translate.use(storedLang)
      }else{
        const defLang:string = 'en';
        this.translate.use(defLang);
        localStorage.setItem('lang',defLang);
      }
    }
  }
}
