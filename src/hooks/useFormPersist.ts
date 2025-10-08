import { useEffect } from "react";

/**
 * Persist React Hook Form values to localStorage and hydrate on mount.
 * - Saves once per second (lightweight).
 * - No-ops if storage is unavailable.
 */
export function useFormPersist<T>(
  key: string,
  watch: () => T,
  reset: (values: Partial<T>) => void
) {
  // hydrate on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) reset(JSON.parse(raw));
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autosave every 1s
  useEffect(() => {
    const id = setInterval(() => {
      try {
        localStorage.setItem(key, JSON.stringify(watch()));
      } catch {
        // ignore
      }
    }, 1000);
    return () => clearInterval(id);
  }, [key, watch, reset]);
}
