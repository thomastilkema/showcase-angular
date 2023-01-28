import { HttpClient } from '@angular/common/http';
import { getMockedDbUser, getMockedUser } from '@app/test';
import { createServiceFactory } from '@ngneat/spectator';
import { Observable, of, take } from 'rxjs';
import { DbUser } from './user.model';
import { UserService } from './user.service';

describe('The service "UserService"', () => {
  const createSpectator = createServiceFactory({
    service: UserService,
    mocks: [HttpClient],
  });

  const setup = (shouldReturnUser = true) => {
    const spectator = createSpectator();

    const httpClient = spectator.inject(HttpClient);
    const userService = spectator.service;

    httpClient.get.and.returnValue(of([getMockedDbUser()]));

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'user') {
        return shouldReturnUser ? JSON.stringify(getMockedUser()) : null;
      }

      return null;
    });
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'setItem');

    return { httpClient, userService };
  };

  const subscribe = (
    request$: Observable<unknown>,
    callback: (value: any) => void
  ) => {
    request$.pipe(take(1)).subscribe((value: unknown) => {
      callback(value);
    });
  };

  it('should make a GET request to "/assets/data/users.json" and return its content when retrieving users', (done) => {
    const { httpClient, userService } = setup();

    subscribe(userService.getUsers(), (users: DbUser[]) => {
      expect(httpClient.get).toHaveBeenCalledOnceWith(
        '/assets/data/users.json'
      );
      expect(users).toEqual([getMockedDbUser()]);
      done();
    });
  });

  describe('the function which checks if a certain user exists for the provided email address', () => {
    it('should return true if the user exists', (done) => {
      const { userService } = setup();
      subscribe(
        userService.doesUserWithEmailAddressExist(getMockedDbUser().email),
        (userExists: boolean) => {
          expect(userExists).toBe(true);
          done();
        }
      );
    });

    it('should return false if the user does not exist', (done) => {
      const { userService } = setup();
      subscribe(
        userService.doesUserWithEmailAddressExist('thisone@doesnot.exist'),
        (userExists: boolean) => {
          expect(userExists).toBe(false);
          done();
        }
      );
    });
  });

  it('should support returning only one of the users', (done) => {
    const { userService } = setup();
    subscribe(userService.getOneUser(), (user: DbUser) => {
      expect(user).toEqual(getMockedDbUser());
      done();
    });
  });

  describe('getting a user from storage', () => {
    it('should return null if no user is found', () => {
      const { userService } = setup(false);
      expect(userService.getUserFromStorage()).toBe(null);
    });

    it('should return a user object which is stored in storage', () => {
      const { userService } = setup();
      expect(userService.getUserFromStorage()).toEqual(getMockedUser());
    });
  });

  it('supports removing a user from storage', () => {
    const { userService } = setup();
    userService.removeUserFromStorage();
    expect(localStorage.removeItem).toHaveBeenCalledOnceWith('user');
  });

  it('supports saving a user in storage', () => {
    const { userService } = setup();
    userService.saveUserInStorage('mocked@email.com', 'Mocked Name');
    expect(localStorage.setItem).toHaveBeenCalledOnceWith(
      'user',
      JSON.stringify({
        email: 'mocked@email.com',
        name: 'Mocked Name',
      })
    );
  });
});
