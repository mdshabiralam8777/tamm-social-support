import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import ValidatedTextField from "./ValidatedTextField";

// Wrapper to provide FormProvider context
const TestWrapper: React.FC<{
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
}> = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues, mode: "onTouched" });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("ValidatedTextField", () => {
  it("should render with the correct label", () => {
    render(
      <TestWrapper defaultValues={{ testField: "" }}>
        <ValidatedTextField name="testField" label="Test Label" />
      </TestWrapper>
    );

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("should render as multiline when specified", () => {
    render(
      <TestWrapper defaultValues={{ testField: "" }}>
        <ValidatedTextField
          name="testField"
          label="Multiline Field"
          multiline
          rows={4}
        />
      </TestWrapper>
    );

    const textbox = screen.getByRole("textbox");
    expect(textbox.tagName.toLowerCase()).toBe("textarea");
  });

  it("should display format hint as helper text", () => {
    render(
      <TestWrapper defaultValues={{ testField: "" }}>
        <ValidatedTextField
          name="testField"
          label="Phone"
          formatHint="Format: +971-XX-XXX-XXXX"
        />
      </TestWrapper>
    );

    expect(screen.getByText("Format: +971-XX-XXX-XXXX")).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    render(
      <TestWrapper defaultValues={{ testField: "" }}>
        <ValidatedTextField name="testField" label="Disabled Field" disabled />
      </TestWrapper>
    );

    expect(screen.getByLabelText("Disabled Field")).toBeDisabled();
  });

  it("should update value on user input", async () => {
    render(
      <TestWrapper defaultValues={{ testField: "" }}>
        <ValidatedTextField name="testField" label="Input Field" />
      </TestWrapper>
    );

    const input = screen.getByLabelText("Input Field");
    fireEvent.change(input, { target: { value: "Hello World" } });

    await waitFor(() => {
      expect(input).toHaveValue("Hello World");
    });
  });
});
