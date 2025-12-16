import React from "react";
import { Box, Chip } from "@mui/material";

interface QuickRepliesProps {
  replies: string[];
  onReply: (question: string) => void;
}

/**
 * Quick reply chip buttons for common questions
 */
const QuickReplies: React.FC<QuickRepliesProps> = ({ replies, onReply }) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "center",
      }}
    >
      {replies.map((question, index) => (
        <Chip
          key={index}
          label={question}
          onClick={() => onReply(question)}
          size="small"
          sx={{
            cursor: "pointer",
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
            "&:hover": {
              bgcolor: "primary.light",
              color: "primary.contrastText",
            },
            transition: "all 0.2s",
          }}
        />
      ))}
    </Box>
  );
};

export default QuickReplies;
