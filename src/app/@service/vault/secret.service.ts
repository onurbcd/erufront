import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Secret } from '@model';
import { ApiService, QueryParams } from '@service/api.service';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class SecretService extends ApiService<Secret, string> {
  constructor(protected http: HttpClient) {
    super(http, AppConstants.VAULT_SECRET_BASE_URL);
  }

  getQueryParams(secret: Secret): QueryParams {
    throw new Error('Method not implemented.');
  }
}
