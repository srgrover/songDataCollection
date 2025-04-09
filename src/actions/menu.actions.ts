import { createAction, props } from '@ngrx/store';

export const isMenuOpen = createAction('[menu] is menu open');

export const openSideMenu = createAction(
  '[menu] menu open',
  props<{ isSideMenuOpen: boolean }>()
);

export const toggleSideMenu = createAction(
  '[menu] toggle menu',
  props<{ isSideMenuOpen: boolean }>()
);

export const closeSideMenu = createAction(
  '[menu] menu closed',
  props<{ isSideMenuOpen: boolean }>()
);
