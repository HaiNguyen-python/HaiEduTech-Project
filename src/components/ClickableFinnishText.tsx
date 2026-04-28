/**
 * @file ClickableFinnishText.tsx
 * @description Render Finnish text where every word is clickable. Clicking shows a
 *   Popover with the English translation via Lovable AI (handles inflected words).
 *   Cached in localStorage. Uses forwardRef-compatible Slot via PopoverTrigger asChild.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useCallback, forwardRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Loader2, Volume2 } from "lucide-react";
import { playFinnishTts } from "@/lib/finnishTts";
import { supabase } from "@/integrations/supabase/client";

const CACHE_KEY = "fi-en-word-cache-v2";
const MAX_CACHE = 1000;

interface TranslationResult {
  base: string;
  en: string;
  pos: string;
}

const loadCache = (): Record<string, TranslationResult> => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveCache = (cache: Record<string, TranslationResult>) => {
  try {
    const entries = Object.entries(cache);
    const trimmed =
      entries.length > MAX_CACHE ? Object.fromEntries(entries.slice(-MAX_CACHE)) : cache;
    localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed));
  } catch {
    /* quota — ignore */
  }
};

const cleanWord = (raw: string) => raw.toLowerCase().replace(/[^\p{L}\p{M}-]/gu, "");

async function translateWord(word: string): Promise<TranslationResult> {
  const cache = loadCache();
  const key = cleanWord(word);
  if (!key) return { base: word, en: "", pos: "" };
  if (cache[key]) return cache[key];

  try {
    const { data, error } = await supabase.functions.invoke("translate-finnish-word", {
      body: { word: key },
    });
    if (error) throw error;
    const result: TranslationResult = {
      base: data?.base || key,
      en: data?.en || "",
      pos: data?.pos || "",
    };
    if (result.en) {
      cache[key] = result;
      saveCache(cache);
    }
    return result;
  } catch {
    return { base: key, en: "", pos: "" };
  }
}

interface WordChipProps {
  word: string;
}

// Use forwardRef so Radix Popover can attach refs (fixes warning)
const WordTrigger = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { word: string }>(
  ({ word, ...props }, ref) => (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      className="cursor-pointer rounded px-0.5 -mx-0.5 hover:bg-[#003580]/15 hover:text-[#003580] transition-colors"
      {...props}
    >
      {word}
    </span>
  )
);
WordTrigger.displayName = "WordTrigger";

const WordChip = ({ word }: WordChipProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);

  const cleaned = cleanWord(word);
  const isWord = cleaned.length > 0;

  const handleOpen = useCallback(
    async (next: boolean) => {
      setOpen(next);
      if (next && !result && isWord) {
        setLoading(true);
        const r = await translateWord(cleaned);
        setResult(r);
        setLoading(false);
      }
    },
    [result, isWord, cleaned]
  );

  if (!isWord) return <span>{word}</span>;

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <WordTrigger word={word} />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" side="top" align="center">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div>
            <p className="font-bold text-sm text-[#003580]">{cleaned}</p>
            {result?.base && result.base.toLowerCase() !== cleaned && (
              <p className="text-[11px] text-muted-foreground">
                base: <span className="italic">{result.base}</span>
              </p>
            )}
          </div>
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
            <div className="space-y-1">
              <p className="text-foreground/90">
                <span className="text-xs text-muted-foreground">EN: </span>
                <span className="font-medium">{result?.en || "(no result)"}</span>
              </p>
              {result?.pos && (
                <p className="text-[11px] text-muted-foreground italic">{result.pos}</p>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface ClickableFinnishTextProps {
  text: string;
  className?: string;
}

const ClickableFinnishText = ({ text, className }: ClickableFinnishTextProps) => {
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
