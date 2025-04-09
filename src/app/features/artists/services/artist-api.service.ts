import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../../../core/models/artist.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ArtistsApiService {
  URL = environment.API_URL ? `${environment.API_URL}/artists` : '';

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.URL);
  }

  getArtist(id: number): Observable<Artist> {
    const url = new URL(this.URL);
    url.searchParams.append('id', id.toString());
    return this.http.get<Artist>(url.href);
  }
  
  getArtistsById(ids: number[]): Observable<Artist[]> {
    const url = new URL(this.URL);
    ids.forEach(id => {
      url.searchParams.append('id', id.toString());   
    });
    return this.http.get<Artist[]>(url.href);
  }

  addArtist(song: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.URL, song);
  }

  updateArtist(id: number, song: Artist): Observable<Artist> {
    const url = `${this.URL}/${id}`;
    return this.http.put<Artist>(url, song);
  }

  deleteArtist(id: number): Observable<any> {
    const url = `${this.URL}/${id}`;
    return this.http.delete(url);
  }
}
