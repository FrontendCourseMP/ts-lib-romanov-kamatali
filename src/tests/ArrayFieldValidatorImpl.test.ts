import { describe, it, expect } from "vitest";
import { ArrayFieldValidatorImpl } from "../validators/ArrayFieldValidator";

const fieldName = "contact-time"; //взяла 'contact-time' за переменную т.к в index.html это единтсвенное поле которое возращает массив типа ["morning", "evening"]

describe("ArrayFieldValidatorImpl", () => {
  // наш хэппи пэф
  it("happy path: valid array passes all rules", () => {
    const validator = new ArrayFieldValidatorImpl(fieldName)
      .required()
      .min(2)
      .max(5);
    const result = validator.validate(["a", "b", "c"]);
    expect(result).toEqual({ valid: true });
  });

  // злые тесты
  it("should fail for null", () => {
    const result = new ArrayFieldValidatorImpl(fieldName)
      .required()
      .validate(null);
    expect(result).toEqual({
      valid: false,
      error: `Поле "${fieldName}" обязательно для заполнения`,
    });
  });

  it("should fail for undefined", () => {
    const result = new ArrayFieldValidatorImpl(fieldName)
      .required()
      .validate(undefined);
    expect(result).toEqual({
      valid: false,
      error: `Поле "${fieldName}" обязательно для заполнения`,
    });
  });

  // Важный момент (?) в рамках формы html у нас никогда не возникнет такого, что мы выбрали чекбоксы, а пришла строка, число или что-то непонятное
  // но я оставила эти проверки, т.к у нас в библиотеке класс ArrayFieldValidatorImpl может по идее использоваться не только через FormValidator, 
  // но и напрямую, например, с API-данными (тут думаю эти проверки будут не лишними, поправь если что)
  it("should fail for string", () => {
    const result = new ArrayFieldValidatorImpl(fieldName).validate(
      "not an array"
    );
    expect(result).toEqual({
      valid: false,
      error: "Ожидался массив",
    });
  });

  it("should fail for number", () => {
    const result = new ArrayFieldValidatorImpl(fieldName).validate(42);
    expect(result).toEqual({
      valid: false,
      error: "Ожидался массив",
    });
  });

  it("should fail for object", () => {
    const result = new ArrayFieldValidatorImpl(fieldName).validate({});
    expect(result).toEqual({
      valid: false,
      error: "Ожидался массив",
    });
  });

  // required
  it("should fail for empty array", () => {
    const result = new ArrayFieldValidatorImpl(fieldName)
      .required()
      .validate([]);
    expect(result).toEqual({
      valid: false,
      error: `Поле "${fieldName}" обязательно для заполнения`,
    });
  });

  it("should pass for non-empty array", () => {
    const result = new ArrayFieldValidatorImpl(fieldName)
      .required()
      .validate([1]);
    expect(result).toEqual({ valid: true });
  });

  // мин
  it("should fail when array has fewer elements than minimum", () => {
    const minLen = 3;
    const result = new ArrayFieldValidatorImpl(fieldName)
      .min(minLen)
      .validate([1, 2]);
    expect(result).toEqual({
      valid: false,
      error: `Массив должен содержать не менее ${minLen} элементов`,
    });
  });

  it("should pass when array meets or exceeds minimum length", () => {
    const result = new ArrayFieldValidatorImpl(fieldName)
      .min(2)
      .validate([1, 2, 3]);
    expect(result).toEqual({ valid: true });
  });

  // макс
  it("should fail when array has more elements than maximum", () => {
    const maxLen = 2;
    const result = new ArrayFieldValidatorImpl(fieldName)
      .max(2)
      .validate([1, 2, 3]);
    expect(result).toEqual({
      valid: false,
      error: `Массив должен содержать не более ${maxLen} элементов`,
    });
  });

  it("should pass when array meets or is below maximum length", () => {
    const result = new ArrayFieldValidatorImpl(fieldName)
      .max(3)
      .validate([1, 2]);
    expect(result).toEqual({ valid: true });
  });
});
