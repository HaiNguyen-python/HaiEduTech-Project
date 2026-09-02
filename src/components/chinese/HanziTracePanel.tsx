/**
 * @file HanziTracePanel.tsx
 * @description Viết thử chữ Hán bằng chuột hoặc ngón tay (HanziWriter quiz mode) + lưu chữ đã thuộc.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { CheckCircle2, Eye, Loader2, RefreshCw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const CDN_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/hanzi-writer-data/2.0.1",
  "https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1",
  "https://unpkg.com/hanzi-writer-data@2.0.1",
  "https://esm.sh/hanzi-writer-data@2.0.1",
];

const MASTERY_KEY = "chinese-stroke-mastery-v1";

export function readTraceMastery(): string[] {
  try {
    const raw = localStorage.getItem(MASTERY_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function saveTraceMastery(chars: string[]) {
  try {
    localStorage.setItem(MASTERY_KEY, JSON.stringify(Array.from(new Set(chars))));
  } catch {
    /* storage unavailable */
  }
}

interface Props {
  /** Danh sách chữ để chọn luyện viết */
  chars: string[];
  size?: number;
}

const HanziTracePanel = ({ chars, size = 260 }: Props) => {
  const { t } = useLanguage();
  const hostRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  const [active, setActive] = useState(chars[0] ?? "你");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [done, setDone] = useState(false);
  const [mastered, setMastered] = useState<string[]>([]);

  useEffect(() => {
    setMastered(readTraceMastery());
  }, []);

  useEffect(() => {
    if (chars.length && !chars.includes(active)) setActive(chars[0]);
  }, [chars, active]);

  const startQuiz = useCallback(() => {
    const w = writerRef.current;
    if (!w) return;
    setMistakes(0);
    setDone(false);
    try {
      w.quiz({
        showHintAfterMisses: 2,
        onMistake: () => setMistakes((m) => m + 1),
        onComplete: () => {
          setDone(true);
          setMastered((prev) => {
            const next = Array.from(new Set([...prev, active]));
            saveTraceMastery(next);
            return next;
          });
        },
      });
    } catch {
      /* quiz unavailable */
    }
  }, [active]);

  useEffect(() => {
    const container = hostRef.current;
    if (!container) return;
    const host = document.createElement("div");
    host.style.width = `${size}px`;
    host.style.height = `${size}px`;
    host.style.touchAction = "none";
    container.appendChild(host);

    setLoading(true);
    setFailed(false);
    setMistakes(0);
    setDone(false);

    let cancelled = false;

    const fetchWithFallback = async (charToLoad: string): Promise<any> => {
      for (const cdn of CDN_URLS) {
        try {
          const res = await fetch(`${cdn}/${charToLoad}.json`);
          if (res.ok) return await res.json();
        } catch {
          /* next CDN */
        }
      }
      throw new Error("All CDNs failed");
    };

    try {
      writerRef.current = HanziWriter.create(host, active.charAt(0), {
        width: size,
        height: size,
        padding: 10,
        showCharacter: false,
        showOutline: true,
        strokeAnimationSpeed: 1.2,
        drawingWidth: 26,
        strokeColor: "#0f766e",
        outlineColor: "#cbd5e1",
        highlightColor: "#10b981",
        drawingColor: "#3b82f6",
        charDataLoader: (charToLoad: string, onComplete: (data: any) => void) => {
          fetchWithFallback(charToLoad)
            .then((data) => {
              if (cancelled) return;
              setLoading(false);
              onComplete(data);
              setTimeout(() => {
                if (!cancelled) startQuiz();
              }, 200);
            })
            .catch(() => {
              if (cancelled) return;
              setLoading(false);
              setFailed(true);
            });
        },
        onLoadCharDataError: () => {
          if (cancelled) return;
          setLoading(false);
          setFailed(true);
        },
      });
    } catch {
      setLoading(false);
      setFailed(true);
    }

    return () => {
      cancelled = true;
      writerRef.current = null;
      if (host.parentNode) {
        try { host.parentNode.removeChild(host); } catch { /* ignore */ }
      }
    };
    // startQuiz depends on active, so this effect re-runs per character
  }, [active, size, startQuiz]);

  const showAnswer = () => {
    const w = writerRef.current;
    if (!w) return;
    try {
      w.cancelQuiz();
      w.animateCharacter();
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[auto,1fr] items-start">
      <div className="flex flex-col items-center gap-3">
        <div
          className="rounded-2xl border-2 border-dashed border-primary/40 bg-card relative"
          style={{ width: size, height: size }}
        >
          {/* Ô 田字格 hướng dẫn */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/20" />
          </div>
          <div ref={hostRef} className="relative flex items-center justify-center w-full h-full">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
          </div>
        </div>
        {failed ? (
          <p className="text-sm text-muted-foreground text-center max-w-[260px]">
            {t("Chưa có dữ liệu nét bút cho chữ này, hãy chọn chữ khác.", "No stroke data for this character - try another one.")}
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            <Button size="sm" variant="outline" onClick={startQuiz}>
              <RefreshCw className="w-4 h-4 mr-1" /> {t("Viết lại", "Try again")}
            </Button>
            <Button size="sm" variant="outline" onClick={showAnswer}>
              <Eye className="w-4 h-4 mr-1" /> {t("Xem đáp án", "Show answer")}
            </Button>
          </div>
        )}
      </div>

      <div>
        <p className="text-base text-muted-foreground mb-3">
          {t(
            "Dùng chuột hoặc ngón tay viết từng nét theo đúng thứ tự. Sai 2 lần sẽ có gợi ý nét tiếp theo.",
            "Use your mouse or finger to draw each stroke in the right order. After 2 misses you get a hint.",
          )}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {chars.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "w-11 h-11 rounded-xl border-2 text-xl font-bold transition-all active:scale-95 relative",
                active === c
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/40",
              )}
            >
              {c}
              {mastered.includes(c) && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 absolute -top-1 -right-1 bg-background rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 text-muted-foreground font-medium">
            {t("Nét sai", "Misses")}: {mistakes}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold">
            <Trophy className="w-4 h-4" /> {t("Đã thuộc", "Mastered")}: {mastered.length}
          </span>
        </div>

        {done && (
          <div className="mt-4 rounded-xl p-4 bg-emerald-500/10 border border-emerald-500/30 text-base text-foreground">
            🎉 {t(`Bạn đã viết đúng chữ ${active}!`, `You wrote ${active} correctly!`)}{" "}
            {mistakes === 0
              ? t("Không sai nét nào - tuyệt vời.", "No mistakes at all - excellent.")
              : t("Hãy viết lại một lần nữa cho nhớ tay.", "Write it once more to build muscle memory.")}
          </div>
        )}
      </div>
    </div>
  );
};

export default HanziTracePanel;
