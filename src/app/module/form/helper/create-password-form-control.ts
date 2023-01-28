import { FormControl, Validators } from '@angular/forms';

export const createPasswordFormControl = (defaultValue = '') =>
  new FormControl(defaultValue, {
    updateOn: 'blur',
    validators: [Validators.minLength(6), Validators.required],
  });
