//TODO пофиксить логику (накопипастил с других, чтобы типизация не ругалась)
import type { ArrayFieldValidator } from "../types/validators/ArrayFieldValidator";

// типизация записи правил
interface ArrayValidationRule {
  check: (value: number) => boolean;
  message: string;
}

export class ArrayFieldValidatorImpl implements ArrayFieldValidator {
  private rules: ArrayValidationRule[] = [];

  // будет использоваться позже
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  //   методы
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

  // TODO сообщение + логика (фикс)
  required(message = "Поле обязательно для заполнения"): this {
    this.rules.push({
      check: (value) => value != null && value.trim() !== "",
      message,
    });
    return this;
  }
}
