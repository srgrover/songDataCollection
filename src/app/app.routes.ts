import { Routes } from '@angular/router';
import { SongsComponent } from './features/songs/pages/songs/songs.component';
import { SongComponent } from './features/songs/pages/song/song.component';
import { SongFormComponent } from './features/songs/pages/song-form/song-form.component';

export const routes: Routes = [
  { path: 'songs', component: SongsComponent },
  { path: 'songs/:id', component: SongComponent },
  {
    path: 'songs/new',
    component: SongFormComponent,
  },
  {
    path: 'songs/edit/:id',
    component: SongFormComponent,
  },
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  { path: '**', redirectTo: '/songs' },
];
