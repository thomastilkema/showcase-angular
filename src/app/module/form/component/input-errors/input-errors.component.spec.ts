import { FormControl } from '@angular/forms';
import { AlertComponent } from '@app/module/shared';
import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { ValidatorError } from '../../validator';
import { InputErrorsComponent } from './input-errors.component';
import { ComponentPageObject } from './input-errors.component.page-object';

describe('The <tms-input-errors> component', () => {
  const createSpectator = createComponentFactory({
    component: InputErrorsComponent,
    declarations: [MockComponent(AlertComponent)],
  });

  const setup = () => {
    const formControl = new FormControl();
    const spectator = createSpectator({
      props: {
        control: formControl,
      },
    });
    return { formControl, pageObject: new ComponentPageObject(spectator) };
  };

  const setError = (
    formControl: FormControl,
    error: any,
    pageObject: ComponentPageObject
  ) => {
    formControl.setErrors(error);
    pageObject.detectChanges();
  };

  it('should mention that a value is required if the provided form control has a "required" error', () => {
    const { formControl, pageObject } = setup();

    const expectedMessage =
      'This field is empty but must be filled in since it is required';
    expect(pageObject.getText()).not.toContain(expectedMessage);

    setError(formControl, { required: 'yes' }, pageObject);
    expect(pageObject.getText()).toContain(expectedMessage);
  });

  it('should mention that the filled in email address is invalid if the provided form control has a "email" error', () => {
    const { formControl, pageObject } = setup();

    const expectedMessage =
      'Provide a valid email address (like "name@example.com")';
    expect(pageObject.getText()).not.toContain(expectedMessage);

    setError(formControl, { email: 'yes' }, pageObject);
    expect(pageObject.getText()).toContain(expectedMessage);
  });

  it('should mention that the filled in value needs more characters if the provided form control has a "minglength" error', () => {
    const { formControl, pageObject } = setup();

    const expectedMessage =
      'Provide at least 1 more character as it should have a minimum of 6 characters';
    expect(pageObject.getText()).not.toContain(expectedMessage);

    setError(
      formControl,
      { minlength: { actualLength: 5, requiredLength: 6 } },
      pageObject
    );
    expect(pageObject.getText()).toContain(expectedMessage);
  });

  it(`should mention that another email address should be provided if the provided form control has a "${ValidatorError.UserWithEmailAddressExists}" error`, () => {
    const { formControl, pageObject } = setup();

    const expectedMessage =
      'Provide another email address since there already is a user with this email address';
    expect(pageObject.getText()).not.toContain(expectedMessage);

    setError(
      formControl,
      { [ValidatorError.UserWithEmailAddressExists]: true },
      pageObject
    );
    expect(pageObject.getText()).toContain(expectedMessage);
  });

  it(`should mention that that the passwords do not match if the provided form control has a "${ValidatorError.ValuesNotEqual}" error`, () => {
    const { formControl, pageObject } = setup();

    const expectedMessage = 'Make this password equal to the one above';
    expect(pageObject.getText()).not.toContain(expectedMessage);

    setError(
      formControl,
      { [ValidatorError.ValuesNotEqual]: true },
      pageObject
    );
    expect(pageObject.getText()).toContain(expectedMessage);
  });

  it('should focus on the element when invoking the "focus" function', () => {
    const { pageObject } = setup();

    // We need a type of "any" to access a private property :(
    const componentInstance: any = pageObject.componentInstance;
    componentInstance.elementRef.nativeElement = {
      focus: jasmine.createSpy('focus'),
    };
    componentInstance.focus();
    expect(
      componentInstance.elementRef.nativeElement.focus
    ).toHaveBeenCalledOnceWith();
  });
});
