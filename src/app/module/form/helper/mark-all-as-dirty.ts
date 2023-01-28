import { FormArray, FormControl, FormGroup } from '@angular/forms';

export const markAllAsDirty = (formGroupOrArray: FormArray | FormGroup) => {
  const lisOfControls =
    formGroupOrArray instanceof FormArray
      ? formGroupOrArray.controls
      : Object.values(formGroupOrArray.controls);
  lisOfControls.forEach((abstractControl) => {
    if (abstractControl instanceof FormControl) {
      abstractControl.markAsDirty();
    } else if (abstractControl instanceof FormGroup) {
      markAllAsDirty(abstractControl);
    } else if (abstractControl instanceof FormArray) {
      markAllAsDirty(abstractControl);
    }
  });
};
