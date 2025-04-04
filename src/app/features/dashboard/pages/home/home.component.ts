import { Component, OnInit } from '@angular/core';
import { Song } from '../../../../core/models/song.model';
import * as SongsActions from '../../../../../actions/songs.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as SongsSelectors from '../../../../store/songs/songs.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  songs: Song[] = [];

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

    this.songsSubscription = this.songs$.subscribe((songs) => {
      this.songs = songs;
      console.log("🔍 ~ ngOnInit ~ src/app/features/dashboard/pages/home/home.component.ts:34 ~ this.songs:", this.songs)
    });
  }

  delete(id: string) {
    this.store.dispatch(SongsActions.deleteSong({ id }));
  }

  ngOnDestroy(): void {
    if (this.songsSubscription) {
      this.songsSubscription.unsubscribe();
    }
  }
}
