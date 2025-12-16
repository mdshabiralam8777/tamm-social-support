import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { askChatbot } from "../services/openai";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

const STORAGE_KEY = "tamm:chatbot:history";

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine contextual welcome message based on route
  const getWelcomeMessage = () => {
    const path = location.pathname;
    if (path === "/apply") {
      return t("chatbot.welcome.apply");
    } else if (path === "/submitted") {
      return t("chatbot.welcome.submitted");
    } else if (path === "/") {
      return t("chatbot.welcome.home");
    }
    return t("chatbot.welcome.default");
  };

  // Load chat history from localStorage or start with welcome message
  const loadChatHistory = (): Message[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const loadedMessages = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));

        // If there's only one message (welcome message) and it's from the bot,
        // regenerate it in the current language
        if (loadedMessages.length === 1 && loadedMessages[0].sender === "bot") {
          return [
            {
              text: getWelcomeMessage(),
              sender: "bot" as const,
              timestamp: new Date(),
            },
          ];
        }

        return loadedMessages;
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
    // Default welcome message
    return [
      {
        text: getWelcomeMessage(),
        sender: "bot" as const,
        timestamp: new Date(),
      },
    ];
  };

  const [messages, setMessages] = useState<Message[]>(loadChatHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save to localStorage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Idle timer to show quick replies after 30 seconds of inactivity
  const resetIdleTimer = () => {
    // Clear existing timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    // Hide quick replies when user is active (if they've interacted before)
    if (userHasInteracted) {
      setShowQuickReplies(false);
    }
    // Set new timer to show quick replies after 30 seconds
    idleTimerRef.current = setTimeout(() => {
      setShowQuickReplies(true);
    }, 30000); // 30 seconds
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (textToSend === "") return;

    const newMessages: Message[] = [
      ...messages,
      { text: textToSend, sender: "user", timestamp: new Date() },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setUserHasInteracted(true);
    resetIdleTimer();
    setShowQuickReplies(false);

    try {
      const botResponse = await askChatbot(
        textToSend,
        i18n.language as "en" | "ar"
      );
      setMessages((prev) => [
        ...prev,
        { text: botResponse, sender: "bot", timestamp: new Date() },
      ]);
      // Start idle timer - quick replies will show after 30 seconds
      resetIdleTimer();
    } catch (error) {
      const errorMessage = t("chatbot.error");
      setMessages((prev) => [
        ...prev,
        { text: errorMessage, sender: "bot", timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (question: string) => {
    handleSend(question);
  };

  const handleClearChat = () => {
    const welcomeMsg: Message = {
      text: getWelcomeMessage(),
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
    setShowQuickReplies(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(i18n.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const quickReplies = [
    t("chatbot.quickReplies.howToApply"),
    t("chatbot.quickReplies.documents"),
    t("chatbot.quickReplies.processTime"),
    t("chatbot.quickReplies.checkStatus"),
    t("chatbot.quickReplies.eligibility"),
    t("chatbot.quickReplies.contactSupport"),
  ];

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
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* Header */}
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
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          {t("chatbot.title")}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title={t("chatbot.clearChat")}>
            <IconButton
              onClick={handleClearChat}
              color="inherit"
              size="small"
              disabled={messages.length <= 1}
            >
              <DeleteSweepIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClose} color="inherit" size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 2 },
          overflowY: "auto",
          overflowX: "hidden",
          bgcolor: "#f5f5f5",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              textAlign: msg.sender === "user" ? "right" : "left",
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
                  bgcolor: msg.sender === "user" ? "primary.main" : "#fff",
                  color: msg.sender === "user" ? "#fff" : "text.primary",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  fontSize: { xs: "0.875rem", sm: "0.95rem" },
                  boxShadow:
                    msg.sender === "user"
                      ? "0 2px 8px rgba(25,118,210,0.25)"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                  lineHeight: 1.5,
                }}
              >
                {msg.text}
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
                {formatTime(msg.timestamp)}
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Typing Indicator */}
        {loading && (
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
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "grey.400",
                    animation: "bounce 1.4s infinite ease-in-out",
                    animationDelay: "0s",
                    "@keyframes bounce": {
                      "0%, 80%, 100%": { transform: "scale(0)" },
                      "40%": { transform: "scale(1)" },
                    },
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "grey.400",
                    animation: "bounce 1.4s infinite ease-in-out",
                    animationDelay: "0.2s",
                    "@keyframes bounce": {
                      "0%, 80%, 100%": { transform: "scale(0)" },
                      "40%": { transform: "scale(1)" },
                    },
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "grey.400",
                    animation: "bounce 1.4s infinite ease-in-out",
                    animationDelay: "0.4s",
                    "@keyframes bounce": {
                      "0%, 80%, 100%": { transform: "scale(0)" },
                      "40%": { transform: "scale(1)" },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {/* Quick Reply Buttons */}
        {showQuickReplies && !loading && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {quickReplies.map((question, index) => (
              <Chip
                key={index}
                label={question}
                onClick={() => handleQuickReply(question)}
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
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          p: { xs: 1, sm: 1.5 },
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "#fff",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder={t("chatbot.placeholder")}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value.length > 0) {
              setUserHasInteracted(true);
              resetIdleTimer();
            }
          }}
          onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
          disabled={loading}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: { xs: "0.875rem", sm: "1rem" },
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          size="small"
          sx={{
            flexShrink: 0,
            bgcolor: "primary.main",
            color: "#fff",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&.Mui-disabled": {
              bgcolor: "grey.300",
              color: "grey.500",
            },
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chatbot;
