import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '@app/core';
import { AlertComponent } from '@app/module/shared';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { SignUpFormComponent } from '../../component';
import { SignUpPageComponent } from './sign-up-page.component';
import { ComponentPageObject } from './sign-up-page.component.page-object';

describe('The sign up page', () => {
  const createSpectator = createComponentFactory({
    component: SignUpPageComponent,
    declarations: [
      MockComponent(AlertComponent),
      MockComponent(SignUpFormComponent),
    ],
    imports: [RouterTestingModule],
    mocks: [UserService],
    detectChanges: false,
  });

  const setup = () => {
    const spectator = createSpectator();

    const userService = spectator.inject(UserService);
    userService.getOneUser.and.returnValue(of({ email: 'mocked@email.com' }));

    const pageObject = new ComponentPageObject(spectator);
    pageObject.detectChanges();

    return { pageObject };
  };

  it('should display the email address of an existing (fake) user that can not be used when signing up', () => {
    const { pageObject } = setup();
    expect(pageObject.getRemarksContent()).toContain(
      'You can use any email address except "mocked@email.com" (user already exists).'
    );
  });

  it('should display a sign up form by default', () => {
    const { pageObject } = setup();

    expect(pageObject.isSignupFormVisible()).toBe(true);
    expect(pageObject.isSignupSuccessMessageVisible()).toBe(false);
  });

  it('should display a success message when signing up was successful', () => {
    const { pageObject } = setup();

    pageObject.getSignupFormComponentInstance()?.signedUpEvent.emit();
    pageObject.detectChanges();

    expect(pageObject.isSignupSuccessMessageVisible()).toBe(true);
    expect(pageObject.isSignupFormVisible()).toBe(false);
  });
});
