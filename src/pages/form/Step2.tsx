import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import {
  Controller,
  useFormContext,
  type ControllerFieldState,
} from "react-hook-form";
import { useStep2Fields } from "../../hooks/useStep2Fields";
import ValidatedTextField from "../../components/form/ValidatedTextField";

const Step2: React.FC = () => {
  const { control } = useFormContext();
  const formFields = useStep2Fields();

  const show = (fieldState: ControllerFieldState) =>
    !!fieldState.error && (fieldState.isTouched || fieldState.isDirty);

  return (
    <Grid container spacing={2}>
      {formFields.map((config: any) => {
        const isSelect = config.type === "select";

        return (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={config.name}>
            {isSelect ? (
              // Use regular TextField for select types
              <Controller
                name={config.name}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={config.label}
                    type="text"
                    select
                    fullWidth
                    required
                    inputProps={config.inputProps}
                    error={show(fieldState)}
                    helperText={
                      show(fieldState) ? fieldState.error?.message : " "
                    }
                  >
                    {config.options?.map((option: any) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            ) : (
              // Use ValidatedTextField for text and number types
              <ValidatedTextField
                name={config.name}
                label={config.label}
                type={config.type}
                formatHint={config.formatHint}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Step2;
