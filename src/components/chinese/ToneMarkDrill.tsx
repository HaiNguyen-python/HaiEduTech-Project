/**
 * @file ToneMarkDrill.tsx
 * @description Bài tập đặt dấu thanh đúng vị trí trên vận mẫu (a > o > e > i/u/ü, iu, ui).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RefreshCw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { playChineseTts, stopChineseTts } from "@/lib/chineseTts";
import { TONE_MARK_ITEMS } from "@/data/chineseToneMarks";
import { safeStorage } from "@/lib/safeStorage";

const KEY = "chinese-tone-mark-best";

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const ToneMarkDrill = () => {
  const { t } = useLanguage();
  const [queue, setQueue] = useState(() => shuffle(TONE_MARK_ITEMS));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const best = useMemo(() => Number(safeStorage.getItem(KEY) ?? 0), [done]);

  const item = queue[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === item.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= queue.length) {
      const pct = Math.round(((score) / queue.length) * 100);
      if (pct > best) safeStorage.setItem(KEY, String(pct));
      setDone(true);
      return;
    }
    setPicked(null);
    setIdx(idx + 1);
  };

  const restart = () => {
    setQueue(shuffle(TONE_MARK_ITEMS));
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / queue.length) * 100);
    return (
      <div className="text-center py-8">
        <p className="text-3xl mb-2">{pct >= 80 ? "🎉" : "💪"}</p>
        <p className="text-2xl font-bold text-primary mb-1">
          {score}/{queue.length} - {pct}%
        </p>
        <p className="text-base text-muted-foreground mb-4">
          {t("Kỷ lục của bạn", "Your best")}: {Math.max(best, pct)}%
        </p>
        <Button onClick={restart} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" /> {t("Làm lại", "Try again")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">
          {t("Câu", "Question")} {idx + 1}/{queue.length}
        </span>
        <span className="text-sm font-semibold text-primary">
          {t("Đúng", "Correct")}: {score}
        </span>
      </div>

      <p className="text-base text-foreground mb-1">
        {t(
          `Đặt dấu thanh ${item.tone} vào âm tiết "${item.plain}" - chọn cách viết đúng:`,
          `Add tone ${item.tone} to the syllable "${item.plain}" - pick the correct spelling:`,
        )}
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        {item.hanzi ? `${item.hanzi} - ` : ""}
        {t(item.meaningVi, item.meaningEn)}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {item.options.map((opt, i) => {
          const right = i === item.answer;
          const isPicked = picked === i;
          return (
            <button
              key={opt + i}
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={cn(
                "rounded-xl border-2 p-4 text-xl font-bold transition-all active:scale-95",
                picked === null && "border-border hover:border-primary/40 hover:bg-primary/5 text-foreground",
                picked !== null && right && "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                isPicked && !right && "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300",
                picked !== null && !right && !isPicked && "border-border opacity-50 text-muted-foreground",
              )}
            >
              {opt}
              {picked !== null && right && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
              {isPicked && !right && <XCircle className="w-4 h-4 inline ml-2" />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-4 rounded-xl border border-primary/25 bg-primary/5 p-4">
          <p className="text-base text-foreground">💡 {t(item.explainVi, item.explainEn)}</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {item.hanzi && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  stopChineseTts();
                  void playChineseTts(item.hanzi as string, { playbackRate: 0.9, speechRate: 0.7 });
                }}
              >
                <Volume2 className="w-4 h-4" /> {t("Nghe", "Listen")}
              </Button>
            )}
            <Button size="sm" onClick={next}>
              {idx + 1 >= queue.length ? t("Xem kết quả", "See result") : t("Câu tiếp", "Next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToneMarkDrill;
