/**
 * Displays Vietnamese + English translations for a Chinese example sentence.
 * - Auto-shows the translation in the current UI language.
 * - Toggle reveals the other language too.
 * - On-demand: translation is fetched from the `translate-example` edge function
 *   (which caches in `hsk_example_translations`) and stored locally to avoid
 *   repeated network calls.
 */
import { useState, useEffect, useCallback } from "react";
import { Languages, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  example: string;
}

const cacheKey = (text: string) => `hsk_tr::${text}`;

const HskExampleTranslation = ({ example }: Props) => {
  const { t, lang } = useLanguage();
  const [trans, setTrans] = useState<{ vi: string; en: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBoth, setShowBoth] = useState(false);

  // Reset + load translation whenever the example sentence changes.
  // This prevents stale translations from sticking around when the parent
  // (e.g. HSK quiz) advances to a new question.
  useEffect(() => {
    let cancelled = false;
    setShowBoth(false);
    setError(null);

    // Try cache first for instant render.
    try {
      const raw = localStorage.getItem(cacheKey(example));
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached?.vi && cached?.en) {
          setTrans(cached);
          return () => { cancelled = true; };
        }
      }
    } catch { /* noop */ }

    setTrans(null);
    setLoading(true);
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("translate-example", {
          body: { text: example },
        });
        if (cancelled) return;
        if (error) throw error;
        if (data?.vi && data?.en) {
          const next = { vi: data.vi as string, en: data.en as string };
          setTrans(next);
          try { localStorage.setItem(cacheKey(example), JSON.stringify(next)); } catch {/* noop */}
        } else {
          setError(t("Không dịch được", "Translation failed"));
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError(t("Không dịch được", "Translation failed"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [example]);

  const fetchTranslation = useCallback(async () => {
    // Manual retry handler (used by error state).
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("translate-example", {
        body: { text: example },
      });
      if (error) throw error;
      if (data?.vi && data?.en) {
        const next = { vi: data.vi as string, en: data.en as string };
        setTrans(next);
        try { localStorage.setItem(cacheKey(example), JSON.stringify(next)); } catch {/* noop */}
      } else {
        setError(t("Không dịch được", "Translation failed"));
      }
    } catch (e) {
      console.error(e);
      setError(t("Không dịch được", "Translation failed"));
    } finally {
      setLoading(false);
    }
  }, [example, t]);

  const primary = lang === "en" ? trans?.en : trans?.vi;
  const secondary = lang === "en" ? trans?.vi : trans?.en;
  const secondaryLabel = lang === "en" ? "VI" : "EN";

  return (
    <div className="mt-1.5 text-xs">
      {loading && !trans && (
        <span className="inline-flex items-center gap-1 text-muted-foreground italic">
          <Loader2 className="w-3 h-3 animate-spin" />
          {t("Đang dịch...", "Translating...")}
        </span>
      )}
      {error && !trans && (
        <button
          type="button"
          onClick={fetchTranslation}
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          <Languages className="w-3 h-3" /> {t("Thử lại dịch", "Retry translate")}
        </button>
      )}
      {trans && (
        <div className="space-y-0.5">
          <p className="text-foreground/90 italic leading-snug">{primary}</p>
          {showBoth && (
            <p className="text-muted-foreground italic leading-snug">
              <span className="font-semibold mr-1">{secondaryLabel}:</span>{secondary}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowBoth(s => !s)}
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
          >
            <Languages className="w-3 h-3" />
            {showBoth
              ? t("Ẩn bản dịch còn lại", "Hide other translation")
              : t(`Hiện bản dịch ${secondaryLabel}`, `Show ${secondaryLabel} translation`)}
          </button>
        </div>
      )}
    </div>
  );
};

export default HskExampleTranslation;
