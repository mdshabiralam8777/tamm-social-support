import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SubmissionSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const reference = location.state?.reference ?? "N/A";

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 4,
          maxWidth: 700,
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom color="success.main">
          {t("submissionPage.title")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("submissionPage.body")}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            my: 2,
            p: 2,
            bgcolor: "grey.100",
            borderRadius: 2,
            fontFamily: "monospace",
          }}
        >
          {t("submissionPage.ref")} <strong>{reference}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("submissionPage.save")}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")} size="large">
          {t("submissionPage.home")}
        </Button>
      </Paper>
    </Box>
  );
};

export default SubmissionSuccess;
