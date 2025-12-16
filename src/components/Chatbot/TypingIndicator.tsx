import React from "react";
import { Box } from "@mui/material";

/**
 * Animated typing indicator (three bouncing dots)
 */
const TypingIndicator: React.FC = () => {
  const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: "50%",
    bgcolor: "grey.400",
    animation: "bounce 1.4s infinite ease-in-out",
    "@keyframes bounce": {
      "0%, 80%, 100%": { transform: "scale(0)" },
      "40%": { transform: "scale(1)" },
    },
  };

  return (
    <Box sx={{ textAlign: "left", mb: { xs: 1.5, sm: 2 } }}>
      <Box
        sx={{
          display: "inline-block",
          p: { xs: 1, sm: 1.25 },
          borderRadius: 2.5,
          bgcolor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          className="typing-indicator"
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
          }}
        >
          <Box component="span" sx={{ ...dotStyle, animationDelay: "0s" }} />
          <Box component="span" sx={{ ...dotStyle, animationDelay: "0.2s" }} />
          <Box component="span" sx={{ ...dotStyle, animationDelay: "0.4s" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default TypingIndicator;
