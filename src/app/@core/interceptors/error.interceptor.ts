import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '@service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let errorMessage = '';

        if (httpErrorResponse.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = httpErrorResponse.error.message;
        } else if (httpErrorResponse.error) {
          // server-side error
          errorMessage =
            httpErrorResponse.error.message || httpErrorResponse.message;
          this.toastService.showError(errorMessage);
        } else {
          errorMessage = httpErrorResponse.toString();
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
