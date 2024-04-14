import { FormControl } from '@angular/forms';
import { passwordValidator, emailValidator } from './validators.service';

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

describe('emailValidator', () => {
  it('debería retornar un error si el correo electrónico no es válido', () => {
    const control = new FormControl('correo no válido');
    expect(emailValidator()(control)).toEqual({ 'invalidEmail': true });
  });

  it('debería retornar null si el correo electrónico es válido', () => {
    const control = new FormControl('username@domain.extension');
    expect(emailValidator()(control)).toBeNull();
  });

  it('debería retornar null si el correo electrónico tiene múltiples subdominios', () => {
    const control = new FormControl('username@domain.co.uk');
    expect(emailValidator()(control)).toBeNull();
  });
});
