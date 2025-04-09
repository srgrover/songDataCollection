import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface MenuState extends EntityState<boolean> {
  isSideMenuOpen: boolean;
}

export const menuAdapter = createEntityAdapter<boolean>();

export const initialMenuState: MenuState = menuAdapter.getInitialState({
  isSideMenuOpen: false,
});
