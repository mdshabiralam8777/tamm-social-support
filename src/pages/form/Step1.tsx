import React from "react";
import { TextField, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Step1: React.FC = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const formFields = [
    { name: "personal.name", label: t("form.step1.name"), type: "text" },
    {
      name: "personal.nationalId",
      label: t("form.step1.nationalId"),
      type: "text",
    },
    { name: "personal.dob", label: t("form.step1.dob"), type: "date" },
    {
      name: "personal.gender",
      label: t("form.step1.gender"),
      type: "select",
      options: [
        { value: "male", label: t("form.step1.genderOptions.male") },
        { value: "female", label: t("form.step1.genderOptions.female") },
        { value: "other", label: t("form.step1.genderOptions.other") },
      ],
    },
    { name: "personal.address", label: t("form.step1.address"), type: "text" },
    { name: "personal.city", label: t("form.step1.city"), type: "text" },
    { name: "personal.state", label: t("form.step1.state"), type: "text" },
    { name: "personal.country", label: t("form.step1.country"), type: "text" },
    { name: "personal.phone", label: t("form.step1.phone"), type: "tel" },
    { name: "personal.email", label: t("form.step1.email"), type: "email" },
  ];

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
