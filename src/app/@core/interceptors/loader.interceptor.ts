import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '@service';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<unknown>[] = [];

  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.requests.push(request);
    this.loaderService.isLoading.next(true);

    return new Observable((observable) => {
      const subscription = next.handle(request).subscribe({
        next: (value) => {
          if (value instanceof HttpResponse) {
            this.removeRequest(request);
            observable.next(value);
          }
        },
        error: (err) => {
          this.removeRequest(request);
          observable.error(err);
        },
        complete: () => {
          this.removeRequest(request);
          observable.complete();
        },
      });

      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }

  private removeRequest(request: HttpRequest<unknown>): void {
    const index = this.requests.indexOf(request);
    this.requests.splice(index, 1);
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
}
