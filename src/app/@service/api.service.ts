import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Page } from '@model';

export interface QueryParams {
  [name: string]: string | string[];
}

export abstract class ApiService<T, ID> {
  constructor(protected httpClient: HttpClient, public baseUrl: string) {}

  abstract getQueryParams(t: T): QueryParams;

  post(t: T, path: string = ''): Observable<T> {
    return this.httpClient.post<T>(
      `${environment.apiUri}${this.baseUrl}${path}`,
      t
    );
  }

  put(id: ID, t: T): Observable<T> {
    return this.httpClient.put<T>(
      `${environment.apiUri}${this.baseUrl}${id}`,
      t,
      {}
    );
  }

  save(id: ID, t: T): Observable<T> {
    return id == null ? this.post(t) : this.put(id, t);
  }

  delete(id: ID): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUri}${this.baseUrl}${id}`
    );
  }

  get(id: ID): Observable<T> {
    return this.httpClient.get<T>(`${environment.apiUri}${this.baseUrl}${id}`);
  }

  getAll(t: T, pageEvent: PageEvent, sort: Sort): Observable<Page<T>> {
    const queryParams = this.getQueryParams(t);
    const params = this.getHttpParams(queryParams, pageEvent, sort);

    return this.httpClient.get<Page<T>>(
      `${environment.apiUri}${this.baseUrl}`,
      {
        params,
      }
    );
  }

  private getHttpParams(
    queryParams: QueryParams,
    pageEvent: PageEvent,
    sort: Sort
  ): HttpParams {
    if (pageEvent) {
      queryParams['page'] = `${pageEvent.pageIndex}`;
      queryParams['size'] = `${pageEvent.pageSize}`;
    }

    queryParams['sort'] = sort.active;
    queryParams['direction'] = sort.direction.toUpperCase();
    return new HttpParams({ fromObject: queryParams });
  }
}
