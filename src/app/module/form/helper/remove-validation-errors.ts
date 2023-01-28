import { AbstractControl } from '@angular/forms';
import { isEmpty, omit } from 'lodash';

export const removeValidationErrors = (
  formControl: AbstractControl,
  errorKeys: string[]
) => {
  const updatedErrors = omit({ ...formControl.errors }, errorKeys);
  formControl.setErrors(isEmpty(updatedErrors) ? null : updatedErrors);
};
