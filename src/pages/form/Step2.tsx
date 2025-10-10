import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import {
  Controller,
  useFormContext,
  type ControllerFieldState,
} from "react-hook-form";
import { useStep2Fields } from "../../hooks/useStep2Fields";

const Step2: React.FC = () => {
  const { control } = useFormContext();
  const formFields = useStep2Fields();

  const show = (fieldState: ControllerFieldState) =>
    !!fieldState.error && (fieldState.isTouched || fieldState.isDirty);

  return (
    <Grid container spacing={2}>
      {formFields.map((config) => (
        <Grid sx={{ xs: 12, md: 6 }} key={config.name} minWidth="150px">
          <Controller
            name={config.name}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={config.label}
                type={config.type === "select" ? "text" : config.type}
                select={config.type === "select"}
                fullWidth
                required
                inputProps={config.inputProps}
                error={show(fieldState)}
                helperText={show(fieldState) ? fieldState.error?.message : " "}
              >
                {config.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Step2;
