import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Page } from '@model';

export interface QueryParams {
  [name: string]: string | string[];
}

export abstract class ApiService<E, F, ID> {
  constructor(protected httpClient: HttpClient, public baseUrl: string) {}

  abstract getQueryParams(filter: F): QueryParams;

  post(entity: E, path: string = ''): Observable<E> {
    return this.httpClient.post<E>(
      `${environment.apiUri}${this.baseUrl}${path}`,
      entity
    );
  }

  put(id: ID, entity: E): Observable<E> {
    return this.httpClient.put<E>(
      `${environment.apiUri}${this.baseUrl}${id}`,
      entity,
      {}
    );
  }

  save(id: ID, entity: E): Observable<E> {
    return id == null ? this.post(entity) : this.put(id, entity);
  }

  delete(id: ID): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUri}${this.baseUrl}${id}`
    );
  }

  get(id: ID): Observable<E> {
    return this.httpClient.get<E>(`${environment.apiUri}${this.baseUrl}${id}`);
  }

  getAll(filter: F, pageEvent: PageEvent, sort: Sort): Observable<Page<E>> {
    const queryParams = this.getQueryParams(filter);
    const params = this.getHttpParams(queryParams, pageEvent, sort);

    return this.httpClient.get<Page<E>>(
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
