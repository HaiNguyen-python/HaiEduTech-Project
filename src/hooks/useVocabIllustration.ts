import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fallbackEmoji = categoryEmoji[category || ""] || "📖";
  const cacheKey = CACHE_PREFIX + word.toLowerCase().replace(/\s+/g, "-");

  const generate = useCallback(async () => {
    // Check cache first
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setImageUrl(cached);
        return;
      }
    } catch {}

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("generate-vocab-image", {
        body: { word, definition },
      });

      if (fnError) throw fnError;
      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
        // Cache in localStorage
        try {
          localStorage.setItem(cacheKey, data.imageUrl);
        } catch {
          // localStorage full — ignore
        }
      } else {
        setError("No image");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setIsLoading(false);
    }
  }, [word, definition, cacheKey]);

  // Auto-load from cache on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setImageUrl(cached);
      }
    } catch {}
  }, [cacheKey]);

  return { imageUrl, isLoading, error, fallbackEmoji, generate };
}
