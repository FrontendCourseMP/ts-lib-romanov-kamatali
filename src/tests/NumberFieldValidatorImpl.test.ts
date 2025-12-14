import { describe, it, expect } from 'vitest';
import { NumberFieldValidatorImpl } from '../validators/NumberFieldValidator';

// тестирую класс NumberFieldValidatorImpl, например, на поле "возраст"
describe('NumberFieldValidatorImpl', () => {
  const fieldName = 'age'; 

  describe('validate method', () => {
    // идеальный сценарий, пользователь вводит все как надо (наш happy path)
  it('should return valid for a number that satisfies all rules (happy path)', () => {
      // Arrange (подготовка) — в этом блоке настраиваю все необходимое тестовое окружение: данные, методы;
      const validator = new NumberFieldValidatorImpl(fieldName)
        .required()
        .min(18)
        .max(100)
        .integer();

      // Act (действие) - вызываю тестируемую функцию/методс(в данном случае ф-ия validate)
      const result = validator.validate(25);

      // Assert (проверка) - то, что мы ожидаем получить 
      expect(result).toEqual({ valid: true });
    });

    // злые тесты - специально передаю неккоректные значения программе, чтобы сломать код
    // проверяю сценарии, когда человек ввел пустоту, true/false, объект, строку с числом вместо числа, просто сроку
    it('should return invalid for null', () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate(null); 
      expect(result).toEqual({
        valid: false,
        error: `Поле "${fieldName}" обязательно для заполнения`,
      });
    });

    it('should return invalid for undefined', () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate(undefined);
      expect(result).toEqual({
        valid: false,
        error: `Поле "${fieldName}" обязательно для заполнения`,
      });
    });

    it('should successfuly valid numeric string', () => {
      const validator = new NumberFieldValidatorImpl(fieldName)
        .required()
        .min(10);
      const result = validator.validate('15'); // input всегда возвращает сроковые даннные, поэтому если ввод числа строкой, программа не должна сломаться
      expect(result).toEqual({ valid: true });
    });

    it('should fail on non-numeric string', () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate('abc');
      expect(result).toEqual({
        valid: false,
        error: `Поле "${fieldName}" обязательно для заполнения`,
      });
    });

    it('should treat empty string as invalid', () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate('');
      expect(result).toEqual({
        valid: false,
        error: `Поле "${fieldName}" обязательно для заполнения`,
      });
    });

    it('should fail on boolean input', () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate(true); 
      expect(result).toEqual({
        valid: false,
        error: `Поле "${fieldName}" обязательно для заполнения`,
      });
    });

    it('should fail on object input', () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate({});
      expect(result).toEqual({
        valid: false,
        error: `Поле "${fieldName}" обязательно для заполнения`,
      });
    });
  });
});