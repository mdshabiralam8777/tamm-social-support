import { Router, Request, Response } from "express";
import { askChatbot, helpMeWrite } from "../services/openai";

const router = Router();

/**
 * POST /api/chat
 * Handles chatbot requests
 */
router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { prompt, lang = "en" } = req.body;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Missing or invalid 'prompt' field" });
      return;
    }

    const validLang = lang === "ar" ? "ar" : "en";
    const response = await askChatbot(prompt, validLang);

    res.json({ response });
  } catch (error: unknown) {
    console.error("Chat error:", error);
    const message =
      error instanceof Error ? error.message : "Chat request failed";
    res.status(500).json({ error: message });
  }
});

/**
 * POST /api/help-me-write
 * Handles AI writing assistance requests
 */
router.post("/help-me-write", async (req: Request, res: Response) => {
  try {
    const { prompt, lang = "en", userInput } = req.body;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Missing or invalid 'prompt' field" });
      return;
    }

    const validLang = lang === "ar" ? "ar" : "en";
    const response = await helpMeWrite(prompt, validLang, userInput);

    res.json({ response });
  } catch (error: unknown) {
    console.error("Help me write error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Writing assistance request failed";
    res.status(500).json({ error: message });
  }
});

export default router;
