import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  ActionCreator,
  bindActionCreators,
  configureStore,
} from "@reduxjs/toolkit";

import reducer from "../reducer";

export const store = configureStore({
  reducer,
  // Использовать dev-tools даже в продакшн окружении
  devTools: true,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export function useActions<A, C extends ActionCreator<A>>(
  actionCreators: C,
): C {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(actionCreators, dispatch), [
    dispatch,
    actionCreators,
  ]);
}
