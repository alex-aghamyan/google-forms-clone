import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormFromApi } from '../../../core/interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class FormsApiService {
  private readonly http = inject(HttpClient);
  private readonly URL = 'http://localhost:3000/forms';

  getForms(): Observable<IFormFromApi[]> {
    return this.http.get<IFormFromApi[]>(this.URL);
  }

  getFormById(formId: string): Observable<IFormFromApi> {
    return this.http.get<IFormFromApi>(`${this.URL}/${formId}`);
  }

  createFrom(form: Omit<IFormFromApi, 'id'>): Observable<IFormFromApi> {
    return this.http.post<IFormFromApi>(this.URL, form);
  }

  deleteFormById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
