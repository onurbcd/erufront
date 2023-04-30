import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  constructor(private httpClient: HttpClient) {}

  getFile(id: string): Observable<Blob> {
    return this.httpClient.get(this.getUrl(`/${id}`), { responseType: 'blob' });
  }

  private getUrl(urlSuffix: string = ''): string {
    return `${environment.apiUri}${AppConstants.DOCUMENT_URL}${urlSuffix}`;
  }
}
