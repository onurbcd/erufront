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
          errorMessage = this.getServerSideErrorMessage(httpErrorResponse);
          this.toastService.showError(errorMessage);
        } else {
          errorMessage = httpErrorResponse.toString();
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private getServerSideErrorMessage(
    httpErrorResponse: HttpErrorResponse
  ): string {
    let errorMessage = 'Unable to identify the cause of the server-side error.';

    if (httpErrorResponse.error) {
      errorMessage = this.getServerSideCustomErrorMessage(
        httpErrorResponse.error
      );
    } else if (httpErrorResponse.message) {
      errorMessage = httpErrorResponse.message;
    }

    return errorMessage;
  }

  private getServerSideCustomErrorMessage(error: any): string {
    let errorMessage = 'Unable to identify the cause of the server-side error (custom).';

    if (error.message) {
      errorMessage = error.message;
    }

    if (error.errors && error.errors.length > 0) {
      errorMessage = errorMessage + '. Errors: ' + error.errors.join(', ');
    }

    return errorMessage;
  }
}
