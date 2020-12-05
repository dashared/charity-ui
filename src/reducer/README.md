Данная директория содержит описание глобального состояния приложения.

# Slice

Слайс - это способ описать фрагмент глобального состояния в терминах redux'а, минимизируя количество бойлерплейт кода.

```javascript
// Функция создания слайса из redux toolkit
import { createSlice } from "@reduxjs/toolkit";

const counter = createSlice({
  // имя слайса, дописывается в type соответсвующих экшнов
  name: "counter",
  // начальное состояние, можно типизировать используя as
  initialState: 0,
  // описание редюсера в виде [имя экшна]: функция изменения
  reducers: {
    // создает экшн increment и описывает новое состояние
    increment(state): number {
      return state + 1;
    },
    // создает экшн decrement и описывает новое состояние
    decrement(state): number {
      return state - 1;
    },
  },
});

// у слайса доступны объявленые экшны в поле actions. Это функции создания экшнов: dispatch(increment()).
// метод .toString() позволяет получить type: increment.toString() === "counter/increment"
export const { increment, decrement } = counter.actions;

// поле reducer содержит привычный редюсер для дальнейшего комбинирования
export default counter.reducer;
```

Для более сложных действий (i.e. реакция на чужие экшны) см. [документацию](https://redux-toolkit.js.org/api/createSlice).
