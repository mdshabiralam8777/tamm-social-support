import axios from "axios";
import { tammSystem, buildSystemMessages } from "./tammInformation";
import { containsAbusive } from "../constants/profanity";

async function callOpenAI(
  systemMessages: string[],
  userMessages: string[],
  maxTokens: number = 450
): Promise<string> {
  // Read env vars at runtime (after dotenv.config() has run)
  const API_KEY = process.env.OPENAI_API_KEY;
  const MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

  if (!API_KEY) throw new Error("Missing OpenAI API key.");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);

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
        temperature: 0.3,
        max_tokens: maxTokens,
      },
      {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return data?.choices?.[0]?.message?.content?.trim() || "";
  } catch (err: unknown) {
    if (axios.isCancel(err)) throw new Error("Request timed out.");
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.error?.message || "AI request failed"
      );
    }
    throw new Error("AI request failed");
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Simple heuristic matcher to find featured service by user prompt.
 */
function findFeaturedService(prompt: string) {
  const text = prompt.toLowerCase();

  for (const svc of tammSystem.featuredServices) {
    const keywords = [
      svc.title?.toLowerCase(),
      svc.id?.toLowerCase(),
      svc.path?.toLowerCase(),
      ...(svc.targetAudience || []).map((t) => String(t).toLowerCase()),
      ...(svc.instructions || [])
        .slice(0, 3)
        .map((i) => i.split(" ")[0].toLowerCase()),
    ].filter(Boolean);

    if (keywords.some((k) => text.includes(k as string))) {
      return svc;
    }

    if (
      svc.title &&
      (text.includes("golden visa") ||
        text.includes("domestic worker") ||
        text.includes("report card"))
    ) {
      if (
        svc.title.toLowerCase().includes("golden") ||
        svc.title.toLowerCase().includes("domestic") ||
        svc.title.toLowerCase().includes("report")
      ) {
        return svc;
      }
    }
  }

  return null;
}

/**
 * Compose a compact taxonomy hint for system messages.
 */
function compactTaxonomyHint() {
  const entries = Object.values(tammSystem.taxonomy).map(
    (c) => `${c.label}: ${c.path}`
  );
  return `TAXONOMY_SHORT: ${entries.join(" | ")}`;
}

/**
 * askChatbot:
 * - Uses server-side featured-service matching.
 * - If a match exists, the assistant receives an explicit FEATURED_MATCH system hint.
 * - Otherwise the assistant receives a compact taxonomy hint and general guidance.
 */
export async function askChatbot(
  prompt: string,
  lang: "en" | "ar" = "en"
): Promise<string> {
  // Abuse check
  if (containsAbusive(prompt)) {
    return "Your message contains language that violates our usage policy. Please rephrase or contact support.";
  }

  const systemMessages = buildSystemMessages(lang);
  const matched = findFeaturedService(prompt);

  if (matched) {
    const featuredHint = tammSystem.templates.featuredService(matched);
    systemMessages.push(
      `FEATURED_MATCH: Use the following featured service as the single-source answer:\n${featuredHint}\nDO NOT invent fees or documents. For exact documents/fees call ${tammSystem.contacts.callCenter}.`
    );
  } else {
    systemMessages.push(
      `NO_FEATURED_MATCH: Map the user's request to the best-fit category. ${compactTaxonomyHint()} For exact documents and fees, instruct user to call ${
        tammSystem.contacts.callCenter
      } or visit ${tammSystem.contacts.website}.`
    );
  }

  const userMessages = [prompt];
  return callOpenAI(systemMessages, userMessages);
}

/**
 * helpMeWrite:
 * - Generates concise, empathetic hardship descriptions for government social support forms.
 */
export async function helpMeWrite(
  prompt: string,
  lang: "en" | "ar" = "en",
  userInput?: string
): Promise<string> {
  const languageInstruction =
    lang === "ar"
      ? "Reply ONLY in Modern Standard Arabic, as a single plain paragraph. Do NOT wrap the text in quotes or markdown."
      : "Reply ONLY in English, as a single plain paragraph. Do NOT wrap the text in quotes or markdown.";

  const baseSystem = buildSystemMessages(lang)[1];

  const systemMessages = [
    "Write concise, empathetic hardship descriptions for government social support forms. Keep it factual, respectful, and clear. Use first person (I, me, we) as if you are the applicant.",
    baseSystem,
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
