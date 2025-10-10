import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;
const MODEL = (import.meta.env.VITE_OPENAI_MODEL as string) || "gpt-3.5-turbo";

/**
 * Calls OpenAI Chat Completions with a 15s timeout.
 * Automatically adjusts behavior if user has written partial input.
 */
export async function helpMeWrite(
  prompt: string,
  lang: "en" | "ar" = "en",
  userInput?: string
) {
  if (!API_KEY) {
    throw new Error("Missing OpenAI API key. Set VITE_OPENAI_API_KEY in .env");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);

  const languageInstruction =
    lang === "ar"
      ? "Reply ONLY in Modern Standard Arabic, as a single plain paragraph. Do NOT wrap the text in quotes or markdown."
      : "Reply ONLY in English, as a single plain paragraph. Do NOT wrap the text in quotes or markdown.";

  try {
    const messages: any[] = [
      {
        role: "system",
        content:
          "write concise, empathetic hardship descriptions for government social support forms. Keep it factual, respectful, and clear. it's for UAE citizens and in answer write like e.g: I, me, us like you are that person",
      },
      {
        role: "system",
        content: languageInstruction,
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    if (userInput && userInput.trim().length > 0) {
      messages.push({
        role: "user",
        content: `The applicant has already written this text. Improve it naturally in the same tone and language, preserving meaning and clarity:\n\n"${userInput.trim()}"`,
      });
    }

    const { data } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: MODEL,
        messages,
        temperature: 0.6,
        max_tokens: 100,
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
