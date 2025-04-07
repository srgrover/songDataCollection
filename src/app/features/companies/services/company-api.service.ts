import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Company } from '../../../core/models/company.model';

@Injectable({
  providedIn: 'root'
})

export class CompanyApiService {
  URL = environment.API_URL ? `${environment.API_URL}/companies` : '';

  constructor(private http: HttpClient) { }

  getCompanys(): Observable<Company[]> {
    return this.http.get<Company[]>(this.URL);
  }

  getCompany(id: number): Observable<Company> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Company>(url);
  }

  getCompaniesBySongId(songId: number): Observable<Company[]> {
    return this.http.get<Company[]>(this.URL).pipe(
      map(companies => {
        return companies.filter(company => {
          return Array.isArray(company.songs) && company.songs.some(id => Number(id) === Number(songId));
        });
      })
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.URL, company);
  }

  updateCompany(id: number, company: Company): Observable<Company> {
    const url = `${this.URL}/${id}`;
    return this.http.put<Company>(url, company);
  }

  deleteCompany(id: number): Observable<any> {
    const url = `${this.URL}/${id}`;
    return this.http.delete(url);
  }
}
