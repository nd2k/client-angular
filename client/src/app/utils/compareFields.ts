import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export function CompareFieldsValidator(
  firstField: string,
  secondField: string
): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const firstFieldValue = control.get(firstField).value;
    const secondFieldValue = control.get(secondField).value;

    return firstFieldValue !== secondFieldValue ? { doesNotMatch: true } : null;
  };
}
