import { Song } from '../../core/models/song.model';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface SongsState extends EntityState<Song> {
  songs: Song[];
  loading: boolean;
  error: any;
}

export const songsAdapter = createEntityAdapter<Song>();

export const initialSongsState: SongsState = songsAdapter.getInitialState({
  songs: [],
  loading: false,
  error: null
});
