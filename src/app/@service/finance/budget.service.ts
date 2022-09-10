import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget, BudgetFilter, CopyBudget, Ref, Sum } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class BudgetService extends ApiService<Budget, BudgetFilter, string> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.FINANCE_BUDGET_URL);
  }

  getQueryParams(filter: BudgetFilter): QueryParams {
    const queryParams = this.getDefaultQueryParams(filter);

    if (filter.refYear) {
      queryParams['refYear'] = `${filter.refYear}`;
    }

    if (filter.refMonth) {
      queryParams['refMonth'] = `${filter.refMonth}`;
    }

    if (filter.billTypeId) {
      queryParams['billTypeId'] = filter.billTypeId;
    }

    if (filter.paid) {
      queryParams['paid'] = `${filter.paid}`;
    }

    return queryParams;
  }

  getStatus(status: boolean, property: string): Budget {
    const budget = {} as Budget;

    if (property === 'active') {
      budget.active = status;
    } else if (property === 'paid') {
      budget.paid = status;
    }

    return budget;
  }

  getSumByMonth(budgetFilter: BudgetFilter): Observable<Sum[]> {
    const queryParams: QueryParams = {};
    queryParams['refYear'] = `${budgetFilter.refYear}`;
    queryParams['refMonth'] = `${budgetFilter.refMonth}`;
    const params = this.getParams(queryParams);
    return this.httpClient.get<Sum[]>(this.getUrl('sum-month'), { params });
  }

  copy(copyBudget: CopyBudget): Observable<void> {
    return this.httpClient.post<void>(this.getUrl('copy'), copyBudget);
  }

  deleteAll(ref: Ref): Observable<void> {
    return this.httpClient.delete<void>(
      this.getUrl(`${ref.year}/${ref.month}/all`)
    );
  }
}
