import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

interface ChatHeaderProps {
  title: string;
  clearTooltip: string;
  onClear: () => void;
  onClose: () => void;
  canClear: boolean;
}

/**
 * Chat header with title, clear, and close buttons
 */
const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  clearTooltip,
  onClear,
  onClose,
  canClear,
}) => {
  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: { xs: 0, sm: "8px 8px 0 0" },
      }}
    >
      <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Tooltip title={clearTooltip}>
          <IconButton
            onClick={onClear}
            color="inherit"
            size="small"
            disabled={!canClear}
          >
            <DeleteSweepIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <IconButton onClick={onClose} color="inherit" size="small">
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatHeader;
