import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Thinking } from '../interfaces/thinking';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThinkingService {
  private readonly API = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}
  list(numberPage: number): Observable<Thinking[]> {
    const itemsByPage = 0;
    let params = new HttpParams()
      .set('_page', numberPage)
      .set('_limit', itemsByPage);

    return this.http.get<Thinking[]>(this.API + '/thinkings', { params });
  }

  create(thinking: Thinking): Observable<Thinking> {
    return this.http.post<Thinking>(this.API + '/thinkings', thinking);
  }
  edit(thinking: Thinking): Observable<Thinking> {
    return this.http.put<Thinking>(
      `${this.API + '/thinkings'}/${thinking.id}`,
      thinking
    );
  }
  delete(id: number): Observable<Thinking> {
    return this.http.delete<Thinking>(`${this.API + '/thinkings'}/${id}`);
  }
  findById(id: number): Observable<Thinking> {
    return this.http.get<Thinking>(`${this.API + '/thinkings'}/${id}`);
  }
}
