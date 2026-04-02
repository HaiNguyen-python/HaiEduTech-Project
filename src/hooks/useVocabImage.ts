import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// In-memory cache to avoid re-fetching during the same session
const imageCache = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string | null>>();
let creditsExhausted = false;

export function useVocabImage(character: string, pinyin: string, definition: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(() => imageCache.get(character) || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = useCallback(async () => {
    if (creditsExhausted) {
      setError("Credits exhausted");
      return;
    }

    if (imageCache.has(character)) {
      setImageUrl(imageCache.get(character)!);
      return;
    }

    // Check if there's already a pending request for this character
    if (pendingRequests.has(character)) {
      setIsLoading(true);
      const result = await pendingRequests.get(character);
      if (result) {
        setImageUrl(result);
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    const promise = (async () => {
      try {
        // First check if image already exists in storage
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const encoder = new TextEncoder();
        const bytes = encoder.encode(character);
        const hexKey = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/vocab-images/hsk/${hexKey}.png`;
        
        // Try to fetch existing image
        const checkResp = await fetch(publicUrl, { method: "HEAD" });
        if (checkResp.ok) {
          imageCache.set(character, publicUrl);
          setImageUrl(publicUrl);
          setIsLoading(false);
          return publicUrl;
        }

        if (creditsExhausted) {
          setError("Credits exhausted");
          setIsLoading(false);
          return null;
        }

        // Generate via edge function
        const { data, error: fnError } = await supabase.functions.invoke("generate-vocab-image", {
          body: { character, pinyin, definition },
        });

        if (fnError) {
          // Check for 402 credits exhausted
          if (fnError.message?.includes("402") || fnError.message?.includes("Credits exhausted")) {
            creditsExhausted = true;
            setError("Credits exhausted");
            setIsLoading(false);
            return null;
          }
          throw new Error(fnError.message);
        }
        
        if (data?.error === "Credits exhausted") {
          creditsExhausted = true;
          setError("Credits exhausted");
          setIsLoading(false);
          return null;
        }

        if (data?.imageUrl) {
          imageCache.set(character, data.imageUrl);
          setImageUrl(data.imageUrl);
          setIsLoading(false);
          return data.imageUrl;
        }
        throw new Error("No image URL returned");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to generate";
        setError(msg);
        setIsLoading(false);
        return null;
      } finally {
        pendingRequests.delete(character);
      }
    })();

    pendingRequests.set(character, promise);
    await promise;
  }, [character, pinyin, definition]);

  return { imageUrl, isLoading, error, generateImage };
}
