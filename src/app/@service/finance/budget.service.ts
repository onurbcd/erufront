import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget, BudgetFilter } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
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

  getStatus(status: boolean): Budget {
    throw new Error('Method not implemented.');
  }
}
