import { SpinnerService } from './spinner.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();


    let idToken = localStorage.getItem("id_token");

    if (idToken) {
      let cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });
      return next.handle(cloned).pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        catchError((err: HttpErrorResponse) => {
          localStorage.clear();
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
          return throwError(err);
        })
      );
    }
    else {
      localStorage.clear();
      return next.handle(request).pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
          return throwError(err);
        })


      );
    }
  }


}
