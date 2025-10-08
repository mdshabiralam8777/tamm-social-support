import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useTranslation } from "react-i18next";

const FormStepper: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  const { t } = useTranslation();
  const steps = [t("steps.personal"), t("steps.family"), t("steps.situation")];
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      aria-label="Application steps"
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default FormStepper;
