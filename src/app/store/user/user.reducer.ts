import { createReducer, on } from '@ngrx/store';
import { UserState } from './user-state.model';
import { UserAction } from './user.action';

export const initialState: Readonly<UserState> = {
  email: null,
  isLoggedIn: false,
  name: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserAction.login, (_state, userInfo) => ({
    ...userInfo,
    isLoggedIn: true,
  })),
  on(UserAction.logout, (_state) => ({
    email: null,
    isLoggedIn: false,
    name: null,
  }))
);
