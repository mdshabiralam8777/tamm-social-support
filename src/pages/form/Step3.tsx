import React, { useState } from "react";
import { Grid, TextField, IconButton, Tooltip } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Controller, useFormContext } from "react-hook-form";
import HelpMeWriteDialog from "../../components/HelpMeWriteDialog";

const Step3: React.FC = () => {
  const { control, setValue, getValues } = useFormContext();
  const [open, setOpen] = useState<
    null | "financial" | "employment" | "reason"
  >(null);

  const seed = (field: "financial" | "employment" | "reason") => {
    const v = getValues();
    const base = {
      financial:
        "Describe current financial situation for a social support application. Keep it factual, respectful, and concise (120-160 words).",
      employment:
        "Describe employment circumstances (unemployed/looking/part-time/etc.), recent changes, and constraints in a respectful tone (80-140 words).",
      reason:
        "Explain the primary reason for applying for financial assistance, including responsibilities and intended use of funds (80-140 words).",
    };
    return `${base[field]}\nApplicant context (optional): ${JSON.stringify(
      v.family || {}
    )}`;
  };

  const attach =
    (
      fieldPath: `situation.${
        | "financialSituation"
        | "employmentCircumstances"
        | "reasonForApplying"}`
    ) =>
    (text: string) => {
      setValue(fieldPath, text, { shouldDirty: true });
      setOpen(null);
    };

  return (
    <Grid container spacing={2}>
      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="situation.financialSituation"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Current Financial Situation"
              multiline
              minRows={5}
              fullWidth
              placeholder="Describe your current financial situation..."
              InputProps={{
                endAdornment: (
                  <Tooltip title="Help Me Write">
                    <IconButton
                      aria-label="Help me write: financial"
                      onClick={() => setOpen("financial")}
                      size="small"
                    >
                      <SmartToyIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          )}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="situation.employmentCircumstances"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Employment Circumstances"
              multiline
              minRows={5}
              fullWidth
              placeholder="Describe your employment situation..."
              InputProps={{
                endAdornment: (
                  <Tooltip title="Help Me Write">
                    <IconButton
                      aria-label="Help me write: employment"
                      onClick={() => setOpen("employment")}
                      size="small"
                    >
                      <SmartToyIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          )}
        />
      </Grid>

      <Grid sx={{ xs: 12, md: 6 }}>
        <Controller
          name="situation.reasonForApplying"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Reason for Applying"
              multiline
              minRows={5}
              fullWidth
              placeholder="Why are you applying for assistance?"
              InputProps={{
                endAdornment: (
                  <Tooltip title="Help Me Write">
                    <IconButton
                      aria-label="Help me write: reason"
                      onClick={() => setOpen("reason")}
                      size="small"
                    >
                      <SmartToyIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          )}
        />
      </Grid>

      <HelpMeWriteDialog
        open={open === "financial"}
        onClose={() => setOpen(null)}
        onAccept={attach("situation.financialSituation")}
        seedPrompt={seed("financial")}
      />
      <HelpMeWriteDialog
        open={open === "employment"}
        onClose={() => setOpen(null)}
        onAccept={attach("situation.employmentCircumstances")}
        seedPrompt={seed("employment")}
      />
      <HelpMeWriteDialog
        open={open === "reason"}
        onClose={() => setOpen(null)}
        onAccept={attach("situation.reasonForApplying")}
        seedPrompt={seed("reason")}
      />
    </Grid>
  );
};

export default Step3;
