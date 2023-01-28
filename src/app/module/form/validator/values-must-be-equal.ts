import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { addValidationErrors, removeValidationErrors } from '../helper';
import { ValidatorError } from './validator-error';

export const valuesMustBeEqual =
  (sourceControlName: string, matchAgainstControlName: string): ValidatorFn =>
  (formGroup: AbstractControl): ValidationErrors | null => {
    const matchAgainstControl = formGroup.get(matchAgainstControlName);
    if (!matchAgainstControl) {
      return null;
    }

    if (matchAgainstControl.value === formGroup.value[sourceControlName]) {
      removeValidationErrors(matchAgainstControl, [
        ValidatorError.ValuesNotEqual,
      ]);
      return null;
    }

    addValidationErrors(matchAgainstControl, {
      [ValidatorError.ValuesNotEqual]: true,
    });
    return {
      [ValidatorError.ValuesNotEqual]: [
        sourceControlName,
        matchAgainstControlName,
      ],
    };
  };
