import { FormControl } from '@angular/forms';
import { passwordValidator } from './password-validator.service';

describe('passwordValidator', () => {
  it('should return an error if password is less than 8 characters', () => {
    const control = new FormControl('Abc1$');
    expect(passwordValidator()(control)).toEqual({ 'invalidPassword': true });
  });

  it('should return an error if password does not contain a number', () => {
    const control = new FormControl('Abcdefgh$');
    expect(passwordValidator()(control)).toEqual({ 'invalidPassword': true });
  });

  it('should return an error if password does not contain a capital letter', () => {
    const control = new FormControl('abcdefg1$');
    expect(passwordValidator()(control)).toEqual({ 'invalidPassword': true });
  });

  it('should return an error if password does not contain a special character', () => {
    const control = new FormControl('Abcdefg1');
    expect(passwordValidator()(control)).toEqual({ 'invalidPassword': true });
  });

  it('should return null if password is valid', () => {
    const control = new FormControl('Abcdefg1$');
    expect(passwordValidator()(control)).toBeNull();
  });
});
