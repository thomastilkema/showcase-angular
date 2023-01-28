import { getMockedDbUser, getMockedUser, observe } from '@app/test';
import { createServiceFactory } from '@ngneat/spectator';
import { of } from 'rxjs';
import { UserService } from '../user';
import { AuthenticationError } from './auth.model';
import { AuthService } from './auth.service';

describe('The service "AuthService"', () => {
  const createSpectator = createServiceFactory({
    service: AuthService,
    mocks: [UserService],
  });

  const setup = (canFindUser = true) => {
    const spectator = createSpectator();

    const userService = spectator.inject(UserService);
    const authService = spectator.service;

    userService.findUserByEmail.and.returnValue(
      of(canFindUser ? getMockedDbUser() : null)
    );

    return { authService, userService };
  };

  describe('logging in a user', () => {
    it('should return the email address and the name of the user when the credentials are valid', () => {
      const { authService } = setup(true);
      const { email, password } = getMockedDbUser();

      expect(observe(authService.logIn(email, password)).value).toEqual(
        getMockedUser()
      );
    });

    describe('when failing', () => {
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
    });
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
