import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../auth/services/auth';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const authService = inject(Auth);
  return next(req).pipe(catchError((err)=>{
    if(authService.getToken()!=''){
    return throwError(()=>toastrService.error(err.error.message,"Error"));
    }
    return throwError(()=>err.error.message);
  }));
};
