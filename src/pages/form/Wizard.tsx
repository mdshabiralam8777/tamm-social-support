import { useNavigate } from "react-router-dom";
import React, { useMemo, useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
import FormStepper from "../../components/FormStepper";
import { useFormPersist } from "../../hooks/useFormPersist";
import { submitApplication } from "../../services/api";
import { useApp } from "../../context/AppContext";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import {
  applicationSchema,
  type ApplicationFormType,
} from "../../schema/applicationSchema";
import { STEP_FIELDS } from "../../constants/stepFields";
import { DEFAULT_VALUES } from "../../constants/defaultValues";

const steps = [<Step1 />, <Step2 />, <Step3 />, <Step4 />];
const STEP_SECTIONS = ["personal", "family", "situation", "documents"] as const;

const Wizard: React.FC = () => {
  const { t } = useTranslation();
  const methods = useForm<ApplicationFormType>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const { notify } = useApp();
  const navigate = useNavigate();

  useFormPersist<ApplicationFormType>(
    "tamm:ss:draft",
    methods.watch,
    methods.reset
  );

  const currentStepFields = STEP_FIELDS[active];
  const watchedValues = methods.watch(currentStepFields as any);
  const [canProceed, setCanProceed] = useState(false);

  const progress = useMemo(() => ((active + 1) / steps.length) * 100, [active]);

  const next = async () => {
    const section = STEP_SECTIONS[active];
    const valid = await methods.trigger(section);
    if (valid) setActive((s) => Math.min(steps.length - 1, s + 1));
  };

  const back = () => setActive((s) => Math.max(0, s - 1));

  const onSubmit = methods.handleSubmit(async (data) => {
    console.group("Application Form Submission");
    console.log("All Inputs:", data);
    console.groupEnd();

    setLoading(true);
    const res = await submitApplication(data);

    setTimeout(() => {
      setLoading(false);

      if (res.status === 200) {
        localStorage.removeItem("tamm:ss:draft");
        notify(t("submitted"), "success");

        const ref = `REQ-${new Date().getFullYear()}${String(
          new Date().getMonth() + 1
        ).padStart(2, "0")}${String(new Date().getDate()).padStart(
          2,
          "0"
        )}-${Math.floor(10000 + Math.random() * 90000)}`;

        navigate("/submitted", { state: { reference: ref } });
      } else {
        notify(t("submissionFailed"), "error");
      }
    }, 2500);
  });

  useEffect(() => {
    const checkValidity = async () => {
      const ok = await methods.trigger(currentStepFields as any, {
        shouldFocus: false,
      });
      setCanProceed(ok);
    };

    checkValidity();
  }, [JSON.stringify(watchedValues), active, methods, currentStepFields]);

  const stepLabels = [
    t("steps.personal"),
    t("steps.family"),
    t("steps.situation"),
    t("steps.documents"),
  ];

  return (
    <FormProvider {...methods}>
      <Card sx={{ borderRadius: { xs: 1, sm: 2 } }}>
        <CardHeader
          title={t("applyNow")}
          subheader={t("open")}
          sx={{
            "& .MuiCardHeader-title": {
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            },
            "& .MuiCardHeader-subheader": {
              fontSize: { xs: "0.875rem", sm: "1rem" },
            },
          }}
        />{" "}
        <CardContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
          {loading ? (
            <Box
              sx={{
                height: { xs: "200px", sm: "300px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <CircularProgress />
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                {t("processing")}
              </Typography>
            </Box>
          ) : (
            <Stack spacing={{ xs: 2, sm: 3 }}>
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  aria-label="Progress"
                  sx={{ height: { xs: 6, sm: 8 } }}
                />
              </Box>
              <FormStepper activeStep={active} steps={stepLabels} /> <Divider />
              {steps[active]}
              <Divider />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                gap={2}
                justifyContent="space-between"
              >
                <Button
                  disabled={active === 0}
                  onClick={back}
                  sx={{
                    order: { xs: 2, sm: 1 },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  {t("back")}
                </Button>
                {active < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={next}
                    disabled={!canProceed}
                    sx={{
                      order: { xs: 1, sm: 2 },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    {t("next")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={loading || !canProceed}
                    sx={{
                      order: { xs: 1, sm: 2 },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    {t("submit")}
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
