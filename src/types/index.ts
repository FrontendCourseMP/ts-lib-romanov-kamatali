// "родная" валидность html, спобствует "независимости от DOM-типов"
/*
export interface ValidityState {
    badInput: boolean;
    customError: boolean;
    patternMismatch: boolean;
    rangeOverflow: boolean;
    rangeUnderflow: boolean;
    stepMismatch: boolean;
    tooLong: boolean;
    tooShort: boolean;
    typeMismatch: boolean;
    valid: boolean;
    valueMissing: boolean;
    }
*/
// не требуется, т.к. встроенные типы дом уже подкоючаются через tsconfig.json (complierOptions:lib). И зачем всё это было...
// нужно если библиотека будет работать в Node.js (рендер react-компонентов на сервере, где нет document и прочих типов)

// главный библиотечный объект
// эта штука работает как обёртка, которая запоминает все правила и позволяет более гибко работать с валидацией формы, нежели ручная проверка каждого поля с помощью функций
export interface FormValidator {
  Field: (name: string) => FieldValidator;
  validate: () => boolean;
  errors: Record<string, string>;
  setError: (fieldName: string, message: string) => void;
  clearErrors: () => void;
}

// типы данных для валидации поля
export interface FieldValidator {
  string: () => StringFieldValidator;
  number: () => NumberFieldValidator;
  array: () => ArrayFieldValidator;
}

// правила для валидации строковых
export interface StringFieldValidator {
  min: (len: number, message?: string) => StringFieldValidator;
  max: (len: number, message?: string) => StringFieldValidator;
  email: (message?: string) => StringFieldValidator;
  required: (message?: string) => StringFieldValidator;
  pattern: (regex: RegExp, message?: string) => StringFieldValidator;
}

// правила для валидации чисел
export interface NumberFieldValidator {
  min: (val: number, message?: string) => NumberFieldValidator;
  max: (val: number, message?: string) => NumberFieldValidator;
  integer: (message?: string) => NumberFieldValidator;
  required: (message?: string) => NumberFieldValidator;
}

// правила для валидации массивов
export interface ArrayFieldValidator {
  min: (len: number, message?: string) => ArrayFieldValidator;
  max: (len: number, message?: string) => ArrayFieldValidator;
  required: (message?: string) => ArrayFieldValidator;
}

// создание объекта валидации форм
export type CreateFormValidator = (formElement: HTMLFormElement) => FormValidator;