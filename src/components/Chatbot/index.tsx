import React, { useState, useEffect, useRef } from "react";
import { Box, Paper } from "@mui/material";
import { askChatbot } from "../../services/openai";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

// Subcomponents
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import type { Message } from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import ChatInput from "./ChatInput";

interface ChatbotProps {
  onClose: () => void;
}

const STORAGE_KEY = "tamm:chatbot:history";

/**
 * Main Chatbot container component
 * Orchestrates subcomponents and manages chat state
 */
const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get context-aware welcome message
  const getWelcomeMessage = (): string => {
    const path = location.pathname;
    if (path === "/apply") return t("chatbot.welcome.apply");
    if (path === "/submitted") return t("chatbot.welcome.submitted");
    if (path === "/") return t("chatbot.welcome.home");
    return t("chatbot.welcome.default");
  };

  // Load chat history from localStorage
  const loadChatHistory = (): Message[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const loadedMessages = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));

        // Regenerate welcome if only one bot message
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
    return [
      {
        text: getWelcomeMessage(),
        sender: "bot" as const,
        timestamp: new Date(),
      },
    ];
  };

  // State
  const [messages, setMessages] = useState<Message[]>(loadChatHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Idle timer for quick replies
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (userHasInteracted) setShowQuickReplies(false);
    idleTimerRef.current = setTimeout(() => setShowQuickReplies(true), 30000);
  };

  // Format timestamp for display
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(i18n.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Send message handler
  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    setMessages((prev) => [
      ...prev,
      { text: textToSend, sender: "user", timestamp: new Date() },
    ]);
    setInput("");
    setLoading(true);
    setUserHasInteracted(true);
    resetIdleTimer();
    setShowQuickReplies(false);

    try {
      const response = await askChatbot(
        textToSend,
        i18n.language as "en" | "ar"
      );
      setMessages((prev) => [
        ...prev,
        { text: response, sender: "bot", timestamp: new Date() },
      ]);
      resetIdleTimer();
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: t("chatbot.error"), sender: "bot", timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Clear chat handler
  const handleClear = () => {
    setMessages([
      { text: getWelcomeMessage(), sender: "bot", timestamp: new Date() },
    ]);
    setShowQuickReplies(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Input change handler with idle reset
  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.length > 0) {
      setUserHasInteracted(true);
      resetIdleTimer();
    }
  };

  // Quick replies
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
      <ChatHeader
        title={t("chatbot.title")}
        clearTooltip={t("chatbot.clearChat")}
        onClear={handleClear}
        onClose={onClose}
        canClear={messages.length > 1}
      />

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
          <ChatMessage key={index} message={msg} formatTime={formatTime} />
        ))}

        {loading && <TypingIndicator />}

        {showQuickReplies && !loading && (
          <QuickReplies replies={quickReplies} onReply={handleSend} />
        )}

        <div ref={messagesEndRef} />
      </Box>

      <ChatInput
        value={input}
        onChange={handleInputChange}
        onSend={() => handleSend()}
        disabled={loading}
        placeholder={t("chatbot.placeholder")}
      />
    </Paper>
  );
};

export default Chatbot;
