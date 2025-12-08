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

  constructor(private formElement: HTMLFormElement) {}

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
      // Находим элемент по имени поля
      const input = this.formElement.querySelector(`[name="${fieldName}"]`) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;

      // Получаем значение (если элемент найден)
      const value = input ? input.value : undefined;

      // Запускаем валидацию
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
