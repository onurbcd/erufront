import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret, SecretFilter } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class SecretService extends ApiService<Secret, SecretFilter, string> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.VAULT_SECRET_BASE_URL);
  }

  getQueryParams(filter: SecretFilter): QueryParams {
    return this.getDefaultQueryParams(filter);
  }

  getStatus(active: boolean): Secret {
    return this.getDefaultStatus(active);
  }
}
