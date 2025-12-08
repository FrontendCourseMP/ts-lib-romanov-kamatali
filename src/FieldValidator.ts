// src/FieldValidator.ts

// Импортируем реализации (классы), а не только типы
import { StringFieldValidatorImpl } from "./validators/StringFieldValidator";
import { NumberFieldValidatorImpl } from "./validators/NumberFieldValidator";
// import { ArrayFieldValidatorImpl } from "./validators/ArrayFieldValidator"; //TODO разкомментить как будет готова логика ArrayFieldValidator

// Импортируем интерфейс для соответствия контракту
import type { FieldValidator } from "./types/FieldValidator";

/**
 * Реализация FieldValidator — фабрика для создания типизированных валидаторов.
 * Принимает имя поля, чтобы передать его внутрь конкретного валидатора (для отладки или будущих сообщений).
 */
export class FieldValidatorImpl implements FieldValidator { //TODO ошибка ввиду отсутствия логики ArrayFieldValidator (ошибка типизации). Но в остальном вроде должно работать
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
//   array(): ArrayFieldValidatorImpl { //TODO разкомментить как будет готова логика ArrayFieldValidator
//     return new ArrayFieldValidatorImpl(this.fieldName);
//   }
// }
