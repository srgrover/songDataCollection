import { ApplicationConfig, isDevMode  } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';

import { TranslocoHttpLoader } from './transloco-loader';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { AvailablesLanguajes, Languages } from '../../transloco.config';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { SongsEffects } from './store/songs/songs.effects';
import { songsReducer } from './store/songs/songs.reducer';
import { menuReducer } from './store/ui/menu.reducer';

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideTransloco({
        config: {
            availableLangs: AvailablesLanguajes,
            defaultLang: Languages.ES,
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader,
    }),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
        },
    }),
    provideStore({ songs: songsReducer, menu: menuReducer }),
    provideEffects([SongsEffects])
]
};
