/**
 * Storage Utilities
 * Type-safe localStorage helpers with error handling
 */

const STORAGE_PREFIX = "tamm:ss:";

/**
 * Get an item from localStorage with type safety
 * @param key - Storage key (without prefix)
 * @param defaultValue - Default value if key doesn't exist
 * @returns Parsed value or default
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    const stored = localStorage.getItem(fullKey);
    if (stored === null) return defaultValue;
    return JSON.parse(stored) as T;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Set an item in localStorage with error handling
 * @param key - Storage key (without prefix)
 * @param value - Value to store
 * @returns true if successful, false otherwise
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.setItem(fullKey, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
    return false;
  }
}

/**
 * Remove an item from localStorage
 * @param key - Storage key (without prefix)
 */
export function removeStorageItem(key: string): void {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(fullKey);
  } catch (error) {
    console.error(`Failed to remove ${key} from localStorage:`, error);
  }
}

/**
 * Clear all TAMM storage items
 */
export function clearAllStorage(): void {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
}

/**
 * Get raw item without prefix (for legacy keys)
 */
export function getRawStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    return JSON.parse(stored) as T;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Set raw item without prefix (for legacy keys)
 */
export function setRawStorageItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
    return false;
  }
}
