import React from "react";
import { Box, Typography } from "@mui/material";

export interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  formatTime: (date: Date) => string;
}

/**
 * Individual chat message bubble component
 */
const ChatMessage: React.FC<ChatMessageProps> = ({ message, formatTime }) => {
  const isUser = message.sender === "user";

  return (
    <Box
      sx={{
        textAlign: isUser ? "right" : "left",
        mb: { xs: 1.5, sm: 2 },
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          maxWidth: "85%",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: "block",
            p: { xs: 1, sm: 1.25 },
            borderRadius: 2.5,
            bgcolor: isUser ? "primary.main" : "#fff",
            color: isUser ? "#fff" : "text.primary",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            fontSize: { xs: "0.875rem", sm: "0.95rem" },
            boxShadow: isUser
              ? "0 2px 8px rgba(25,118,210,0.25)"
              : "0 2px 8px rgba(0,0,0,0.08)",
            lineHeight: 1.5,
          }}
        >
          {message.text}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 0.5,
            color: "text.secondary",
            fontSize: "0.7rem",
          }}
        >
          {formatTime(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
