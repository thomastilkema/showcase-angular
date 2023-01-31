import { Router } from '@angular/router';
import { Route } from '@app/core/constant';
import { AuthService } from '@app/core/service';
import { observe } from '@app/test';
import { createServiceFactory } from '@ngneat/spectator';
import { of } from 'rxjs';
import { IsLoggedInGuard } from './is-logged-in.guard';

describe('The guard "IsLoggedInGuard"', () => {
  const createSpectator = createServiceFactory({
    service: IsLoggedInGuard,
    mocks: [AuthService, Router],
  });

  const setup = (isUserLoggedIn: boolean) => {
    const spectator = createSpectator();

    const authService = spectator.inject(AuthService);
    const router = spectator.inject(Router);

    authService.isUserLoggedIn$ = of(isUserLoggedIn);
    router.parseUrl.and.callFake(
      (providedRoute: string) => `navigate to: ${providedRoute}`
    );

    return spectator.service;
  };

  it('should allow a logged in user to visit a certain route', () => {
    const guard = setup(true);

    expect(observe(guard.canMatch()).value).toBe(true);
  });

  it('should disallow a logged out user to visit a certain route and send the user to the log in page instead', () => {
    const guard = setup(false);

    expect(observe(guard.canMatch()).value).toBe(`navigate to: ${Route.LogIn}`);
  });
});
