/**
 * @file DailyWordMission.tsx
 * @description Daily spaced-repetition mission for IELTS vocabulary. Picks the
 * words that are due today plus a few new ones, asks one short question per
 * word, then lets the learner self-rate (Forgot / Hard / Easy) like Anki.
 * All progress is local (safeStorage) - no database changes.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Flame, CalendarClock, Target, Sparkles, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { QuestItem } from "@/lib/vocab/vocabAdapter";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { pickSmartDistractors, maskWord, shuffleArr } from "@/lib/vocab/questionQuality";
import {
  buildMission, countDue, countDueOn, loadSrs, saveSrs, reviewCard, bumpStreak, loadStreak,
  todayISO, addDays, MASTER_STREAK, type SrsGrade, type SrsStore,
} from "@/lib/vocab/srsEngine";

type QType = "meaning" | "listen" | "gap" | "recall";

interface MissionQ {
  word: QuestItem;
  type: QType;
  options: string[];
  correct: number;
  prompt: string;
  isNew: boolean;
}

/** Keeps letters/digits of any alphabet (Vietnamese diacritics included). */
const norm = (s: string) =>
  s.toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "");

const englishSpeak = (text: string) => {
  stopEnglishTts();
  void playEnglishTts(text, { playbackRate: 0.98, speechRate: 0.85 });
};

interface Props {
  bank: QuestItem[];
  allWords: QuestItem[];
  t: (vi: string, en: string) => string;
  /** Called when a word reaches the mastery streak. */
  onWordMastered?: (key: string) => void;
  /** Subject namespace for the local review schedule (e.g. "hsk"). */
  subject?: string;
  /** Per-subject text-to-speech; defaults to the English voice. */
  speak?: (text: string) => void;
  stopSpeak?: () => void;
}

const buildQuestion = (w: QuestItem, pool: QuestItem[], isNew: boolean): MissionQ => {
  const types: QType[] = isNew ? ["meaning", "listen"] : ["meaning", "listen", "gap", "recall"];
  const type = types[Math.floor(Math.random() * types.length)];
  const distractors = pickSmartDistractors(pool, w, 3, {
    getText: x => x.definition.vi,
    getPos: x => x.partOfSpeech,
    getTopic: x => x.category,
    getLevel: x => x.level,
  });

  if (type === "meaning") {
    const opts = shuffleArr([w, ...distractors]);
    return {
      word: w, type, isNew,
      options: opts.map(o => o.definition.vi),
      correct: opts.findIndex(o => o.key === w.key),
      prompt: w.word,
    };
  }
  if (type === "gap" && w.example && w.example.length > 8) {
    return {
      word: w, type, isNew,
      options: [], correct: 0,
      prompt: maskWord(w.example, w.word),
    };
  }
  if (type === "listen") {
    return { word: w, type, isNew, options: [], correct: 0, prompt: w.definition.vi };
  }
  return { word: w, type: "recall", isNew, options: [], correct: 0, prompt: w.word };
};

const DailyWordMission = ({
  bank, allWords, t, onWordMastered,
  subject = "ielts",
  speak: speakProp,
  stopSpeak,
}: Props) => {
  const speak = speakProp || englishSpeak;
  const stopVoice = stopSpeak || stopEnglishTts;
  const [store, setStore] = useState<SrsStore>(() => loadSrs(subject));
  const [reviewCount, setReviewCount] = useState(10);
  const [newCount, setNewCount] = useState(5);
  const [queue, setQueue] = useState<MissionQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"setup" | "run" | "done">("setup");
  const [picked, setPicked] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [stats, setStats] = useState({ reviewed: 0, correct: 0, levelUp: 0, mastered: 0 });
  const [streak, setStreak] = useState(() => loadStreak(subject));
  const topRef = useRef<HTMLDivElement>(null);

  const today = todayISO();
  const dueNow = useMemo(() => countDue(store, today), [store, today]);
  const plan = useMemo(
    () => buildMission(bank, w => w.key, store, { reviewCount, newCount, today }),
    [bank, store, reviewCount, newCount, today],
  );

  const start = useCallback(() => {
    const words = shuffleArr([
      ...plan.due.map(w => ({ w, isNew: false })),
      ...plan.fresh.map(w => ({ w, isNew: true })),
    ]);
    if (words.length === 0) return;
    setQueue(words.map(({ w, isNew }) => buildQuestion(w, allWords, isNew)));
    setIdx(0);
    setPicked(null);
    setTyped("");
    setRevealed(false);
    setWasCorrect(null);
    setStats({ reviewed: 0, correct: 0, levelUp: 0, mastered: 0 });
    setPhase("run");
  }, [plan, allWords]);

  const q = queue[idx];

  useEffect(() => {
    if (phase === "run" && q && q.type === "listen") speak(q.word.speakText);
    return () => stopVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, q]);

  const reveal = (correct: boolean) => {
    setWasCorrect(correct);
    setRevealed(true);
  };

  const grade = (g: SrsGrade) => {
    if (!q) return;
    const before = store[q.word.key];
    const after = reviewCard(before, g, wasCorrect ?? true);
    const next = { ...store, [q.word.key]: after };
    setStore(next);
    saveSrs(next, subject);

    const leveled = after.streak > (before?.streak || 0);
    const justMastered = after.streak >= MASTER_STREAK && (before?.streak || 0) < MASTER_STREAK;
    if (justMastered) onWordMastered?.(q.word.key);
    setStats(s => ({
      reviewed: s.reviewed + 1,
      correct: s.correct + (wasCorrect ? 1 : 0),
      levelUp: s.levelUp + (leveled ? 1 : 0),
      mastered: s.mastered + (justMastered ? 1 : 0),
    }));

    // Forgotten words come back at the end of the same session.
    const requeue = g === "forgot" || wasCorrect === false;
    setPicked(null);
    setTyped("");
    setRevealed(false);
    setWasCorrect(null);
    setQueue(prev => {
      const rest = [...prev];
      if (requeue) rest.push(buildQuestion(q.word, allWords, false));
      return rest;
    });
    if (idx + 1 >= queue.length + (requeue ? 1 : 0)) {
      setStreak(bumpStreak(subject));
      setPhase("done");
    } else {
      setIdx(i => i + 1);
      requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  // ── Setup screen ──
  if (phase === "setup") {
    const total = plan.due.length + plan.fresh.length;
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-emerald-500/10 p-5">
          <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Target className="h-5 w-5 text-primary" /> {t("Nhiệm vụ từ vựng hôm nay", "Daily Word Mission")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "Ôn đúng lúc sắp quên - 5 tới 10 phút mỗi ngày là đủ để nhớ lâu.",
              "Review right before you forget - 5 to 10 minutes a day is enough to remember for good.",
            )}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-extrabold text-orange-500">{dueNow}</p>
            <p className="text-xs text-muted-foreground">{t("Từ đến hạn ôn", "Words due today")}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-extrabold text-primary">{Object.keys(store).length}</p>
            <p className="text-xs text-muted-foreground">{t("Từ đang theo dõi", "Words tracked")}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-extrabold text-amber-500">
              <Flame className="h-5 w-5" /> {streak.days}
            </p>
            <p className="text-xs text-muted-foreground">{t("Chuỗi ngày", "Day streak")}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-extrabold text-emerald-500">
              {Object.values(store).filter(c => c.streak >= MASTER_STREAK).length}
            </p>
            <p className="text-xs text-muted-foreground">{t("Đã nhớ chắc", "Locked in")}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-semibold text-foreground">{t("Số từ ôn lại", "Review words")}: {reviewCount}</span>
              <input type="range" min={5} max={30} step={5} value={reviewCount}
                onChange={e => setReviewCount(Number(e.target.value))} className="w-full accent-primary" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-semibold text-foreground">{t("Số từ mới", "New words")}: {newCount}</span>
              <input type="range" min={0} max={20} step={5} value={newCount}
                onChange={e => setNewCount(Number(e.target.value))} className="w-full accent-primary" />
            </label>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            {t(
              `Hôm nay: ${plan.due.length} từ ôn lại + ${plan.fresh.length} từ mới.`,
              `Today: ${plan.due.length} review word(s) + ${plan.fresh.length} new word(s).`,
            )}
          </p>
          <Button onClick={start} disabled={total === 0} className="w-full gap-2">
            <Sparkles className="h-4 w-4" /> {t("Bắt đầu nhiệm vụ", "Start mission")}
          </Button>
          {total === 0 && (
            <p className="mt-3 text-center text-sm text-emerald-500">
              {t("Tuyệt vời! Hôm nay bạn không còn từ nào cần ôn.", "All done! Nothing left to review today.")}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Summary ──
  if (phase === "done") {
    const tomorrow = countDueOn(store, addDays(today, 1));
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="rounded-3xl border border-primary/30 bg-card p-8">
          <div className="mb-3 text-6xl">🎯</div>
          <h3 className="mb-2 text-2xl font-extrabold text-foreground">{t("Hoàn thành nhiệm vụ!", "Mission complete!")}</h3>
          <div className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: stats.reviewed, l: t("Từ đã ôn", "Reviewed") },
              { v: stats.correct, l: t("Trả lời đúng", "Correct") },
              { v: stats.levelUp, l: t("Lên cấp", "Levelled up") },
              { v: streak.days, l: t("Chuỗi ngày", "Day streak") },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-secondary/60 p-3">
                <p className="text-xl font-extrabold text-primary">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <p className="mb-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="h-4 w-4" />
            {t(`Ngày mai bạn có ${tomorrow} từ cần ôn.`, `Tomorrow you have ${tomorrow} word(s) to review.`)}
          </p>
          <Button onClick={() => setPhase("setup")} className="gap-2">
            <RotateCcw className="h-4 w-4" /> {t("Về trang nhiệm vụ", "Back to mission")}
          </Button>
        </div>
      </div>
    );
  }

  if (!q) return null;

  // Sentence gaps always remove the displayed word itself (Hanzi for Chinese),
  // while listening/recall tasks retain each subject's configured type answer.
  const expectedTypedAnswer = q.type === "gap" ? q.word.word : q.word.typeAnswer;
  const typedOk = norm(typed) === norm(expectedTypedAnswer);

  return (
    <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-24">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <Badge variant="outline">{idx + 1}/{queue.length}</Badge>
        <div className="flex items-center gap-2">
          {q.isNew && <Badge className="bg-emerald-500/15 text-emerald-500">{t("Từ mới", "New")}</Badge>}
          <Badge variant="secondary">{q.word.category}</Badge>
          <span className="flex items-center gap-1 text-sm font-semibold text-amber-500"><Flame className="h-4 w-4" />{streak.days}</span>
        </div>
      </div>
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all"
          style={{ width: `${(idx / Math.max(1, queue.length)) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`${idx}-${q.word.key}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
          className="rounded-2xl border border-border bg-card p-6">

          {q.type === "meaning" && (
            <>
              <div className="mb-4 flex items-center justify-center gap-3">
                <h3 className="text-3xl font-extrabold text-foreground">{q.prompt}</h3>
                <button onClick={() => speak(q.word.speakText)} className="rounded-full p-2 hover:bg-primary/10">
                  <Volume2 className="h-5 w-5 text-primary" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {q.options.map((o, i) => (
                  <button key={i} disabled={revealed}
                    onClick={() => { setPicked(i); reveal(i === q.correct); }}
                    className={`rounded-xl border p-3 text-left text-sm transition-all ${
                      revealed && i === q.correct ? "border-emerald-500 bg-emerald-500/10"
                        : picked === i ? "border-red-500 bg-red-500/10"
                          : "border-border bg-background hover:border-primary/50"
                    }`}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}

          {q.type === "listen" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <button onClick={() => speak(q.word.speakText)} className="rounded-full bg-primary/10 p-6 hover:bg-primary/20">
                <Volume2 className="h-10 w-10 text-primary" />
              </button>
              <p className="text-sm text-muted-foreground">
                {q.word.typeAnswer !== q.word.word
                  ? t("Nghe rồi gõ phiên âm:", "Listen, then type the romanisation:")
                  : t("Nghe rồi gõ lại từ:", "Listen, then type the word:")}
              </p>
              <p className="text-base font-semibold text-foreground">{q.prompt}</p>
              <input value={typed} onChange={e => setTyped(e.target.value)} disabled={revealed}
                onKeyDown={e => { if (e.key === "Enter" && typed.trim()) reveal(typedOk); }}
                placeholder={t("Gõ từ...", "Type the word...")}
                className="w-full max-w-xs rounded-xl border border-border bg-background px-4 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary/40" />
              {!revealed && <Button onClick={() => reveal(typedOk)} disabled={!typed.trim()}>{t("Kiểm tra", "Check")}</Button>}
            </div>
          )}

          {q.type === "gap" && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">{t("Điền từ còn thiếu vào câu:", "Fill the missing word:")}</p>
              <p className="text-lg italic leading-relaxed text-foreground">{q.prompt}</p>
              <p className="text-sm text-muted-foreground">{t("Nghĩa:", "Meaning:")} {q.word.definition.vi}</p>
              <input value={typed} onChange={e => setTyped(e.target.value)} disabled={revealed}
                onKeyDown={e => { if (e.key === "Enter" && typed.trim()) reveal(typedOk); }}
                placeholder={t("Gõ từ...", "Type the word...")}
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary/40" />
              {!revealed && <Button onClick={() => reveal(typedOk)} disabled={!typed.trim()} className="self-start">{t("Kiểm tra", "Check")}</Button>}
            </div>
          )}

          {q.type === "recall" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="text-3xl font-extrabold text-foreground">{q.prompt}</h3>
              <p className="font-mono text-sm text-muted-foreground">{q.word.subtitle || q.word.ipa}</p>
              <p className="text-sm text-muted-foreground">{t("Bạn còn nhớ nghĩa của từ này không?", "Do you still remember this word?")}</p>
              {!revealed && <Button onClick={() => reveal(true)}>{t("Hiện đáp án", "Show answer")}</Button>}
            </div>
          )}

          {revealed && (
            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  {wasCorrect ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : null}
                  {q.word.word} <span className="font-mono text-xs text-muted-foreground">{q.word.ipa}</span>
                  {q.word.partOfSpeech && <span className="text-xs text-muted-foreground">({q.word.partOfSpeech})</span>}
                </p>
                <p className="mt-1 text-muted-foreground">{q.word.definition.en}</p>
                <p className="text-muted-foreground">{q.word.definition.vi}</p>
                {q.word.example && <p className="mt-2 italic text-foreground"><span className="not-italic font-bold text-primary">E.g. </span>{q.word.example}</p>}
                {q.word.exampleTranslation && <p className="text-xs text-muted-foreground">{q.word.exampleTranslation}</p>}
              </div>
              <p className="text-center text-xs text-muted-foreground">
                {t("Bạn nhớ từ này ở mức nào?", "How well did you remember it?")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="border-red-500/40 text-red-500 hover:bg-red-500/10" onClick={() => grade("forgot")}>
                  {t("Quên", "Forgot")}
                </Button>
                <Button variant="outline" className="border-amber-500/40 text-amber-500 hover:bg-amber-500/10" onClick={() => grade("hard")}>
                  {t("Khó", "Hard")}
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => grade("easy")}>
                  {t("Dễ", "Easy")}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DailyWordMission;
