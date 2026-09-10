/**
 * @file DailyWordMission.tsx
 * @description Daily spaced-repetition mission shared by every vocabulary bank.
 * Picks the words that are due today plus a few new ones and drills each of them
 * with an adaptive exercise (meaning, reverse choice, listening, sentence gap,
 * usage choice, word building, say-it-back, free recall). Answers are graded
 * automatically and the learner can adjust with Forgot / Hard / Easy.
 * All progress is local (safeStorage) - no database changes.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, Flame, CalendarClock, Target, Sparkles, RotateCcw, CheckCircle2,
  Mic, Square, XCircle, Shuffle, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { QuestItem } from "@/lib/vocab/vocabAdapter";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { pickSmartDistractors, maskWord, shuffleArr } from "@/lib/vocab/questionQuality";
import {
  buildMission, countDue, countDueOn, loadSrs, saveSrs, reviewCard, bumpStreak, loadStreak,
  todayISO, addDays, MASTER_STREAK, loadDoneDays, markDayDone, lastNDays,
  type SrsGrade, type SrsStore, type SrsCard,
} from "@/lib/vocab/srsEngine";

type QType = "meaning" | "reverse" | "listen" | "gap" | "usage" | "build" | "speak" | "recall";

interface MissionQ {
  word: QuestItem;
  type: QType;
  options: string[];
  correct: number;
  prompt: string;
  isNew: boolean;
  /** Scrambled tiles for the word-building step. */
  tiles?: string[];
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
  /** BCP-47 tag used by the "say it back" step (en-US, vi-VN, zh-CN...). */
  speechLang?: string;
}

const hasExample = (w: QuestItem) => !!w.example && w.example.length > 8;

/** Split a word into typing tiles: characters for CJK, letters elsewhere. */
const toTiles = (word: string): string[] =>
  Array.from(word.replace(/\s+/g, " ").trim());

/**
 * Choose the exercise format for one word. New words start with gentle
 * recognition formats, well-known words get harder recall formats, and words
 * that have been forgotten before are pushed towards production.
 */
const pickType = (
  w: QuestItem,
  card: SrsCard | undefined,
  isNew: boolean,
  canSpeak: boolean,
  hasUsage: boolean,
): QType => {
  let pool: QType[];
  if (isNew) {
    pool = ["meaning", "reverse", "listen"];
  } else if ((card?.lapses || 0) > 0 || (card?.streak || 0) < 2) {
    pool = ["gap", "build", "listen", "meaning", "reverse"];
  } else {
    pool = ["recall", "build", "gap", "usage", "reverse", "listen"];
  }
  if (canSpeak) pool.push("speak");
  if (hasUsage && !isNew) pool.push("usage");
  const usable = pool.filter(ty => {
    if (ty === "usage") return hasUsage;
    if (ty === "gap") return hasExample(w);
    if (ty === "speak") return canSpeak;
    if (ty === "build") return toTiles(w.typeAnswer).length >= 3 && toTiles(w.typeAnswer).length <= 16;
    return true;
  });
  const list = usable.length ? usable : ["meaning" as QType];
  return list[Math.floor(Math.random() * list.length)];
};

const buildQuestion = (
  w: QuestItem,
  pool: QuestItem[],
  isNew: boolean,
  card: SrsCard | undefined,
  canSpeak: boolean,
  forceType?: QType,
): MissionQ => {
  const distractors = pickSmartDistractors(pool, w, 3, {
    getText: x => x.definition.vi,
    getPos: x => x.partOfSpeech,
    getTopic: x => x.category,
    getLevel: x => x.level,
  });
  const usageDistractors = pool
    .filter(x => x.key !== w.key && hasExample(x))
    .slice(0, 60);
  const hasUsage = hasExample(w) && usageDistractors.length >= 3;
  const type = forceType || pickType(w, card, isNew, canSpeak, hasUsage);

  if (type === "meaning") {
    const opts = shuffleArr([w, ...distractors]);
    return {
      word: w, type, isNew,
      options: opts.map(o => o.definition.vi),
      correct: opts.findIndex(o => o.key === w.key),
      prompt: w.word,
    };
  }

  if (type === "reverse") {
    const opts = shuffleArr([w, ...distractors]);
    return {
      word: w, type, isNew,
      options: opts.map(o => o.word),
      correct: opts.findIndex(o => o.key === w.key),
      prompt: w.definition.vi,
    };
  }

  if (type === "usage" && hasUsage) {
    const picks = shuffleArr(usageDistractors).slice(0, 3);
    const opts = shuffleArr([
      { key: w.key, text: maskWord(w.example!, w.word) },
      ...picks.map(p => ({ key: p.key, text: maskWord(p.example!, p.word) })),
    ]);
    return {
      word: w, type, isNew,
      options: opts.map(o => o.text),
      correct: opts.findIndex(o => o.key === w.key),
      prompt: w.word,
    };
  }

  if (type === "build") {
    const tiles = shuffleArr(toTiles(w.typeAnswer));
    return { word: w, type, isNew, options: [], correct: 0, prompt: w.definition.vi, tiles };
  }

  if (type === "gap" && hasExample(w)) {
    return {
      word: w, type, isNew,
      options: [], correct: 0,
      prompt: maskWord(w.example!, w.word),
    };
  }

  if (type === "listen") {
    return { word: w, type, isNew, options: [], correct: 0, prompt: w.definition.vi };
  }

  if (type === "speak") {
    return { word: w, type, isNew, options: [], correct: 0, prompt: w.word };
  }

  return { word: w, type: "recall", isNew, options: [], correct: 0, prompt: w.word };
};

const DailyWordMission = ({
  bank, allWords, t, onWordMastered,
  subject = "ielts",
  speak: speakProp,
  stopSpeak,
  speechLang = "en-US",
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
  const [built, setBuilt] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [heard, setHeard] = useState("");
  const [stats, setStats] = useState({ reviewed: 0, correct: 0, levelUp: 0, mastered: 0 });
  const [missed, setMissed] = useState<QuestItem[]>([]);
  const [streak, setStreak] = useState(() => loadStreak(subject));
  const [doneDays, setDoneDays] = useState<string[]>(() => loadDoneDays(subject));
  const topRef = useRef<HTMLDivElement>(null);

  const today = todayISO();
  const dueNow = useMemo(() => countDue(store, today), [store, today]);
  const plan = useMemo(
    () => buildMission(bank, w => w.key, store, { reviewCount, newCount, today }),
    [bank, store, reviewCount, newCount, today],
  );
  const strip = useMemo(() => lastNDays(14), []);

  // ── Microphone for the "say it back" step ──
  const onFinal = useCallback((transcript: string) => {
    setHeard(transcript);
  }, []);
  const recognizer = useSpeechRecognizer({ speechLang, maxSeconds: 10, onFinal });
  const canSpeakStep = recognizer.supported;

  const makeQueue = useCallback(
    (words: { w: QuestItem; isNew: boolean }[], src: SrsStore) =>
      words.map(({ w, isNew }) => buildQuestion(w, allWords, isNew, src[w.key], canSpeakStep)),
    [allWords, canSpeakStep],
  );

  const resetStep = () => {
    setPicked(null);
    setTyped("");
    setBuilt([]);
    setRevealed(false);
    setWasCorrect(null);
    setHeard("");
    recognizer.reset();
  };

  const start = useCallback(() => {
    const words = shuffleArr([
      ...plan.due.map(w => ({ w, isNew: false })),
      ...plan.fresh.map(w => ({ w, isNew: true })),
    ]);
    if (words.length === 0) return;
    setQueue(makeQueue(words, store));
    setIdx(0);
    resetStep();
    setMissed([]);
    setStats({ reviewed: 0, correct: 0, levelUp: 0, mastered: 0 });
    setPhase("run");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan, makeQueue, store]);

  /** Second round over the words missed in the session, in a harder format. */
  const startMissedRound = useCallback(() => {
    if (missed.length === 0) return;
    const uniq = Array.from(new Map(missed.map(w => [w.key, w])).values());
    setQueue(uniq.map(w => buildQuestion(w, allWords, false, store[w.key], canSpeakStep)));
    setIdx(0);
    resetStep();
    setMissed([]);
    setStats({ reviewed: 0, correct: 0, levelUp: 0, mastered: 0 });
    setPhase("run");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missed, allWords, store, canSpeakStep]);

  const q = queue[idx];

  // Audio always stops when the step changes; listening steps auto-play.
  useEffect(() => {
    if (phase === "run" && q && q.type === "listen") speak(q.word.speakText);
    return () => stopVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, idx, q?.word.key]);

  const reveal = (correct: boolean) => {
    if (recognizer.isRecording) recognizer.stop();
    setWasCorrect(correct);
    setRevealed(true);
  };

  const grade = (g: SrsGrade) => {
    if (!q) return;
    const correct = wasCorrect ?? true;
    const before = store[q.word.key];
    const after = reviewCard(before, g, correct);
    const next = { ...store, [q.word.key]: after };
    setStore(next);
    saveSrs(next, subject);

    const leveled = after.streak > (before?.streak || 0);
    const justMastered = after.streak >= MASTER_STREAK && (before?.streak || 0) < MASTER_STREAK;
    if (justMastered) onWordMastered?.(q.word.key);
    setStats(s => ({
      reviewed: s.reviewed + 1,
      correct: s.correct + (correct ? 1 : 0),
      levelUp: s.levelUp + (leveled ? 1 : 0),
      mastered: s.mastered + (justMastered ? 1 : 0),
    }));

    // Forgotten words come back at the end of the same session, once.
    const requeue = g === "forgot" || !correct;
    if (requeue) setMissed(m => [...m, q.word]);
    const alreadyRequeued = queue.filter(x => x.word.key === q.word.key).length > 1;
    const addBack = requeue && !alreadyRequeued;

    resetStep();
    const nextQueue = addBack
      ? [...queue, buildQuestion(q.word, allWords, false, next[q.word.key], canSpeakStep)]
      : queue;
    if (addBack) setQueue(nextQueue);

    if (idx + 1 >= nextQueue.length) {
      setStreak(bumpStreak(subject));
      setDoneDays(markDayDone(subject));
      setPhase("done");
    } else {
      setIdx(i => i + 1);
      requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  const ActivityStrip = () => (
    <div className="flex flex-wrap items-center gap-1.5">
      {strip.map(d => {
        const done = doneDays.includes(d);
        return (
          <span
            key={d}
            title={d}
            className={`h-3.5 w-3.5 rounded-[4px] ${done ? "bg-emerald-500" : "bg-secondary"}`}
          />
        );
      })}
      <span className="ml-2 text-xs text-muted-foreground">
        {t("14 ngày gần đây", "Last 14 days")}
      </span>
    </div>
  );

  // ── Setup screen ──
  if (phase === "setup") {
    const total = plan.due.length + plan.fresh.length;
    const trackedAll = bank.length > 0 && plan.fresh.length === 0 && plan.due.length === 0;
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-emerald-500/10 p-5">
          <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Target className="h-5 w-5 text-primary" /> {t("Nhiệm vụ từ vựng hôm nay", "Daily Word Mission")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "Ôn đúng lúc sắp quên - 5 tới 10 phút mỗi ngày là đủ để nhớ lâu. Mỗi từ sẽ đến với một dạng bài khác nhau: chọn nghĩa, chọn từ, nghe gõ, điền câu, chọn câu dùng đúng, ghép chữ và nói lại.",
              "Review right before you forget - 5 to 10 minutes a day is enough to remember for good. Each word comes back in a different format: meaning, reverse choice, listening, sentence gap, usage choice, word building and speaking.",
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

        <div className="mb-5 rounded-2xl border border-border bg-card p-4">
          <p className="mb-2 text-sm font-semibold text-foreground">
            {doneDays.includes(today)
              ? t("Hôm nay bạn đã hoàn thành nhiệm vụ ✅", "Today's mission is done ✅")
              : t("Hôm nay chưa hoàn thành nhiệm vụ", "Today's mission is not done yet")}
          </p>
          <ActivityStrip />
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
          {bank.length === 0 && (
            <p className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-foreground">
              {t(
                "Chưa có từ nào trong danh sách này. Hãy bỏ bộ lọc hoặc chọn chủ đề khác rồi quay lại.",
                "There are no words in this list. Clear the filters or pick another topic, then come back.",
              )}
            </p>
          )}
          {trackedAll && (
            <p className="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-foreground">
              {t(
                "Tuyệt vời - không còn từ nào đến hạn hôm nay. Hãy tăng 'Số từ mới' hoặc quay lại ngày mai.",
                "Nothing is due today. Raise 'New words' or come back tomorrow.",
              )}
            </p>
          )}
          <Button onClick={start} disabled={total === 0} className="w-full gap-2 bg-gradient-to-r from-primary to-emerald-500">
            <Sparkles className="h-4 w-4" /> {t("Bắt đầu nhiệm vụ", "Start mission")}
          </Button>
        </div>
      </div>
    );
  }

  // ── Done screen ──
  if (phase === "done") {
    const tomorrow = countDueOn(store, addDays(today, 1));
    const accuracy = stats.reviewed ? Math.round((stats.correct / stats.reviewed) * 100) : 0;
    const missedUniq = Array.from(new Map(missed.map(w => [w.key, w])).values());
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="mb-3 text-6xl">🎯</div>
          <h3 className="mb-2 text-2xl font-extrabold text-foreground">{t("Hoàn thành nhiệm vụ!", "Mission complete!")}</h3>
          <div className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: stats.reviewed, l: t("Từ đã ôn", "Reviewed") },
              { v: `${accuracy}%`, l: t("Độ chính xác", "Accuracy") },
              { v: stats.levelUp, l: t("Lên cấp", "Levelled up") },
              { v: streak.days, l: t("Chuỗi ngày", "Day streak") },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-secondary/60 p-3">
                <p className="text-xl font-extrabold text-primary">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mb-5 flex justify-center"><ActivityStrip /></div>

          {missedUniq.length > 0 && (
            <div className="mb-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-left">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <XCircle className="h-4 w-4 text-amber-600" />
                {t("Những từ còn khó", "Words that are still tricky")}
              </p>
              <div className="mb-3 flex flex-wrap gap-2">
                {missedUniq.map(w => (
                  <Badge key={w.key} variant="outline" className="bg-background">{w.word}</Badge>
                ))}
              </div>
              <Button onClick={startMissedRound} className="gap-2">
                <RotateCcw className="h-4 w-4" /> {t("Ôn lại ngay các từ này", "Review these now")}
              </Button>
            </div>
          )}

          <p className="mb-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="h-4 w-4" />
            {t(`Ngày mai bạn có ${tomorrow} từ cần ôn.`, `Tomorrow you have ${tomorrow} word(s) to review.`)}
          </p>
          <Button variant="outline" onClick={() => setPhase("setup")} className="gap-2">
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
  const builtText = (q.tiles || []).filter((_, i) => built.includes(i)).length
    ? built.map(i => (q.tiles || [])[i]).join("")
    : "";
  const builtOk = norm(builtText) === norm(q.word.typeAnswer);
  const heardOk = !!heard && (norm(heard).includes(norm(q.word.word)) || norm(heard) === norm(q.word.typeAnswer));

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
              <p className="mb-2 text-center text-sm text-muted-foreground">{t("Chọn nghĩa đúng:", "Pick the right meaning:")}</p>
              <div className="mb-4 flex items-center justify-center gap-3">
                <h3 className="text-3xl font-extrabold text-foreground">{q.prompt}</h3>
                <button onClick={() => speak(q.word.speakText)} className="rounded-full p-2 hover:bg-primary/10">
                  <Volume2 className="h-5 w-5 text-primary" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {q.options.map((o, i) => (
                  <button key={i} disabled={revealed}
                    data-testid="mq-option"
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

          {q.type === "reverse" && (
            <>
              <p className="mb-2 text-center text-sm text-muted-foreground">{t("Nghĩa này là của từ nào?", "Which word matches this meaning?")}</p>
              <h3 className="mb-4 text-center text-xl font-bold text-foreground">{q.prompt}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {q.options.map((o, i) => (
                  <button key={i} disabled={revealed}
                    data-testid="mq-option"
                    onClick={() => { setPicked(i); reveal(i === q.correct); }}
                    className={`rounded-xl border p-3 text-center text-base font-semibold transition-all ${
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

          {q.type === "usage" && (
            <>
              <p className="mb-2 text-center text-sm text-muted-foreground">
                {t("Câu nào dùng đúng từ này?", "Which sentence does this word fit?")}
              </p>
              <h3 className="mb-4 text-center text-2xl font-extrabold text-foreground">{q.prompt}</h3>
              <div className="grid gap-3">
                {q.options.map((o, i) => (
                  <button key={i} disabled={revealed}
                    data-testid="mq-option"
                    onClick={() => { setPicked(i); reveal(i === q.correct); }}
                    className={`rounded-xl border p-3 text-left text-sm italic leading-relaxed transition-all ${
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

          {q.type === "build" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">
                <Shuffle className="mr-1 inline h-4 w-4 text-primary" />
                {t("Ghép lại đúng từ theo nghĩa:", "Rebuild the word from this meaning:")}
              </p>
              <p className="text-base font-semibold text-foreground">{q.prompt}</p>
              <div className="min-h-12 w-full max-w-md rounded-xl border border-border bg-background px-4 py-3 text-2xl font-extrabold tracking-wide text-foreground">
                {builtText || <span className="text-base font-normal text-muted-foreground">{t("Chọn các ô bên dưới", "Tap the tiles below")}</span>}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {(q.tiles || []).map((c, i) => (
                  <button key={i} disabled={revealed || built.includes(i)}
                    onClick={() => setBuilt(b => [...b, i])}
                    className={`min-w-10 rounded-lg border px-3 py-2 text-lg font-bold transition-all ${
                      built.includes(i) ? "border-border bg-secondary text-muted-foreground opacity-50"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}>
                    {c === " " ? "␣" : c}
                  </button>
                ))}
              </div>
              {!revealed && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setBuilt([])} disabled={built.length === 0}>
                    {t("Xoá", "Clear")}
                  </Button>
                  <Button onClick={() => reveal(builtOk)} disabled={built.length === 0}>
                    {t("Kiểm tra", "Check")}
                  </Button>
                </div>
              )}
            </div>
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

          {q.type === "speak" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">{t("Nghe mẫu rồi nói lại từ này:", "Listen, then say this word back:")}</p>
              <h3 className="text-3xl font-extrabold text-foreground">{q.prompt}</h3>
              <p className="font-mono text-sm text-muted-foreground">{q.word.subtitle || q.word.ipa}</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={() => speak(q.word.speakText)} className="gap-2">
                  <Volume2 className="h-4 w-4" /> {t("Nghe mẫu", "Listen")}
                </Button>
                {recognizer.isRecording ? (
                  <Button variant="outline" onClick={() => recognizer.stop()} className="gap-2 border-red-500/40 text-red-500 hover:bg-red-500/10">
                    <Square className="h-4 w-4" /> {t("Dừng", "Stop")} ({recognizer.seconds}s)
                  </Button>
                ) : (
                  <Button onClick={() => { setHeard(""); recognizer.reset(); void recognizer.start(); }} className="gap-2" disabled={revealed}>
                    <Mic className="h-4 w-4" /> {t("Nói lại", "Say it back")}
                  </Button>
                )}
              </div>
              {(recognizer.transcript || heard) && (
                <p className="text-sm text-muted-foreground">
                  {t("Nghe được:", "Heard:")} <span className="font-semibold text-foreground">{heard || recognizer.transcript}</span>
                </p>
              )}
              {recognizer.error && <p className="text-sm text-red-500">{recognizer.error}</p>}
              {!revealed && (
                <div className="flex flex-wrap justify-center gap-2">
                  <Button onClick={() => reveal(heardOk)} disabled={!heard && !recognizer.transcript} className="gap-2">
                    {t("Kiểm tra", "Check")} <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => reveal(false)}>{t("Bỏ qua", "Skip")}</Button>
                </div>
              )}
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
              <div className={`rounded-xl border p-4 text-sm ${
                wasCorrect === false ? "border-red-500/40 bg-red-500/5" : "border-primary/30 bg-primary/5"
              }`}>
                <p className="flex items-center gap-2 font-semibold text-foreground">
                  {wasCorrect === false
                    ? <XCircle className="h-4 w-4 text-red-500" />
                    : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  {q.word.word} <span className="font-mono text-xs text-muted-foreground">{q.word.ipa}</span>
                  {q.word.partOfSpeech && <span className="text-xs text-muted-foreground">({q.word.partOfSpeech})</span>}
                </p>
                <p className="mt-1 text-muted-foreground">{q.word.definition.en}</p>
                <p className="text-muted-foreground">{q.word.definition.vi}</p>
                {q.word.example && <p className="mt-2 italic text-foreground"><span className="not-italic font-bold text-primary">E.g. </span>{q.word.example}</p>}
                {q.word.exampleTranslation && <p className="text-xs text-muted-foreground">{q.word.exampleTranslation}</p>}
              </div>

              <Button data-testid="mq-continue" onClick={() => grade(wasCorrect === false ? "forgot" : "good")} className="w-full gap-2 bg-gradient-to-r from-primary to-emerald-500">
                {t("Tiếp tục", "Continue")} <ChevronRight className="h-4 w-4" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {t("Hoặc tự đánh giá mức ghi nhớ:", "Or rate your own recall:")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="border-red-500/40 text-red-500 hover:bg-red-500/10" onClick={() => grade("forgot")}>
                  {t("Quên", "Forgot")}
                </Button>
                <Button variant="outline" className="border-amber-500/40 text-amber-500 hover:bg-amber-500/10" onClick={() => grade("hard")}>
                  {t("Khó", "Hard")}
                </Button>
                <Button variant="outline" className="border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10" onClick={() => grade("easy")}>
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
