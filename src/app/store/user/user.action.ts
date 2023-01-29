import { createActionGroup, props } from '@ngrx/store';
import { UserStateActionType } from './user-state.model';

export const UserAction = createActionGroup({
  source: 'User',
  events: {
    [UserStateActionType.Login]: props<{ email: string; name: string }>(),
    [UserStateActionType.Logout]: props<{ email?: null; name?: null }>(),
  },
});
