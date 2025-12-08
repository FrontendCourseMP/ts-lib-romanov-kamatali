import { StringFieldValidatorImpl } from "./validators/StringFieldValidator";
import { NumberFieldValidatorImpl } from "./validators/NumberFieldValidator";
import { ArrayFieldValidatorImpl } from "./validators/ArrayFieldValidator";

import type { FieldValidator } from "./types/FieldValidator";

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

// TODO ошибки типизации т.к. /validators не доработаны
