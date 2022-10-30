import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CreateMonth, Day } from '@model';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class DayService {
  constructor(private httpClient: HttpClient) {}

  createMonth(createMonth: CreateMonth): Observable<void> {
    return this.httpClient.post<void>(this.getUrl(), createMonth);
  }

  getYearsAndMonths(): Observable<Day[]> {
    return this.httpClient.get<Day[]>(this.getUrl());
  }

  private getUrl(urlSuffix: string = ''): string {
    return `${environment.apiUri}${AppConstants.FINANCE_DAY_URL}${urlSuffix}`;
  }
}
