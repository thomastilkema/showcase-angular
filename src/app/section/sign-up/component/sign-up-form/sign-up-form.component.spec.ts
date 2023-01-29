import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationError, AuthService, UserService } from '@app/core';
import {
  FormComponent,
  InputComponent,
  SubmitButtonComponent,
  SubmitErrorComponent,
} from '@app/module/form';
import { observe } from '@app/test';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { Observable } from 'rxjs';
import { SignUpFormComponent } from './sign-up-form.component';
import { ComponentPageObject } from './sign-up-form.component.page-object';

describe('The component <tms-sign-up-form>', () => {
  const createSpectator = createComponentFactory({
    component: SignUpFormComponent,
    declarations: [
      MockComponent(FormComponent),
      MockComponent(InputComponent),
      MockComponent(SubmitButtonComponent),
      MockComponent(SubmitErrorComponent),
    ],
    imports: [RouterTestingModule],
    mocks: [AuthService, UserService],
  });

  const setup = () => {
    const spectator = createSpectator({ detectChanges: false });
    const authService = spectator.inject(AuthService);

    const pageObject = new ComponentPageObject(spectator);
    pageObject.detectChanges();

    spyOn(pageObject.componentInstance.signedUpEvent, 'emit');

    return { authService, pageObject };
  };

  it('should provide the form component with the form group', () => {
    const { pageObject } = setup();
    expect(pageObject.getFormComponentInstance()?.formGroup).toEqual(
      pageObject.componentInstance.formGroup
    );
  });

  it('should provide the form component with a submit request that signs up the user', () => {
    const { authService, pageObject } = setup();

    expect(authService.signUp).not.toHaveBeenCalled();

    pageObject.componentInstance.formGroup.setValue({
      email: 'mocked email',
      password: 'mocked password',
      passwordConfirm: 'mocked password',
    });
    observe(
      pageObject.getFormComponentInstance()
        ?.submitRequest$ as Observable<unknown>
    );
    expect(authService.signUp).toHaveBeenCalledOnceWith(
      'mocked email',
      'mocked password'
    );
  });

  it('should display three input fields', () => {
    const { pageObject } = setup();

    expect(pageObject.getNumberOfInputFields()).toBe(3);
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
      pageObject.getInputComponenInstanceByLabel('Your new password');

    expect(inputComponent?.control).toEqual(
      pageObject.componentInstance.formGroup.controls['password']
    );
    expect(inputComponent?.type).toBe('password');
  });

  it('should display a password confirm input field', () => {
    const { pageObject } = setup();

    const inputComponent = pageObject.getInputComponenInstanceByLabel(
      'Confirm your new password'
    );

    expect(inputComponent?.control).toEqual(
      pageObject.componentInstance.formGroup.controls['passwordConfirm']
    );
    expect(inputComponent?.type).toBe('password');
  });

  it('should display a submit button', () => {
    const { pageObject } = setup();

    expect(pageObject.hasSubmitButton()).toBe(true);
  });

  it('should display a link to the log in page', () => {
    const { pageObject } = setup();
    expect(pageObject.hasLinkToLoginPage()).toBe(true);
  });

  describe('when signing up fails', () => {
    it('should display a submit error mentioning that the user already exists if the returned error says so', () => {
      const { pageObject } = setup();

      pageObject
        .getFormComponentInstance()
        ?.submitErrorEvent.emit(
          new Error(AuthenticationError.UserAlreadyExists)
        );
      pageObject.detectChanges();
      expect(pageObject.getSubmitError()).toContain(
        'A user with the provided email address already exists. Please sign up with another email address.'
      );
    });

    it('should display a submit error mentioning that an unknown error occurred if the returned error is not of the "user already exists" type', () => {
      const { pageObject } = setup();

      pageObject.getFormComponentInstance()?.submitErrorEvent.emit();
      pageObject.detectChanges();
      expect(pageObject.getSubmitError()).toContain(
        'Could not sign you up because of an unknown error. Please try again (in a few minutes).'
      );
    });
  });

  it('should emit a signed up event when form submission was successful', () => {
    const { pageObject } = setup();

    expect(
      pageObject.componentInstance.signedUpEvent.emit
    ).not.toHaveBeenCalled();
    pageObject.getFormComponentInstance()?.submitSuccessEvent.emit();
    expect(
      pageObject.componentInstance.signedUpEvent.emit
    ).toHaveBeenCalledOnceWith();
  });
});
