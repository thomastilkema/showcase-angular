import { FormControl } from '@angular/forms';
import { addValidationErrors } from './add-validation-errors';

describe('The helper function "addValidationErrors"', () => {
  it('should add the provided errors to the provided form control', () => {
    const formControl = new FormControl();

    addValidationErrors(formControl, { mocked: 'error' });
    expect(formControl.errors).toEqual({ mocked: 'error' });

    addValidationErrors(formControl, { anotherMocked: 'error' });
    expect(formControl.errors).toEqual({
      mocked: 'error',
      anotherMocked: 'error',
    });
  });
});
