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
        bottom: 100,
        right: 20,
        width: 350,
        height: 500,
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h6">AI Chat Assistant</Typography>
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              textAlign: msg.sender === "user" ? "right" : "left",
              mb: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "inline-block",
                p: 1,
                borderRadius: 2,
                bgcolor: msg.sender === "user" ? "primary.light" : "grey.200",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
        {loading && (
          <Box sx={{ textAlign: "left", mb: 1 }}>
            <Typography
              variant="body1"
              sx={{
                display: "inline-block",
                p: 1,
                borderRadius: 2,
                bgcolor: "grey.200",
              }}
            >
              ...
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ p: 1, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <IconButton color="primary" onClick={handleSend} disabled={loading}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chatbot;
