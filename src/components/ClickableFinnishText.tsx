/**
 * @file ClickableFinnishText.tsx
 * @description Render Finnish text where every word is clickable. Clicking shows a
 *   Popover with the English translation (fetched once, cached in localStorage).
 *   Uses the public MyMemory API (no key needed, fi→en).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useCallback, memo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Loader2, Volume2 } from "lucide-react";
import { playFinnishTts } from "@/lib/finnishTts";

const CACHE_KEY = "fi-en-word-cache";
const MAX_CACHE = 800;

const loadCache = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveCache = (cache: Record<string, string>) => {
  try {
    const entries = Object.entries(cache);
    // Trim if too big — keep most recent
    const trimmed = entries.length > MAX_CACHE ? Object.fromEntries(entries.slice(-MAX_CACHE)) : cache;
    localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed));
  } catch {
    /* quota — ignore */
  }
};

const cleanWord = (raw: string) => raw.toLowerCase().replace(/[^\p{L}\p{M}-]/gu, "");

async function translateWord(word: string): Promise<string> {
  const cache = loadCache();
  const key = cleanWord(word);
  if (!key) return "";
  if (cache[key]) return cache[key];

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(key)}&langpair=fi|en`
    );
    if (!res.ok) throw new Error("api error");
    const data = await res.json();
    const translation: string =
      (data?.responseData?.translatedText as string)?.trim() || "";
    if (translation && translation.toLowerCase() !== key) {
      cache[key] = translation;
      saveCache(cache);
      return translation;
    }
    return translation || "—";
  } catch {
    return "—";
  }
}

interface WordChipProps {
  word: string; // raw token incl. punctuation
}

const WordChip = memo(({ word }: WordChipProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState<string>("");

  const cleaned = cleanWord(word);
  const isWord = cleaned.length > 0;

  const handleOpen = useCallback(
    async (next: boolean) => {
      setOpen(next);
      if (next && !translation && isWord) {
        setLoading(true);
        const result = await translateWord(cleaned);
        setTranslation(result);
        setLoading(false);
      }
    },
    [translation, isWord, cleaned]
  );

  if (!isWord) {
    // pure punctuation / whitespace — render plain
    return <span>{word}</span>;
  }

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className="cursor-pointer rounded px-0.5 -mx-0.5 hover:bg-[#003580]/15 hover:text-[#003580] transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen(!open);
            }
          }}
        >
          {word}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" side="top" align="center">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="font-bold text-sm text-[#003580]">{cleaned}</p>
          <button
            type="button"
            aria-label="Phát âm"
            onClick={(e) => {
              e.stopPropagation();
              playFinnishTts(cleaned).catch(() => undefined);
            }}
            className="p-1 rounded hover:bg-secondary"
          >
            <Volume2 className="w-4 h-4 text-[#003580]" />
          </button>
        </div>
        <div className="text-sm">
          {loading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" /> Translating…
            </span>
          ) : (
            <p className="text-foreground/90">
              <span className="text-xs text-muted-foreground">EN: </span>
              <span className="font-medium">{translation || "—"}</span>
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});
WordChip.displayName = "WordChip";

interface ClickableFinnishTextProps {
  text: string;
  className?: string;
}

/**
 * Splits Finnish text into words + spaces/punct while preserving line breaks.
 * Each word becomes an interactive chip that shows the EN translation on click.
 */
const ClickableFinnishText = ({ text, className }: ClickableFinnishTextProps) => {
  // Tokenize keeping separators (spaces, punctuation, newlines)
  const tokens = text.split(/(\s+|[.,!?;:"'„"()\[\]…—–-])/g).filter((t) => t.length > 0);

  return (
    <div className={`whitespace-pre-wrap leading-relaxed ${className ?? ""}`}>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        if (/^[.,!?;:"'„"()\[\]…—–-]$/.test(tok)) return <span key={i}>{tok}</span>;
        return <WordChip key={i} word={tok} />;
      })}
    </div>
  );
};

export default ClickableFinnishText;
