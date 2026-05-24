import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  imports: [],
  templateUrl: './language.html',
  styleUrl: './language.css',
})
export class Language implements OnInit {
  private readonly platform = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  currentLang = signal(localStorage.getItem('lang') || 'en');
  switchLang(lang: string): void {
    if (isPlatformBrowser(this.platform)) {
      this.translate.use(lang);
      this.translate.get(lang);
      this.currentLang.set(lang);
      localStorage.setItem('lang', this.currentLang());
      if (this.currentLang() === 'ar') {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
      }
    }
  }
  ngOnInit(): void {
    if (this.currentLang() === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }
  }
}
