import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { markAllAsDirty } from './mark-all-as-dirty';

describe('The helper function "markControlsAsDirty"', () => {
  const createFormGroup = () =>
    new FormGroup({
      name: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        postalCode: new FormControl(),
      }),
      hobbies: new FormArray([new FormControl(), new FormControl()]),
    });

  it('should mark all controls as dirty', () => {
    const formGroup = createFormGroup();
    markAllAsDirty(formGroup);

    expect(formGroup.get('name')?.dirty).toBe(true);
    expect(formGroup.get('address.street')?.dirty).toBe(true);
    expect(formGroup.get('address.postalCode')?.dirty).toBe(true);
    expect(formGroup.get('hobbies.0')?.dirty).toBe(true);
    expect(formGroup.get('hobbies.1')?.dirty).toBe(true);
  });
});
