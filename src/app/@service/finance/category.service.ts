import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryFilter, CategorySave } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ApiService<
  Category,
  CategorySave,
  CategoryFilter,
  string
> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.FINANCE_CATEGORY_URL);
  }

  getQueryParams(filter: CategoryFilter): QueryParams {
    const queryParams = this.getDefaultQueryParams(filter);

    if (filter.parentId && filter.parentId.trim().length > 0) {
      queryParams['parentId'] = filter.parentId;
    }

    if (filter.level) {
      queryParams['level'] = `${filter.level}`;
    }

    if (filter.lastBranch != null && filter.lastBranch != undefined) {
      queryParams['lastBranch'] = `${filter.lastBranch}`;
    }

    return queryParams;
  }

  getStatus(active: boolean, property: string): Category {
    return this.getDefaultStatus(active);
  }
}
