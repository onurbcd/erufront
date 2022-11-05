import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncomeSource, IncomeSourceFilter, IncomeSourceSave } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class IncomeSourceService extends ApiService<
  IncomeSource,
  IncomeSourceSave,
  IncomeSourceFilter,
  string
> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.FINANCE_INCOME_SOURCE_URL);
  }

  getQueryParams(filter: IncomeSourceFilter): QueryParams {
    return this.getDefaultQueryParams(filter);
  }

  getStatus(active: boolean, property: string): IncomeSource {
    return this.getDefaultStatus(active);
  }
}
