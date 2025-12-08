import type { FormValidator } from "./types/FormValidator";
import { FieldValidatorImpl } from "./FieldValidator";

import { StringFieldValidatorImpl } from "./validators/StringFieldValidator";
import { NumberFieldValidatorImpl } from "./validators/NumberFieldValidator";
import { ArrayFieldValidatorImpl } from "./validators/ArrayFieldValidator";

type AnyValidator =
  | StringFieldValidatorImpl
  | NumberFieldValidatorImpl
  | ArrayFieldValidatorImpl;

export class FormValidatorImpl implements FormValidator {
  private fieldValidators = new Map<string, AnyValidator>();
  private _errors: Record<string, string> = {};

  Field(name: string): FieldValidatorImpl {
    const original = new FieldValidatorImpl(name);

    const wrapped: FieldValidatorImpl = {
      string: () => {
        const validator = original.string();
        this.fieldValidators.set(name, validator);
        return validator;
      },
      number: () => {
        const validator = original.number();
        this.fieldValidators.set(name, validator);
        return validator;
      },
      array: () => {
        const validator = original.array();
        this.fieldValidators.set(name, validator);
        return validator;
      },
    } as FieldValidatorImpl;

    return wrapped;
  }

  validate(): boolean {
    this.clearErrors();
    let isValid = true;

    for (const [fieldName, validator] of this.fieldValidators) {
      const input = document.querySelector(
        `[name="${fieldName}"]`
      ) as HTMLInputElement | null;
      const value = input ? input.value : undefined;
      const result = validator.validate(value);

      if (!result.valid) {
        this._errors[fieldName] = result.error || "Ошибка валидации";
        isValid = false;
      }
    }

    return isValid;
  }

  get errors(): Record<string, string> {
    return { ...this._errors };
  }

  setError(fieldName: string, message: string): void {
    this._errors[fieldName] = message;
  }

  clearErrors(): void {
    this._errors = {};
  }
}

// TODO ошибки типизации т.к. /validators не доработаны
