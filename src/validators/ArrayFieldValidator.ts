import type { ArrayFieldValidator } from "../types/validators/ArrayFieldValidator";

interface ArrayValidationRule {
  check: (value: unknown[]) => boolean;
  message: string;
}

export class ArrayFieldValidatorImpl implements ArrayFieldValidator {
  private rules: ArrayValidationRule[] = [];
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  min(
    len: number,
    message = `Массив должен содержать не менее ${len} элементов`
  ): this {
    this.rules.push({
      check: (value) => value.length >= len,
      message,
    });
    return this;
  }

  max(
    len: number,
    message = `Массив должен содержать не более ${len} элементов`
  ): this {
    this.rules.push({
      check: (value) => value.length <= len,
      message,
    });
    return this;
  }

  required(
    message = `Поле "${this.fieldName}" обязательно для заполнения`
  ): this {
    this.rules.push({
      check: (value) => Array.isArray(value) && value.length > 0,
      message,
    });
    return this;
  }

  validate(value: unknown): { valid: boolean; error?: string } {
    let arrayValue: unknown[];

    if (value === null) {
      arrayValue = [];
    } else if (Array.isArray(value)) {
      arrayValue = value;
    } else {
      // Если передали не массив — считаем, что валидация провалена
      arrayValue = [];
    }

    for (const rule of this.rules) {
      if (!rule.check(arrayValue)) {
        return { valid: false, error: rule.message };
      }
    }

    return { valid: true };
  }
}
