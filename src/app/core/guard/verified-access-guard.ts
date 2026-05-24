import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../auth/services/auth';

export const verifiedAccessGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth)
  const router = inject(Router)
  if(authService.getToken()){
    router.navigate(['/user/home']);
    return false;
  }
return true
};
