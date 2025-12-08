// src/FieldValidator.ts

// Импортируем реализации (классы), а не только типы
import { StringFieldValidatorImpl } from "./validators/StringFieldValidator";
import { NumberFieldValidatorImpl } from "./validators/NumberFieldValidator";
import { ArrayFieldValidatorImpl } from "./validators/ArrayFieldValidator";

// Импортируем интерфейс для соответствия контракту
import type { FieldValidator } from "./types/FieldValidator";

/**
 * Реализация FieldValidator — фабрика для создания типизированных валидаторов.
 * Принимает имя поля, чтобы передать его внутрь конкретного валидатора (для отладки или будущих сообщений).
 */
export class FieldValidatorImpl implements FieldValidator {
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  // валидатор для строковых значений.
  string(): StringFieldValidatorImpl {
    return new StringFieldValidatorImpl(this.fieldName);
  }

  // валидатор для числовых значений.
  number(): NumberFieldValidatorImpl {
    return new NumberFieldValidatorImpl(this.fieldName);
  }

  // валидатор для массивов.
  array(): ArrayFieldValidatorImpl {
    return new ArrayFieldValidatorImpl(this.fieldName);
  }
}
