import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;

const MODEL = (import.meta.env.VITE_OPENAI_MODEL as string) || "gpt-3.5-turbo";

/**
 * Calls OpenAI Chat Completions with a 15s timeout.
 * Surfaces friendly errors (including timeouts).
 */
export async function helpMeWrite(prompt: string) {
  if (!API_KEY) {
    throw new Error("Missing OpenAI API key. Set VITE_OPENAI_API_KEY in .env");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);

  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You write concise, empathetic hardship descriptions for government social support forms. Keep it factual and respectful.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 50,
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
