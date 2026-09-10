/**
 * @file WordQuest.tsx
 * @description Playful vocabulary learning mode shared by every subject
 * (IELTS/English, Vietnamese, HSK, Japanese, Finnish, Swedish).
 *
 * Structure: words -> stages of 8 -> sets of 10 stages (so long banks stay a
 * short, scannable screen). Inside a stage the learner works in interleaved
 * rounds of 3 words; each word gets a *planned* mix of exercise types instead
 * of always walking the same 5 steps, which removes the old repetitive feel.
 *
 * Exercise types: meet, meaning, listen, type, gap, speak (mic), recall,
 * build (assemble letters/syllables), usage (pick the right sentence),
 * reverse (EN -> VI meaning).
 *
 * No timer, no penalties: a wrong answer just brings the word back later with
 * a *different* exercise type.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, Star, Check, RotateCcw, Sparkles, ChevronRight, Lock, Mic, MicOff, Eye, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { QuestItem } from "@/lib/vocab/vocabAdapter";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { resolveVocabEmoji } from "@/lib/vocabEmojiMap";
import { safeStorage } from "@/lib/safeStorage";
import { maskWord } from "@/lib/vocab/questionQuality";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";

const STAGE_SIZE = 8;
/** How many stages are grouped into one "Set" card on the map. */
const SET_SIZE = 10;
/** How many words are interleaved in one learning round. */
const ROUND_SIZE = 3;
const DEFAULT_PROGRESS_KEY = "ielts_word_quest_v1";

type StepKind =
  | "meet" | "meaning" | "listen" | "type" | "gap"
  | "speak" | "recall" | "build" | "usage" | "reverse";

interface Task { wordIdx: number; kind: StepKind }

interface Progress {
  /** stage index -> number of words fully completed */
  stages: Record<number, number>;
  /** stage index -> mistakes made, used for the bronze/silver/gold medal */
  medals?: Record<number, number>;
  /** Where the learner stopped, so they can jump straight back in. */
  resume?: { stage: number; word: number } | null;
  /** stage index -> the learner already walked through all its word cards. */
  studied?: Record<number, boolean>;
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

const hasExample = (w: QuestItem) => !!w.example && w.example.trim().length > 12;

/** Exercise types this word can actually support with the data we have. */
const kindsFor = (w: QuestItem, canSpeak: boolean): { easy: StepKind[]; hard: StepKind[] } => {
  const easy: StepKind[] = ["meaning", "listen", "reverse", "build"];
  const hard: StepKind[] = ["type", "recall", "build"];
  if (hasExample(w)) { easy.push("gap"); hard.push("gap", "usage"); }
  if (canSpeak) hard.push("speak");
  return { easy, hard };
};

/** Pick n distinct items, preferring ones that differ from `avoid`. */
const pickKinds = (pool: StepKind[], n: number, avoid: StepKind[]): StepKind[] => {
  const fresh = shuffle(pool.filter(k => !avoid.includes(k)));
  const rest = shuffle(pool.filter(k => avoid.includes(k)));
  const out: StepKind[] = [];
  for (const k of [...fresh, ...rest]) {
    if (out.length >= n) break;
    if (!out.includes(k)) out.push(k);
  }
  return out;
};

const labelOfKind = (k: StepKind, t: (vi: string, en: string) => string) => {
  switch (k) {
    case "meet": return t("Gặp từ mới", "Meet the word");
    case "meaning": return t("Chọn nghĩa", "Choose the meaning");
    case "listen": return t("Nghe và chọn", "Listen and choose");
    case "type": return t("Gõ lại", "Type it back");
    case "gap": return t("Điền vào câu", "Fill the sentence");
    case "speak": return t("Nói lại từ", "Say it back");
    case "recall": return t("Nhớ chủ động", "Active recall");
    case "build": return t("Ghép chữ", "Build the word");
    case "usage": return t("Câu dùng đúng", "Correct usage");
    case "reverse": return t("Ôn ngược", "Reverse check");
  }
};

interface Props {
  words: QuestItem[];
  allWords: QuestItem[];
  t: (vi: string, en: string) => string;
  /** Called when a word finishes all its planned exercises. */
  onWordLearned?: (key: string) => void;
  /** Per-subject localStorage key so each language keeps its own stages. */
  storageKey?: string;
  /** Per-subject text-to-speech. Defaults to the English voice. */
  speak?: (text: string, slow?: boolean) => void;
  /** Stop whatever the subject's voice is currently playing. */
  stopSpeak?: () => void;
  /** What the learner types: the word itself, or its romanisation (zh / ja). */
  typingLabel?: { vi: string; en: string };
  /** BCP-47 tag used by the "say it back" step (en-US, vi-VN, zh-CN...). */
  speechLang?: string;
  /** Words the learner already mastered - they skip the gentle intro step. */
  knownKeys?: Set<string>;
}

const WordQuest = ({
  words, allWords, t, onWordLearned,
  storageKey = DEFAULT_PROGRESS_KEY,
  speak: speakProp,
  stopSpeak,
  typingLabel,
  speechLang = "en-US",
  knownKeys,
}: Props) => {
  const speak = speakProp || englishSpeak;
  const stopVoice = stopSpeak || stopEnglishTts;
  const PROGRESS_KEY = storageKey;

  const stages = useMemo(() => {
    const out: QuestItem[][] = [];
    for (let i = 0; i < words.length; i += STAGE_SIZE) out.push(words.slice(i, i + STAGE_SIZE));
    return out;
  }, [words]);

  const setCount = Math.ceil(stages.length / SET_SIZE);

  const [progress, setProgress] = useState<Progress>(
    () => safeStorage.get<Progress>(PROGRESS_KEY, { stages: {} }) || { stages: {} }
  );
  const [setIdx, setSetIdx] = useState<number | null>(null);
  const [stageIdx, setStageIdx] = useState<number | null>(null);
  /** Every stage starts with a study walkthrough of all its words. */
  const [phase, setPhase] = useState<"study" | "drill">("study");
  const [studyIdx, setStudyIdx] = useState(0);
  const [queue, setQueue] = useState<Task[]>([]);
  const [cursor, setCursor] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [doneWords, setDoneWords] = useState<number[]>([]);
  const [stars, setStars] = useState(0);
  const [combo, setCombo] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [wrongPicks, setWrongPicks] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");
  const [built, setBuilt] = useState<number[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [stageMistakes, setStageMistakes] = useState(0);
  const advanceTimer = useRef<number | null>(null);

  const stage = stageIdx === null ? null : stages[stageIdx];
  const task = queue[cursor] || null;
  const word = stage && task ? stage[task.wordIdx] : null;
  const kind = task?.kind ?? "meet";

  const save = useCallback((next: Progress) => {
    setProgress(next);
    safeStorage.set(PROGRESS_KEY, next);
  }, [PROGRESS_KEY]);

  // ── Speech recognition for the "say it back" step ──
  const [spokenScore, setSpokenScore] = useState<number | null>(null);
  const wordRef = useRef<QuestItem | null>(null);
  wordRef.current = word;
  const onFinal = useCallback((transcript: string) => {
    const target = wordRef.current;
    if (!target) return;
    const said = norm(transcript);
    const want = norm(target.speakText || target.word);
    let score = 0;
    if (said.includes(want) || want.includes(said)) score = 100;
    else {
      // Rough character-overlap score so near misses still feel rewarding.
      const chars = [...want];
      const hit = chars.filter(c => said.includes(c)).length;
      score = Math.round((hit / Math.max(1, chars.length)) * 100);
    }
    setSpokenScore(score);
  }, []);
  const recognizer = useSpeechRecognizer({ speechLang, maxSeconds: 12, onFinal });
  const micSupported = recognizer.supported;

  const resetStepState = useCallback(() => {
    setPicked(null);
    setTyped("");
    setBuilt([]);
    setWrongCount(0);
    setWrongPicks([]);
    setRevealed(false);
    setSpokenScore(null);
  }, []);

  /** Build the interleaved task queue for one round of up to 3 words. */
  const buildRound = useCallback((s: QuestItem[], round: number): Task[] => {
    const start = round * ROUND_SIZE;
    const slice = s.slice(start, start + ROUND_SIZE);
    if (slice.length === 0) return [];
    const perWord: Task[][] = slice.map((w, i) => {
      const idx = start + i;
      const known = knownKeys?.has(w.key) ?? false;
      const { easy, hard } = kindsFor(w, micSupported);
      // Every word was already presented in the study phase, so the drill has
      // no "meet" step: three real exercises per word instead.
      const kinds = known
        ? pickKinds([...hard, ...easy], 3, [])
        : pickKinds([...easy, ...hard], 3, []);
      return kinds.map(k => ({ wordIdx: idx, kind: k }));
    });
    // Interleave: all intro steps first, then round-robin the exercises so the
    // same word is never asked twice in a row.
    const intro: Task[] = [];
    const rest: Task[][] = perWord.map(list => {
      const copy = [...list];
      if (copy[0]?.kind === "meet") intro.push(copy.shift()!);
      return copy;
    });
    const out = [...intro];
    let more = true;
    while (more) {
      more = false;
      for (const list of rest) {
        const next = list.shift();
        if (next) { out.push(next); more = true; }
      }
    }
    return out;
  }, [knownKeys, micSupported]);

  // Auto-play the word when a listening-style step opens.
  useEffect(() => {
    if (phase === "drill" && word && (kind === "meet" || kind === "listen")) speak(word.speakText);
    return () => stopVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word?.key, kind, cursor, phase]);

  // Read the word out loud whenever a study card opens.
  const studyWord = stageIdx === null ? null : stages[stageIdx]?.[studyIdx] || null;
  useEffect(() => {
    if (phase === "study" && studyWord) speak(studyWord.speakText);
    return () => stopVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyWord?.key, phase]);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  /**
   * Keep the option pool stable while the learner looks at one word.
   */
  const allWordsRef = useRef(allWords);
  allWordsRef.current = allWords;
  const wordKey = word?.key ?? "";

  const distractors = useMemo(() => {
    if (!word) return [] as QuestItem[];
    const pool = allWordsRef.current.filter(w => w.key !== word.key);
    const sameTopic = pool.filter(w => w.category === word.category);
    return shuffle(sameTopic.length >= 3 ? sameTopic : pool).slice(0, 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordKey, kind]);

  const meaningOptions = useMemo(() => {
    if (!word) return [] as { key: string; label: string; emoji: string }[];
    return shuffle([word, ...distractors]).map(w => ({
      key: w.key,
      label: w.definition.vi,
      emoji: resolveVocabEmoji(w.definition.en, w.category),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordKey, distractors]);

  const reverseOptions = useMemo(() => {
    if (!word) return [] as { key: string; label: string }[];
    return shuffle([word, ...distractors]).map(w => ({ key: w.key, label: w.definition.vi }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordKey, distractors]);

  const spellingOptions = useMemo(() => {
    if (!word) return [] as string[];
    return shuffle([word.word, ...distractors.map(d => d.word)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordKey, distractors]);

  const gapSentence = useMemo(() => {
    if (!word) return "";
    const base = hasExample(word) ? word.example! : `${word.word} - ${word.definition.en}`;
    return maskWord(base, word.word, "______");
  }, [word]);

  const gapOptions = useMemo(() => {
    if (!word) return [] as string[];
    return shuffle([word.word, ...distractors.slice(0, 2).map(d => d.word)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordKey, distractors]);

  /** Usage step: the real example vs other words' sentences with ours forced in. */
  const usageOptions = useMemo(() => {
    if (!word || !hasExample(word)) return [] as { text: string; right: boolean }[];
    const wrong = distractors
      .filter(d => hasExample(d))
      .slice(0, 2)
      .map(d => ({ text: maskWord(d.example!, d.word, word.word), right: false }));
    return shuffle([{ text: word.example!, right: true }, ...wrong]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordKey, distractors]);

  /** Build step: shuffled letters (or syllables when the answer has spaces). */
  const buildTokens = useMemo(() => {
    if (!word) return [] as string[];
    const ans = word.typeAnswer || word.word;
    const parts = ans.includes(" ") ? ans.split(/\s+/) : [...ans];
    return shuffle(parts.map((p, i) => `${p}\u0000${i}`)).map(s => s.split("\u0000")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordKey, kind]);

  // ── Navigation ──
  const openStage = (i: number) => {
    const s = stages[i];
    if (!s) return;
    if (advanceTimer.current) { window.clearTimeout(advanceTimer.current); advanceTimer.current = null; }
    setStageIdx(i);
    setSetIdx(Math.floor(i / SET_SIZE));
    // Words first: only stages already studied jump straight into the drills.
    setPhase(progress.studied?.[i] ? "drill" : "study");
    setStudyIdx(0);
    setRoundIdx(0);
    setQueue(buildRound(s, 0));
    setCursor(0);
    setDoneWords([]);
    setStars(0);
    setCombo(0);
    setStageMistakes(0);
    resetStepState();
  };

  const finishStage = (s: QuestItem[], idx: number, mistakes: number) => {
    save({
      ...progress,
      stages: { ...progress.stages, [idx]: s.length },
      medals: { ...(progress.medals || {}), [idx]: mistakes },
      resume: null,
    });
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 3200);
  };

  /** Move to the next task; roll into the next round or finish the stage. */
  const advance = (extraDone?: number) => {
    if (advanceTimer.current) { window.clearTimeout(advanceTimer.current); advanceTimer.current = null; }
    resetStepState();
    if (!stage || stageIdx === null) return;

    const doneNow = extraDone === undefined ? doneWords : [...new Set([...doneWords, extraDone])];
    if (extraDone !== undefined) setDoneWords(doneNow);

    if (cursor + 1 < queue.length) {
      setCursor(cursor + 1);
      save({
        ...progress,
        stages: { ...progress.stages, [stageIdx]: Math.max(progress.stages[stageIdx] || 0, doneNow.length) },
        resume: { stage: stageIdx, word: queue[cursor + 1].wordIdx },
      });
      return;
    }

    // Round finished - start the next round of 3 words, or clear the stage.
    const nextRound = roundIdx + 1;
    const nextQueue = buildRound(stage, nextRound);
    if (nextQueue.length === 0) {
      finishStage(stage, stageIdx, stageMistakes);
      return;
    }
    setRoundIdx(nextRound);
    setQueue(nextQueue);
    setCursor(0);
    save({
      ...progress,
      stages: { ...progress.stages, [stageIdx]: Math.max(progress.stages[stageIdx] || 0, doneNow.length) },
      resume: { stage: stageIdx, word: nextQueue[0].wordIdx },
    });
  };

  /** Called when a task is answered; marks the word learned once all its tasks are done. */
  const completeTask = () => {
    if (!task || !word) { advance(); return; }
    const remaining = queue.slice(cursor + 1).some(q => q.wordIdx === task.wordIdx);
    if (!remaining) {
      onWordLearned?.(word.key);
      advance(task.wordIdx);
    } else {
      advance();
    }
  };

  const awardStar = () => {
    setStars(s => s + 1 + (combo >= 4 ? 2 : combo >= 2 ? 1 : 0));
    setCombo(c => c + 1);
  };

  /** A miss: the word comes back later in this round with another exercise. */
  const registerMistake = () => {
    setCombo(0);
    setWrongCount(c => c + 1);
    setStageMistakes(m => m + 1);
    if (!task || !word) return;
    const { easy, hard } = kindsFor(word, micSupported);
    const [retryKind] = pickKinds([...easy, ...hard], 1, [task.kind]);
    setQueue(q => {
      // Only ever queue one pending retry per word, however many tries it takes.
      if (q.slice(cursor + 1).some(x => x.wordIdx === task.wordIdx)) return q;
      return [...q, { wordIdx: task.wordIdx, kind: retryKind || task.kind }];
    });
  };

  const handlePick = (key: string, correctKey: string) => {
    if (picked || revealed) return;
    if (key === correctKey) {
      setPicked(key);
      awardStar();
      advanceTimer.current = window.setTimeout(completeTask, 850);
    } else {
      setWrongPicks(prev => (prev.includes(key) ? prev : [...prev, key]));
      registerMistake();
    }
  };

  const checkTyped = () => {
    if (!word) return;
    if (norm(typed) === norm(word.typeAnswer)) {
      awardStar();
      setPicked("ok");
      advanceTimer.current = window.setTimeout(completeTask, 700);
    } else registerMistake();
  };

  const buildAnswer = built.map(i => buildTokens[i]).join(word?.typeAnswer.includes(" ") ? " " : "");
  const checkBuilt = () => {
    if (!word) return;
    if (norm(buildAnswer) === norm(word.typeAnswer)) {
      awardStar();
      setPicked("ok");
      advanceTimer.current = window.setTimeout(completeTask, 700);
    } else { registerMistake(); setBuilt([]); }
  };

  // ── Map: set list / stage list ──
  if (stageIdx === null || !stage || (phase === "drill" && !word)) {
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

    const stageComplete = (i: number) => (progress.stages[i] || 0) >= (stages[i]?.length || 0);
    const stageUnlocked = (i: number) => i === 0 || stageComplete(i - 1);

    const header = (
      <div className="mb-6 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-emerald-500/10 p-5">
        <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Sparkles className="h-5 w-5 text-primary" /> Word Quest
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(
            "Mỗi Set gồm 10 chặng, mỗi chặng 8 từ. Trong chặng, các từ được học xen kẽ với nhiều dạng bài: chọn nghĩa, nghe, gõ, ghép chữ, nói lại, nhớ chủ động, điền câu. Từ nào sai sẽ quay lại với một dạng bài khác.",
            "Each Set holds 10 stages of 8 words. Inside a stage, words are interleaved across many exercise types: meaning, listening, typing, word building, saying it out loud, active recall and sentence gaps. Missed words return with a different exercise."
          )}
        </p>
        {progress.resume && stages[progress.resume.stage] && (
          <Button size="sm" className="mt-3 gap-2" onClick={() => openStage(progress.resume!.stage)}>
            <ChevronRight className="h-4 w-4" />
            {t(`Tiếp tục chặng ${progress.resume.stage + 1}`, `Continue stage ${progress.resume.stage + 1}`)}
          </Button>
        )}
      </div>
    );

    // Set list (default view)
    if (setIdx === null) {
      return (
        <div className="mx-auto max-w-3xl">
          {header}
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: setCount }, (_, si) => {
              const first = si * SET_SIZE;
              const list = stages.slice(first, first + SET_SIZE);
              const totalWords = list.reduce((n, s) => n + s.length, 0);
              const doneWordsCount = list.reduce((n, s, j) => n + Math.min(progress.stages[first + j] || 0, s.length), 0);
              const pct = Math.round((doneWordsCount / Math.max(1, totalWords)) * 100);
              const medals = list.filter((_, j) => stageComplete(first + j)).length;
              const unlocked = si === 0 || stageComplete(first - 1);
              const topics = [...new Set(list.flatMap(s => s.map(w => w.category)))].slice(0, 2).join(", ");
              return (
                <button
                  key={si}
                  onClick={() => { if (unlocked) setSetIdx(si); }}
                  disabled={!unlocked}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    pct === 100
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : unlocked
                        ? "border-border bg-card hover:border-primary/50 hover:shadow-md"
                        : "cursor-not-allowed border-border bg-muted/40 opacity-60"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-foreground">
                      <Layers className="h-4 w-4 text-primary" /> Set {si + 1}
                    </span>
                    {unlocked
                      ? <span className="text-xs text-muted-foreground">{t("Chặng", "Stages")} {first + 1}-{first + list.length}</span>
                      : <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <p className="mb-2 truncate text-xs text-muted-foreground">{topics}</p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {pct}% · {doneWordsCount}/{totalWords} {t("từ", "words")} · 🏅 {medals}/{list.length}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Stages inside one set
    const first = setIdx * SET_SIZE;
    const list = stages.slice(first, first + SET_SIZE);
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setSetIdx(null)}>
            ← {t("Danh sách Set", "All sets")}
          </Button>
          <Badge variant="outline">Set {setIdx + 1} · {t("Chặng", "Stages")} {first + 1}-{first + list.length}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {list.map((s, j) => {
            const i = first + j;
            const done = Math.min(progress.stages[i] || 0, s.length);
            const complete = stageComplete(i);
            const unlocked = stageUnlocked(i);
            return (
              <button
                key={i}
                onClick={() => { if (unlocked) openStage(i); }}
                disabled={!unlocked}
                className={`rounded-2xl border p-3 text-left transition-all ${
                  complete
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : unlocked
                      ? "border-border bg-card hover:border-primary/50 hover:shadow-md"
                      : "cursor-not-allowed border-border bg-muted/40 opacity-60"
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{t("Chặng", "Stage")} {i + 1}</span>
                  <span className="flex items-center gap-1">
                    {complete && <span className="text-base">{medalOf(progress.medals?.[i] ?? 0)}</span>}
                    {complete ? <Check className="h-4 w-4 text-emerald-500" /> : !unlocked ? <Lock className="h-3.5 w-3.5 text-muted-foreground" /> : null}
                  </span>
                </div>
                <p className="mb-2 truncate text-[11px] text-muted-foreground">{s.map(w => w.word).slice(0, 2).join(", ")}...</p>
                <div className="flex gap-1">
                  {s.map((_, k) => (
                    <span key={k} className={`h-1.5 flex-1 rounded-full ${k < done ? "bg-emerald-500" : "bg-secondary"}`} />
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {Math.round((done / s.length) * 100)}%{complete ? t(" · Ôn lại", " · Replay") : ""}
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

  const optionClass = (isRight: boolean, isWrong: boolean) => {
    if (isRight && (picked || revealed)) return "border-emerald-500 bg-emerald-500/10";
    if (isWrong) return "border-red-500 bg-red-500/10 opacity-70";
    return "border-border bg-background hover:border-primary/50";
  };

  const retryFooter = wrongCount > 0 && !picked ? (
    <div className="mt-4 flex flex-col items-center gap-2">
      <p className="text-center text-sm text-muted-foreground">
        {revealed
          ? `${t("Đáp án đúng:", "Correct answer:")} ${word.word} - ${word.definition.vi}`
          : t("Chưa đúng - hãy thử phương án khác nhé!", "Not quite - try another option!")}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {!revealed && (
          <Button variant="outline" size="sm" onClick={() => setRevealed(true)} className="gap-2">
            <RotateCcw className="h-4 w-4" /> {t("Xem đáp án", "Show answer")}
          </Button>
        )}
        <Button size="sm" onClick={() => advance()} className="gap-2">
          {t("Tiếp tục", "Continue")} <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ) : null;

  const totalStageWords = stage.length;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stage header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={() => { stopVoice(); setStageIdx(null); }}>
          ← {t("Bản đồ chặng", "Stage map")}
        </Button>
        <Badge variant="outline">
          {t("Chặng", "Stage")} {stageIdx + 1} · {doneWords.length}/{totalStageWords} {t("từ", "words")}
        </Badge>
        <Badge variant="secondary">{labelOfKind(kind, t)}</Badge>
        <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {stars}
        </span>
        {combo >= 2 && <span className="text-sm font-bold text-amber-500">🔥 x{combo}</span>}
      </div>

      {/* Task progress dots for this round */}
      <div className="mb-4 flex gap-1.5">
        {queue.map((_, i) => (
          <span key={i} className={`h-2 flex-1 rounded-full ${i < cursor ? "bg-emerald-500" : i === cursor ? "bg-primary" : "bg-secondary"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${cursor}-${kind}-${word.key}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          {/* Meet the word */}
          {kind === "meet" && (
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
              {word.example && <p className="mt-1 text-sm italic text-muted-foreground">"{word.example}"</p>}
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={() => speak(word.speakText)} className="gap-2">
                  <Volume2 className="h-4 w-4" /> {t("Nghe", "Listen")}
                </Button>
                <Button variant="outline" onClick={() => speak(word.speakText, true)} className="gap-2">
                  <Volume2 className="h-4 w-4" /> {t("Nghe chậm", "Slow")}
                </Button>
                <Button onClick={completeTask} className="gap-2">
                  {t("Tôi nhớ rồi", "Got it")} <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Choose the meaning */}
          {kind === "meaning" && (
            <div>
              <p className="mb-1 text-center text-sm text-muted-foreground">{t("Từ này nghĩa là gì?", "What does this word mean?")}</p>
              <h3 className="mb-1 text-center text-2xl font-extrabold text-foreground">{word.word}</h3>
              {word.subtitle && <p className="mb-4 text-center text-sm text-primary">{word.subtitle}</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                {meaningOptions.map(o => (
                  <button
                    key={o.key}
                    onClick={() => handlePick(o.key, word.key)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${optionClass(o.key === word.key, wrongPicks.includes(o.key))}`}
                  >
                    <span className="text-2xl">{o.emoji}</span>
                    <span className="text-sm text-foreground">{o.label}</span>
                  </button>
                ))}
              </div>
              {retryFooter}
            </div>
          )}

          {/* Reverse: English definition -> Vietnamese meaning */}
          {kind === "reverse" && (
            <div>
              <p className="mb-2 text-center text-sm text-muted-foreground">
                {t("Đọc định nghĩa tiếng Anh và chọn nghĩa tiếng Việt đúng:", "Read the English definition and pick the matching meaning:")}
              </p>
              <p className="mb-4 rounded-xl bg-secondary/50 p-4 text-center text-base text-foreground">{word.definition.en}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {reverseOptions.map(o => (
                  <button
                    key={o.key}
                    onClick={() => handlePick(o.key, word.key)}
                    className={`rounded-xl border p-3 text-left text-sm transition-all ${optionClass(o.key === word.key, wrongPicks.includes(o.key))}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {retryFooter}
            </div>
          )}

          {/* Listen and choose the spelling */}
          {kind === "listen" && (
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
                {spellingOptions.map(w => (
                  <button
                    key={w}
                    onClick={() => handlePick(w, word.word)}
                    className={`rounded-xl border p-3 text-center font-semibold transition-all ${optionClass(w === word.word, wrongPicks.includes(w))}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
              {retryFooter}
            </div>
          )}

          {/* Type it back */}
          {kind === "type" && (
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
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={checkTyped} disabled={!typed.trim() || picked === "ok"}>{t("Kiểm tra", "Check")}</Button>
                {wrongCount > 0 && picked !== "ok" && (
                  <>
                    <Button variant="outline" onClick={() => { setTyped(answer); setRevealed(true); }} className="gap-2">
                      <RotateCcw className="h-4 w-4" /> {t("Xem đáp án", "Show answer")}
                    </Button>
                    <Button variant="secondary" onClick={() => advance()} className="gap-2">
                      {t("Tiếp tục", "Continue")} <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              {picked === "ok" && <p className="font-semibold text-emerald-500">{t("Tuyệt vời!", "Awesome!")}</p>}
            </div>
          )}

          {/* Build the word from shuffled letters / syllables */}
          {kind === "build" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">
                {t("Ghép các mảnh thành từ có nghĩa:", "Put the pieces together to build the word meaning:")}
              </p>
              <p className="text-lg font-semibold text-foreground">{word.definition.vi}</p>
              <div className="flex min-h-[52px] w-full max-w-md flex-wrap items-center justify-center gap-1.5 rounded-xl border border-dashed border-border bg-secondary/40 p-2">
                {built.length === 0
                  ? <span className="text-xs text-muted-foreground">{t("Bấm các mảnh bên dưới", "Tap the pieces below")}</span>
                  : built.map((ti, pos) => (
                    <button
                      key={`${ti}-${pos}`}
                      onClick={() => setBuilt(b => b.filter((_, i) => i !== pos))}
                      className="rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1 font-semibold text-foreground"
                    >
                      {buildTokens[ti]}
                    </button>
                  ))}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {buildTokens.map((tk, i) => (
                  <button
                    key={`${tk}-${i}`}
                    disabled={built.includes(i) || picked === "ok"}
                    onClick={() => setBuilt(b => [...b, i])}
                    className={`rounded-lg border px-2.5 py-1 font-semibold transition-all ${
                      built.includes(i) ? "border-border bg-muted/50 text-muted-foreground opacity-50" : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    {tk}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={checkBuilt} disabled={built.length === 0 || picked === "ok"}>{t("Kiểm tra", "Check")}</Button>
                <Button variant="outline" onClick={() => setBuilt([])} disabled={picked === "ok"} className="gap-2">
                  <RotateCcw className="h-4 w-4" /> {t("Xoá", "Clear")}
                </Button>
                {wrongCount > 0 && picked !== "ok" && (
                  <Button variant="secondary" onClick={() => advance()} className="gap-2">
                    {t("Tiếp tục", "Continue")} <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {wrongCount > 0 && picked !== "ok" && (
                <p className="text-sm text-muted-foreground">{t("Gần rồi, thử lại nhé!", "Close - try again!")}</p>
              )}
              {picked === "ok" && <p className="font-semibold text-emerald-500">{word.typeAnswer} ✓</p>}
            </div>
          )}

          {/* Say it back (microphone) */}
          {kind === "speak" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">{t("Nghe mẫu rồi đọc to từ này:", "Listen, then say this word out loud:")}</p>
              <h3 className="text-3xl font-extrabold text-foreground">{word.word}</h3>
              {word.subtitle && <p className="text-sm font-semibold text-primary">{word.subtitle}</p>}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => speak(word.speakText)} className="gap-2">
                  <Volume2 className="h-4 w-4" /> {t("Nghe mẫu", "Model")}
                </Button>
                <Button variant="outline" size="sm" onClick={() => speak(word.speakText, true)} className="gap-2">
                  <Volume2 className="h-4 w-4" /> {t("Chậm", "Slow")}
                </Button>
              </div>
              {micSupported ? (
                <>
                  <Button
                    size="lg"
                    variant={recognizer.isRecording ? "destructive" : "default"}
                    onClick={() => (recognizer.isRecording ? recognizer.stop() : (setSpokenScore(null), recognizer.start()))}
                    className="mt-1 gap-2"
                  >
                    {recognizer.isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    {recognizer.isRecording ? t("Dừng ghi", "Stop") : t("Bấm để nói", "Tap to speak")}
                  </Button>
                  {recognizer.transcript && (
                    <p className="text-sm text-muted-foreground">{t("Bạn đã nói:", "You said:")} "{recognizer.transcript}"</p>
                  )}
                  {spokenScore !== null && (
                    <p className={`text-lg font-bold ${spokenScore >= 70 ? "text-emerald-500" : "text-amber-500"}`}>
                      {spokenScore}% {spokenScore >= 70 ? t("· Rất tốt!", "· Great!") : t("· Thử lại nhé", "· Try once more")}
                    </p>
                  )}
                  {recognizer.error && (
                    <p className="text-sm text-red-500">
                      {recognizer.error === "denied"
                        ? t("Hãy cho phép dùng micro trong trình duyệt nhé.", "Please allow microphone access in your browser.")
                        : recognizer.error === "nodevice"
                          ? t("Không tìm thấy micro trên thiết bị.", "No microphone found on this device.")
                          : t("Chưa nghe được - hãy thử lại.", "Could not hear you - please try again.")}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t("Thiết bị chưa hỗ trợ micro - hãy nghe mẫu và nhắc lại to rõ 3 lần.", "Your device has no microphone support - listen and repeat the word aloud three times.")}
                </p>
              )}
              <Button
                variant={spokenScore !== null && spokenScore >= 70 ? "default" : "secondary"}
                onClick={() => { if (spokenScore !== null && spokenScore >= 70) awardStar(); completeTask(); }}
                className="mt-1 gap-2"
              >
                {t("Xong, tiếp tục", "Done, continue")} <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Active recall */}
          {kind === "recall" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-5xl">{emoji}</div>
              <p className="text-sm text-muted-foreground">{t("Bạn còn nhớ từ nào mang nghĩa này?", "Which word carries this meaning?")}</p>
              <p className="text-lg font-semibold text-foreground">{word.definition.vi}</p>
              <p className="text-sm text-muted-foreground">{word.definition.en}</p>
              {!revealed ? (
                <Button onClick={() => setRevealed(true)} className="mt-1 gap-2">
                  <Eye className="h-4 w-4" /> {t("Hiện từ", "Show the word")}
                </Button>
              ) : (
                <>
                  <h3 className="text-3xl font-extrabold text-primary">{word.word}</h3>
                  {word.subtitle && <p className="text-sm text-primary">{word.subtitle}</p>}
                  <button onClick={() => speak(word.speakText)} className="rounded-full bg-primary/10 p-3 hover:bg-primary/20">
                    <Volume2 className="h-5 w-5 text-primary" />
                  </button>
                  <p className="mt-1 text-sm text-muted-foreground">{t("Bạn nhớ tới mức nào?", "How well did you recall it?")}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button variant="outline" onClick={() => { registerMistake(); advance(); }}>{t("Quên", "Forgot")}</Button>
                    <Button variant="secondary" onClick={() => { awardStar(); completeTask(); }}>{t("Khó", "Hard")}</Button>
                    <Button onClick={() => { awardStar(); completeTask(); }}>{t("Dễ", "Easy")}</Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Fill the sentence gap */}
          {kind === "gap" && (
            <div className="flex flex-col gap-4">
              <p className="text-center text-sm text-muted-foreground">
                {t("Chọn từ đúng để hoàn thành câu:", "Pick the right word to complete the sentence:")}
              </p>
              <p className="rounded-xl bg-secondary/50 p-4 text-center text-lg italic leading-relaxed text-foreground">{gapSentence}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {gapOptions.map(o => (
                  <button
                    key={o}
                    onClick={() => handlePick(o, word.word)}
                    className={`rounded-xl border p-3 text-center font-semibold transition-all ${optionClass(o === word.word, wrongPicks.includes(o))}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
              {retryFooter}
            </div>
          )}

          {/* Pick the sentence that uses the word correctly */}
          {kind === "usage" && (
            <div className="flex flex-col gap-3">
              <p className="text-center text-sm text-muted-foreground">
                {t(`Câu nào dùng từ "${word.word}" đúng ngữ cảnh?`, `Which sentence uses "${word.word}" correctly?`)}
              </p>
              {usageOptions.map(o => (
                <button
                  key={o.text}
                  onClick={() => handlePick(o.text, usageOptions.find(x => x.right)!.text)}
                  className={`rounded-xl border p-3 text-left text-sm leading-relaxed transition-all ${optionClass(o.right, wrongPicks.includes(o.text))}`}
                >
                  {o.text}
                </button>
              ))}
              {retryFooter}
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
