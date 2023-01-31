import { Router } from '@angular/router';
import { Route } from '@app/core/constant';
import { AuthService } from '@app/core/service';
import { observe } from '@app/test';
import { createServiceFactory } from '@ngneat/spectator';
import { of } from 'rxjs';
import { IsLoggedOutGuard } from './is-logged-out.guard';

describe('The guard "IsLoggedOutGuard"', () => {
  const createSpectator = createServiceFactory({
    service: IsLoggedOutGuard,
    mocks: [AuthService, Router],
  });

  const setup = ({ isUserLoggedIn }: { isUserLoggedIn: boolean }) => {
    const spectator = createSpectator();

    const authService = spectator.inject(AuthService);
    const router = spectator.inject(Router);

    authService.isUserLoggedIn$ = of(isUserLoggedIn);
    router.parseUrl.and.callFake(
      (providedRoute: string) => `url to: ${providedRoute}`
    );

    return spectator.service;
  };

  it('should allow a logged out user to visit a certain route', () => {
    const guard = setup({ isUserLoggedIn: false });

    expect(observe(guard.canMatch()).value).toBe(true);
  });

  it('should disallow a logged in user to visit a certain route and send the user to the dashboard page instead', () => {
    const guard = setup({ isUserLoggedIn: true });

    expect(observe(guard.canMatch()).value).toBe(`url to: ${Route.Dashboard}`);
  });
});
