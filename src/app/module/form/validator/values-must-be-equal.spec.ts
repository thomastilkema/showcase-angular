import { FormControl, FormGroup } from '@angular/forms';
import { ValidatorError } from './validator-error';
import { valuesMustBeEqual } from './values-must-be-equal';

describe('The validator "valuesMustBeEqual"', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      password: new FormControl(),
      passwordConfirm: new FormControl(),
    });
  });

  it('should return "null" if the matching control can not be found', () => {
    const validate = valuesMustBeEqual('password', 'nonExistingFormControl');

    const error = validate(formGroup);
    expect(error).toBe(null);
    expect(formGroup.controls['passwordConfirm'].errors).toBe(null);
  });

  it('should return "null" if both values are the same', () => {
    const validate = valuesMustBeEqual('password', 'passwordConfirm');

    const error = validate(formGroup);
    expect(error).toBe(null);
    expect(formGroup.controls['passwordConfirm'].errors).toBe(null);
  });

  it('should return a "values not equal" error with both provided control names if both values are unequal to each other', () => {
    const validate = valuesMustBeEqual('password', 'passwordConfirm');

    const passwordConfirmControl = formGroup.controls['passwordConfirm'];
    passwordConfirmControl.setValue('some value');

    expect(validate(formGroup)).toEqual({
      [ValidatorError.ValuesNotEqual]: ['password', 'passwordConfirm'],
    });
  });

  it('should set a "values not equal" error on the matching control if both values are unequal to each other', () => {
    const validate = valuesMustBeEqual('password', 'passwordConfirm');

    const passwordConfirmControl = formGroup.controls['passwordConfirm'];
    passwordConfirmControl.setValue('some value');

    validate(formGroup);
    expect(passwordConfirmControl.errors).toEqual({
      [ValidatorError.ValuesNotEqual]: true,
    });
  });
});
