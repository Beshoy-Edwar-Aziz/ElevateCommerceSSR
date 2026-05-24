import { DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CartService } from '../../features/cart/services/cart-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

 export const ordersGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  return cartService.isThereCartItems();
};
