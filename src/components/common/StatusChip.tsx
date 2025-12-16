import React from "react";
import { Chip, type ChipProps } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

type StatusType =
  | "submitted"
  | "in_review"
  | "pending_documents"
  | "approved"
  | "rejected";

interface StatusChipProps {
  /** Status value */
  status: StatusType;
  /** Label text (if not using status as label) */
  label?: string;
  /** Size variant */
  size?: "small" | "medium";
}

const statusConfig: Record<
  StatusType,
  { color: ChipProps["color"]; icon: React.ReactElement }
> = {
  submitted: {
    color: "info",
    icon: <DescriptionIcon fontSize="small" />,
  },
  in_review: {
    color: "warning",
    icon: <HourglassEmptyIcon fontSize="small" />,
  },
  pending_documents: {
    color: "secondary",
    icon: <PendingActionsIcon fontSize="small" />,
  },
  approved: {
    color: "success",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  rejected: {
    color: "error",
    icon: <CancelIcon fontSize="small" />,
  },
};

/**
 * Reusable status chip with consistent color and icon mapping
 */
const StatusChip: React.FC<StatusChipProps> = ({
  status,
  label,
  size = "small",
}) => {
  const config = statusConfig[status] || statusConfig.submitted;

  return (
    <Chip
      icon={config.icon}
      label={label || status.replace("_", " ")}
      color={config.color}
      size={size}
      sx={{ fontWeight: 600, textTransform: "capitalize" }}
    />
  );
};

export default StatusChip;

// Status color type compatible with both Chip and LinearProgress
type CompatibleColor =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "primary"
  | "secondary";

// Also export the utility functions for cases where only color/icon is needed
export function getStatusColor(status: StatusType): CompatibleColor {
  const colorMap: Record<StatusType, CompatibleColor> = {
    submitted: "info",
    in_review: "warning",
    pending_documents: "secondary",
    approved: "success",
    rejected: "error",
  };
  return colorMap[status] || "primary";
}

export function getStatusIcon(status: StatusType): React.ReactElement | null {
  return statusConfig[status]?.icon || null;
}
