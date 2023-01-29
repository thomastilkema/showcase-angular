import { Router } from '@angular/router';
import { Route, UserService } from '@app/core';
import { observe } from '@app/test';
import { createServiceFactory } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { UserStateActionType } from './user-state.model';
import { UserEffect } from './user.effect';

describe('The side effects on updating the user state', () => {
  const createSpectator = createServiceFactory(UserEffect);

  const setup = (action: object) => {
    const spectator = createSpectator({
      providers: [
        provideMockActions(() => of(action)),
        MockProvider(Router),
        MockProvider(UserService),
      ],
    });

    const router = spectator.inject(Router);
    spyOn(router, 'navigateByUrl');

    const userService = spectator.inject(UserService);
    spyOn(userService, 'removeUserFromStorage');
    spyOn(userService, 'saveUserInStorage');

    return { router, userEffect: spectator.service, userService };
  };

  describe('when the user logs in', () => {
    const loginAction = {
      type: `[User] ${UserStateActionType.Login}`,
      email: 'mocked@email',
      name: 'Mocked Name',
    };

    it('should save the user in storage', () => {
      const { userEffect, userService } = setup(loginAction);
      observe(userEffect.login$);
      expect(userService.saveUserInStorage).toHaveBeenCalledOnceWith(
        'mocked@email',
        'Mocked Name'
      );
    });
  });

  describe('when the user logs out', () => {
    const logoutAction = {
      type: `[User] ${UserStateActionType.Logout}`,
    };

    it('should remove the user from storage', () => {
      const { userEffect, userService } = setup(logoutAction);
      observe(userEffect.logout$);
      expect(userService.removeUserFromStorage).toHaveBeenCalledOnceWith();
    });

    it('should redirect the user to the login page', () => {
      const { router, userEffect } = setup(logoutAction);
      observe(userEffect.logout$);
      expect(router.navigateByUrl).toHaveBeenCalledOnceWith(Route.LogIn);
    });
  });
});
