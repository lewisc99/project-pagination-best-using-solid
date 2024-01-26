// customer.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private baseUrl = 'https://localhost:7010'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getPaginatedData(filter: any): Observable<any> {
    const url = `${this.baseUrl}/api/persons`; // Adjust the URL as needed
    return this.http.post(url, filter);
  }
}
