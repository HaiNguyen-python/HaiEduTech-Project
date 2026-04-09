import { useState, useEffect } from "react";

const CACHE_PREFIX = "vocab-img-";

// Category-based emoji fallbacks
const categoryEmoji: Record<string, string> = {
  Education: "📚",
  Technology: "💻",
  Environment: "🌍",
  Health: "🏥",
  Business: "💼",
  Science: "🔬",
  Society: "👥",
  Arts: "🎨",
  Law: "⚖️",
  Media: "📺",
  Psychology: "🧠",
  Economics: "📊",
  Politics: "🏛️",
  Travel: "✈️",
  Food: "🍽️",
};

export function useVocabIllustration(word: string, definition: string, category?: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fallbackEmoji = categoryEmoji[category || ""] || "📖";
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
    generate: () => {}, // AI image generation disabled — using emoji fallbacks
  };
}
