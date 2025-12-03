import type { StringFieldValidator } from '../types/validators/StringFieldValidator';

// проверка типизации
interface StringValidationRule {
  check: (value: string) => boolean;
  message: string;
}

export class StringFieldValidatorImpl implements StringFieldValidator {
  private rules: StringValidationRule[] = [];
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  required(message = 'Поле обязательно для заполнения'): this {
    this.rules.push({
      check: (value) => value != null && value.trim() !== '',
      message,
    });
    return this;
  }

  min(len: number, message = `Длина должна быть не менее ${len} символов`): this {
    this.rules.push({
      check: (value) => value.length >= len,
      message,
    });
    return this;
  }

  max(len: number, message = `Длина должна быть не более ${len} символов`): this {
    this.rules.push({
      check: (value) => value.length <= len,
      message,
    });
    return this;
  }

  email(message = 'Некорректный адрес электронной почты'): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.rules.push({
      check: (value) => emailRegex.test(value),
      message,
    });
    return this;
  }

  pattern(regex: RegExp, message = 'Значение не соответствует шаблону'): this {
    this.rules.push({
      check: (value) => regex.test(value),
      message,
    });
    return this;
  }

  // Метод для фактической валидации (будет вызываться позже из FormValidator)
  validate(value: unknown): { valid: boolean; error?: string } {
    // Сначала приведём к строке или обработаем null/undefined
    if (value == null) {
      value = '';
    } else if (typeof value !== 'string') {
      value = String(value);
    }

    for (const rule of this.rules) {
      if (!rule.check(value)) {
        return { valid: false, error: rule.message };
      }
    }
    return { valid: true };
  }
}