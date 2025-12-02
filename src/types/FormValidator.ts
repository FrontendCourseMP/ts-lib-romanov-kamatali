import { type FieldValidator } from './FieldValidator';

// главный библиотечный объект
// эта штука работает как обёртка, которая запоминает все правила и позволяет более гибко работать с валидацией формы, нежели ручная проверка каждого поля с помощью функций
export interface FormValidator {
  Field: (name: string) => FieldValidator;
  validate: () => boolean;
  errors: Record<string, string>;
  setError: (fieldName: string, message: string) => void;
  clearErrors: () => void;
}