/**
 * useChatVoice - reads Teacher Hai's chat answers aloud.
 *
 * Text is cleaned of markdown and code blocks, split into short chunks, then
 * spoken through the `chat-tts` edge function (Lovable AI voice). The API key
 * stays server-side; the browser only plays the returned mp3 chunks in order.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_KEY = "het:chat-voice-auto-v1";
const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-tts`;

export type ChatVoiceLang = "vi" | "en" | "zh" | "ja" | "fi" | "sv";

/** Guess the language of an answer so the right voice is used. */
export const detectVoiceLang = (text: string): ChatVoiceLang => {
  if (/[\u3040-\u30ff]/.test(text)) return "ja";
  if (/[\u4e00-\u9fff]/.test(text)) return "zh";
  if (/[àáảãạăâđêôơưèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ]/i.test(text)) return "vi";
  if (/\b(och|jag|inte|är|hej|tack)\b/i.test(text)) return "sv";
  if (/\b(minä|kiitos|opettaja|hyvä|että|olen)\b/i.test(text)) return "fi";
  return "en";
};

/** Strip markdown, code blocks and UI tokens so the voice sounds natural. */
export const cleanForSpeech = (raw: string): string =>
  raw
    .replace(/\[\[CTA:[^\]]*\]\]/gi, " ")
    .replace(/\[\[REMEMBER:[^\]]*\]\]/gi, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/(\*\*|__|\*|_|~~)/g, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/\|/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/** Split into chunks that stay comfortably inside the model input limit. */
const chunkText = (text: string, maxChars = 700): string[] => {
  const sentences = text.match(/[^.!?。！？\n]+[.!?。！？]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (sentence.length > maxChars) {
      if (current.trim()) chunks.push(current.trim());
      current = "";
      for (let i = 0; i < sentence.length; i += maxChars) chunks.push(sentence.slice(i, i + maxChars));
      continue;
    }
    if (current.length + sentence.length > maxChars) {
      if (current.trim()) chunks.push(current.trim());
      current = "";
    }
    current += sentence;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter((c) => /[\p{L}\p{N}]/u.test(c));
};

export const useChatVoice = () => {
  const [autoRead, setAutoRead] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTO_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const runIdRef = useRef(0);
  const urlsRef = useRef<string[]>([]);

  const releaseUrls = useCallback(() => {
    urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    urlsRef.current = [];
  }, []);

  const stop = useCallback(() => {
    runIdRef.current += 1;
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.pause();
        audio.src = "";
      } catch {
        /* ignore */
      }
    }
    releaseUrls();
    setSpeakingId(null);
  }, [releaseUrls]);

  useEffect(() => stop, [stop]);

  const toggleAutoRead = useCallback(() => {
    setAutoRead((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(AUTO_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      if (!next) stop();
      return next;
    });
  }, [stop]);

  /** Speak one answer. `id` marks which bubble is currently talking. */
  const speak = useCallback(
    async (rawText: string, id: string) => {
      const cleaned = cleanForSpeech(rawText);
      if (!cleaned) return;
      stop();
      const runId = runIdRef.current;
      const lang = detectVoiceLang(cleaned);
      setSpeakingId(id);

      const audio = audioRef.current ?? new Audio();
      audioRef.current = audio;

      try {
        for (const chunk of chunkText(cleaned)) {
          if (runIdRef.current !== runId) return;
          const resp = await fetch(TTS_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({ text: chunk, lang }),
          });
          if (!resp.ok) throw new Error(`tts ${resp.status}`);
          const blob = await resp.blob();
          if (runIdRef.current !== runId) return;
          const url = URL.createObjectURL(blob);
          urlsRef.current.push(url);
          audio.src = url;
          await new Promise<void>((resolve, reject) => {
            audio.onended = () => resolve();
            audio.onerror = () => reject(new Error("playback failed"));
            audio.play().catch(reject);
          });
          if (runIdRef.current !== runId) return;
        }
      } catch {
        /* voice is optional - stay silent on failure */
      } finally {
        if (runIdRef.current === runId) {
          releaseUrls();
          setSpeakingId(null);
        }
      }
    },
    [releaseUrls, stop],
  );

  return { autoRead, toggleAutoRead, speak, stop, speakingId };
};
