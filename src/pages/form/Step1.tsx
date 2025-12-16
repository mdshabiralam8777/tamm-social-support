import React from "react";
import { TextField, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Controller, useFormContext } from "react-hook-form";
import { useStep1Fields } from "../../hooks/useStep1Fields";
import ValidatedTextField from "../../components/form/ValidatedTextField";
import { formatEmiratesId, getMaxDobFor18Plus } from "../../utils/inputUtils";

const Step1: React.FC = () => {
  const { control } = useFormContext();

  const formFields = useStep1Fields();

  // Handle Emirates ID formatting
  const handleEmiratesIdChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldOnChange: (value: string) => void
  ) => {
    const formatted = formatEmiratesId(e.target.value);
    fieldOnChange(formatted);
  };

  return (
    <Grid container spacing={2}>
      {formFields.map((fieldConfig: any) => {
        const isSelectOrDate =
          fieldConfig.type === "select" || fieldConfig.type === "date";
        const isEmiratesId = fieldConfig.name === "personal.nationalId";

        return (
          <Grid size={{ xs: 12, md: 6 }} key={fieldConfig.name}>
            {isEmiratesId ? (
              // Emirates ID with auto-formatting
              <Controller
                name={fieldConfig.name}
                control={control}
                render={({ field, fieldState }) => {
                  const showError =
                    !!fieldState.error &&
                    (fieldState.isTouched || fieldState.isDirty);
                  return (
                    <TextField
                      {...field}
                      onChange={(e) =>
                        handleEmiratesIdChange(e, field.onChange)
                      }
                      label={fieldConfig.label}
                      type="text"
                      fullWidth
                      required
                      placeholder="784-XXXX-XXXXXXX-X"
                      inputProps={{
                        maxLength: 18, // 15 digits + 3 dashes
                      }}
                      error={showError}
                      helperText={
                        showError
                          ? fieldState.error?.message
                          : fieldConfig.formatHint || " "
                      }
                    />
                  );
                }}
              />
            ) : isSelectOrDate ? (
              // Use regular TextField for select and date types
              <Controller
                name={fieldConfig.name}
                control={control}
                render={({ field, fieldState }) => {
                  const showError =
                    !!fieldState.error &&
                    (fieldState.isTouched || fieldState.isDirty);
                  const isDateField = fieldConfig.type === "date";
                  return (
                    <TextField
                      {...field}
                      label={fieldConfig.label}
                      type={
                        fieldConfig.type === "select"
                          ? "text"
                          : fieldConfig.type
                      }
                      select={fieldConfig.type === "select"}
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: fieldConfig.type === "date" || !!field.value,
                      }}
                      inputProps={
                        isDateField ? { max: getMaxDobFor18Plus() } : undefined
                      }
                      error={showError}
                      helperText={
                        showError
                          ? fieldState.error?.message
                          : fieldConfig.formatHint || " "
                      }
                    >
                      {fieldConfig.options?.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }}
              />
            ) : (
              // Use ValidatedTextField for text, email, tel types
              <ValidatedTextField
                name={fieldConfig.name}
                label={fieldConfig.label}
                type={fieldConfig.type}
                formatHint={fieldConfig.formatHint}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Step1;
