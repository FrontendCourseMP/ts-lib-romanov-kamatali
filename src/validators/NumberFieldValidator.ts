import type { NumberFieldValidator } from "../types/validators/NumberFieldValidator";

interface NumberValidationRule {
  check: (value: number) => boolean;
  message: string;
}

export class NumberFieldValidatorImpl implements NumberFieldValidator {
  private rules: NumberValidationRule[] = [];
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  min(val: number, message = `Число должно быть не менее ${val}`): this {
    this.rules.push({
      check: (value) => value >= val,
      message,
    });
    return this;
  }

  max(val: number, message = `Число должно быть не более ${val}`): this {
    this.rules.push({
      check: (value) => value <= val,
      message,
    });
    return this;
  }

  integer(message = "Требуется целое число"): this {
    this.rules.push({
      check: (value) => Number.isInteger(value),
      message,
    });
    return this;
  }

  required(
    message = `Поле "${this.fieldName}" обязательно для заполнения`
  ): this {
    this.rules.push({
      check: (value) => typeof value === "number" && !isNaN(value),
      message,
    });
    return this;
  }

  validate(value: unknown): { valid: boolean; error?: string } {
    let numValue: number;

    if (value === null) {
      numValue = NaN;
    } else if (typeof value === "number") {
      numValue = value;
    } else if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") {
        numValue = NaN;
      } else {
        const num = Number(trimmed); // сделала явную проверку на число + учет пробелов, чтобы не вышло что ситуация "42abc" возвращает истину. 
        numValue = isNaN(num) ? NaN : num;
      }
    } else {
      numValue = NaN; // при непонятной строке возвращаем NaN
    }

    if (isNaN(numValue)) { // переделала логику, теперь если уж получили NaN, выведем новую ошибку: (до этого выводилось "поле не заполнено") -> теперь .required() в тестах не нужен по идее?
      return { valid: false, error: "Пожалуйста, введите число!" };
    }

      // только если значение — валидное число, применяем правила
    for (const rule of this.rules) {
      if (!rule.check(numValue)) {
        return { valid: false, error: rule.message };
      }
    }

    return { valid: true };
  }
}
