import type { SpeakingLang } from "@/lib/speakingModeShared";

export type MrHaiVoiceState = "idle" | "listening" | "thinking" | "speaking" | "paused" | "error" | "ended";
export type MrHaiMessage = { id: string; role: "user" | "assistant"; content: string; correction?: string; encouragement?: string };

export interface MrHaiResponse {
  reply: string;
  correction: string;
  encouragement: string;
  strengths: string[];
  corrections: string[];
  modelSentences: string[];
}

export interface MrHaiSessionSummary {
  date: string;
  language: SpeakingLang;
  topic: string;
  durationSec: number;
  turns: number;
  words: number;
  strengths: string[];
  corrections: string[];
  modelSentences: string[];
}

const text = (value: unknown, max = 600): string => typeof value === "string" ? value.normalize("NFC").trim().slice(0, max) : "";
const list = (value: unknown): string[] => Array.isArray(value) ? value.map((item) => text(item, 240)).filter(Boolean).slice(0, 3) : [];

export const normalizeMrHaiResponse = (value: unknown): MrHaiResponse | null => {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const reply = text(raw.reply);
  if (!reply) return null;
  return {
    reply,
    correction: text(raw.correction, 300),
    encouragement: text(raw.encouragement, 120),
    strengths: list(raw.strengths),
    corrections: list(raw.corrections),
    modelSentences: list(raw.modelSentences),
  };
};

export const speakingText = (value: string): string => value
  .replace(/```[\s\S]*?```/g, " ")
  .replace(/[*_`#>]/g, "")
  .replace(/\[[^\]]+\]/g, "")
  .replace(/\s+/g, " ")
  .trim();

export const countSpokenWords = (messages: MrHaiMessage[], language: SpeakingLang): number => messages
  .filter((message) => message.role === "user")
  .reduce((total, message) => total + ((language === "chinese" || language === "japanese")
    ? Array.from(message.content.replace(/\s+/g, "")).length
    : (message.content.match(/[\p{L}\p{N}]+/gu) ?? []).length), 0);

export const MR_HAI_TOPICS: Record<SpeakingLang, Array<{ id: string; label: string; prompt: string }>> = {
  english: [
    { id: "daily", label: "Daily life", prompt: "A relaxed conversation about today's routine and plans" },
    { id: "travel", label: "Travel", prompt: "Planning a trip and handling common travel situations" },
    { id: "work", label: "Work & study", prompt: "Discussing work, study goals, and recent projects" },
    { id: "surprise", label: "Surprise me", prompt: "Choose an engaging everyday situation suitable for this learner" },
  ],
  chinese: [
    { id: "daily", label: "日常生活", prompt: "日常生活和今天的计划" },
    { id: "food", label: "餐厅点餐", prompt: "在餐厅点餐和询问食物" },
    { id: "travel", label: "旅行", prompt: "旅行、问路和交通" },
    { id: "surprise", label: "随机话题", prompt: "选择一个适合学习者的简单生活情境" },
  ],
  japanese: [
    { id: "daily", label: "日常生活", prompt: "日常生活と今日の予定" },
    { id: "food", label: "レストラン", prompt: "レストランで注文する場面" },
    { id: "travel", label: "旅行", prompt: "旅行、道案内、交通について" },
    { id: "surprise", label: "おまかせ", prompt: "学習者に合う身近な場面を選ぶ" },
  ],
  finnish: [
    { id: "daily", label: "Arki", prompt: "Keskustelu arjesta ja päivän suunnitelmista" },
    { id: "service", label: "Asiointi", prompt: "Harjoitellaan asiointia kaupassa tai palvelussa" },
    { id: "work", label: "Työ ja opiskelu", prompt: "Keskustelu työstä, opiskelusta ja tavoitteista" },
    { id: "surprise", label: "Yllätä minut", prompt: "Valitse oppijalle sopiva arkinen tilanne" },
  ],
  swedish: [
    { id: "daily", label: "Vardag", prompt: "Ett samtal om vardagen och dagens planer" },
    { id: "service", label: "Service", prompt: "Öva ett samtal i en butik eller annan service" },
    { id: "work", label: "Arbete och studier", prompt: "Prata om arbete, studier och mål" },
    { id: "surprise", label: "Överraska mig", prompt: "Välj en vardaglig situation som passar eleven" },
  ],
  vietnamese: [
    { id: "daily", label: "Đời sống", prompt: "Trò chuyện về sinh hoạt và kế hoạch hôm nay" },
    { id: "food", label: "Ẩm thực", prompt: "Trò chuyện trong tình huống gọi món và khám phá ẩm thực" },
    { id: "travel", label: "Du lịch", prompt: "Trò chuyện về chuyến đi, hỏi đường và phương tiện" },
    { id: "surprise", label: "Chủ đề bất ngờ", prompt: "Chọn một tình huống đời thường phù hợp với học viên" },
  ],
};

export const sessionStorageKey = (language: SpeakingLang) => `mr-hai-voice-summaries-${language}`;