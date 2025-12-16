import axios from "axios";

/**
 * Frontend OpenAI Service
 *
 * This module proxies AI requests through the backend server to keep the
 * OpenAI API key secure on the server side.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/**
 * askChatbot:
 * - Proxies the request to the backend /api/chat endpoint
 * - Backend handles all OpenAI interaction and TAMM system context
 */
export async function askChatbot(
  prompt: string,
  lang: "en" | "ar" = "en"
): Promise<string> {
  try {
    const response = await axios.post(
      `${API_BASE}/api/chat`,
      { prompt, lang },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 25000, // 25 second timeout
      }
    );
    return response.data.response;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // Handle backend error responses
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      if (err.code === "ECONNABORTED") {
        throw new Error("Request timed out. Please try again.");
      }
    }
    throw new Error("Chat request failed. Please try again.");
  }
}

/**
 * helpMeWrite:
 * - Proxies the request to the backend /api/help-me-write endpoint
 * - Backend handles AI text generation for form assistance
 */
export async function helpMeWrite(
  prompt: string,
  lang: "en" | "ar" = "en",
  userInput?: string
): Promise<string> {
  try {
    const response = await axios.post(
      `${API_BASE}/api/help-me-write`,
      { prompt, lang, userInput },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 25000,
      }
    );
    return response.data.response;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      if (err.code === "ECONNABORTED") {
        throw new Error("Request timed out. Please try again.");
      }
    }
    throw new Error("Writing assistance request failed. Please try again.");
  }
}
