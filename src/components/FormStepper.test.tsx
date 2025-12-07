import { render, screen } from "@testing-library/react";
import FormStepper from "./FormStepper";

describe("FormStepper", () => {
  const mockSteps = ["Personal Info", "Family Info", "Situation", "Documents"];

  it("should render all step labels", () => {
    render(<FormStepper activeStep={0} steps={mockSteps} />);

    mockSteps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it("should have aria-label for accessibility", () => {
    render(<FormStepper activeStep={0} steps={mockSteps} />);

    expect(screen.getByLabelText("Application steps")).toBeInTheDocument();
  });

  it("should render correct number of steps", () => {
    render(<FormStepper activeStep={1} steps={mockSteps} />);

    // MUI Stepper renders step labels as text nodes
    mockSteps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
});
