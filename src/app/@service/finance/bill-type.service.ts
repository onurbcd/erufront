import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillType, BillTypeFilter } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class BillTypeService extends ApiService<
  BillType,
  BillTypeFilter,
  string
> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.FINANCE_BILL_TYPE_URL);
  }

  getQueryParams(filter: BillTypeFilter): QueryParams {
    return this.getDefaultQueryParams(filter);
  }

  getStatus(active: boolean): BillType {
    return this.getDefaultStatus(active);
  }
}
