import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRequest } from '@app/core/constant';
import { delay, map, Observable, shareReplay } from 'rxjs';
import { DbUser, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private cachedUsers$: Observable<DbUser[]>;
  private readonly storageKey = 'user';

  constructor(private readonly httpClient: HttpClient) {}

  doesUserWithEmailAddressExist(emailAddress: string): Observable<boolean> {
    return this.findUserByEmail(emailAddress).pipe(map(Boolean));
  }

  findUserByEmail(emailAddress: string): Observable<DbUser | undefined> {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.email === emailAddress))
    );
  }

  getOneUser(): Observable<DbUser> {
    return this.getUsers(false).pipe(map((users) => users[0]));
  }

  getUsers(withDelay = true): Observable<DbUser[]> {
    if (!this.cachedUsers$) {
      this.cachedUsers$ = this.httpClient
        .get<DbUser[]>('/assets/data/users.json')
        .pipe(shareReplay(1));
    }

    return this.cachedUsers$.pipe(
      delay(withDelay ? ApiRequest.FakeDelayMs : 0)
    );
  }

  /* ------------------------------------------------------------------
   * Since we don't use a real api, we save the user in local storage
   * ------------------------------------------------------------------ */

  getUserFromStorage(): User | null {
    const user = localStorage.getItem(this.storageKey);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  removeUserFromStorage(): void {
    localStorage.removeItem(this.storageKey);
  }

  saveUserInStorage(email: string, name: string): void {
    localStorage.setItem(this.storageKey, JSON.stringify({ email, name }));
  }
}
