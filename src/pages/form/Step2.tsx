import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const Step2: React.FC = () => {
  const { control } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="family.maritalStatus"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Marital Status"
              fullWidth
              required
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="divorced">Divorced</MenuItem>
              <MenuItem value="widowed">Widowed</MenuItem>
            </TextField>
          )}
        />
      </Grid>
      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="family.dependents"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Dependents"
              fullWidth
              inputProps={{ min: 0 }}
              required
            />
          )}
        />
      </Grid>
      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="family.employmentStatus"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Employment Status"
              fullWidth
              required
            >
              <MenuItem value="employed">Employed</MenuItem>
              <MenuItem value="unemployed">Unemployed</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="retired">Retired</MenuItem>
            </TextField>
          )}
        />
      </Grid>
      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="family.monthlyIncome"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Monthly Income"
              fullWidth
              inputProps={{ min: 0, step: 100 }}
              required
            />
          )}
        />
      </Grid>
      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="family.housingStatus"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Housing Status"
              fullWidth
              required
            >
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="own">Own</MenuItem>
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          )}
        />
      </Grid>
    </Grid>
  );
};
export default Step2;
