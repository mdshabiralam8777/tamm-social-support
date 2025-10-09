import React, { useState } from "react";
import { Grid, TextField, IconButton, Tooltip } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  Controller,
  useFormContext,
  type ControllerFieldState,
} from "react-hook-form";
import HelpMeWriteDialog from "../../components/HelpMeWriteDialog";

// 1. Define the configuration for the fields in this step
const formFields = [
  {
    id: "financial",
    name: "situation.financialSituation",
    label: "Current Financial Situation",
    placeholder: "Describe your current financial situation...",
    ariaLabel: "Help me write: financial situation",
    seedText:
      "Describe current financial situation for a social support application. Keep it factual, respectful, and concise (120-160 words).",
  },
  {
    id: "employment",
    name: "situation.employmentCircumstances",
    label: "Employment Circumstances",
    placeholder: "Describe your employment situation...",
    ariaLabel: "Help me write: employment circumstances",
    seedText:
      "Describe employment circumstances (unemployed/looking/part-time/etc.), recent changes, and constraints in a respectful tone (80-140 words).",
  },
  {
    id: "reason",
    name: "situation.reasonForApplying",
    label: "Reason for Applying",
    placeholder: "Why are you applying for assistance?",
    ariaLabel: "Help me write: reason for applying",
    seedText:
      "Explain the primary reason for applying for financial assistance, including responsibilities and intended use of funds (80-140 words).",
  },
];

// Define a type for our field ID for better type safety
type FieldId = (typeof formFields)[number]["id"];

const Step3: React.FC = () => {
  const { control, setValue, getValues } = useFormContext();
  const [openFieldId, setOpenFieldId] = useState<FieldId | null>(null);

  const show = (fieldState: ControllerFieldState) =>
    !!fieldState.error && (fieldState.isTouched || fieldState.isDirty);

  // Find the configuration for the currently active/open field
  const activeField = formFields.find((f) => f.id === openFieldId);

  return (
    <Grid container spacing={2}>
      {/* 2. Map over the config to render each text field */}
      {formFields.map((config) => (
        <Grid key={config.name} sx={{ flexBasis: "100%", maxWidth: "100%" }}>
          <Controller
            name={config.name}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={config.label}
                placeholder={config.placeholder}
                multiline
                minRows={5}
                fullWidth
                required
                error={show(fieldState)}
                helperText={show(fieldState) ? fieldState.error?.message : " "}
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Help Me Write">
                      <IconButton
                        aria-label={config.ariaLabel}
                        onClick={() => setOpenFieldId(config.id)}
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
      ))}

      {/* 3. Render a SINGLE dialog, conditionally based on activeField */}
      {activeField && (
        <HelpMeWriteDialog
          open={!!activeField}
          onClose={() => setOpenFieldId(null)}
          onAccept={(text: string) => {
            setValue(activeField.name as any, text, { shouldDirty: true });
            setOpenFieldId(null);
          }}
          seedPrompt={`${
            activeField.seedText
          }\nApplicant context (optional): ${JSON.stringify(
            getValues("family") || {}
          )}`}
        />
      )}
    </Grid>
  );
};

export default Step3;
