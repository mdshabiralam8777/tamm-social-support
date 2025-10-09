import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

// 1. Define all your fields in a configuration array.
const formFields = [
  { name: "personal.name", label: "Name", type: "text" },
  {
    name: "personal.nationalId",
    label: "National ID",
    type: "text",
    inputMode: "numeric",
  },
  { name: "personal.dob", label: "Date of Birth", type: "date" },
  {
    name: "personal.gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  { name: "personal.address", label: "Address", type: "text" },
  { name: "personal.city", label: "City", type: "text" },
  { name: "personal.state", label: "State", type: "text" },
  { name: "personal.country", label: "Country", type: "text" },
  { name: "personal.phone", label: "Phone", type: "tel" },
  { name: "personal.email", label: "Email", type: "email" },
];

const Step1: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      {/* 2. Map over the array to render each field */}
      {formFields.map((fieldConfig) => (
        <Grid sx={{ xs: 12, md: 6 }} key={fieldConfig.name}>
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
                    // Shrink label for date type to prevent overlap
                    shrink: fieldConfig.type === "date" || field.value,
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
