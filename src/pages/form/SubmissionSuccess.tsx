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
        minHeight: { xs: "60vh", sm: "70vh" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: { xs: 2, sm: 4 },
          maxWidth: 700,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          color="success.main"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
        >
          {t("submissionPage.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {t("submissionPage.body")}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            my: 2,
            p: { xs: 1.5, sm: 2 },
            bgcolor: "grey.100",
            borderRadius: 2,
            fontFamily: "monospace",
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
            wordBreak: "break-all",
          }}
        >
          {t("submissionPage.ref")} <strong>{reference}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          {t("submissionPage.save")}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          size="large"
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: 200 },
          }}
        >
          {t("submissionPage.home")}
        </Button>
      </Paper>
    </Box>
  );
};

export default SubmissionSuccess;
