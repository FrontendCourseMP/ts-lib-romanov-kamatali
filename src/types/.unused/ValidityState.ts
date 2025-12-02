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