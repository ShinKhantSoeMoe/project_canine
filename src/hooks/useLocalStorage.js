import { useState } from 'react';

/**
 * Like useState, but the value survives page reloads (saved in the
 * browser's localStorage). Used to remember the reader mode.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (next) => {
    setValue(next);
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* private browsing etc. — just don't persist */
    }
  };

  return [value, set];
}
