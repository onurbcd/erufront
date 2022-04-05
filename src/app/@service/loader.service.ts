import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);

  private loading$ = this.loading.asObservable();

  constructor() {}

  setLoading(loading: boolean): void {
    setTimeout(() => {
      this.loading.next(loading);
    }, 0);
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
  }
}
