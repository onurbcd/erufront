import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Balance, BalanceFilter, BalanceSave, BalanceSum } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class BalanceService extends ApiService<
  Balance,
  BalanceSave,
  BalanceFilter,
  string
> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.FINANCE_BALANCE_URL);
  }

  getQueryParams(filter: BalanceFilter): QueryParams {
    const queryParams = this.getDefaultQueryParams(filter);

    if (filter.dayCalendarDate) {
      queryParams['dayCalendarDate'] = `${filter.dayCalendarDate}`;
    }

    if (filter.sourceId) {
      queryParams['sourceId'] = filter.sourceId;
    }

    if (filter.categoryId) {
      queryParams['categoryId'] = filter.categoryId;
    }

    if (filter.balanceType) {
      queryParams['balanceType'] = `${filter.balanceType}`;
    }

    if (filter.dayCalendarYear) {
      queryParams['dayCalendarYear'] = `${filter.dayCalendarYear}`;
    }

    if (filter.dayCalendarMonth) {
      queryParams['dayCalendarMonth'] = `${filter.dayCalendarMonth}`;
    }

    if (filter.dayCalendarDayInMonth) {
      queryParams['dayCalendarDayInMonth'] = `${filter.dayCalendarDayInMonth}`;
    }

    return queryParams;
  }

  getStatus(active: boolean, property: string): Balance {
    return this.getDefaultStatus(active);
  }

  saveBalance(
    id: string,
    balance: BalanceSave,
    files: FileList
  ): Observable<void> {
    balance.name = AppConstants.BALANCE_NAME;
    const formData = new FormData();

    formData.append(
      'balance',
      new Blob([JSON.stringify(balance)], { type: 'application/json' })
    );

    if (files.length > 0) {
      formData.append('documents', files[0]);
    }

    return id == null
      ? this.http.post<void>(this.getUrl('/save'), formData)
      : this.http.put<void>(this.getUrl(`/save/${id}`), formData);
  }

  getSum(balanceFilter: BalanceFilter): Observable<BalanceSum[]> {
    const queryParams = this.getQueryParams(balanceFilter);
    const params = this.getParams(queryParams);
    return this.httpClient.get<BalanceSum[]>(this.getUrl('/sum'), { params });
  }
}
