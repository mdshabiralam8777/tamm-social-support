import axios from "axios";
import { tammInformation } from "./tammInformation";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;
const MODEL = (import.meta.env.VITE_OPENAI_MODEL as string) || "gpt-3.5-turbo";

async function callOpenAI(systemMessages: string[], userMessages: string[]) {
  if (!API_KEY) {
    throw new Error("Missing OpenAI API key. Set VITE_OPENAI_API_KEY in .env");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);

  try {
    const messages = [
      ...systemMessages.map((msg) => ({ role: "system", content: msg })),
      ...userMessages.map((msg) => ({ role: "user", content: msg })),
    ];

    const { data } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: MODEL,
        messages,
        temperature: 0.6,
        max_tokens: 150,
      },
      {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const text = data?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty response from model");
    return text;
  } catch (err: any) {
    if (axios.isCancel(err))
      throw new Error("Request timed out. Please try again.");
    const msg =
      err?.response?.data?.error?.message ||
      err?.message ||
      "AI request failed";
    throw new Error(msg);
  } finally {
    clearTimeout(timer);
  }
}

export async function helpMeWrite(
  prompt: string,
  lang: "en" | "ar" = "en",
  userInput?: string
) {
  const languageInstruction =
    lang === "ar"
      ? "Reply ONLY in Modern Standard Arabic, as a single plain paragraph. Do NOT wrap the text in quotes or markdown."
      : "Reply ONLY in English, as a single plain paragraph. Do NOT wrap the text in quotes or markdown.";

  const systemMessages = [
    "write concise, empathetic hardship descriptions for government social support forms. Keep it factual, respectful, and clear. it's for UAE citizens and in answer write like e.g: I, me, us like you are that person",
    languageInstruction,
  ];

  const userMessages = [prompt];
  if (userInput && userInput.trim().length > 0) {
    userMessages.push(
      `The applicant has already written this text. Improve it naturally in the same tone and language, preserving meaning and clarity:\n\n"${userInput.trim()}"`
    );
  }

  return callOpenAI(systemMessages, userMessages);
}

export async function askChatbot(prompt: string, lang: "en" | "ar" = "en") {
  const languageInstruction =
    lang === "ar"
      ? "Reply ONLY in Modern Standard Arabic, as a single plain paragraph. Do NOT wrap the text in quotes or markdown."
      : "Reply ONLY in English, as a single plain paragraph. Do NOT wrap the text in quotes or markdown.";

  const systemMessages = [tammInformation, languageInstruction];
  const userMessages = [prompt];

  return callOpenAI(systemMessages, userMessages);
}
