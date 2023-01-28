import { AsyncValidatorFn, FormControl, Validators } from '@angular/forms';

export const createEmailFormControl = (
  defaultValue = '',
  asyncValidators: AsyncValidatorFn[] = []
) =>
  new FormControl(defaultValue, {
    asyncValidators,
    updateOn: 'blur',
    validators: [Validators.email, Validators.required],
  });
