// src/main.ts

import { FormValidatorImpl } from "./FormValidator";

export function createFormValidator(
  formElement: HTMLFormElement
): FormValidatorImpl {
  return new FormValidatorImpl(formElement);
}
