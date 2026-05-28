import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroment';
import { SignUpUser } from '../models/signupuser';
import { SignInUser } from '../models/sign-in-user';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenInterface } from '../models/token-interface';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly cookiesService = inject(CookieService);
  private readonly platform = inject(PLATFORM_ID);
  private readonly ssrService = inject(REQUEST);
  signUpUser(data: SignUpUser): Observable<any> {
    return this.httpClient.post(enviroments.baseurl + 'auth/signup', data);
  }
  signInUser(data: SignInUser): Observable<any> {
    return this.httpClient.post(enviroments.baseurl + 'auth/signin', data);
  }
  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post(enviroments.baseurl + 'auth/forgotPasswords', email);
  }
  verifyCode(resetCode:string):Observable<any>{
    return this.httpClient.post(enviroments.baseurl + 'auth/verifyResetCode',resetCode);
  }
  resetPassword(reset:{email:string,newPassword:string}):Observable<any>{
    return this.httpClient.put(enviroments.baseurl + 'auth/resetPassword',reset);
  }
  saveToken(userToken: string): void {
    this.cookiesService.set('authToken', userToken, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });
  }
  getToken(): string {
    if (isPlatformBrowser(this.platform)) {
      return this.cookiesService.get('authToken');
    } else {
      return this.ssrService?.headers.get('cookie')?.split('authToken=').join('') || '';
    }
  }
  isAuthenticated(): Observable<boolean | UrlTree>{
      return this.httpClient
        .get(enviroments.baseurl + 'auth/verifyToken', { headers: { token: this.getToken() } })
        .pipe(
          map(() => true),
          catchError(() => of(this.router.createUrlTree(['/auth/register']))),
        );
  }
  decodeToken(token: string) {
    return jwtDecode<TokenInterface>(token);
  }
  logOut() {
    this.cookiesService.delete('authToken', '/');
    this.router.navigate(['/auth/login']);
  }
}
