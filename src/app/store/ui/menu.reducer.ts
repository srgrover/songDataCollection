import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as MenuActions from './../../../actions/menu.actions';
import { initialMenuState, MenuState } from './menu.state';
import { isMenuOpen } from '../../../actions/menu.actions';

export const selectMenuFeatureState = createFeatureSelector<MenuState>('menu');

export const menuReducer = createReducer(
  initialMenuState,

  // Manejo de la carga inicial
  on(MenuActions.isMenuOpen, (state) => ({ ...state })),
  
  
  on(MenuActions.openSideMenu, (state) => ({
    ...state,
    isSideMenuOpen: true,
  })),

  on(MenuActions.closeSideMenu, (state) => ({
    ...state,
    isSideMenuOpen: false,
  })),

  on(MenuActions.toggleSideMenu, (state, action) => ({
    ...state,
    isSideMenuOpen: action.isSideMenuOpen,
  })),
);

// Selectores para obtener partes específicas del estado
export const isSideMenuOpen = createSelector(selectMenuFeatureState, (state) => state.isSideMenuOpen);
export const openSideMenu = createSelector(selectMenuFeatureState, (state) => state.isSideMenuOpen);
export const toggleSideMenu = createSelector(selectMenuFeatureState, (state) => state.isSideMenuOpen);
export const closeSideMenu = createSelector(selectMenuFeatureState, (state) => state.isSideMenuOpen);