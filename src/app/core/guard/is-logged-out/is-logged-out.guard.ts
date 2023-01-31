import { Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Route } from '@app/core/constant';
import { AuthService } from '@app/core/service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedOutGuard implements CanMatch {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canMatch(): Observable<boolean | UrlTree> {
    return this.authService.isUserLoggedIn$.pipe(
      map((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          return this.router.parseUrl(Route.Dashboard);
        }

        return true;
      })
    );
  }
}
