import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ValidatedTextFieldProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
}

const ValidatedTextField: React.FC<ValidatedTextFieldProps> = ({
  name,
  label,
  type = "text",
  multiline = false,
  rows,
  disabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Only show feedback after user has left the field (blur)
        const showError = fieldState.error && fieldState.isTouched;
        const showSuccess =
          !fieldState.error &&
          fieldState.isTouched &&
          field.value &&
          field.value.toString().length > 0;

        // Only show error message, no hints
        const displayHelperText = showError ? fieldState.error?.message : " ";

        return (
          <TextField
            {...field}
            label={label}
            type={type}
            multiline={multiline}
            rows={rows}
            fullWidth
            disabled={disabled}
            error={showError}
            helperText={displayHelperText}
            FormHelperTextProps={{
              sx: {
                fontSize: { xs: "0.75rem", sm: "0.813rem" },
                mx: 0.5,
              },
            }}
            InputProps={{
              endAdornment: showSuccess ? (
                <InputAdornment position="end">
                  <CheckCircleIcon
                    sx={{
                      color: "success.main",
                      fontSize: { xs: 20, sm: 24 },
                    }}
                  />
                </InputAdornment>
              ) : undefined,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-error": {
                  "& > fieldset": {
                    borderColor: "error.main",
                    borderWidth: "2px",
                  },
                },
                // Success state styling
                ...(showSuccess && {
                  "& > fieldset": {
                    borderColor: "success.main",
                    borderWidth: "1.5px",
                  },
                }),
              },
            }}
          />
        );
      }}
    />
  );
};

export default ValidatedTextField;
