import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private title = new BehaviorSubject<string>('');

  private title$ = this.title.asObservable();

  constructor(private translateService: TranslateService) {}

  setTitle(title: string): void {
    setTimeout(() => {
      this.title.next(this.translateService.instant(title));
    }, 0);
  }

  getTitle(): Observable<string> {
    return this.title$;
  }
}
