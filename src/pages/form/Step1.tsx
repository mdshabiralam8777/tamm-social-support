import React from "react";
import { TextField, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Controller, useFormContext } from "react-hook-form";
import { useStep1Fields } from "../../hooks/useStep1Fields";

const Step1: React.FC = () => {
  const { control } = useFormContext();

  const formFields = useStep1Fields();

  return (
    <Grid container spacing={2}>
      {formFields.map((fieldConfig) => (
        <Grid size={{ xs: 12, md: 6 }} key={fieldConfig.name}>
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
                  label={fieldConfig.label}
                  type={
                    fieldConfig.type === "select" ? "text" : fieldConfig.type
                  }
                  select={fieldConfig.type === "select"}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: fieldConfig.type === "date" || !!field.value,
                  }}
                  error={showError}
                  helperText={showError ? fieldState.error?.message : " "}
                >
                  {fieldConfig.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Step1;
