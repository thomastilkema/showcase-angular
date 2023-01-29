import { Injectable } from '@angular/core';
import { selectIsUserLoggedIn, UserAction } from '@app/store/user';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { User, UserService } from '../user';
import { AuthenticationError } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn$ = this.store.select(selectIsUserLoggedIn);

  constructor(
    private readonly store: Store,
    private readonly userService: UserService
  ) {}

  logIn(emailAddress: string, password: string): Observable<User | void> {
    return this.userService.findUserByEmail(emailAddress).pipe(
      map((foundUser) => {
        if (!foundUser || foundUser.password !== password) {
          throw new Error(AuthenticationError.UserNotFound);
        }

        const { email, name } = foundUser;
        return { email, name };
      }),
      tap((user) => {
        this.store.dispatch(UserAction.login(user));
      })
    );
  }

  logOut(): void {
    this.store.dispatch(UserAction.logout({}));
  }

  signUp(emailAddress: string, _password: string): Observable<true | void> {
    return this.userService.findUserByEmail(emailAddress).pipe(
      map((foundUser) => {
        if (foundUser) {
          throw new Error(AuthenticationError.UserAlreadyExists);
        }

        return true;
      })
    );
  }
}
