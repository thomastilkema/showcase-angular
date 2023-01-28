import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserService } from '../user';
import { AuthenticationError } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly userService: UserService) {}

  logIn(emailAddress: string, password: string): Observable<User | void> {
    return this.userService.findUserByEmail(emailAddress).pipe(
      map((foundUser) => {
        if (!foundUser || foundUser.password !== password) {
          throw new Error(AuthenticationError.UserNotFound);
        }

        const { email, name } = foundUser;
        return { email, name };
      })
    );
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
