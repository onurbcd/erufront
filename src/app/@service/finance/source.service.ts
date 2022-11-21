import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Source, SourceFilter, SourceSave } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class SourceService extends ApiService<
  Source,
  SourceSave,
  SourceFilter,
  string
> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.FINANCE_SOURCE_URL);
  }

  getQueryParams(filter: SourceFilter): QueryParams {
    const queryParams = this.getDefaultQueryParams(filter);

    if (filter.incomeSourceId) {
      queryParams['incomeSourceId'] = filter.incomeSourceId;
    }

    if (filter.sourceType) {
      queryParams['sourceType'] = filter.sourceType;
    }

    if (filter.currencyType) {
      queryParams['currencyType'] = filter.currencyType;
    }

    return queryParams;
  }

  getStatus(active: boolean, property: string): Source {
    return this.getDefaultStatus(active);
  }
}
