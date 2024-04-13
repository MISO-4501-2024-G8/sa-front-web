import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value: string = control.value;
    const hasNumber = /\d/.test(value);
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasSpecialCharacter = /[$!&?*_@]/.test(value);

    if (value.length < 8 || !hasNumber || !hasCapitalLetter || !hasSpecialCharacter) {
      return { 'invalidPassword': true };
    }

    return null;
  };
}
