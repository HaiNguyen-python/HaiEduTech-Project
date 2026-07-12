import { useState, useEffect } from "react";
import { resolveVocabEmoji } from "@/lib/vocabEmojiMap";

const CACHE_PREFIX = "vocab-img-";

export function useVocabIllustration(word: string, definition: string, category?: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Resolve a word-specific emoji (e.g. chair → 🪑) with graceful fallback to
  // category emoji and finally 📖. Uses the English definition so it works for
  // Finnish / Swedish / any language that provides an English gloss.
  const fallbackEmoji = resolveVocabEmoji(definition, category);
  const cacheKey = CACHE_PREFIX + word.toLowerCase().replace(/\s+/g, "-");

  // Load from cache if previously generated
  useEffect(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) setImageUrl(cached);
    } catch {}
  }, [cacheKey]);

  return {
    imageUrl,
    isLoading: false,
    error: null as string | null,
    fallbackEmoji,
    generate: () => {}, // AI image generation disabled - using emoji fallbacks
  };
}
