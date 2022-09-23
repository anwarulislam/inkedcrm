import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
  errorMessage = '';
  // logout = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          this.errorMessage = error.error.Message;
          this.authService.logout();
          this.authService.clearStorage();
          this.router.navigateByUrl('');
          this.openSnackBar(this.errorMessage);
        } else if (error.status === 400) {
          this.errorMessage = error.error.Message;
          this.openSnackBar(this.errorMessage);
        } else {
          this.errorMessage = error.error.Message;
          this.openSnackBar(this.errorMessage);
        }
        return throwError(error);
      })
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close');
  }

  showErrorMessage(message: string) {
    Swal.fire(message, '', 'error').then((result) => {
      // if (this.logout) {
      //   if (result.isConfirmed) {
      //     sessionStorage.clear();
      //     this.router.navigateByUrl('/auth/login');
      //   }
      // }
    });
  }
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true },
];
