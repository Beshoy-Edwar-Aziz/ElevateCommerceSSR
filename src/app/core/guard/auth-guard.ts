import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../auth/services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  return authService.isAuthenticated();
};
