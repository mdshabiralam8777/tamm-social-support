import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Divider,
  Chip,
  Alert,
  CircularProgress,
  useTheme,
  alpha,
} from "@mui/material";
import type { AlertColor } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import FeedIcon from "@mui/icons-material/Feed";

interface Application {
  id: string;
  submittedDate: string;
  status:
    | "submitted"
    | "in_review"
    | "pending_documents"
    | "approved"
    | "rejected";
  type: string;
  lastUpdate: string;
  estimatedCompletion?: string;
  progress: number;
  notes: string;
}

const ApplicationTracker: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("tamm:ss:applications:v2");
        const applications: Application[] = stored ? JSON.parse(stored) : [];
        const found = applications.find((app) => app.id === id);
        setApplication(found || null);
      } catch (error) {
        console.error("Failed to load application:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "submitted":
        return "info";
      case "in_review":
        return "warning";
      case "pending_documents":
        return "secondary";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "primary";
    }
  };

  const getAlertSeverity = (status: Application["status"]): AlertColor => {
    switch (status) {
      case "submitted":
        return "info";
      case "in_review":
        return "warning";
      case "pending_documents":
        return "warning"; // secondary is not valid for Alert
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "info";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      i18n.language === "ar" ? "ar-AE" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  const steps = [
    {
      label: t("dashboard.status.submitted"),
      description: t(
        "tracker.stepSubmittedDesc",
        "Your application has been received and is waiting for initial review."
      ),
      statusKey: "submitted",
    },
    {
      label: t("dashboard.status.in_review"),
      description: t(
        "tracker.stepReviewDesc",
        "Our team is currently reviewing your application details and documents."
      ),
      statusKey: "in_review",
    },
    {
      label: t("dashboard.status.pending_documents"),
      description: t(
        "tracker.stepPendingDesc",
        "We need some additional information or documents from you to proceed."
      ),
      statusKey: "pending_documents",
    },
    {
      label:
        application?.status === "rejected"
          ? t("dashboard.status.rejected")
          : t("dashboard.status.approved"),
      description:
        application?.status === "rejected"
          ? t(
              "tracker.stepRejectedDesc",
              "Unfortunately, your application could not be approved at this time."
            )
          : t(
              "tracker.stepApprovedDesc",
              "Congratulations! Your application has been approved."
            ),
      statusKey: application?.status === "rejected" ? "rejected" : "approved",
    },
  ];

  const getActiveStep = (status: Application["status"]) => {
    switch (status) {
      case "submitted":
        return 0;
      case "in_review":
        return 1;
      case "pending_documents":
        return 2;
      case "approved":
        return 4; // All done
      case "rejected":
        return 4; // All done
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!application) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          {t("tracker.notFound", "Application not found")}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard")}
          variant="outlined"
        >
          {t("tracker.backToDashboard", "Back to Dashboard")}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      {/* Header / Nav */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 3 }}
        color="inherit"
      >
        {t("tracker.backToDashboard", "Back to Dashboard")}
      </Button>

      <Grid container spacing={3}>
        {/* Main Info Card */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box>
                <Typography variant="overline" color="text.secondary">
                  {t("tracker.applicationId", "Application ID")}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  fontFamily="monospace"
                >
                  {application.id}
                </Typography>
              </Box>
              <Chip
                label={t(`dashboard.status.${application.status}`)}
                color={getStatusColor(application.status)}
                sx={{ height: 32, fontSize: "0.9rem", fontWeight: 600 }}
              />
            </Box>

            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
            >
              {application.type}
            </Typography>

            <Alert
              severity={getAlertSeverity(application.status)}
              sx={{ mt: 2, mb: 2 }}
            >
              {t(application.notes)}
            </Alert>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              {t("tracker.timeline", "Application Timeline")}
            </Typography>

            <Stepper
              activeStep={getActiveStep(application.status)}
              orientation="vertical"
              sx={{ mt: 2 }}
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        fontSize: "1.5rem",
                        "&.Mui-active": { color: theme.palette.primary.main },
                        "&.Mui-completed": {
                          color: theme.palette.success.main,
                        },
                        // Handling rejected state visually in the icon if needed,
                        // but standard stepper works well for linear progression.
                        ...(step.statusKey === "rejected" &&
                          application.status === "rejected" && {
                            color: theme.palette.error.main,
                          }),
                      },
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        {/* Sidebar Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.02),
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <DescriptionIcon color="action" />
              {t("tracker.details", "Details")}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t("dashboard.submittedOn")}
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatDate(application.submittedDate)}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {t("dashboard.lastUpdate")}
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatDate(application.lastUpdate)}
              </Typography>
            </Box>

            {application.estimatedCompletion && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t("dashboard.estimatedCompletion")}
                </Typography>
                <Typography variant="body1" fontWeight={500} color="primary">
                  {formatDate(application.estimatedCompletion)}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FeedIcon color="action" />
              {t("tracker.documents", "Documents")}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic", mt: 1 }}
            >
              {t("tracker.noDocuments", "No documents uploaded yet.")}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApplicationTracker;
