import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill, BillClose, BillFilter, BillOpen, BillSave } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class BillService extends ApiService<
  Bill,
  BillSave,
  BillFilter,
  string
> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.FINANCE_BILL_URL);
  }

  getQueryParams(filter: BillFilter): QueryParams {
    const queryParams = this.getDefaultQueryParams(filter);

    if (filter.referenceDayYear) {
      queryParams['referenceDayYear'] = `${filter.referenceDayYear}`;
    }

    if (filter.referenceDayMonth) {
      queryParams['referenceDayMonth'] = `${filter.referenceDayMonth}`;
    }

    if (filter.documentDateCalendarDate) {
      queryParams[
        'documentDateCalendarDate'
      ] = `${filter.documentDateCalendarDate}`;
    }

    if (filter.dueDateCalendarDate) {
      queryParams['dueDateCalendarDate'] = `${filter.dueDateCalendarDate}`;
    }

    if (filter.paymentDateCalendarDate) {
      queryParams[
        'paymentDateCalendarDate'
      ] = `${filter.paymentDateCalendarDate}`;
    }

    if (filter.billTypeId) {
      queryParams['billTypeId'] = filter.billTypeId;
    }

    if (filter.documentType) {
      queryParams['documentType'] = `${filter.documentType}`;
    }

    if (filter.paymentType) {
      queryParams['paymentType'] = `${filter.paymentType}`;
    }

    if (filter.sourceId) {
      queryParams['sourceId'] = filter.sourceId;
    }

    if (filter.referenceType) {
      queryParams['referenceType'] = `${filter.referenceType}`;
    }

    if (filter.closed != null && filter.closed != undefined) {
      queryParams['closed'] = `${filter.closed}`;
    }

    return queryParams;
  }

  getStatus(active: boolean, property: string): Bill {
    return this.getDefaultStatus(active);
  }

  openBill(billOpen: BillOpen, file: File): Observable<void> {
    billOpen.name = AppConstants.BOGUS_NAME;
    const formData = new FormData();

    formData.append(
      'billOpen',
      new Blob([JSON.stringify(billOpen)], { type: 'application/json' })
    );

    formData.append('billDocument', file);
    return this.http.post<void>(this.getUrl('/openBill'), formData);
  }

  closeBill(id: string, billClose: BillClose, file: File): Observable<void> {
    billClose.name = AppConstants.BOGUS_NAME;
    const formData = new FormData();

    formData.append(
      'billClose',
      new Blob([JSON.stringify(billClose)], { type: 'application/json' })
    );

    formData.append('receipt', file);
    return this.http.put<void>(this.getUrl(`/closeBill/${id}`), formData);
  }
}
