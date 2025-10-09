import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

interface FormStepperProps {
  activeStep: number;
  steps: string[];
}

const FormStepper: React.FC<FormStepperProps> = ({ activeStep, steps }) => {
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
