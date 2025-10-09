import React, { useMemo, useState, useEffect } from "react";
import { useWatch } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Button,
  LinearProgress,
  CircularProgress,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import FormStepper from "../../components/FormStepper";
import { useFormPersist } from "../../hooks/useFormPersist";
import { submitApplication } from "../../services/api";
import { useApp } from "../../context/AppContext";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  applicationSchema,
  type ApplicationFormType,
} from "../../schema/applicationSchema";
import { STEP_FIELDS } from "../../constants/stepFields";
import { DEFAULT_VALUES } from "../../constants/defaultValues";

const Wizard: React.FC = () => {
  const methods = useForm<ApplicationFormType>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ added
  const { notify } = useApp();
  const navigate = useNavigate();

  useFormPersist<ApplicationFormType>(
    "tamm:ss:draft",
    methods.watch,
    methods.reset
  );
  const watched = useWatch({ control: methods.control }); // watch everything
  const [canProceed, setCanProceed] = useState(false);

  const progress = useMemo(() => ((active + 1) / 3) * 100, [active]);

  const next = async () => {
    const section =
      active === 0 ? "personal" : active === 1 ? "family" : "situation";
    const valid = await methods.trigger(section as any);
    if (valid) setActive((s) => Math.min(2, s + 1));
  };
  const back = () => setActive((s) => Math.max(0, s - 1));

  const onSubmit = methods.handleSubmit(async (data) => {
    console.group("Application Form Submission");
    console.log("All Inputs:", data);
    console.groupEnd();

    setLoading(true); // ✅ show loading spinner
    const res = await submitApplication(data);

    // simulate processing delay (2–3 seconds)
    setTimeout(() => {
      setLoading(false);

      if (res.status === 200) {
        localStorage.removeItem("tamm:ss:draft");
        notify("Application submitted", "success");

        const ref = `REQ-${new Date().getFullYear()}${String(
          new Date().getMonth() + 1
        ).padStart(2, "0")}${String(new Date().getDate()).padStart(
          2,
          "0"
        )}-${Math.floor(10000 + Math.random() * 90000)}`;

        navigate("/submitted", { state: { reference: ref } });
      } else {
        notify("Submission failed", "error");
      }
    }, 2500); // ⏳ wait ~2.5 sec before navigating
  });

  useEffect(() => {
    (async () => {
      const ok = await methods.trigger(STEP_FIELDS[active] as any, {
        shouldFocus: false,
      });
      setCanProceed(ok);
    })();
  }, [active, watched, methods]);

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader title="Apply for Support" subheader="OPEN | مفتوحة" />
        <CardContent>
          {loading ? (
            // ✅ Show loading spinner while processing
            <Box
              sx={{
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <CircularProgress />
              <Typography variant="h6" color="text.secondary">
                Processing your request...
              </Typography>
            </Box>
          ) : (
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
                  <Button
                    variant="contained"
                    onClick={next}
                    disabled={!canProceed}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={loading || !canProceed}
                  >
                    Submit Application
                  </Button>
                )}
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default Wizard;
