import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QueryService {
  private apiUrl = 'http://localhost:3000/api/query';

  constructor(private http: HttpClient) {}

  runQuery(query: string) {
    return this.http.post<any[]>(this.apiUrl, { query });
  }
}
