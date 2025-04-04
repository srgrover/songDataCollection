import { Song } from './../../core/models/song.model';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { initialSongsState, SongsState } from './songs.state';
import * as SongsActions from './../../../actions/songs.actions';

export const selectSongsFeatureState = createFeatureSelector<SongsState>('songs');

export const songsReducer = createReducer(
  initialSongsState,

  // Manejo de la carga inicial
  on(SongsActions.loadSongs, (state) => ({ ...state, loading: true, error: null })),
  on(SongsActions.loadSongsSuccess, (state, action) => ({
    ...state,
    songs: action.songs,
    loading: false,
    error: null,
  })),
  on(SongsActions.loadSongsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  // Manejo de la adición de canciones
  on(SongsActions.addSong, (state) => ({ ...state, loading: true, error: null })),
  on(SongsActions.addSongSuccess, (state, action) => ({
    ...state,
    songs: [...state.songs, action.song],
    loading: false,
    error: null,
  })),
  on(SongsActions.addSongFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  // Manejo de la actualización de canciones
  on(SongsActions.updateSong, (state) => ({ ...state, loading: true, error: null })),
  on(SongsActions.updateSongSuccess, (state, action) => ({
    ...state,
    songs: state.songs.map((song) =>
      song.id === +action.update.id ? action.update.changes as Song : song
    ),
    loading: false,
    error: null,
  })),
  on(SongsActions.updateSongFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  // Manejo del borrado de canciones
  on(SongsActions.deleteSong, (state) => ({ ...state, loading: true, error: null })),
  on(SongsActions.deleteSongSuccess, (state, action) => ({
    ...state,
    songs: state.songs.filter((song) => song.id !== +action.id),
    loading: false,
    error: null,
  })),
  on(SongsActions.deleteSongFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);

// Selectores para obtener partes específicas del estado
export const selectAllSongs = createSelector(selectSongsFeatureState, (state) => state.songs);
export const selectSongsLoading = createSelector(selectSongsFeatureState, (state) => state.loading);
export const selectSongsError = createSelector(selectSongsFeatureState, (state) => state.error);