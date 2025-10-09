import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const Step1: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.name"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                label="Name"
                fullWidth
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.nationalId"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                label="National ID"
                fullWidth
                required
                inputProps={{ inputMode: "numeric" }}
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.dob"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                type="date"
                label="Date of Birth"
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.gender"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                select
                label="Gender"
                fullWidth
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.address"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                label="Address"
                fullWidth
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.city"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                label="City"
                fullWidth
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.state"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                label="State"
                fullWidth
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.country"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                label="Country"
                fullWidth
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.phone"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                label="Phone"
                fullWidth
                inputProps={{ inputMode: "tel" }}
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="personal.email"
          control={control}
          render={({ field, fieldState }) => {
            const showError =
              !!fieldState.error &&
              (fieldState.isTouched || fieldState.isDirty);
            return (
              <TextField
                {...field}
                type="email"
                label="Email"
                fullWidth
                required
                error={showError}
                helperText={showError ? fieldState.error?.message : " "}
              />
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Step1;
