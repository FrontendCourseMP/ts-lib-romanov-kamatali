// правила для валидации массивов
export interface ArrayFieldValidator {
  min: (len: number, message?: string) => ArrayFieldValidator;
  max: (len: number, message?: string) => ArrayFieldValidator;
  required: (message?: string) => ArrayFieldValidator;
}