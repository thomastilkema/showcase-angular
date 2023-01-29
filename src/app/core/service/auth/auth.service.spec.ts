import { UserAction } from '@app/store/user';
import { getMockedDbUser, getMockedUser, observe } from '@app/test';
import { createServiceFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserService } from '../user';
import { AuthenticationError } from './auth.model';
import { AuthService } from './auth.service';

describe('The service "AuthService"', () => {
  const createSpectator = createServiceFactory({
    service: AuthService,
    mocks: [Store, UserService],
  });

  const setup = (canFindUser = true) => {
    const spectator = createSpectator();

    const userService = spectator.inject(UserService);
    const store = spectator.inject(Store);
    const authService = spectator.service;

    userService.findUserByEmail.and.returnValue(
      of(canFindUser ? getMockedDbUser() : null)
    );

    return { authService, store, userService };
  };

  describe('logging in a user', () => {
    describe('when succeeding', () => {
      it('should return the email address and the name of the user when the credentials are valid', () => {
        const { authService } = setup(true);
        const { email, password } = getMockedDbUser();

        expect(observe(authService.logIn(email, password)).value).toEqual(
          getMockedUser()
        );
      });

      it('should update the state with the logged in user', () => {
        const { authService, store } = setup(true);
        const { email, password } = getMockedDbUser();
        observe(authService.logIn(email, password));

        expect(store.dispatch).toHaveBeenCalledOnceWith(
          UserAction.login(getMockedUser())
        );
      });
    });

    describe('when fialing', () => {
      it('should throw a "user not found" error when a user with the provided email address can not be found', () => {
        const { authService } = setup(false);
        const observer = observe(authService.logIn('', ''));

        expect(observer.thrownError?.message).toBe(
          AuthenticationError.UserNotFound
        );
      });

      it('should throw a "user not found" error when a user is found but the provided password is wrong', () => {
        const { authService } = setup(true);
        const observer = observe(
          authService.logIn('mocked email', 'wrong password')
        );

        expect(observer.thrownError?.message).toBe(
          AuthenticationError.UserNotFound
        );
      });

      it('should update the state with the logged in user', () => {
        const { authService, store } = setup(false);
        observe(authService.logIn('', ''));

        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });

  it('should remove the logged in user from the state when logging out', () => {
    const { authService, store } = setup(false);
    authService.logOut();

    expect(store.dispatch).toHaveBeenCalledOnceWith(UserAction.logout({}));
  });

  describe('signing up a user', () => {
    it('should throw a "user already exists" error when a user with the provided email address already exists', () => {
      const { authService } = setup(true);
      const observer = observe(
        authService.signUp('already exists', 'password')
      );

      expect(observer.thrownError?.message).toBe(
        AuthenticationError.UserAlreadyExists
      );
    });

    it('should return true when the user not already exists', () => {
      const { authService } = setup(false);
      const observer = observe(authService.signUp('email', 'password'));

      expect(observer.value).toBe(true);
    });
  });
});
