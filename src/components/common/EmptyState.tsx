import React from "react";
import { Box, Typography, Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

interface EmptyStateProps {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action button label */
  actionLabel?: string;
  /** Action button click handler */
  onAction?: () => void;
}

/**
 * Reusable empty state component for lists and pages
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <InboxIcon />,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 4, sm: 8 },
      }}
    >
      <Box
        sx={{
          "& > svg": {
            fontSize: { xs: 80, sm: 120 },
            color: "action.disabled",
            mb: 2,
          },
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button
          variant="contained"
          size="large"
          onClick={onAction}
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
