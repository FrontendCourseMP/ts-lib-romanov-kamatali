import { describe, it, expect } from "vitest";
import { NumberFieldValidatorImpl } from "../validators/NumberFieldValidator";

// тестирую класс NumberFieldValidatorImpl, например, на поле "возраст"
describe("NumberFieldValidatorImpl", () => {
  const fieldName = "age";

  describe("validate method", () => {
    // идеальный сценарий, пользователь вводит все как надо (наш happy path)
    it("should return valid for a number that satisfies all rules (happy path)", () => {
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
    it("should return invalid for null", () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate(null);
      expect(result).toEqual({
        valid: false,
        error: "Пожалуйста, введите число!",
      });
    });

    it("should return invalid for undefined", () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate(undefined);
      expect(result).toEqual({
        valid: false,
        error: "Пожалуйста, введите число!",
      });
    });

    it("should successfuly valid numeric string", () => {
      const validator = new NumberFieldValidatorImpl(fieldName)
        .required()
        .min(10);
      const result = validator.validate("15"); // input всегда возвращает сроковые даннные, поэтому если ввод числа строкой, программа не должна сломаться
      expect(result).toEqual({ valid: true });
    });

    it("should fail on non-numeric string", () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate("abc");
      expect(result).toEqual({
        valid: false,
        error: "Пожалуйста, введите число!",
      });
    });

    it("should treat empty string as invalid", () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate("");
      expect(result).toEqual({
        valid: false,
        error: "Пожалуйста, введите число!",
      });
    });

    it("should fail on boolean input", () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate(true);
      expect(result).toEqual({
        valid: false,
        error: "Пожалуйста, введите число!",
      });
    });

    it("should fail on object input", () => {
      const validator = new NumberFieldValidatorImpl(fieldName).required();
      const result = validator.validate({});
      expect(result).toEqual({
        valid: false,
        error: "Пожалуйста, введите число!",
      });
    });

    // (коммент для Саши) ниже очень мощная проверка, которую наш код не прошел!
    it('should fail on string with non-numeric characters (e.g. "42abc")', () => {
      const result = new NumberFieldValidatorImpl(fieldName)
        .validate("42abc");
      expect(result).toEqual({
        valid: false,
        error: `Пожалуйста, введите число!`,
      });
    });
    // ошибка тут походу:
    //   else if (typeof value === "string") {
    //       const parsed = parseFloat(value);
    //       numValue = isNaN(parsed) ? NaN : parsed;
    //     }
    // в методе валидейт второй elif неккоректно парсил сроки из-за того, что parseFloat парсит с начала строки пока может
    // т.е: при "42abc" -> parsed = 42 -> numValue = 42
    // потом проверка typeof 42 === "number" && !isNaN(42) и возвращает True!!! в итоге валидация успешна, хотя человек ввел полный бред
  });

  // покрытие на мин/макс
  it("should fail when value < min", () => {
    const result = new NumberFieldValidatorImpl(fieldName).min(10).validate(5);
    expect(result).toEqual({
      valid: false,
      error: "Число должно быть не менее 10",
    });
  });

  it("should pass when value >= min", () => {
    const result = new NumberFieldValidatorImpl(fieldName).min(10).validate(11);
    expect(result).toEqual({ valid: true });
  });

  it("should fail when value > max", () => {
    const result = new NumberFieldValidatorImpl(fieldName)
      .max(100)
      .validate(150);
    expect(result).toEqual({
      valid: false,
      error: "Число должно быть не более 100",
    });
  });

  it("should pass when value <= max", () => {
    const result = new NumberFieldValidatorImpl(fieldName)
      .min(100)
      .validate(100);
    expect(result).toEqual({ valid: true });
  });

  it("should fail when value is not integer", () => {
    const result = new NumberFieldValidatorImpl(fieldName)
      .integer()
      .validate(3.14);
    expect(result).toEqual({ valid: false, error: "Требуется целое число" });
  });
});
