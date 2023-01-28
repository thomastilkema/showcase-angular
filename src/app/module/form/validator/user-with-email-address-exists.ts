import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '@app/core/service';
import { map, Observable, of } from 'rxjs';
import { ValidatorError } from './validator-error';

export const userWithEmailAddressExists =
  (userService: UserService): AsyncValidatorFn =>
  (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (control.invalid) {
      return of(null);
    }

    return userService
      .doesUserWithEmailAddressExist(control.value)
      .pipe(
        map((doesUserWithEmailAddressExist: boolean) =>
          doesUserWithEmailAddressExist
            ? { [ValidatorError.UserWithEmailAddressExists]: true }
            : null
        )
      );
  };
