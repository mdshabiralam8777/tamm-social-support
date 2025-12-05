import React, { useState } from "react";
import { Box, Paper, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { askChatbot } from "../services/openai";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages: Message[] = [
      ...messages,
      { text: input, sender: "user" },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await askChatbot(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      const errorMessage =
        "I'm sorry, something went wrong. Please try again later.";
      setMessages((prev) => [...prev, { text: errorMessage, sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        position: "fixed",
        bottom: { xs: 0, sm: 100 },
        right: { xs: 0, sm: 20 },
        left: { xs: 0, sm: "auto" },
        width: { xs: "100%", sm: 380, md: 400 },
        height: { xs: "100vh", sm: 550 },
        maxHeight: { xs: "100vh", sm: "calc(100vh - 120px)" },
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        borderRadius: { xs: 0, sm: 2 },
      }}
    >
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          AI Chat Assistant
        </Typography>
        <IconButton onClick={onClose} color="inherit" size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 2 },
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              textAlign: msg.sender === "user" ? "right" : "left",
              mb: { xs: 0.75, sm: 1 },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "inline-block",
                p: { xs: 0.75, sm: 1 },
                borderRadius: 2,
                bgcolor: msg.sender === "user" ? "primary.light" : "grey.200",
                maxWidth: "85%",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
        {loading && (
          <Box sx={{ textAlign: "left", mb: { xs: 0.75, sm: 1 } }}>
            <Typography
              variant="body1"
              sx={{
                display: "inline-block",
                p: { xs: 0.75, sm: 1 },
                borderRadius: 2,
                bgcolor: "grey.200",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              ...
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          p: { xs: 1, sm: 1.5 },
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: { xs: "0.875rem", sm: "1rem" },
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={loading}
          size="small"
          sx={{ flexShrink: 0 }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chatbot;
