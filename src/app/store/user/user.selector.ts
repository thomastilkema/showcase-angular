import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state.model';

export const selectUser =
  createFeatureSelector<Readonly<AppState['user']>>('user');

export const selectIsUserLoggedIn = createSelector(
  selectUser,
  (user: AppState['user']) => user.isLoggedIn
);
