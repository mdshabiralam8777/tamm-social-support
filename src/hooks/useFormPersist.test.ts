import { renderHook, act } from "@testing-library/react";
import { useFormPersist } from "./useFormPersist";

describe("useFormPersist", () => {
  const STORAGE_KEY = "test:form:draft";

  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should hydrate form from localStorage on mount", () => {
    const savedData = { name: "John", email: "john@example.com" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));

    const mockWatch = jest.fn(() => ({}));
    const mockReset = jest.fn();

    renderHook(() => useFormPersist(STORAGE_KEY, mockWatch, mockReset));

    expect(mockReset).toHaveBeenCalledWith(savedData);
  });

  it("should not call reset if no saved data exists", () => {
    const mockWatch = jest.fn(() => ({}));
    const mockReset = jest.fn();

    renderHook(() => useFormPersist(STORAGE_KEY, mockWatch, mockReset));

    expect(mockReset).not.toHaveBeenCalled();
  });

  it("should save form data to localStorage every second", () => {
    const formData = { name: "Jane", email: "jane@example.com" };
    const mockWatch = jest.fn(() => formData);
    const mockReset = jest.fn();

    renderHook(() => useFormPersist(STORAGE_KEY, mockWatch, mockReset));

    // Advance time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    expect(savedData).toEqual(formData);
  });

  it("should handle corrupted localStorage data gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "not-valid-json");

    const mockWatch = jest.fn(() => ({}));
    const mockReset = jest.fn();

    // Should not throw
    expect(() => {
      renderHook(() => useFormPersist(STORAGE_KEY, mockWatch, mockReset));
    }).not.toThrow();

    expect(mockReset).not.toHaveBeenCalled();
  });

  it("should clean up interval on unmount", () => {
    const mockWatch = jest.fn(() => ({}));
    const mockReset = jest.fn();

    const { unmount } = renderHook(() =>
      useFormPersist(STORAGE_KEY, mockWatch, mockReset)
    );

    unmount();

    // Advance time after unmount - should not save
    localStorage.removeItem(STORAGE_KEY);
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
