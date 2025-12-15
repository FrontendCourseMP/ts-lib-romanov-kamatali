import { describe, it, expect } from 'vitest';
import { StringFieldValidatorImpl } from '../validators/StringFieldValidator';

const fieldName = 'email'; // или любое другое — например, 'phone', 'username'

describe('StringFieldValidatorImpl', () => {
  // счастливый путь
  it('happy path: valid string passes all rules', () => {
    const validator = new StringFieldValidatorImpl(fieldName)
      .required()
      .min(5)
      .max(50)
      .email();
    const result = validator.validate('user@example.com');
    expect(result).toEqual({ valid: true });
  });

  it('should convert non-string values to string', () => { // эту проверку добавила к else в валидаторе 
    const validator = new StringFieldValidatorImpl(fieldName).min(2);
    const result = validator.validate(42); //типа если ввели не строку, а число, пусть передедет в строку: stringValue = String(value);
    expect(result).toEqual({ valid: true });
  });

  it('should treat null as empty string', () => {
    const validator = new StringFieldValidatorImpl(fieldName).required();
    const result = validator.validate(null);
    expect(result).toEqual({
      valid: false,
      error: `Поле "${fieldName}" обязательно для заполнения`,
    });
  });

  it('should fail for empty string', () => {
    const validator = new StringFieldValidatorImpl(fieldName).required();
    const result = validator.validate('');
    expect(result).toEqual({
      valid: false,
      error: `Поле "${fieldName}" обязательно для заполнения`,
    });
  });

  it('should fail for whitespace-only string', () => {
    const validator = new StringFieldValidatorImpl(fieldName).required();
    const result = validator.validate('   ');
    expect(result).toEqual({
      valid: false,
      error: `Поле "${fieldName}" обязательно для заполнения`,
    });
  });

  it('should pass for non-empty string', () => {
    const validator = new StringFieldValidatorImpl(fieldName).required();
    const result = validator.validate('hello');
    expect(result).toEqual({ valid: true });
  });

  // мин
  it('should fail when string has fewer characters than minimum', () => {
    const minLen = 5;
    const validator = new StringFieldValidatorImpl(fieldName).min(minLen);
    const result = validator.validate('hi');
    expect(result).toEqual({
      valid: false,
      error: `Длина должна быть не менее ${minLen} символов`,
    });
  });

  it('should pass when string meets or exceeds minimum length', () => {
    const validator = new StringFieldValidatorImpl(fieldName).min(3);
    const result = validator.validate('hello');
    expect(result).toEqual({ valid: true });
  });

  // макс
  it('should fail when string has more characters than maximum', () => {
    const maxLen = 5;
    const validator = new StringFieldValidatorImpl(fieldName).max(maxLen);
    const result = validator.validate('verylong');
    expect(result).toEqual({
      valid: false,
      error: `Длина должна быть не более ${maxLen} символов`,
    });
  });

  it('should pass when string meets or is below maximum length', () => {
    const validator = new StringFieldValidatorImpl(fieldName).max(10);
    const result = validator.validate('short');
    expect(result).toEqual({ valid: true });
  });

  // почта
  it('should fail for invalid email format', () => {
    const validator = new StringFieldValidatorImpl(fieldName).email();
    const result = validator.validate('invalid-email');
    expect(result).toEqual({
      valid: false,
      error: 'Некорректный адрес электронной почты',
    });
  });

  it('should pass for valid email', () => {
    const validator = new StringFieldValidatorImpl(fieldName).email();
    const result = validator.validate('test@domain.com');
    expect(result).toEqual({ valid: true });
  });

  // тел
  it('should fail for invalid phone format', () => {
    const validator = new StringFieldValidatorImpl(fieldName).phone();
    const result = validator.validate('12345');
    expect(result).toEqual({
      valid: false,
      error: 'Некорректный формат телефона',
    });
  });

  it('should pass for valid Russian phone (7 or 8, with spaces/dashes)', () => {
    const validator = new StringFieldValidatorImpl(fieldName).phone();
    const validPhones = ['+7 999 123-45-67', '89991234567', '+7(999)123-45-67'];
    for (const phone of validPhones) {
      const result = validator.validate(phone);
      expect(result, `Failed for phone: ${phone}`).toEqual({ valid: true });
    }
  });

  //  pattern 
  it('should fail when value does not match custom regex', () => {
    const validator = new StringFieldValidatorImpl(fieldName).pattern(/^[A-Z]+$/, 'Только заглавные буквы');
    const result = validator.validate('abc');
    expect(result).toEqual({
      valid: false,
      error: 'Только заглавные буквы',
    });
  });

  it('should pass when value matches custom regex', () => {
    const validator = new StringFieldValidatorImpl(fieldName).pattern(/^[A-Z]+$/);
    const result = validator.validate('ABC');
    expect(result).toEqual({ valid: true });
  });

});