import { FormControl } from '@angular/forms';
import { UserService } from '@app/core';
import { observe } from '@app/test';
import { Observable, of } from 'rxjs';
import { userWithEmailAddressExists } from './user-with-email-address-exists';
import { ValidatorError } from './validator-error';

describe('The async validator "userWithEmailAddressExists"', () => {
  let formControl: FormControl;

  const createMockedUserService = (doesExist: boolean) =>
    ({
      doesUserWithEmailAddressExist: jasmine
        .createSpy('doesUserWithEmailAddressExist')
        .and.returnValue(of(doesExist)),
    } as unknown as UserService);

  beforeEach(() => {
    formControl = new FormControl();
    formControl.setValue('mocked@email.com');
  });

  it('should return an observable with a value of "null" if the provided control is already invalid', () => {
    formControl.setErrors({ some: 'error' });
    const mockedUserService = createMockedUserService(true);

    const validate = userWithEmailAddressExists(mockedUserService);
    const observed = observe(validate(formControl) as Observable<any>);

    expect(
      mockedUserService.doesUserWithEmailAddressExist
    ).not.toHaveBeenCalled();
    expect(observed.value).toBe(null);
  });

  it('should return an observable with a value of "null" if a user which the filled in email address does not yet exist', () => {
    const mockedUserService = createMockedUserService(false);

    const validate = userWithEmailAddressExists(mockedUserService);
    const observed = observe(validate(formControl) as Observable<any>);

    expect(
      mockedUserService.doesUserWithEmailAddressExist
    ).toHaveBeenCalledOnceWith('mocked@email.com');
    expect(observed.value).toBe(null);
  });

  it('should return an observable with an "user already exists" error if a user which the filled in email address already exists', () => {
    const mockedUserService = createMockedUserService(true);

    const validate = userWithEmailAddressExists(mockedUserService);
    const observed = observe(validate(formControl) as Observable<any>);

    expect(
      mockedUserService.doesUserWithEmailAddressExist
    ).toHaveBeenCalledOnceWith('mocked@email.com');
    expect(observed.value).toEqual({
      [ValidatorError.UserWithEmailAddressExists]: true,
    });
  });
});
