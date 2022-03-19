import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export abstract class ApiService {
  constructor(protected httpClient: HttpClient, public baseUrl: string) {}

  post(t: any, path: string = ''): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUri}${this.baseUrl}${path}`,
      t
    );
  }

  get(path: string = ''): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUri}${this.baseUrl}${path}`
    );
  }
}
