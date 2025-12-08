// правила для валидации строковых
export interface StringFieldValidator {
  min: (len: number, message?: string) => StringFieldValidator;
  max: (len: number, message?: string) => StringFieldValidator;
  email: (message?: string) => StringFieldValidator;
  required: (message?: string) => StringFieldValidator;
  pattern: (regex: RegExp, message?: string) => StringFieldValidator;
  validate: (value: unknown) => { valid: boolean; error?: string };
}
