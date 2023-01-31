import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationError, AuthService } from '@app/core';
import {
  FormComponent,
  InputComponent,
  SubmitButtonComponent,
  SubmitErrorComponent,
} from '@app/module/form/component';
import { observe } from '@app/test';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { Observable } from 'rxjs';
import { LogInFormComponent } from './log-in-form.component';
import { ComponentPageObject } from './log-in-form.component.page-object';

describe('The component <tms-log-in-form>', () => {
  const createSpectator = createComponentFactory({
    component: LogInFormComponent,
    declarations: [
      MockComponent(FormComponent),
      MockComponent(InputComponent),
      MockComponent(SubmitButtonComponent),
      MockComponent(SubmitErrorComponent),
    ],
    imports: [RouterTestingModule],
    mocks: [AuthService],
  });

  const setup = () => {
    const spectator = createSpectator({ detectChanges: false });
    const authService = spectator.inject(AuthService);

    const pageObject = new ComponentPageObject(spectator);
    pageObject.detectChanges();

    spyOn(pageObject.componentInstance.loggedInEvent, 'emit');

    return { authService, pageObject };
  };

  it('should provide the form component with the form group', () => {
    const { pageObject } = setup();
    expect(pageObject.getFormComponentInstance()?.formGroup).toEqual(
      pageObject.componentInstance.formGroup
    );
  });

  it('should provide the form component with a submit request that logs the user in', () => {
    const { authService, pageObject } = setup();

    expect(authService.logIn).not.toHaveBeenCalled();

    pageObject.componentInstance.formGroup.setValue({
      email: 'mocked email',
      password: 'mocked password',
    });
    observe(
      pageObject.getFormComponentInstance()
        ?.submitRequest$ as Observable<unknown>
    );
    expect(authService.logIn).toHaveBeenCalledOnceWith(
      'mocked email',
      'mocked password'
    );
  });

  it('should display two input fields', () => {
    const { pageObject } = setup();

    expect(pageObject.getNumberOfInputFields()).toBe(2);
  });

  it('should display an email input field', () => {
    const { pageObject } = setup();

    const inputComponent =
      pageObject.getInputComponenInstanceByLabel('Email address');

    expect(inputComponent?.control).toEqual(
      pageObject.componentInstance.formGroup.controls['email']
    );
    expect(inputComponent?.type).toBe('email');
  });

  it('should display a password input field', () => {
    const { pageObject } = setup();

    const inputComponent =
      pageObject.getInputComponenInstanceByLabel('Password');

    expect(inputComponent?.control).toEqual(
      pageObject.componentInstance.formGroup.controls['password']
    );
    expect(inputComponent?.type).toBe('password');
  });

  it('should display a submit button', () => {
    const { pageObject } = setup();

    expect(pageObject.hasSubmitButton()).toBe(true);
  });

  it('should display a link to the sign up page', () => {
    const { pageObject } = setup();
    expect(pageObject.hasLinkToSignupPage()).toBe(true);
  });

  describe('when loggin in fails', () => {
    it('should display a submit error mentioning that the user could not be found if the returned error says so', () => {
      const { pageObject } = setup();

      pageObject
        .getFormComponentInstance()
        ?.submitErrorEvent.emit(new Error(AuthenticationError.UserNotFound));
      pageObject.detectChanges();
      expect(pageObject.getSubmitError()).toContain(
        'Could not find a user with these credentials'
      );
    });

    it('should display a submit error mentioning that an unknown error occurred if the returned error is not of the "user not found" type', () => {
      const { pageObject } = setup();

      pageObject.getFormComponentInstance()?.submitErrorEvent.emit();
      pageObject.detectChanges();
      expect(pageObject.getSubmitError()).toContain(
        'Could not log you in because of an unknown error. Please try again (in a few minutes).'
      );
    });
  });

  it('should emit a logged in event when form submission was successful', () => {
    const { pageObject } = setup();

    expect(
      pageObject.componentInstance.loggedInEvent.emit
    ).not.toHaveBeenCalled();
    pageObject.getFormComponentInstance()?.submitSuccessEvent.emit();
    expect(
      pageObject.componentInstance.loggedInEvent.emit
    ).toHaveBeenCalledOnceWith();
  });
});
