import { SongsApiService } from './../../features/songs/services/songs-api.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as SongsActions from './../../../actions/songs.actions';


@Injectable()
export class SongsEffects {
  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongsActions.loadSongs),
      switchMap(() =>
        this.songService.getSongs().pipe(
          map((songs) => SongsActions.loadSongsSuccess({ songs })),
          catchError((error) => of(SongsActions.loadSongsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private songService: SongsApiService) {}
}