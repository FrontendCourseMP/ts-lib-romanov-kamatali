// правила для валидации чисел
export interface NumberFieldValidator {
  min: (val: number, message?: string) => NumberFieldValidator;
  max: (val: number, message?: string) => NumberFieldValidator;
  integer: (message?: string) => NumberFieldValidator;
  required: (message?: string) => NumberFieldValidator;
}