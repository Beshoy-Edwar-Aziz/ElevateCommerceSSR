import { Component, DestroyRef, inject, OnInit, WritableSignal, Pipe, signal } from '@angular/core';
import { OrderService } from '../../../orders/services/order-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '../../../../core/auth/services/auth';
import { TokenInterface } from '../../../../core/auth/models/token-interface';
import { LoggedUserOrdersInterface } from '../../models/logged-user-orders-interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-orders',
  imports: [DatePipe,CurrencyPipe,TranslatePipe],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css',
})
export class UserOrders implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(Auth);
  private readonly destroy = inject(DestroyRef);
  userData!: TokenInterface;
  loggedUserOrdersList:WritableSignal<LoggedUserOrdersInterface[]>=signal<LoggedUserOrdersInterface[]>([]);
  getUserOrders(userId: string) {
    this.orderService
      .getLoggedUserOrders(userId)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (res) => {
          this.loggedUserOrdersList.set(res);
        },
      });
  }
  getUserId(): string {
    this.userData = this.authService.decodeToken(this.authService.getToken());
    return this.userData.id;
  }
  ngOnInit(): void {
    this.getUserOrders(this.getUserId());
  }
}
