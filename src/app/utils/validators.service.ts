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

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value: string = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,}$/; //NOSONAR
    const isValid = emailPattern.test(value);

    if (!isValid) {
      return { 'invalidEmail': true };
    }

    return null;
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value: string = control.value;
    const isNumber = /^\d+$/.test(value);

    if (!isNumber) {
      return { 'invalidNumber': true };
    }

    return null;
  };
}

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value: number = control.value;
    const isPositive = value > 0;

    if (!isPositive) {
      return { 'invalidPositiveNumber': true };
    }

    return null;
  };
}
