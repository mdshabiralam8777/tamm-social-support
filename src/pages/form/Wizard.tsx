import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Button,
  LinearProgress,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormStepper from "../../components/FormStepper";
import { useFormPersist } from "../../hooks/useFormPersist";
import { submitApplication } from "../../services/api";
import { useApp } from "../../context/AppContext";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const schema = z.object({
  personal: z.object({
    name: z.string().min(2),
    nationalId: z.string().min(6),
    dob: z.string().min(4),
    gender: z.enum(["male", "female", "other"]),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    phone: z.string().min(5),
    email: z.string().email(),
  }),
  family: z.object({
    maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
    dependents: z.coerce.number().int().min(0),
    employmentStatus: z.enum(["employed", "unemployed", "student", "retired"]),
    monthlyIncome: z.coerce.number().min(0),
    housingStatus: z.enum(["rent", "own", "family", "other"]),
  }),
  situation: z.object({
    financialSituation: z.string().min(10),
    employmentCircumstances: z.string().min(10),
    reasonForApplying: z.string().min(10),
  }),
});

type FormShape = z.infer<typeof schema>;

const defaultValues: FormShape = {
  personal: {
    name: "",
    nationalId: "",
    dob: "",
    gender: "male",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  },
  family: {
    maritalStatus: "single",
    dependents: 0,
    employmentStatus: "unemployed",
    monthlyIncome: 0,
    housingStatus: "rent",
  },
  situation: {
    financialSituation: "",
    employmentCircumstances: "",
    reasonForApplying: "",
  },
};

const Wizard: React.FC = () => {
  const methods = useForm<FormShape>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const [active, setActive] = useState(0);
  const { notify } = useApp();

  useFormPersist<FormShape>("tamm:ss:draft", methods.watch, methods.reset);

  const progress = useMemo(() => ((active + 1) / 3) * 100, [active]);

  const next = async () => {
    const section =
      active === 0 ? "personal" : active === 1 ? "family" : "situation";
    const valid = await methods.trigger(section as any);
    if (valid) setActive((s) => Math.min(2, s + 1));
  };
  const back = () => setActive((s) => Math.max(0, s - 1));

  const onSubmit = methods.handleSubmit(async (data) => {
    const res = await submitApplication(data as any);
    if (res.status === 200) {
      localStorage.removeItem("tamm:ss:draft");
      notify("Application submitted", "success");
    } else {
      notify("Submission failed", "error");
    }
  });

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader title="Apply for Support" subheader="OPEN | مفتوحة" />
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                aria-label="Progress"
              />
            </Box>
            <FormStepper activeStep={active} />
            <Divider />
            {active === 0 && <Step1 />}
            {active === 1 && <Step2 />}
            {active === 2 && <Step3 />}
            <Divider />
            <Stack direction="row" gap={2} justifyContent="space-between">
              <Button disabled={active === 0} onClick={back}>
                Back
              </Button>
              {active < 2 ? (
                <Button variant="contained" onClick={next}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" onClick={onSubmit}>
                  Submit Application
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default Wizard;
