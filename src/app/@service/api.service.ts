import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Filter, Page, Prime, Sequence, SwapPosition } from '@model';

export interface QueryParams {
  [name: string]: string | string[];
}

export abstract class ApiService<E extends Prime<ID>, F, ID> {
  constructor(protected httpClient: HttpClient, public baseUrl: string) {}

  abstract getQueryParams(filter: F): QueryParams;

  abstract getStatus(status: boolean, property: string): E;

  post(entity: E, path: string = ''): Observable<E> {
    return this.httpClient.post<E>(this.getUrl(path), entity);
  }

  put(id: ID, entity: E): Observable<E> {
    return this.httpClient.put<E>(this.getUrl(`${id}`), entity, {});
  }

  save(id: ID, entity: E): Observable<E> {
    return id == null ? this.post(entity) : this.put(id, entity);
  }

  delete(id: ID): Observable<void> {
    return this.httpClient.delete<void>(this.getUrl(`${id}`));
  }

  get(id: ID): Observable<E> {
    return this.httpClient.get<E>(this.getUrl(`${id}`));
  }

  getAll(filter: F, pageEvent: PageEvent, sort: Sort): Observable<Page<E>> {
    const queryParams = this.getQueryParams(filter);
    const params = this.getHttpParams(queryParams, pageEvent, sort);
    return this.httpClient.get<Page<E>>(this.getUrl(), { params });
  }

  patch(id: ID, entity: E): Observable<void> {
    return this.httpClient.patch<void>(this.getUrl(`${id}`), entity, {});
  }

  changeStatus(id: ID, value: boolean, property: string): Observable<void> {
    return this.patch(id, this.getStatus(value, property));
  }

  updateSequence(sequence: Sequence): Observable<void> {
    const queryParams: QueryParams = {};
    queryParams['direction'] = sequence.direction;
    const params = new HttpParams({ fromObject: queryParams });

    return this.httpClient.patch<void>(
      this.getUrl(`${sequence.id}/sequence`),
      null,
      { params }
    );
  }

  swapPosition(swapPosition: SwapPosition): Observable<void> {
    return this.httpClient.patch<void>(
      this.getUrl(`${swapPosition.id}/${swapPosition.target}/swap-position`),
      null,
      {}
    );
  }

  protected getDefaultQueryParams(filter: Filter): QueryParams {
    const queryParams: QueryParams = {};

    if (filter.search && filter.search.trim().length > 0) {
      queryParams['search'] = filter.search;
    }

    if (filter.active) {
      queryParams['active'] = `${filter.active}`;
    }

    return queryParams;
  }

  protected getDefaultStatus(active: boolean): E {
    const entity = {} as E;
    entity.active = active;
    return entity;
  }

  protected getUrl(urlSuffix: string = ''): string {
    return `${environment.apiUri}${this.baseUrl}${urlSuffix}`;
  }

  protected getParams(queryParams: QueryParams): HttpParams {
    return new HttpParams({ fromObject: queryParams });
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

    queryParams['sort'] = sort.active + ',' + sort.direction;
    return new HttpParams({ fromObject: queryParams });
  }
}
