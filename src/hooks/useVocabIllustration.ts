import { useState, useEffect } from "react";
import { resolveVocabEmoji } from "@/lib/vocabEmojiMap";
import { getIeltsVocabIllustration } from "@/lib/ieltsVocabIllustrations";

const CACHE_PREFIX = "vocab-img-";

export function useVocabIllustration(word: string, definition: string, category?: string, subject?: "ielts") {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Resolve a word-specific emoji (e.g. chair → 🪑) with graceful fallback to
  // category emoji and finally 📖. Uses the English definition so it works for
  // Finnish / Swedish / any language that provides an English gloss.
  const fallbackEmoji = subject === "ielts" ? "◌" : resolveVocabEmoji(definition, category);
  const cacheKey = CACHE_PREFIX + word.toLowerCase().replace(/\s+/g, "-");

  // Load from cache if previously generated
  useEffect(() => {
    if (subject === "ielts") return;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) setImageUrl(cached);
    } catch {}
  }, [cacheKey, subject]);

  return {
    imageUrl: subject === "ielts" ? getIeltsVocabIllustration(word) ?? null : imageUrl,
    isLoading: false,
    error: null as string | null,
    fallbackEmoji,
    generate: () => {}, // AI image generation disabled - using emoji fallbacks
  };
}
