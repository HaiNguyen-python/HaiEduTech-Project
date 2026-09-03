/**
 * @file WordQuest.tsx
 * @description A playful third way to learn vocabulary (next to the word list
 * and flashcards). Words are grouped into small stages of 8; each word walks
 * through 4 gentle steps (meet / recognise / listen / type) and earns stars.
 * No timer, no penalties - wrong answers just show the word again.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Star, Check, RotateCcw, Sparkles, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { QuestItem } from "@/lib/vocab/vocabAdapter";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { resolveVocabEmoji } from "@/lib/vocabEmojiMap";
import { safeStorage } from "@/lib/safeStorage";
import { maskWord } from "@/lib/vocab/questionQuality";

const STAGE_SIZE = 8;
const DEFAULT_PROGRESS_KEY = "ielts_word_quest_v1";
const STEP_COUNT = 5;

type Step = 0 | 1 | 2 | 3 | 4;

interface Progress {
  /** stage index -> number of words fully completed */
  stages: Record<number, number>;
  /** stage index -> mistakes made, used for the bronze/silver/gold medal */
  medals?: Record<number, number>;
  /** Where the learner stopped, so they can jump straight back in. */
  resume?: { stage: number; word: number } | null;
}

const medalOf = (mistakes: number) => (mistakes === 0 ? "🥇" : mistakes <= 3 ? "🥈" : "🥉");

/** Default (English) voice; every subject can pass its own `speak`. */
const englishSpeak = (text: string, slow = false) => {
  stopEnglishTts();
  void playEnglishTts(text, { playbackRate: slow ? 0.75 : 0.95, speechRate: slow ? 0.6 : 0.8 });
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Keeps letters/digits of any alphabet (Vietnamese diacritics included). */
const norm = (s: string) =>
  s.toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "");

interface Props {
  words: QuestItem[];
  allWords: QuestItem[];
  t: (vi: string, en: string) => string;
  /** Called when a word finishes all steps, so it can be marked as learned. */
  onWordLearned?: (key: string) => void;
  /** Per-subject localStorage key so each language keeps its own stages. */
  storageKey?: string;
  /** Per-subject text-to-speech. Defaults to the English voice. */
  speak?: (text: string, slow?: boolean) => void;
  /** Stop whatever the subject's voice is currently playing. */
  stopSpeak?: () => void;
  /** What the learner types: the word itself, or its romanisation (zh / ja). */
  typingLabel?: { vi: string; en: string };
}

const WordQuest = ({
  words, allWords, t, onWordLearned,
  storageKey = DEFAULT_PROGRESS_KEY,
  speak: speakProp,
  stopSpeak,
  typingLabel,
}: Props) => {
  const speak = speakProp || englishSpeak;
  const stopVoice = stopSpeak || stopEnglishTts;
  const PROGRESS_KEY = storageKey;
  const stages = useMemo(() => {
    const out: QuestItem[][] = [];
    for (let i = 0; i < words.length; i += STAGE_SIZE) out.push(words.slice(i, i + STAGE_SIZE));
    return out;
  }, [words]);

  const [progress, setProgress] = useState<Progress>(
    () => safeStorage.get<Progress>(PROGRESS_KEY, { stages: {} }) || { stages: {} }
  );
  const [stageIdx, setStageIdx] = useState<number | null>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [step, setStep] = useState<Step>(0);
  const [stars, setStars] = useState(0);
  const [combo, setCombo] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  /** Words answered wrongly in this stage - they come back at the end. */
  const [retryQueue, setRetryQueue] = useState<number[]>([]);
  const [stageMistakes, setStageMistakes] = useState(0);
  const [slow, setSlow] = useState(false);

  const stage = stageIdx === null ? null : stages[stageIdx];
  const word = stage ? stage[wordIdx] : null;

  const save = useCallback((next: Progress) => {
    setProgress(next);
    safeStorage.set(PROGRESS_KEY, next);
  }, [PROGRESS_KEY]);

  // Speak the word whenever a listening step opens.
  useEffect(() => {
    if (word && (step === 0 || step === 2)) speak(word.speakText);
    return () => stopVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, step]);

  const distractors = useMemo(() => {
    if (!word) return [] as QuestItem[];
    const pool = allWords.filter(w => w.key !== word.key);
    const sameTopic = pool.filter(w => w.category === word.category);
    return shuffle(sameTopic.length >= 3 ? sameTopic : pool).slice(0, 3);
  }, [word, allWords]);

  const meaningOptions = useMemo(() => {
    if (!word) return [] as { key: string; label: string; emoji: string }[];
    return shuffle([word, ...distractors]).map(w => ({
      key: w.key,
      label: w.definition.vi,
      emoji: resolveVocabEmoji(w.definition.en, w.category),
    }));
  }, [word, distractors]);

  const spellingOptions = useMemo(() => {
    if (!word) return [] as string[];
    return shuffle([word.word, ...distractors.map(d => d.word)]);
  }, [word, distractors]);

  /** Step 5: the word's own example sentence with the target masked out. */
  const gapSentence = useMemo(() => {
    if (!word) return "";
    const base = word.example && word.example.length > 12
      ? word.example
      : `${word.word} - ${word.definition.en}`;
    return maskWord(base, word.word, "______");
  }, [word]);

  const gapOptions = useMemo(() => {
    if (!word) return [] as string[];
    return shuffle([word.word, ...distractors.slice(0, 2).map(d => d.word)]);
  }, [word, distractors]);

  const resetStepState = () => {
    setPicked(null);
    setTyped("");
    setWrongCount(0);
  };

  const openStage = (i: number) => {
    const s = stages[i];
    if (!s) return;
    const done = progress.stages[i] || 0;
    setStageIdx(i);
    setWordIdx(done >= s.length ? 0 : done);
    setStep(0);
    setStars(0);
    setCombo(0);
    setRetryQueue([]);
    setStageMistakes(0);
    resetStepState();
  };

  const finishWord = () => {
    if (!stage || stageIdx === null || !word) return;
    onWordLearned?.(word.key);
    const done = Math.max(progress.stages[stageIdx] || 0, wordIdx + 1);
    const medals = { ...(progress.medals || {}), [stageIdx]: stageMistakes };
    resetStepState();

    // Words answered wrongly must be re-done before the stage counts as clear.
    if (wordIdx + 1 >= stage.length && retryQueue.length > 0) {
      const [next, ...rest] = retryQueue;
      setRetryQueue(rest);
      setWordIdx(next);
      setStep(1);
      save({ ...progress, stages: { ...progress.stages, [stageIdx]: done }, medals, resume: { stage: stageIdx, word: next } });
      return;
    }

    if (wordIdx + 1 >= stage.length) {
      save({ ...progress, stages: { ...progress.stages, [stageIdx]: stage.length }, medals, resume: null });
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 3200);
    } else {
      save({ ...progress, stages: { ...progress.stages, [stageIdx]: done }, medals, resume: { stage: stageIdx, word: wordIdx + 1 } });
      setWordIdx(i => i + 1);
      setStep(0);
    }
  };

  const nextStep = () => {
    resetStepState();
    if (step >= STEP_COUNT - 1) finishWord();
    else setStep((step + 1) as Step);
  };

  const registerMistake = () => {
    setCombo(0);
    setWrongCount(c => c + 1);
    setStageMistakes(m => m + 1);
    setRetryQueue(qs => (qs.includes(wordIdx) ? qs : [...qs, wordIdx]));
  };

  const handlePick = (key: string, correctKey: string) => {
    if (picked) return;
    setPicked(key);
    if (key === correctKey) {
      setStars(s => s + 1 + (combo >= 4 ? 2 : combo >= 2 ? 1 : 0));
      setCombo(c => c + 1);
      window.setTimeout(nextStep, 850);
    } else {
      registerMistake();
    }
  };

  const checkTyped = () => {
    if (!word) return;
    if (norm(typed) === norm(word.typeAnswer)) {
      setStars(s => s + 1 + (combo >= 4 ? 2 : combo >= 2 ? 1 : 0));
      setCombo(c => c + 1);
      window.setTimeout(nextStep, 700);
      setPicked("ok");
    } else {
      registerMistake();
    }
  };

  // ── Stage map ──
  if (stageIdx === null || !stage || !word) {
    if (stages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 text-6xl">🗺️</div>
          <h3 className="mb-2 text-xl font-bold text-foreground">{t("Chưa có từ để chinh phục", "No words to quest yet")}</h3>
          <p className="max-w-md text-muted-foreground">
            {t("Hãy chọn chủ đề hoặc cấp độ ở trên để bắt đầu Word Quest.", "Pick a topic or level above to start Word Quest.")}
          </p>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-emerald-500/10 p-5">
          <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Sparkles className="h-5 w-5 text-primary" /> Word Quest
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "Mỗi chặng 8 từ, mỗi từ đi qua 5 bước vui: gặp từ - nhận nghĩa - nghe - gõ lại - dùng trong câu. Từ nào sai sẽ quay lại cuối chặng.",
              "Each stage has 8 words; every word walks through 5 fun steps: meet, meaning, listen, type, use it in a sentence. Missed words come back at the end."
            )}
          </p>
          {progress.resume && stages[progress.resume.stage] && (
            <Button size="sm" className="mt-3 gap-2" onClick={() => openStage(progress.resume!.stage)}>
              <ChevronRight className="h-4 w-4" />
              {t(`Tiếp tục chặng ${progress.resume.stage + 1}`, `Continue stage ${progress.resume.stage + 1}`)}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {stages.map((s, i) => {
            const done = progress.stages[i] || 0;
            const prevDone = i === 0 || (progress.stages[i - 1] || 0) >= stages[i - 1].length;
            const complete = done >= s.length;
            return (
              <button
                key={i}
                onClick={() => { if (prevDone) openStage(i); }}
                disabled={!prevDone}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  complete
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : prevDone
                      ? "border-border bg-card hover:border-primary/50 hover:shadow-md"
                      : "cursor-not-allowed border-border bg-muted/40 opacity-60"
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-bold text-foreground">{t("Chặng", "Stage")} {i + 1}</span>
                  <span className="flex items-center gap-1">
                    {complete && <span className="text-base">{medalOf(progress.medals?.[i] ?? 0)}</span>}
                    {complete ? <Check className="h-4 w-4 text-emerald-500" /> : !prevDone ? <Lock className="h-4 w-4 text-muted-foreground" /> : null}
                  </span>
                </div>
                <p className="mb-2 truncate text-xs text-muted-foreground">{s.map(w => w.word).slice(0, 3).join(", ")}...</p>
                <div className="flex gap-1">
                  {s.map((_, j) => (
                    <span key={j} className={`h-1.5 flex-1 rounded-full ${j < done ? "bg-emerald-500" : "bg-secondary"}`} />
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {Math.round((done / s.length) * 100)}% {complete ? t("· Ôn lại", "· Replay") : ""}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const emoji = resolveVocabEmoji(word.definition.en, word.category);
  const answer = word.typeAnswer;
  const hint = answer
    .split("")
    .map((c, i) => (i < Math.min(wrongCount, answer.length - 1) ? c : c === " " ? " " : "_"))
    .join("");

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stage header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={() => { stopVoice(); setStageIdx(null); }}>
          ← {t("Bản đồ chặng", "Stage map")}
        </Button>
        <Badge variant="outline">{t("Chặng", "Stage")} {stageIdx + 1} · {wordIdx + 1}/{stage.length}</Badge>
        <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {stars}
        </span>
        {combo >= 2 && <span className="text-sm font-bold text-amber-500">🔥 x{combo}</span>}
      </div>

      {/* Step dots */}
      <div className="mb-4 flex gap-2">
        {[0, 1, 2, 3, 4].map(s => (
          <span key={s} className={`h-2 flex-1 rounded-full ${s < step ? "bg-emerald-500" : s === step ? "bg-primary" : "bg-secondary"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${wordIdx}-${step}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          {/* Step 1: meet the word */}
          {step === 0 && (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-6xl">{emoji}</div>
              <h3 className="text-3xl font-extrabold text-foreground">{word.word}</h3>
              {word.subtitle && word.subtitle !== word.ipa && (
                <p className="text-base font-semibold text-primary">{word.subtitle}</p>
              )}
              <p className="font-mono text-sm text-muted-foreground">{word.ipa}</p>
              {word.partOfSpeech && <Badge variant="secondary">{word.partOfSpeech}</Badge>}
              <p className="text-foreground">{word.definition.vi}</p>
              <p className="text-sm text-muted-foreground">{word.definition.en}</p>
              {word.example && <p className="mt-1 italic text-sm text-muted-foreground">"{word.example}"</p>}
              <div className="mt-2 flex gap-2">
                <Button variant="outline" onClick={() => speak(word.speakText)} className="gap-2">
                  <Volume2 className="h-4 w-4" /> {t("Nghe", "Listen")}
                </Button>
                <Button variant="outline" onClick={() => speak(word.speakText, true)} className="gap-2">
                  <Volume2 className="h-4 w-4" /> {t("Nghe chậm", "Slow")}
                </Button>
                <Button onClick={nextStep} className="gap-2">
                  {t("Tôi nhớ rồi", "Got it")} <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: recognise the meaning */}
          {step === 1 && (
            <div>
              <p className="mb-1 text-center text-sm text-muted-foreground">{t("Từ này nghĩa là gì?", "What does this word mean?")}</p>
              <h3 className="mb-1 text-center text-2xl font-extrabold text-foreground">{word.word}</h3>
              {word.subtitle && <p className="mb-4 text-center text-sm text-primary">{word.subtitle}</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                {meaningOptions.map(o => {
                  const isRight = o.key === word.key;
                  const chosen = picked === o.key;
                  return (
                    <button
                      key={o.key}
                      onClick={() => handlePick(o.key, word.key)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        picked && isRight
                          ? "border-emerald-500 bg-emerald-500/10"
                          : chosen
                            ? "border-red-500 bg-red-500/10"
                            : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <span className="text-2xl">{o.emoji}</span>
                      <span className="text-sm text-foreground">{o.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: listen and choose the spelling */}
          {step === 2 && (
            <div>
              <div className="mb-5 flex flex-col items-center gap-2">
                <button onClick={() => speak(word.speakText)} className="rounded-full bg-primary/10 p-6 transition-colors hover:bg-primary/20">
                  <Volume2 className="h-10 w-10 text-primary" />
                </button>
                <p className="text-sm text-muted-foreground">{t("Nghe rồi chọn từ đúng", "Listen, then pick the right spelling")}</p>
                <button onClick={() => speak(word.speakText, true)} className="text-xs font-semibold text-primary underline-offset-2 hover:underline">
                  {t("Nghe chậm lại", "Play slower")}
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {spellingOptions.map(w => {
                  const isRight = w === word.word;
                  const chosen = picked === w;
                  return (
                    <button
                      key={w}
                      onClick={() => handlePick(w, word.word)}
                      className={`rounded-xl border p-3 text-center font-semibold transition-all ${
                        picked && isRight
                          ? "border-emerald-500 bg-emerald-500/10"
                          : chosen
                            ? "border-red-500 bg-red-500/10"
                            : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: type it back */}
          {step === 3 && (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-5xl">{emoji}</div>
              <p className="text-sm text-muted-foreground">
                {typingLabel ? t(typingLabel.vi, typingLabel.en) : t("Gõ lại từ có nghĩa:", "Type the word that means:")}
              </p>
              <p className="text-lg font-semibold text-foreground">{word.definition.vi}</p>
              <button onClick={() => speak(word.speakText)} className="rounded-full bg-primary/10 p-3 hover:bg-primary/20">
                <Volume2 className="h-5 w-5 text-primary" />
              </button>
              {wrongCount > 0 && <p className="font-mono text-lg tracking-[0.35em] text-primary">{hint}</p>}
              <input
                value={typed}
                onChange={e => setTyped(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") checkTyped(); }}
                placeholder={t("Gõ từ...", "Type the word...")}
                className="w-full max-w-xs rounded-xl border border-border bg-background px-4 py-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="flex gap-2">
                <Button onClick={checkTyped} disabled={!typed.trim()}>{t("Kiểm tra", "Check")}</Button>
                {wrongCount >= 2 && (
                  <Button variant="outline" onClick={() => { setTyped(answer); }} className="gap-2">
                    <RotateCcw className="h-4 w-4" /> {t("Xem đáp án", "Show answer")}
                  </Button>
                )}
              </div>
              {picked === "ok" && <p className="font-semibold text-emerald-500">{t("Tuyệt vời!", "Awesome!")}</p>}
              {wrongCount > 0 && picked !== "ok" && (
                <p className="text-sm text-muted-foreground">{t("Thử lại nhé, bạn làm được mà!", "Try again - you've got this!")}</p>
              )}
            </div>
          )}

          {/* Step 5: use the word in a sentence */}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <p className="text-center text-sm text-muted-foreground">
                {t("Chọn từ đúng để hoàn thành câu:", "Pick the right word to complete the sentence:")}
              </p>
              <p className="rounded-xl bg-secondary/50 p-4 text-center text-lg italic leading-relaxed text-foreground">
                {gapSentence}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {gapOptions.map(o => {
                  const isRight = o === word.word;
                  const chosen = picked === o;
                  return (
                    <button
                      key={o}
                      onClick={() => handlePick(o, word.word)}
                      className={`rounded-xl border p-3 text-center font-semibold transition-all ${
                        picked && isRight
                          ? "border-emerald-500 bg-emerald-500/10"
                          : chosen
                            ? "border-red-500 bg-red-500/10"
                            : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {picked && picked !== word.word && (
                <p className="text-center text-sm text-muted-foreground">
                  {t("Thử lại nhé - hãy nghĩ tới nghĩa:", "Try again - think about the meaning:")} {word.definition.vi}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Stage complete celebration */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur"
            onClick={() => { setCelebrate(false); setStageIdx(null); }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="rounded-3xl border border-primary/30 bg-card p-8 text-center shadow-2xl"
            >
              <div className="mb-3 text-6xl">🎉</div>
              <h3 className="mb-1 text-2xl font-extrabold text-foreground">
                {t("Hoàn thành chặng", "Stage complete")} {stageIdx + 1}!
              </h3>
              <p className="mb-4 text-muted-foreground">
                {t(`Bạn đã chinh phục ${stage.length} từ và nhận ${stars} ⭐`, `You conquered ${stage.length} words and earned ${stars} ⭐`)}
              </p>
              <p className="mb-4 text-3xl">
                {medalOf(stageMistakes)} <span className="align-middle text-sm text-muted-foreground">{t(`${stageMistakes} lỗi`, `${stageMistakes} mistake(s)`)}</span>
              </p>
              <Button onClick={() => { setCelebrate(false); setStageIdx(null); }}>
                {t("Về bản đồ", "Back to map")}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WordQuest;
