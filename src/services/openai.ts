import axios from "axios";
// Replace tammInformation import with the new tammSystem helper module
import { tammSystem, buildSystemMessages } from "./tammInformation";
import { containsAbusive } from "../constants/profanity";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;
const MODEL = (import.meta.env.VITE_OPENAI_MODEL as string) || "gpt-3.5-turbo";

async function callOpenAI(
  systemMessages: string[],
  userMessages: string[],
  maxTokens: number = 450 // Increased for detailed breakdown
) {
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
        temperature: 0.3, // Keep low for factual accuracy on government data
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

    return data?.choices?.[0]?.message?.content?.trim();
  } catch (err: any) {
    if (axios.isCancel(err)) throw new Error("Request timed out.");
    throw new Error(err?.response?.data?.error?.message || "AI request failed");
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Simple heuristic matcher to find featured service by user prompt.
 * Keep it intentionally conservative to avoid false positives.
 */
function findFeaturedService(prompt: string) {
  const text = prompt.toLowerCase();

  // check title, id and path keywords
  for (const svc of tammSystem.featuredServices) {
    const keywords = [
      svc.title?.toLowerCase(),
      svc.id?.toLowerCase(),
      svc.path?.toLowerCase(),
      ...(svc.targetAudience || []).map((t) => String(t).toLowerCase()),
      // also include first words from instructions as approximate hints
      ...(svc.instructions || [])
        .slice(0, 3)
        .map((i) => i.split(" ")[0].toLowerCase()),
    ].filter(Boolean);

    if (keywords.some((k) => text.includes(k))) {
      return svc;
    }

    // fuzzy check for common user phrasing
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
 * Compose a compact taxonomy hint (string) for system messages when needed.
 * We keep it short to save tokens.
 */
function compactTaxonomyHint() {
  const entries = Object.values(tammSystem.taxonomy).map(
    (c) => `${c.label}: ${c.path}`
  );
  return `TAXONOMY_SHORT: ${entries.join(" | ")}`;
}

/**
 * askChatbot:
 * - Uses server-side featured-service matching (recommended).
 * - If a match exists, the assistant receives an explicit FEATURED_MATCH system hint with the formatted template.
 * - Otherwise the assistant receives a compact taxonomy hint and general guidance.
 */
export async function askChatbot(prompt: string, lang: "en" | "ar" = "en") {
  // SIMPLE ABUSE CHECK
  if (containsAbusive(prompt)) {
    return "Your message contains language that violates our usage policy. Please rephrase or contact support.";
  }
  // build smaller system messages using the helper
  const systemMessages = buildSystemMessages(lang); // returns [systemPrompt, languageInstruction]

  // deterministic server-side match (recommended for production)
  const matched = findFeaturedService(prompt);

  if (matched) {
    // use the programmatic template to produce a compact but complete system hint
    const featuredHint = tammSystem.templates.featuredService(matched);
    // keep system message short and explicit
    systemMessages.push(
      `FEATURED_MATCH: Use the following featured service as the single-source answer:\n${featuredHint}\nDO NOT invent fees or documents. For exact documents/fees call ${tammSystem.contacts.callCenter}.`
    );
  } else {
    // no featured match: instruct model to map to taxonomy
    systemMessages.push(
      `NO_FEATURED_MATCH: Map the user's request to the best-fit category. ${compactTaxonomyHint()} For exact documents and fees, instruct user to call ${
        tammSystem.contacts.callCenter
      } or visit ${tammSystem.contacts.website}.`
    );
  }

  // user message(s)
  const userMessages = [prompt];

  return callOpenAI(systemMessages, userMessages);
}

/**
 * helpMeWrite:
 * - Reuses buildSystemMessages to ensure language consistency.
 * - Keeps system messages specific to the task: concise hardship descriptions for government social support.
 */
export async function helpMeWrite(
  prompt: string,
  lang: "en" | "ar" = "en",
  userInput?: string
) {
  // base system messages for this specific task (kept separate from TAMM system prompt)
  const languageInstruction =
    lang === "ar"
      ? "Reply ONLY in Modern Standard Arabic, as a single plain paragraph. Do NOT wrap the text in quotes or markdown."
      : "Reply ONLY in English, as a single plain paragraph. Do NOT wrap the text in quotes or markdown.";

  // include the TAMM assistant language instruction consistently
  const baseSystem = buildSystemMessages(lang)[1]; // language instruction string

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
