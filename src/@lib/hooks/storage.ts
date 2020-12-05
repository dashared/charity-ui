import { Dispatch, SetStateAction, useState } from "react";

import KVStorage from "../utils/kvstorage";

const LocalStorage = new KVStorage("local");

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState(() => {
    return LocalStorage.get<T>(key) ?? initialValue;
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    LocalStorage.set(key, valueToStore);
  };

  return [storedValue, setValue];
}
