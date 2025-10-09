import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const SubmissionSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
          Request Submitted Successfully 🎉
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Your social support application has been submitted successfully.
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
          Reference No: <strong>{reference}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please save this reference number for your records.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")} size="large">
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default SubmissionSuccess;
