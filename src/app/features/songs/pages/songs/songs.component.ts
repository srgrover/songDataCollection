import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Song } from '../../../../core/models/song.model';
import * as SongsActions from '../../../../../actions/songs.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as SongsSelectors from '../../../../store/songs/songs.reducer';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { SongCardComponent } from '../../components/song-card/song-card.component';

@Component({
  selector: 'app-songs',
  imports: [CommonModule, SongCardComponent, TranslocoModule],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css',
})
export class SongsComponent implements OnInit, OnDestroy {
  songs: Song[] = [];
  loaded = signal(false);

  songs$!: Observable<Song[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  private songsSubscription: Subscription | undefined;
  
  constructor(private store: Store) {
    this.store.dispatch(SongsActions.loadSongs()); // Despacha la acción para cargar las canciones
  }

  ngOnInit(): void {
    this.songs$ = this.store.select(SongsSelectors.selectAllSongs);
    this.loading$ = this.store.select(SongsSelectors.selectSongsLoading);
    this.error$ = this.store.select(SongsSelectors.selectSongsError);

    this.getSongs();
  }

  getSongs = () => {
    this.loaded.set(false);
    this.songsSubscription = this.songs$.subscribe({
      next: (songs) => this.songs = songs,
      error: (err) => {
        console.error(err); 
        this.loaded.set(true);
      },
      complete: () => this.loaded.set(true),
    });
  }

  delete = (id: string) => {
    this.store.dispatch(SongsActions.deleteSong({ id }));
  }

  ngOnDestroy(): void {
    if (this.songsSubscription) {
      this.songsSubscription.unsubscribe();
    }
  }
}
