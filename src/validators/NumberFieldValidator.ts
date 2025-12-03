import type { NumberFieldValidator } from '../types/validators/NumberFieldValidator';

// типизация записи правил
interface NumberValidationRule {
  check: (value: number) => boolean;
  message: string;
}

export class NumberFieldValidatorImpl implements NumberFieldValidator {
  private rules: NumberValidationRule[] = [];

  // будет использоваться позже
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  //   методы
  min(
    val: number,
    message = `Число должно быть не менее ${val}`
  ): this {
    this.rules.push({
      check: (value) => value >= val,
      message,
    });
    return this;
  }

  max(
    val: number,
    message = `Число должно быть не более ${val}`
  ): this {
    this.rules.push({
      check: (value) => value <= val,
      message,
    });
    return this;
  }


  integer(
    message = 'Требуется целое число'
  ): this {
    this.rules.push({
      check: (value) => Number.isInteger(value),
      message,
    });
    return this;
  }

  // TODO сообщение + логика
  required(message = 'Поле обязательно для заполнения'): this {
    this.rules.push({
      check: (value) => value != null && value.trim() !== '',
      message,
    });
    return this;
  }

// TODO ввод - число, проверка
  for(const rule of this.rules) {
    if (!rule.check(stringValue)) {
      return { valid: false, error: rule.message };
    }
  }

    return { valid: true };
  }
}

