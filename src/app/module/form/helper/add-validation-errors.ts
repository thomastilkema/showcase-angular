import { AbstractControl, ValidationErrors } from '@angular/forms';

export const addValidationErrors = (
  formControl: AbstractControl,
  validationErrors: ValidationErrors
) => {
  const { errors } = formControl;
  formControl.setErrors({
    ...(errors ?? {}),
    ...validationErrors,
  });
};
