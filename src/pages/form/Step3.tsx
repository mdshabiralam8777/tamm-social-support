import React, { useState } from "react";
import { Grid, TextField, IconButton, Tooltip } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  Controller,
  useFormContext,
  type ControllerFieldState,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import HelpMeWriteDialog from "../../components/HelpMeWriteDialog";
import { useStep3Fields } from "../../hooks/useStep3Fields";

const Step3: React.FC = () => {
  const { control, setValue, getValues } = useFormContext();
  const { t } = useTranslation();

  const formFields = useStep3Fields();

  type FieldId = (typeof formFields)[number]["id"];

  const [openFieldId, setOpenFieldId] = useState<FieldId | null>(null);

  const show = (fieldState: ControllerFieldState) =>
    !!fieldState.error && (fieldState.isTouched || fieldState.isDirty);

  const activeField = formFields.find((f) => f.id === openFieldId);

  return (
    <Grid container spacing={2}>
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
                    <Tooltip title={t("helpMeWrite")}>
                      <IconButton
                        aria-label={t("helpMeWrite")}
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

      {activeField && (
        <HelpMeWriteDialog
          open={!!activeField}
          placeholderText={activeField.placeholder}
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
