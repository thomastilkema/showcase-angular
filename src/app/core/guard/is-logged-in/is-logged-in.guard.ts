import { Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { AuthService } from '@app/core/service';
import { map, Observable } from 'rxjs';
import { Route } from '../../constant';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanMatch {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canMatch(): Observable<boolean | UrlTree> {
    return this.authService.isUserLoggedIn$.pipe(
      map((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          return true;
        }

        return this.router.parseUrl(Route.LogIn);
      })
    );
  }
}
