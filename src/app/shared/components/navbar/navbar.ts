import {
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  input,
  OnInit,
  ViewChild,
  signal,
  Signal,
} from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite';
import { Drawer, initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartList } from '../../../features/cart/components/cart-list/cart-list';
import { CartService } from '../../../features/cart/services/cart-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '../../../core/auth/services/auth';
import { ToastrService } from 'ngx-toastr';
import { Language } from '../language/language';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CartList, Language, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  @Input({ required: true }) layout!: string;
  @ViewChild('drawer') drawerEl!: ElementRef;
  private readonly cartService = inject(CartService);
  private readonly authService = inject(Auth);
  private readonly toastrService = inject(ToastrService);
  private destroy = inject(DestroyRef);
  cartNavBarCounter: Signal<Number> = computed(() => this.cartService.cartCounter());
  constructor(private flowBite: FlowbiteService) {}
  ngOnInit(): void {
    this.flowBite.loadFlowbite(() => {
      initFlowbite();
    });
    this.cartService
      .getLoggedUserCart()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (res) => {
          this.cartService.cartCounter?.set(res.numOfCartItems);
        },
      });
  }
  openDrawer() {
    setTimeout(() => {
      this.drawerEl?.nativeElement?.classList?.toggle('-translate-x-full');
    }, 500);
  }
  closeDrawer() {
    setTimeout(() => {
      this.drawerEl?.nativeElement?.classList?.toggle('-translate-x-full');
    }, 500);
    console.log('false');
  }
  logOut() {
    this.authService.logOut();
    this.toastrService.success('Successfully Logged Out', 'Success');
  }
}
