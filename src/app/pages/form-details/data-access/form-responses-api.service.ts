import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormResponse } from '../interfaces/form-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FormResponsesApiService {
  private readonly http = inject(HttpClient);
  private readonly URL = 'http://localhost:3000/responses';

  getResponsesByFormId(formId: number): Observable<IFormResponse[]> {
    return this.http.get<IFormResponse[]>(this.URL, { params: { formId } });
  }

  submitResponse(responseData: IFormResponse): Observable<IFormResponse> {
    return this.http.post<IFormResponse>(this.URL, responseData);
  }
}
