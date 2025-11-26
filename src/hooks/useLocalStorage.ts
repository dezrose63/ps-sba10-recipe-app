import { useEffect, useState } from "react";

interface UseLocalStorageResult<T> {
  value: T;
  setValue: (newValue: T | ((prev: T) => T)) => void;
  clear: () => void;
}

/**
 * Sync a piece of state with localStorage.
 * Reads once on mount, writes on every change.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageResult<T> {
  const [value, setValueState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (e.g., private mode)
    }
  }, [key, value]);

  const setValue = (newValue: T | ((prev: T) => T)) => {
    setValueState((prev) =>
      typeof newValue === "function"
        ? (newValue as (prev: T) => T)(prev)
        : newValue
    );
  };

  const clear = () => {
    setValueState(initialValue);
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  };

  return { value, setValue, clear };
}