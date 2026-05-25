import { Routes } from '@angular/router';
import { Auth } from './core/layout/auth/components/auth/auth';
import { User } from './core/layout/user/components/user/user';
import { Register } from './core/auth/components/register/register';
import { authGuard } from './core/guard/auth-guard';
import { Home } from './features/home/components/home/home';
import { Login } from './core/auth/components/login/login';
import { NotFound } from './shared/components/not-found/not-found';
import { ProductList } from './features/products/components/product-list/product-list';
import { verifiedAccessGuard } from './core/guard/verified-access-guard';
import { ProductDetails } from './features/products/components/product-details/product-details';
import { AllOrders } from './features/orders/components/all-orders/all-orders';
import { ordersGuard } from './core/guard/orders-guard';
import { Brand } from './features/brand/components/brand/brand';
import { WishList } from './features/wishlist/components/wish-list/wish-list';
import { UserOrders } from './features/profile/components/user-orders/user-orders';
import { UserInfo } from './features/profile/components/user-info/user-info';
import { ForgotPassword } from './core/auth/components/forgot-password/forgot-password';
import { VerficationCode } from './core/auth/components/verfication-code/verfication-code';
import { ResetPassword } from './core/auth/components/reset-password/reset-password';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'auth',
    component: Auth,
    canActivate: [verifiedAccessGuard],
    children: [
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: Register, title: 'Register' },
      { path: 'login', component: Login, title: 'Login' },
      { path: 'forgotPassword', component: ForgotPassword, title: 'Forgot Password' },
      { path: 'verify', component: VerficationCode, title: 'Verification' },
      { path: 'resetPassword', component: ResetPassword, title: 'Reset Your Password' },
    ],
  },
  {
    path: 'user',
    component: User,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home, title: 'Home' },
      { path: 'product', component: ProductList, title: 'Products' },
      { path: 'productDetail/:id', component: ProductDetails },
      { path: 'brand', component: Brand, title: 'Brands' },
      { path: 'wishlist', component: WishList, title: 'WishList' },
    ],
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/components/profile/profile').then((m) => m.Profile),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'userOrders' },
      { path: 'userOrders', component: UserOrders, title: 'Your Orders' },
      { path: 'userInfo', component: UserInfo, title: 'User Profile' },
    ],
  },
  {
    path: 'allorders',
    component: AllOrders,
    title: 'Checkout',
    canActivate: [authGuard, ordersGuard],
  },
  { path: '**', component: NotFound, title: 'Not Found' },
];
