import { Router } from '@angular/router';
import { Route, UserService } from '@app/core';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { LogInFormComponent } from '../../component';
import { LogInPageComponent } from './log-in-page.component';
import { ComponentPageObject } from './log-in-page.component.page-object';

describe('The log in page', () => {
  const createSpectator = createComponentFactory({
    component: LogInPageComponent,
    declarations: [MockComponent(LogInFormComponent)],
    mocks: [Router, UserService],
    detectChanges: false,
  });

  const setup = () => {
    const spectator = createSpectator();

    const router = spectator.inject(Router);
    const userService = spectator.inject(UserService);
    userService.getOneUser.and.returnValue(
      of({ email: 'mocked@email.com', password: 'mocked password' })
    );

    const pageObject = new ComponentPageObject(spectator);
    pageObject.detectChanges();

    return { pageObject, router };
  };

  it('should display the email address and password of a (fake) user that can be used to log in', () => {
    const { pageObject } = setup();
    expect(pageObject.getFakeUserCredentials()).toBe(
      'You can login with "mocked@email.com" and "mocked password"'
    );
  });

  it('should display a log in form', () => {
    const { pageObject } = setup();
    expect(pageObject.getLoginFormComponentInstance()).toBeTruthy();
  });

  it('should navigate to the dashboard page when the user successfuly logs in', () => {
    const { pageObject, router } = setup();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    pageObject.getLoginFormComponentInstance()?.loggedInEvent.emit();
    expect(router.navigateByUrl).toHaveBeenCalledOnceWith(Route.Dashboard);
  });
});
