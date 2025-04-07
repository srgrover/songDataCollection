import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../../../core/models/song.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SongsApiService {
  URL = environment.API_URL ? `${environment.API_URL}/songs` : '';

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.URL);
  }

  getSong(id: number): Observable<Song> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Song>(url);
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.URL, song);
  }

  updateSong(id: number, song: Song): Observable<Song> {
    const url = `${this.URL}/${id}`;
    return this.http.put<Song>(url, song);
  }

  deleteSong(id: number): Observable<any> {
    const url = `${this.URL}/${id}`;
    return this.http.delete(url);
  }
}
