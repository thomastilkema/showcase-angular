import { FormControl } from '@angular/forms';
import { removeValidationErrors } from './remove-validation-errors';

describe('The helper function "removeValidationErrors"', () => {
  it('should remove the provided errors from the provided form control', () => {
    const formControl = new FormControl();
    formControl.setErrors({ mocked: 'error', anotherMocked: 'error' });

    removeValidationErrors(formControl, ['mocked']);
    expect(formControl.errors).toEqual({
      anotherMocked: 'error',
    });
  });

  it('should set "null" as errors when there are no errors left', () => {
    const formControl = new FormControl();
    formControl.setErrors({ mocked: 'error' });

    removeValidationErrors(formControl, ['mocked']);
    expect(formControl.errors).toEqual(null);
  });
});
