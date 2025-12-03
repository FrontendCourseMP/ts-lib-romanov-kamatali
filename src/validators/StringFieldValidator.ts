import type { StringFieldValidator } from '../types/validators/StringFieldValidator';

// типизация записи правил
interface StringValidationRule {
  check: (value: string) => boolean;
  message: string;
}

export class StringFieldValidatorImpl implements StringFieldValidator {
  private rules: StringValidationRule[] = [];

  // будет использоваться позже
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

//   методы
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

  required(message = 'Поле обязательно для заполнения'): this {
    this.rules.push({
      check: (value) => value != null && value.trim() !== '',
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

  validate(value: unknown): { valid: boolean; error?: string } {
    let stringValue: string;

    // проверка введённого пользователем значения на строковость
    if (value == null) {
      stringValue = '';
    } else if (typeof value === 'string') {
      stringValue = value;
    } else {
      stringValue = String(value);
    }

    for (const rule of this.rules) {
      if (!rule.check(stringValue)) {
        return { valid: false, error: rule.message };
      }
    }

    return { valid: true };
  }
}