import { createAction, props } from '@ngrx/store';
import { Song } from './../app/core/models/song.model';
export const loadSongs = createAction('[Songs] Load Songs');

export const loadSongsSuccess = createAction(
  '[Songs] Load Songs Success',
  props<{ songs: Song[] }>()
);

export const loadSongsFailure = createAction(
  '[Songs] Load Songs Failure',
  props<{ error: any }>()
);

export const addSong = createAction('[Songs] Add Song', props<{ song: Song }>());

export const addSongSuccess = createAction(
  '[Songs] Add Song Success',
  props<{ song: Song }>()
);

export const addSongFailure = createAction(
  '[Songs] Add Song Failure',
  props<{ error: any }>()
);

export const updateSong = createAction(
  '[Songs] Update Song',
  props<{ song: Song }>()
);

export const updateSongSuccess = createAction(
  '[Songs] Update Song Success',
  props<{ update: { id: string; changes: Partial<Song> } }>()
);

export const updateSongFailure = createAction(
  '[Songs] Update Song Failure',
  props<{ error: any }>()
);

export const deleteSong = createAction(
  '[Songs] Delete Song',
  props<{ id: string }>()
);

export const deleteSongSuccess = createAction(
  '[Songs] Delete Song Success',
  props<{ id: string }>()
);

export const deleteSongFailure = createAction(
  '[Songs] Delete Song Failure',
  props<{ error: any }>()
);