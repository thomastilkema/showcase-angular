import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/core';
import { IconComponent } from '@app/module/shared';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { MainNavComponent } from './main-nav.component';
import { ComponentPageObject } from './main-nav.component.page-object';

describe('The <tms-main-content> component', () => {
  const createSpectator = createComponentFactory({
    component: MainNavComponent,
    declarations: [MockComponent(IconComponent)],
    detectChanges: false,
    imports: [RouterTestingModule],
    mocks: [AuthService],
  });

  const setup = (isUserLoggedIn = false) => {
    const spectator = createSpectator();

    const authService = spectator.inject(AuthService);
    authService.isUserLoggedIn$ = of(isUserLoggedIn);

    spectator.detectChanges();

    return {
      authService,
      pageObject: new ComponentPageObject(spectator),
    };
  };

  it('should display anchors within a list inside a <nav> element', () => {
    const { pageObject } = setup();
    expect(pageObject.getNavigationLinks().length).toBeGreaterThan(1);
  });

  it('should display a link to go to the main content which is only visible to screen readers and when having focus', () => {
    const { pageObject } = setup();
    const goToMainContentLink = pageObject.getGoToMainContentLink();

    expect(goToMainContentLink?.classList.contains('sr-only')).toBe(true);
    expect(goToMainContentLink?.classList.contains('focus:not-sr-only')).toBe(
      true
    );
  });

  it('should display a link to the home page', () => {
    const { pageObject } = setup();
    expect(pageObject.hasLinkToHomePage()).toBe(true);
  });

  it('should display a link to the source code of this app', () => {
    const { pageObject } = setup();
    expect(pageObject.hasLinkToSourceCode()).toBe(true);
  });

  describe('when the user is logged out', () => {
    it('should display a link to the log in page', () => {
      const { pageObject } = setup();
      expect(pageObject.hasLinkToLogInPage()).toBe(true);
    });

    it('should display a link to the sign up page', () => {
      const { pageObject } = setup();
      expect(pageObject.hasLinkToSignUpPage()).toBe(true);
    });

    it('should not display a link to the dashboard page', () => {
      const { pageObject } = setup();
      expect(pageObject.hasLinkToDashboardPage()).toBe(false);
    });
  });

  describe('when the user is logged in', () => {
    it('should display a link to the dashboard page', () => {
      const { pageObject } = setup(true);
      expect(pageObject.hasLinkToDashboardPage()).toBe(true);
    });

    it('should not display a link to the log in page', () => {
      const { pageObject } = setup(true);
      expect(pageObject.hasLinkToLogInPage()).toBe(false);
    });

    it('should not display a link to the sign up page', () => {
      const { pageObject } = setup(true);
      expect(pageObject.hasLinkToSignUpPage()).toBe(false);
    });
  });

  describe('the log out button >', () => {
    it('should not be displayed when the user is logged out', () => {
      const { pageObject } = setup();
      expect(pageObject.getLogOutButton()).toBeFalsy();
    });

    it('should be displayed when the user is logged in', () => {
      const { pageObject } = setup(true);
      expect(pageObject.getLogOutButton()).toBeTruthy();
    });

    it('should log the user out when clicked', () => {
      const { authService, pageObject } = setup(true);

      expect(authService.logOut).not.toHaveBeenCalled();

      pageObject.click(pageObject.getLogOutButton());
      expect(authService.logOut).toHaveBeenCalledOnceWith();
    });
  });
});
