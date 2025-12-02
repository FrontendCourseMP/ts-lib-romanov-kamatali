import { type StringFieldValidator } from './validators/StringFieldValidator';
import { type NumberFieldValidator } from './validators/NumberFieldValidator';
import { type ArrayFieldValidator } from './validators/ArrayFieldValidator';

// типы данных для валидации поля
export interface FieldValidator {
  string: () => StringFieldValidator;
  number: () => NumberFieldValidator;
  array: () => ArrayFieldValidator;
}