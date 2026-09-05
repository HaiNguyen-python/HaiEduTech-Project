/**
 * @file StructureVocabPractice.tsx
 * @description "Structure & Vocabulary Practice" mode for IELTS Speaking.
 * Turns the topic vocabulary bank and model structure bank into interactive
 * drills (meaning match, gap fill, listening, word order, speaking, frame
 * completion, function match, rebuild, apply) with local progress tracking.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2, Turtle, Check, X, ArrowRight, RotateCcw, Mic, Square,
  BookOpen, LayoutTemplate, Trophy, Flame, Sparkles, Eye, GraduationCap, PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { safeStorage } from "@/lib/safeStorage";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { compareSentence, micErrorMessage } from "@/lib/speakingModeShared";
import { getTopicsByPart, getQuestionsByPartAndTopic } from "@/data/speakingPracticeData";
import { getMergedVocabulary } from "@/data/speakingVocabularyBank";
import { getMergedStructures } from "@/data/speakingStructuresIdeas";
import { getSupplementVocabulary, getSupplementStructures } from "@/data/speakingDrillsSupplement";
import {
  buildSentenceCorpus, buildStructureRound, buildVocabRound, usedStructure,
  STRUCTURE_FN_LABEL, classifyStructure, type StructureDrill, type StructureFn, type VocabDrill,
} from "@/lib/speaking/structureVocabDrills";


const STORAGE_KEY = "ielts-speaking-drills:progress";
const ROUND_SIZE = 10;

interface ProgressStore {
  /** `${part}|${topic}` -> mastered phrases / structures */
  mastered: Record<string, string[]>;
  rounds: Record<string, number>;
  bestScore: Record<string, number>;
}

const loadProgress = (): ProgressStore =>
  safeStorage.get<ProgressStore>(STORAGE_KEY, null) || { mastered: {}, rounds: {}, bestScore: {} };

const normalise = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9' ]/g, " ").replace(/\s+/g, " ").trim();

type Track = "vocab" | "structure";

const StructureVocabPractice = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [part, setPart] = useState<1 | 2 | 3>(1);
  const [track, setTrack] = useState<Track>("vocab");
  const [topic, setTopic] = useState<string | null>(null);
  const [roundSeed, setRoundSeed] = useState(1);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [orderPick, setOrderPick] = useState<string[]>([]);
  const [spokenAccuracy, setSpokenAccuracy] = useState<number | null>(null);
  const [retryQueue, setRetryQueue] = useState<string[]>([]);
  const [progress, setProgress] = useState<ProgressStore>(loadProgress);
  const [finished, setFinished] = useState(false);
  /** Learners study the words / structures first, then take the quiz. */
  const [phase, setPhase] = useState<"study" | "quiz">("study");

  const topRef = useRef<HTMLDivElement>(null);

  const topics = useMemo(() => getTopicsByPart(part), [part]);
  const activeTopic = topic && topics.includes(topic) ? topic : topics[0];
  const storeKey = `${part}|${track}|${activeTopic}`;
  const mastered = progress.mastered[storeKey] || [];

  /* ---------------- source data ---------------- */
  const questions = useMemo(
    () => getQuestionsByPartAndTopic(part, activeTopic),
    [part, activeTopic],
  );

  const vocabItems = useMemo(() => {
    const seen = new Set<string>();
    const out: { phrase: string; vietnamese: string }[] = [];
    for (const q of questions) {
      for (const v of getMergedVocabulary(part, q.topic, q.useful_language.vocabulary_bank || [])) {
        const key = v.phrase.toLowerCase();
        if (!seen.has(key) && v.vietnamese) { seen.add(key); out.push(v); }
      }
    }
    for (const v of getSupplementVocabulary(part)) {
      const key = v.phrase.toLowerCase();
      if (!seen.has(key)) { seen.add(key); out.push(v); }
    }
    return out;
  }, [questions, part]);

  const structures = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const q of questions) {
      for (const s of getMergedStructures(part, q.topic, q.useful_language.model_structures || [])) {
        const key = s.toLowerCase();
        if (!seen.has(key)) { seen.add(key); out.push(s); }
      }
    }
    for (const s of getSupplementStructures(part)) {
      const key = s.toLowerCase();
      if (!seen.has(key)) { seen.add(key); out.push(s); }
    }
    return out;
  }, [questions, part]);


  const corpus = useMemo(
    () => buildSentenceCorpus(questions.map((q) => q.model_answer)),
    [questions],
  );

  const vocabRound = useMemo(
    () => buildVocabRound({ part, topic: activeTopic, items: vocabItems, corpus, size: ROUND_SIZE, seed: roundSeed, mastered }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [part, activeTopic, vocabItems, corpus, roundSeed],
  );

  const structureRound = useMemo(
    () => buildStructureRound({ part, topic: activeTopic, structures, size: 8, seed: roundSeed }),
    [part, activeTopic, structures, roundSeed],
  );

  const items: Array<VocabDrill | StructureDrill> = track === "vocab" ? vocabRound : structureRound;
  const current = items[idx];

  /* ---------------- audio ---------------- */
  const speak = useCallback((text: string, slow = false) => {
    stopEnglishTts();
    void playEnglishTts(text, { playbackRate: slow ? 0.72 : 0.98, speechRate: slow ? 0.65 : 0.85 });
  }, []);

  useEffect(() => () => stopEnglishTts(), []);

  /* ---------------- speaking check ---------------- */
  const recognizer = useSpeechRecognizer({
    speechLang: "en-US",
    maxSeconds: 30,
    onFinal: (heard) => {
      if (!current) return;
      if (track === "vocab") {
        const { accuracy } = compareSentence(current.answer, heard, "english");
        setSpokenAccuracy(accuracy);
        setRevealed(true);
        registerResult(accuracy >= 70);
      } else {
        const drill = current as StructureDrill;
        const ok = usedStructure(heard, drill.requiredWords || []);
        setSpokenAccuracy(ok ? 100 : 40);
        setRevealed(true);
        registerResult(ok);
      }
    },
  });
  const micError = micErrorMessage(recognizer.error, t);

  /* ---------------- scoring ---------------- */
  const saveProgress = useCallback((next: ProgressStore) => {
    setProgress(next);
    safeStorage.set(STORAGE_KEY, next);
  }, []);

  const registerResult = useCallback((ok: boolean) => {
    if (!current) return;
    const key = track === "vocab" ? (current as VocabDrill).phrase : (current as StructureDrill).structure;
    if (ok) {
      setCorrectCount((c) => c + 1);
      setCombo((c) => {
        const next = c + 1;
        if (next > 0 && next % 5 === 0) {
          toast({ title: `${next} ${t("câu đúng liên tiếp!", "in a row!")}`, description: t("Giữ phong độ nhé.", "Keep the streak going.") });
        }
        return next;
      });
      const list = progress.mastered[storeKey] || [];
      if (!list.includes(key)) {
        saveProgress({ ...progress, mastered: { ...progress.mastered, [storeKey]: [...list, key] } });
      }
    } else {
      setCombo(0);
      setRetryQueue((q) => (q.includes(key) ? q : [...q, key]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, track, progress, storeKey, saveProgress, toast, t]);

  const resetItemState = () => {
    setSelected(null);
    setRevealed(false);
    setOrderPick([]);
    setSpokenAccuracy(null);
    recognizer.reset();
    stopEnglishTts();
  };

  const restart = (seedBump = true) => {
    if (seedBump) setRoundSeed((s) => s + 1);
    setIdx(0);
    setCorrectCount(0);
    setCombo(0);
    setRetryQueue([]);
    setFinished(false);
    resetItemState();
  };

  useEffect(() => {
    restart(false);
    setPhase("study");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [part, track, activeTopic]);


  const next = () => {
    if (idx + 1 >= items.length) {
      const score = Math.round((correctCount / Math.max(1, items.length)) * 100);
      const best = progress.bestScore[storeKey] || 0;
      saveProgress({
        ...progress,
        rounds: { ...progress.rounds, [storeKey]: (progress.rounds[storeKey] || 0) + 1 },
        bestScore: { ...progress.bestScore, [storeKey]: Math.max(best, score) },
      });
      setFinished(true);
      stopEnglishTts();
      return;
    }
    setIdx((i) => i + 1);
    resetItemState();
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const choose = (option: string) => {
    if (revealed || !current) return;
    setSelected(option);
    setRevealed(true);
    registerResult(normalise(option) === normalise(current.answer));
  };

  const submitOrder = () => {
    if (!current || revealed) return;
    const joined = track === "vocab" ? orderPick.join(" ") : orderPick.join(" | ");
    setRevealed(true);
    registerResult(normalise(joined) === normalise(current.answer));
  };

  /* ---------------- labels ---------------- */
  const kindLabel = (item: VocabDrill | StructureDrill): string => {
    switch (item.kind) {
      case "meaningEn2Vi": return t("Chọn nghĩa tiếng Việt", "Choose the Vietnamese meaning");
      case "meaningVi2En": return t("Chọn cụm từ tiếng Anh", "Choose the English phrase");
      case "gapFill": return t("Điền cụm từ vào câu", "Complete the sentence");
      case "listenChoose": return t("Nghe và chọn cụm từ", "Listen and choose the phrase");
      case "orderWords": return t("Sắp xếp thành cụm từ đúng", "Put the words in order");
      case "sayIt": return t("Nói to cụm từ này", "Say the phrase out loud");
      case "functionMatch": return t("Cấu trúc này dùng để làm gì?", "What is this structure used for?");
      case "completeFrame": return t("Hoàn thành mẫu câu", "Complete the frame");
      case "rebuild": return t("Sắp xếp lại mẫu câu", "Rebuild the structure");
      case "applyIt": return t("Dùng mẫu câu này để nói 1 câu về chủ đề", "Use this structure in a sentence about the topic");
      default: return "";
    }
  };

  const optionText = (item: VocabDrill | StructureDrill, option: string) =>
    item.kind === "functionMatch"
      ? t(STRUCTURE_FN_LABEL[option as StructureFn].vi, STRUCTURE_FN_LABEL[option as StructureFn].en)
      : option;

  const isSpeaking = current?.kind === "sayIt" || current?.kind === "applyIt";
  const isOrdering = current?.kind === "orderWords" || current?.kind === "rebuild";
  const total = track === "vocab" ? vocabItems.length : structures.length;

  /* ---------------- render ---------------- */
  return (
    <div className="space-y-5" ref={topRef}>
      <Card className="border-primary/25 bg-gradient-to-br from-primary/5 to-emerald-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {t("Luyện Cấu trúc & Từ vựng", "Structure & Vocabulary Practice")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t(
              "Luyện chuyên sâu từ vựng và mẫu câu theo từng chủ đề trước khi vào phần trả lời đầy đủ.",
              "Drill the topic vocabulary and model structures in depth before you answer full questions.",
            )}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            {([1, 2, 3] as const).map((p) => (
              <Button key={p} size="sm" variant={part === p ? "default" : "secondary"} onClick={() => { setPart(p); setTopic(null); }}>
                Part {p}
              </Button>
            ))}
            <Tabs value={track} onValueChange={(v) => setTrack(v as Track)} className="ml-auto">
              <TabsList>
                <TabsTrigger value="vocab" className="text-xs gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> {t("Từ vựng", "Vocabulary")}
                </TabsTrigger>
                <TabsTrigger value="structure" className="text-xs gap-1.5">
                  <LayoutTemplate className="w-3.5 h-3.5" /> {t("Cấu trúc", "Structures")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {topics.map((tp) => (
              <Badge
                key={tp}
                variant={activeTopic === tp ? "default" : "secondary"}
                className="cursor-pointer px-2.5 py-1 text-xs"
                onClick={() => setTopic(tp)}
              >
                {tp}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-xl border bg-card/70 p-3">
              <p className="text-xs text-muted-foreground">{t("Đã thuộc", "Mastered")}</p>
              <p className="text-lg font-bold text-primary">{mastered.length}/{total}</p>
            </div>
            <div className="rounded-xl border bg-card/70 p-3">
              <p className="text-xs text-muted-foreground">{t("Điểm cao nhất", "Best score")}</p>
              <p className="text-lg font-bold">{progress.bestScore[storeKey] || 0}%</p>
            </div>
            <div className="rounded-xl border bg-card/70 p-3">
              <p className="text-xs text-muted-foreground">{t("Số vòng", "Rounds")}</p>
              <p className="text-lg font-bold">{progress.rounds[storeKey] || 0}</p>
            </div>
            <div className="rounded-xl border bg-card/70 p-3">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Flame className="w-3 h-3" /> {t("Chuỗi đúng", "Streak")}</p>
              <p className="text-lg font-bold text-amber-500">{combo}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {phase === "study" ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {track === "vocab"
                ? t("Học từ vựng trước", "Study the vocabulary first")
                : t("Học cấu trúc trước", "Study the structures first")}
              <Badge variant="secondary" className="ml-1">{total}</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t(
                "Đọc và nghe kỹ danh sách dưới đây, sau đó bấm Bắt đầu quiz để kiểm tra.",
                "Read and listen to the list below, then start the quiz to check yourself.",
              )}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button size="lg" onClick={() => { stopEnglishTts(); restart(false); setPhase("quiz"); }} className="w-full sm:w-auto">
              <PlayCircle className="w-4 h-4 mr-2" /> {t("Bắt đầu quiz", "Start the quiz")}
            </Button>
            <div className="grid gap-2 md:grid-cols-2">
              {(track === "vocab" ? vocabItems : structures).map((entry, i) => {
                const text = typeof entry === "string" ? entry : entry.phrase;
                const fn = typeof entry === "string" ? classifyStructure(entry) : null;
                return (
                  <div key={`${text}-${i}`} className="rounded-xl border bg-card/70 p-3 flex items-start gap-2">
                    <span className="text-xs font-semibold text-muted-foreground mt-1 w-6 shrink-0">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium leading-relaxed">{text}</p>
                      {typeof entry !== "string" && (
                        <p className="text-sm text-muted-foreground">{entry.vietnamese}</p>
                      )}
                      {fn && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {t(STRUCTURE_FN_LABEL[fn].vi, STRUCTURE_FN_LABEL[fn].en)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => speak(text)} aria-label={t("Nghe", "Listen")}>
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => speak(text, true)} aria-label={t("Nghe chậm", "Listen slowly")}>
                        <Turtle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
      <>
      {/* Sticky control bar so learners never scroll up and down */}

      <div className="sticky top-16 z-20 rounded-xl border bg-background/95 backdrop-blur px-3 py-2 flex items-center gap-3">
        <span className="text-sm font-semibold whitespace-nowrap">
          {Math.min(idx + 1, items.length)}/{items.length}
        </span>
        <Progress value={items.length ? ((idx + (revealed ? 1 : 0)) / items.length) * 100 : 0} className="h-2 flex-1" />
        <span className="text-sm text-muted-foreground whitespace-nowrap">{correctCount} ✓</span>
        <Button size="sm" variant="ghost" onClick={() => { stopEnglishTts(); setPhase("study"); }}>
          <GraduationCap className="w-4 h-4 sm:mr-1" />
          <span className="hidden sm:inline">{t("Xem lại bài", "Study list")}</span>
        </Button>

        <Button size="sm" onClick={next} disabled={!revealed && !finished}>
          {idx + 1 >= items.length ? t("Kết thúc", "Finish") : t("Tiếp", "Next")}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {finished ? (
        <Card>
          <CardContent className="py-10 text-center space-y-4">
            <Trophy className="w-12 h-12 mx-auto text-amber-500" />
            <h3 className="text-2xl font-bold">
              {correctCount}/{items.length} ({Math.round((correctCount / Math.max(1, items.length)) * 100)}%)
            </h3>
            {retryQueue.length > 0 && (
              <div className="max-w-xl mx-auto text-left rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
                <p className="text-sm font-semibold mb-2">{t("Cần ôn lại", "Worth reviewing")}</p>
                <ul className="space-y-1 text-sm">
                  {retryQueue.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => speak(r)}>
                        <Volume2 className="w-3.5 h-3.5" />
                      </Button>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button onClick={() => restart(true)} size="lg">
              <RotateCcw className="w-4 h-4 mr-2" /> {t("Vòng mới", "New round")}
            </Button>
          </CardContent>
        </Card>
      ) : !current ? (
        <Card><CardContent className="py-10 text-center text-muted-foreground">
          {t("Chưa có dữ liệu cho chủ đề này.", "No drill data for this topic yet.")}
        </CardContent></Card>
      ) : (
        <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">{activeTopic}</Badge>
                <Badge variant="outline" className="text-xs">{kindLabel(current)}</Badge>
                {track === "structure" && (
                  <Badge variant="outline" className="text-xs">
                    {t(STRUCTURE_FN_LABEL[(current as StructureDrill).fn].vi, STRUCTURE_FN_LABEL[(current as StructureDrill).fn].en)}
                  </Badge>
                )}
              </div>

              {/* Prompt */}
              {current.kind === "listenChoose" ? (
                <div className="flex items-center gap-2">
                  <Button onClick={() => speak(current.audioText)} size="lg">
                    <Volume2 className="w-4 h-4 mr-2" /> {t("Nghe", "Listen")}
                  </Button>
                  <Button onClick={() => speak(current.audioText, true)} variant="outline" size="lg">
                    <Turtle className="w-4 h-4 mr-2" /> {t("Chậm", "Slow")}
                  </Button>
                </div>
              ) : current.kind === "gapFill" ? (
                <div className="space-y-2">
                  <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">{(current as VocabDrill).sentence}</p>
                  <p className="text-sm text-muted-foreground">{t("Gợi ý nghĩa", "Meaning hint")}: {current.prompt}</p>
                </div>
              ) : current.kind === "completeFrame" ? (
                <p className="text-lg md:text-xl font-medium leading-relaxed">
                  {(current as StructureDrill).head} <span className="text-primary">______</span>
                </p>
              ) : (
                <div className="flex items-start gap-2">
                  <p className="text-lg md:text-xl font-medium leading-relaxed flex-1 whitespace-pre-wrap">{current.prompt}</p>
                  <div className="flex gap-0.5 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => speak(current.audioText)} aria-label={t("Nghe", "Listen")}>
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => speak(current.audioText, true)} aria-label={t("Nghe chậm", "Listen slowly")}>
                      <Turtle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Options */}
              {current.options && (
                <div className="grid gap-2.5">
                  {current.options.map((option, oi) => {
                    const isAnswer = normalise(option) === normalise(current.answer);
                    const picked = selected === option;
                    const state = !revealed
                      ? "border-border hover:border-primary/60 hover:bg-primary/5"
                      : isAnswer
                        ? "border-emerald-500 bg-emerald-500/10"
                        : picked ? "border-destructive bg-destructive/10" : "border-border opacity-60";
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => choose(option)}
                        disabled={revealed}
                        className={`text-left rounded-xl border-2 px-4 py-3 transition-all text-base ${state}`}
                      >
                        <span className="flex items-start gap-2">
                          <span className={`shrink-0 font-bold w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm ${
                            revealed && isAnswer
                              ? "border-emerald-500 text-emerald-600"
                              : revealed && picked ? "border-destructive text-destructive" : "border-primary/40 text-primary"
                          }`}>
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span className="flex-1">{optionText(current, option)}</span>
                          {revealed && isAnswer && <Check className="w-4 h-4 text-emerald-500 mt-1.5 shrink-0" />}
                          {revealed && picked && !isAnswer && <X className="w-4 h-4 text-destructive mt-1.5 shrink-0" />}
                        </span>
                      </button>
                    );
                  })}

                </div>
              )}

              {/* Ordering */}
              {isOrdering && current.tokens && (
                <div className="space-y-3">
                  <div className="min-h-12 rounded-xl border-2 border-dashed p-3 flex flex-wrap gap-2">
                    {orderPick.length === 0 && (
                      <span className="text-sm text-muted-foreground">{t("Bấm các mảnh bên dưới theo thứ tự", "Tap the chunks below in order")}</span>
                    )}
                    {orderPick.map((tk, i) => (
                      <Button key={`${tk}-${i}`} size="sm" variant="secondary" disabled={revealed} onClick={() => setOrderPick((p) => p.filter((_, j) => j !== i))}>
                        {tk}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {current.tokens.map((tk, i) => {
                      const used = orderPick.filter((p) => p === tk).length >= current.tokens!.filter((x) => x === tk).length;
                      return (
                        <Button key={`${tk}-src-${i}`} size="sm" variant="outline" disabled={revealed || used} onClick={() => setOrderPick((p) => [...p, tk])}>
                          {tk}
                        </Button>
                      );
                    })}
                  </div>
                  {!revealed && (
                    <Button onClick={submitOrder} disabled={orderPick.length === 0}>
                      <Check className="w-4 h-4 mr-2" /> {t("Kiểm tra", "Check")}
                    </Button>
                  )}
                </div>
              )}

              {/* Speaking */}
              {isSpeaking && (
                <div className="space-y-3">
                  {current.kind === "applyIt" && (
                    <p className="text-sm text-muted-foreground">
                      {t("Nói 1 câu hoàn chỉnh về chủ đề", "Say one full sentence about")} <strong>{activeTopic}</strong> {t("dùng mẫu câu trên.", "using the frame above.")}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {!recognizer.isRecording ? (
                      <Button onClick={() => void recognizer.start()} disabled={revealed}>
                        <Mic className="w-4 h-4 mr-2" /> {t("Ghi âm", "Record")}
                      </Button>
                    ) : (
                      <Button onClick={recognizer.stop} variant="destructive">
                        <Square className="w-4 h-4 mr-2" /> {t("Dừng", "Stop")} ({recognizer.seconds}s)
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => speak(current.audioText)}>
                      <Volume2 className="w-4 h-4 mr-2" /> {t("Nghe mẫu", "Hear model")}
                    </Button>
                    {!revealed && (
                      <Button variant="ghost" onClick={() => { setRevealed(true); registerResult(false); }}>
                        <Eye className="w-4 h-4 mr-2" /> {t("Bỏ qua", "Skip")}
                      </Button>
                    )}
                  </div>
                  {recognizer.transcript && (
                    <p className="text-sm rounded-lg border bg-muted/40 p-3 whitespace-pre-wrap">{recognizer.transcript}</p>
                  )}
                  {micError && <p className="text-sm text-destructive">{micError}</p>}
                  {spokenAccuracy !== null && (
                    <p className="text-sm font-semibold">
                      {t("Độ khớp", "Match")}: <span className={spokenAccuracy >= 70 ? "text-emerald-500" : "text-amber-500"}>{spokenAccuracy}%</span>
                    </p>
                  )}
                </div>
              )}

              {/* Explanation */}
              {revealed && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                  <p className="text-sm font-semibold text-primary">{t("Giải thích", "Explanation")}</p>
                  {current.options && (
                    <p className="text-sm font-semibold">
                      {t("Đáp án đúng", "Correct answer")}:{" "}
                      <span className="text-emerald-600">
                        {String.fromCharCode(65 + current.options.findIndex((o) => normalise(o) === normalise(current.answer)))}
                        . {optionText(current, current.options.find((o) => normalise(o) === normalise(current.answer)) || current.answer)}
                      </span>
                    </p>
                  )}
                  <p className="text-base leading-relaxed whitespace-pre-wrap">{current.explanation}</p>

                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => speak(current.audioText)}>
                      <Volume2 className="w-3.5 h-3.5 mr-1" /> {t("Nghe", "Listen")}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => speak(current.audioText, true)}>
                      <Turtle className="w-3.5 h-3.5 mr-1" /> {t("Chậm", "Slow")}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
      </>
      )}
    </div>

  );
};

export default StructureVocabPractice;
