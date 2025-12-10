import type { FormValidator } from "./FormValidator";

// создание объекта валидации форм
export type CreateFormValidator = (
  formElement: HTMLFormElement
) => FormValidator;

/* 
Если библиотека публичная и тебе жалко программистов (должно быть, программисты тоже люди), то
лучше импортировать все типы явно, чтобы их тоже можно было использовать напрямую ( на данный
момент импорт происходит локально в других типах) и дорабатывать код.
*/
export { type FormValidator } from "./FormValidator";
export { type FieldValidator } from "./FieldValidator";
export { type StringFieldValidator } from "./validators/StringFieldValidator";
export { type NumberFieldValidator } from "./validators/NumberFieldValidator";
export { type ArrayFieldValidator } from "./validators/ArrayFieldValidator";
