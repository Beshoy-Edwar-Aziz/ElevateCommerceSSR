import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { loadInterceptor } from './core/interceptors/load-interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler-interceptor';
import {provideTranslateService, provideTranslateLoader} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(withEventReplay()),
    provideToastr({ progressBar: true, timeOut: 2000 }),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadInterceptor, authInterceptor, errorHandlerInterceptor]),
    ),
    provideTranslateService({
      loader:provideTranslateHttpLoader({
        prefix:'./i18n/',
        suffix:'.json'
      }),
      fallbackLang:'en',
      lang:'en'
    })
  ],
};
