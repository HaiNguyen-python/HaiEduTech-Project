/**
 * @file HskSrsReview.tsx
 * @description Spaced-repetition review session for HSK vocabulary. Pulls due
 * cards from useHskSRS, mixes in unseen words, then asks the learner to
 * self-rate after revealing the answer.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Eye, Sparkles, RotateCcw, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useHskSRS, type SrsRating } from "@/hooks/useHskSRS";
import type { HskWord } from "@/data/hskVocab";
import HanziStrokeOrder from "@/components/HanziStrokeOrder";
import HskExampleTranslation from "@/components/HskExampleTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const speakChinese = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.6;
    window.speechSynthesis.speak(u);
  }
};

interface Props {
  allWords: HskWord[];
  maxNewPerSession?: number;
  sessionSize?: number;
}

const RATINGS: Array<{ value: SrsRating; label: { vi: string; en: string }; color: string }> = [
  { value: 1, label: { vi: "Quên 😵", en: "Again" },   color: "bg-rose-500 hover:bg-rose-600" },
  { value: 2, label: { vi: "Khó 😣",  en: "Hard"  },   color: "bg-amber-500 hover:bg-amber-600" },
  { value: 3, label: { vi: "Tốt 😊",  en: "Good"  },   color: "bg-emerald-500 hover:bg-emerald-600" },
  { value: 4, label: { vi: "Dễ 🤩",   en: "Easy"  },   color: "bg-sky-500 hover:bg-sky-600" },
];

export default function HskSrsReview({ allWords, maxNewPerSession = 8, sessionSize = 20 }: Props) {
  const { t } = useLanguage();
  const { cards, loading, review, dueCount, masteredCount, totalSeen, userId } = useHskSRS();

  const [queue, setQueue] = useState<HskWord[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [stats, setStats] = useState({ good: 0, hard: 0, again: 0 });

  const wordMap = useMemo(() => {
    const m = new Map<string, HskWord>();
    allWords.forEach(w => m.set(w.character, w));
    return m;
  }, [allWords]);

  const buildQueue = () => {
    const now = Date.now();
    const due = Object.values(cards)
      .filter(c => new Date(c.next_review).getTime() <= now && wordMap.has(c.word_id))
      .sort((a, b) => +new Date(a.next_review) - +new Date(b.next_review))
      .map(c => wordMap.get(c.word_id)!)
      .filter(Boolean);

    const seenIds = new Set(Object.keys(cards));
    const newWords = allWords
      .filter(w => !seenIds.has(w.character))
      .sort(() => Math.random() - 0.5)
      .slice(0, maxNewPerSession);

    const combined = [...due, ...newWords].slice(0, sessionSize);
    setQueue(combined);
    setIdx(0);
    setRevealed(false);
    setSessionDone(combined.length === 0);
    setStats({ good: 0, hard: 0, again: 0 });
  };

  useEffect(() => { if (!loading) buildQueue(); /* eslint-disable-next-line */ }, [loading]);

  if (loading) {
    return <p className="text-center text-muted-foreground py-12">{t("Đang tải SRS...", "Loading SRS...")}</p>;
  }

  const current = queue[idx];

  const handleRate = async (r: SrsRating) => {
    if (!current) return;
    const levelNum = parseInt(current.level.replace(/\D/g, ""), 10) || null;
    await review(current.character, r, levelNum);
    setStats(s => ({
      good:  s.good  + (r >= 3 ? 1 : 0),
      hard:  s.hard  + (r === 2 ? 1 : 0),
      again: s.again + (r === 1 ? 1 : 0),
    }));
    if (idx + 1 >= queue.length) setSessionDone(true);
    else { setIdx(i => i + 1); setRevealed(false); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <p className="text-xs text-muted-foreground">{t("Đến hạn", "Due")}</p>
          <p className="text-2xl font-bold text-primary">{dueCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <p className="text-xs text-muted-foreground">{t("Đã thuộc", "Mastered")}</p>
          <p className="text-2xl font-bold text-emerald-500">{masteredCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <p className="text-xs text-muted-foreground">{t("Tổng", "Total")}</p>
          <p className="text-2xl font-bold text-foreground">{totalSeen}</p>
        </div>
      </div>

      {!userId && (
        <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
          {t("⚠️ Đang dùng chế độ khách. Đăng nhập để đồng bộ tiến độ SRS giữa các thiết bị.",
             "⚠️ Guest mode. Sign in to sync SRS progress across devices.")}
        </div>
      )}

      {sessionDone ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
          <h3 className="text-2xl font-bold mb-2">{t("Hoàn thành phiên ôn!", "Session complete!")}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            ✅ {stats.good} {t("tốt", "good")} · ⚠️ {stats.hard} {t("khó", "hard")} · ❌ {stats.again} {t("quên", "again")}
          </p>
          <Button onClick={buildQueue} className="gap-2">
            <RotateCcw className="w-4 h-4" /> {t("Phiên mới", "New session")}
          </Button>
        </div>
      ) : current ? (
        <>
          <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
            <span>{t("Thẻ", "Card")} {idx + 1}/{queue.length}</span>
            <span className="flex items-center gap-1"><Brain className="w-3.5 h-3.5" /> SRS · SM-2</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.character + idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-md"
            >
              {/* Front: Hanzi */}
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="flex items-end gap-1">
                  {Array.from(current.character).map((c, i) => (
                    <HanziStrokeOrder key={i} character={c} size={96} compact />
                  ))}
                </div>
                <button
                  onClick={() => speakChinese(current.character)}
                  className="p-2 rounded-full hover:bg-primary/10"
                  aria-label={t("Nghe", "Listen")}
                >
                  <Volume2 className="w-5 h-5 text-primary" />
                </button>
                <Badge variant="outline">{current.level}</Badge>
              </div>

              {/* Reveal section */}
              {!revealed ? (
                <Button onClick={() => setRevealed(true)} className="w-full gap-2" size="lg">
                  <Eye className="w-4 h-4" /> {t("Hiện đáp án", "Show answer")}
                </Button>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="text-center">
                    <p className="text-xl text-primary font-bold">{current.pinyin}</p>
                    <p className="text-base text-foreground font-semibold mt-1">{current.definition.vi}</p>
                    <p className="text-sm text-muted-foreground">{current.definition.en}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/40 p-3">
                    <p className="text-base font-bold">{current.example}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{current.examplePinyin}</p>
                    <HskExampleTranslation example={current.example} />
                  </div>

                  {/* Rating buttons */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {RATINGS.map(r => (
                      <button
                        key={r.value}
                        onClick={() => handleRate(r.value)}
                        className={`${r.color} text-white rounded-lg py-2.5 text-sm font-semibold transition-all hover:scale-105`}
                      >
                        {t(r.label.vi, r.label.en)}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-center text-muted-foreground">
                    {t("Tự đánh giá độ nhớ - thuật toán sẽ lên lịch lần ôn tiếp theo.",
                       "Self-rate your recall - the algorithm schedules the next review.")}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">{t("Không có thẻ nào để ôn. Hãy quay lại sau!", "No cards to review. Come back later!")}</p>
          <Button variant="outline" onClick={buildQueue} className="mt-4 gap-2">
            <RotateCcw className="w-4 h-4" /> {t("Tải lại", "Reload")}
          </Button>
        </div>
      )}
    </div>
  );
}
