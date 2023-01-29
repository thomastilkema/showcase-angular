import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@app/core';
import { UserService } from '@app/core/service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { UserAction } from './user.action';

@Injectable()
export class UserEffect {
  constructor(
    readonly actions$: Actions,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.login),
        tap((action) => {
          // Save user in storage since we don't use a real api
          this.userService.saveUserInStorage(action.email, action.name);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.logout),
        tap(() => {
          this.userService.removeUserFromStorage();
        }),
        tap(() => {
          this.router.navigateByUrl(Route.LogIn);
        })
      ),
    { dispatch: false }
  );
}
