import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import {
  Controller,
  useFormContext,
  type ControllerFieldState,
} from "react-hook-form";

// 1. Define all fields in a configuration array
const formFields = [
  {
    name: "family.maritalStatus",
    label: "Marital Status",
    type: "select",
    options: [
      { value: "single", label: "Single" },
      { value: "married", label: "Married" },
      { value: "divorced", label: "Divorced" },
      { value: "widowed", label: "Widowed" },
    ],
  },
  {
    name: "family.dependents",
    label: "Dependents",
    type: "number",
    inputProps: { min: 0 },
  },
  {
    name: "family.employmentStatus",
    label: "Employment Status",
    type: "select",
    options: [
      { value: "employed", label: "Employed" },
      { value: "unemployed", label: "Unemployed" },
      { value: "student", label: "Student" },
      { value: "retired", label: "Retired" },
    ],
  },
  {
    name: "family.monthlyIncome",
    label: "Monthly Income",
    type: "number",
    inputProps: { min: 0, step: 100 },
  },
  {
    name: "family.housingStatus",
    label: "Housing Status",
    type: "select",
    options: [
      { value: "rent", label: "Rent" },
      { value: "own", label: "Own" },
      { value: "family", label: "Family" },
      { value: "other", label: "Other" },
    ],
  },
];

const Step2: React.FC = () => {
  const { control } = useFormContext();

  const show = (fieldState: ControllerFieldState) =>
    !!fieldState.error && (fieldState.isTouched || fieldState.isDirty);

  return (
    <Grid container spacing={2}>
      {/* 2. Map over the array to render each field */}
      {formFields.map((config) => (
        <Grid sx={{ xs: 12, md: 6 }} key={config.name}>
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
