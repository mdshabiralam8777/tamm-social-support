import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  /** Loading message to display */
  message?: string;
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Whether to show full page centered */
  fullPage?: boolean;
}

const sizeMap = {
  small: 24,
  medium: 40,
  large: 60,
};

/**
 * Reusable loading spinner component with optional message
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = "medium",
  fullPage = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        py: fullPage ? 8 : 4,
        minHeight: fullPage ? { xs: "200px", sm: "300px" } : undefined,
      }}
    >
      <CircularProgress size={sizeMap[size]} />
      {message && (
        <Typography
          variant={size === "large" ? "h6" : "body1"}
          color="text.secondary"
          sx={{
            fontSize:
              size === "small"
                ? { xs: "0.875rem", sm: "1rem" }
                : { xs: "1rem", sm: "1.25rem" },
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
