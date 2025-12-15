# FormCheck — Библиотека валидации форм для TypeScript

Легковесная, типизированная библиотека для валидации HTML-форм. Поддерживает строки, числа, массивы, цепочки правил и реальную валидацию в DOM.

---

## Требования

### Для использования

- **TypeScript ≥ 5.0**
- **DOM API** — библиотека работает только в браузере или среде с DOM (например, JSDOM)
- **HTML-форма с атрибутом `name` у полей** — без `name` валидация не сработает

### Для разработки

Если вы хотите **собрать проект, запустить тесты или внести изменения в код**:

- **Node.js ≥ 18**
- **Менеджер пакетов**: `npm`, `pnpm` или `yarn`

#### Установка зависимостей

```bash
npm install
```

---

## Пример использования

### 1. Установка

Скопируйте папку `src/` в свой проект.

Структура вашего проекта должна включать:

```
ваш-проект/
├── index.html                  ← ваша форма
├── src/
│   ├── main.ts                     ← ваш код приложения
│   ├── validators/                 ← | файлы библиотеки
│   │   ├── StringFieldValidator.ts ← |
│   │   ├── NumberFieldValidator.ts ← |
│   │   └── ArrayFieldValidator.ts  ← |
│   ├── createFormValidator.ts      ← |
│   ├── FieldValidator.ts           ← |
│   └── FormValidator.ts            ← |
```

### 2. В коде приложения (`main.ts`)

```ts
import { createFormValidator } from "./createFormValidator";

// Находим форму
const form = document.querySelector("form");

// Создаём валидатор
const validator = createFormValidator(form);

// Настраиваем правила
validator.Field("name").string().required().min(2).max(50);

validator.Field("age").number().required().min(0).max(150).integer();

validator.Field("email").string().required().email();

// Обработчик отправки
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validator.validate()) {
    alert("Форма прошла валидацию!");
  }
});
```

---

## API

### `createFormValidator(form: HTMLFormElement): FormValidator`

Создаёт экземпляр валидатора формы.

---

### `FormValidator`

Основной объект, который управляет валидацией.

#### Методы:

- `.Field(name: string): FieldValidator`  
  → Возвращает фабрику для настройки валидации поля.

- `.validate(): boolean`  
  → Запускает валидацию всех полей. Возвращает `true`, если все поля валидны.

- `.errors: Record<string, string>`  
  → Объект с сообщениями об ошибках по имени поля.

- `.setError(fieldName: string, message: string)`  
  → Устанавливает кастомную ошибку для поля.

- `.clearErrors()`  
  → Очищает все ошибки.

---

### `FieldValidator`

Фабрика для создания валидаторов определённого типа.

#### Методы:

- `.string(): StringFieldValidator`  
  → Возвращает валидатор для строк.

- `.number(): NumberFieldValidator`  
  → Возвращает валидатор для чисел.

- `.array(): ArrayFieldValidator`  
  → Возвращает валидатор для массивов.

---

### `StringFieldValidator`

Валидатор для строковых значений.

#### Методы:

- `.required(message?: string)`  
  → Поле обязательно для заполнения.

- `.min(len: number, message?: string)`  
  → Минимальная длина строки.

- `.max(len: number, message?: string)`  
  → Максимальная длина строки.

- `.email(message?: string)`  
  → Проверка на корректный email.

- `.pattern(regex: RegExp, message?: string)`  
  → Проверка по регулярному выражению.

- `.validate(value: unknown): { valid: boolean; error?: string }`  
  → Внутренний метод — не вызывайте напрямую.

---

### `NumberFieldValidator`

Валидатор для числовых значений.

#### Методы:

- `.required(message?: string)`  
  → Поле обязательно для заполнения.

- `.min(val: number, message?: string)`  
  → Минимальное значение.

- `.max(val: number, message?: string)`  
  → Максимальное значение.

- `.integer(message?: string)`  
  → Проверка, что число целое.

- `.validate(value: unknown): { valid: boolean; error?: string }`  
  → Внутренний метод — не вызывайте напрямую.

---

### `ArrayFieldValidator`

Валидатор для массивов.

#### Методы:

- `.required(message?: string)`  
  → Массив должен содержать хотя бы один элемент.

- `.min(len: number, message?: string)`  
  → Минимальное количество элементов.

- `.max(len: number, message?: string)`  
  → Максимальное количество элементов.

- `.validate(value: unknown): { valid: boolean; error?: string }`  
  → Внутренний метод — не вызывайте напрямую.

---

## Тестирование

Для запуска тестов:

```bash
npm run test -- --coverage
```

Тесты используют **JSDOM** для эмуляции браузерного окружения и проверяют корректность валидации.

---

## Авторы

Проект выполнен командой **ts-lib-romanov-kamatali**:

- **Романов Александр Дмитриевич** — Katsero
- **Каматали Алина Аароновна** — AlinaK-code

---
