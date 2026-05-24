import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../auth/services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  if (
    req.url.includes('auth') ||
    req.url.includes('cart') ||
    req.url.includes('orders') ||
    req.url.includes('reviews') ||
    req.url.includes('wishlist') ||
    req.url.includes('addresses')
  ) {
    req = req.clone({
      setHeaders: {
        token: authService.getToken(),
      },
    });
  }
  return next(req);
};
