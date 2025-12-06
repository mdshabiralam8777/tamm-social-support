import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  LinearProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

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
  completedDate?: string;
  progress: number;
  notes: string;
}

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Load applications from localStorage
  const loadApplications = (): Application[] => {
    try {
      const stored = localStorage.getItem("tamm:ss:applications");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load applications:", error);
      return [];
    }
  };

  const applications = loadApplications();

  const getStatusColor = (
    status: Application["status"]
  ): "primary" | "secondary" | "error" | "warning" | "info" | "success" => {
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

  const getStatusIcon = (
    status: Application["status"]
  ): React.ReactElement | null => {
    switch (status) {
      case "submitted":
        return <DescriptionIcon fontSize="small" />;
      case "in_review":
        return <HourglassEmptyIcon fontSize="small" />;
      case "pending_documents":
        return <PendingActionsIcon fontSize="small" />;
      case "approved":
        return <CheckCircleIcon fontSize="small" />;
      case "rejected":
        return <CancelIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-AE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return t("dashboard.justNow");
    if (diffInHours < 24)
      return t("dashboard.hoursAgo", { count: diffInHours });
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return t("dashboard.daysAgo", { count: diffInDays });
    const diffInWeeks = Math.floor(diffInDays / 7);
    return t("dashboard.weeksAgo", { count: diffInWeeks });
  };

  // Empty state
  if (applications.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 4, sm: 8 },
          }}
        >
          <DescriptionIcon
            sx={{
              fontSize: { xs: 80, sm: 120 },
              color: "action.disabled",
              mb: 2,
            }}
          />
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            {t("dashboard.noApplications")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {t("dashboard.noApplicationsMessage")}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/apply")}
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {t("dashboard.applyNow")}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 3,
          fontSize: { xs: "1.5rem", sm: "2rem" },
          fontWeight: 600,
        }}
      >
        {t("dashboard.title")}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        {t("dashboard.trackMessage")}
      </Alert>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {applications
          .sort(
            (a, b) =>
              new Date(b.submittedDate).getTime() -
              new Date(a.submittedDate).getTime()
          )
          .map((application) => (
            <Grid size={{ xs: 12, md: 6 }} key={application.id}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s",
                  "&:hover": {
                    elevation: 4,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Chip
                      {...(getStatusIcon(application.status) && {
                        icon: getStatusIcon(application.status)!,
                      })}
                      label={t(`dashboard.status.${application.status}`)}
                      color={getStatusColor(application.status)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      }}
                    >
                      {application.id}
                    </Typography>
                  </Box>

                  {/* Type */}
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      fontWeight: 600,
                    }}
                  >
                    {application.type}
                  </Typography>

                  {/* Dates */}
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 0.5,
                        fontSize: { xs: "0.813rem", sm: "0.875rem" },
                      }}
                    >
                      <strong>{t("dashboard.submittedOn")}:</strong>{" "}
                      {formatDate(application.submittedDate)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.813rem", sm: "0.875rem" } }}
                    >
                      <strong>{t("dashboard.lastUpdate")}:</strong>{" "}
                      {formatDate(application.lastUpdate)} (
                      {getTimeAgo(application.lastUpdate)})
                    </Typography>
                    {application.estimatedCompletion &&
                      application.status !== "approved" && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 0.5,
                            fontSize: { xs: "0.813rem", sm: "0.875rem" },
                          }}
                        >
                          <strong>{t("dashboard.estimatedCompletion")}:</strong>{" "}
                          {formatDate(application.estimatedCompletion)}
                        </Typography>
                      )}
                  </Box>

                  {/* Progress Bar */}
                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.813rem" } }}
                      >
                        {t("dashboard.progress")}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "0.75rem", sm: "0.813rem" },
                        }}
                      >
                        {application.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={application.progress}
                      sx={{ height: 8, borderRadius: 1 }}
                      color={getStatusColor(application.status)}
                    />
                  </Box>

                  {/* Notes */}
                  <Alert
                    severity={
                      application.status === "approved"
                        ? "success"
                        : application.status === "rejected"
                        ? "error"
                        : "info"
                    }
                    sx={{
                      mb: 2,
                      "& .MuiAlert-message": {
                        fontSize: { xs: "0.813rem", sm: "0.875rem" },
                      },
                    }}
                  >
                    {application.notes}
                  </Alert>

                  {/* Actions */}
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={() => navigate(`/application/${application.id}`)}
                    sx={{ fontSize: { xs: "0.813rem", sm: "0.875rem" } }}
                  >
                    {t("dashboard.viewDetails")}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Apply for another */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/apply")}
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {t("dashboard.submitAnother")}
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
