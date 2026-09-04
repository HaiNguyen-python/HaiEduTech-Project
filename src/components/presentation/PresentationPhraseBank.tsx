/**
 * @file PresentationPhraseBank.tsx
 * @description "Useful phrases & sentence patterns" panel for the Presentation
 *   & Public Speaking Studio. Phrases are grouped by presentation stage with
 *   bilingual meanings, examples, normal/slow audio, a one-click insert into the
 *   learner's own script, and a reveal-style recall drill.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenCheck, ChevronDown, Search, Plus, Check, Sparkles, RotateCcw, Mic, Square, Repeat2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { safeStorage } from "@/lib/safeStorage";
import {
  PRESENTATION_PHRASES,
  PRESENTATION_STAGES,
  phraseCore,
  type PresentationPhrase,
  type PresentationStageId,
} from "@/data/presentationPhrases";
import {
  useUsefulLanguageAudio,
  PhraseAudio,
  PlayAllBar,
} from "@/components/speaking/UsefulLanguageAudio";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";

const DRILL_KEY = "presentation-phrase-drill";
const STAGE_KEY = "presentation-phrase-stage";
const SAY_KEY = "presentation-phrase-say-scores";

const STOP_SLOT = /\.\.\./g;

const words = (text: string): string[] =>
  text.toLowerCase().replace(STOP_SLOT, " ").replace(/[^a-z0-9'\s]/g, " ").split(/\s+/).filter(Boolean);

export interface SayItResult {
  accuracy: number;
  missing: string[];
  heard: string;
}

/** Compare what the learner said with the target pattern, word by word. */
export const scoreSpokenPhrase = (target: string, heard: string): SayItResult => {
  const want = words(target);
  const got = words(heard);
  const pool = [...got];
  const missing: string[] = [];
  for (const w of want) {
    const i = pool.indexOf(w);
    if (i >= 0) pool.splice(i, 1);
    else missing.push(w);
  }
  const accuracy = want.length === 0 ? 0 : Math.round(((want.length - missing.length) / want.length) * 100);
  return { accuracy, missing, heard: heard.trim() };
};

interface DrillState {
  score: number;
  attempts: number;
  streak: number;
  best: number;
}

const loadDrill = (): DrillState => {
  const saved = safeStorage.get<Partial<DrillState> | null>(DRILL_KEY, null);
  return { score: 0, attempts: 0, streak: 0, best: 0, ...(saved ?? {}) };
};

interface Props {
  /** Phrase ids the learner already said during a recorded session. */
  usedIds?: string[];
  /** Append a phrase to the learner's own script box. */
  onInsert?: (text: string) => void;
}

const PresentationPhraseBank = ({ usedIds = [], onInsert }: Props) => {
  const { t } = useLanguage();
  const audio = useUsefulLanguageAudio();

  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState<PresentationStageId>(
    () => safeStorage.get<PresentationStageId>(STAGE_KEY, "opening"),
  );
  const [query, setQuery] = useState("");

  const [drillOn, setDrillOn] = useState(false);
  const [drill, setDrill] = useState<DrillState>(loadDrill);
  const [drillIndex, setDrillIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const used = useMemo(() => new Set(usedIds), [usedIds]);

  // ---- "Say it again" speaking practice ----
  const [sayId, setSayId] = useState<string | null>(null);
  const [sayResult, setSayResult] = useState<SayItResult | null>(null);
  const [sayScores, setSayScores] = useState<Record<string, number>>(
    () => safeStorage.get<Record<string, number>>(SAY_KEY, {}) ?? {},
  );
  const sayTargetRef = useRef("");

  const handleSaid = useCallback((heard: string) => {
    const result = scoreSpokenPhrase(sayTargetRef.current, heard);
    setSayResult(result);
    setSayScores((prev) => {
      const id = sayId;
      if (!id) return prev;
      const next = { ...prev, [id]: Math.max(prev[id] ?? 0, result.accuracy) };
      safeStorage.set(SAY_KEY, next);
      return next;
    });
  }, [sayId]);

  const recognizer = useSpeechRecognizer({ speechLang: "en-US", maxSeconds: 25, onFinal: handleSaid });

  const startSayIt = async (phrase: PresentationPhrase) => {
    audio.stop();
    setSayResult(null);
    setSayId(phrase.id);
    sayTargetRef.current = phraseCore(phrase.en);
    await recognizer.start();
  };

  const closeSayIt = () => {
    recognizer.reset();
    setSayId(null);
    setSayResult(null);
  };

  const sayErrorText = (code: string | null) => {
    switch (code) {
      case "unsupported": return t("Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Hãy dùng Chrome trên máy tính.", "This browser does not support speech recognition. Please use Chrome on a computer.");
      case "denied": return t("Bạn cần cho phép dùng micro để luyện nói.", "Please allow microphone access to practise speaking.");
      case "nodevice": return t("Không tìm thấy micro nào.", "No microphone was found.");
      case "insecure": return t("Cần kết nối an toàn (https) để dùng micro.", "A secure (https) connection is needed for the microphone.");
      default: return code ? t("Không nhận được giọng nói, hãy thử lại.", "Speech was not captured, please try again.") : null;
    }
  };

  const pickStage = (id: PresentationStageId) => {
    setStage(id);
    safeStorage.set(STAGE_KEY, id);
    setDrillIndex(0);
    setRevealed(false);
  };

  const searching = query.trim().length > 1;
  const list: PresentationPhrase[] = useMemo(() => {
    if (searching) {
      const q = query.trim().toLowerCase();
      return PRESENTATION_PHRASES.filter(
        (p) => p.en.toLowerCase().includes(q) || p.vi.toLowerCase().includes(q) || p.example.toLowerCase().includes(q),
      ).slice(0, 40);
    }
    return PRESENTATION_PHRASES.filter((p) => p.stage === stage);
  }, [searching, query, stage]);

  const playAllItems = useMemo(
    () => list.map((p) => ({ key: p.id, text: phraseCore(p.en) })),
    [list],
  );

  const drillPool = useMemo(() => PRESENTATION_PHRASES.filter((p) => p.stage === stage), [stage]);
  const drillItem = drillPool[drillIndex % drillPool.length];

  const saveDrill = (next: DrillState) => {
    setDrill(next);
    safeStorage.set(DRILL_KEY, next);
  };

  const answer = (correct: boolean) => {
    const streak = correct ? drill.streak + 1 : 0;
    saveDrill({
      score: drill.score + (correct ? 1 : 0),
      attempts: drill.attempts + 1,
      streak,
      best: Math.max(drill.best, streak),
    });
    setRevealed(false);
    setDrillIndex((i) => i + 1);
  };

  const stageMeta = PRESENTATION_STAGES.find((s) => s.id === stage)!;

  return (
    <section className="glass-card rounded-2xl border border-border/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <BookOpenCheck className="w-4 h-4 text-primary shrink-0" />
          <h2 className="text-sm font-semibold truncate">
            {t("Cụm từ & mẫu câu thuyết trình", "Useful phrases & sentence patterns")}
          </h2>
          <Badge variant="secondary" className="text-[11px] shrink-0">{PRESENTATION_PHRASES.length}</Badge>
          {used.size > 0 && (
            <Badge className="text-[11px] shrink-0 bg-primary/15 text-primary border-primary/30">
              {used.size} {t("đã dùng", "used")}
            </Badge>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <p className="text-xs text-muted-foreground mb-3">
                {t(
                  "Chọn từng chặng của bài thuyết trình, nghe mẫu, rồi bấm để nạp thẳng vào kịch bản của bạn và luyện trên teleprompter.",
                  "Pick a stage of your talk, listen to the pattern, use \"Say it again\" to rehearse each sentence, then send it into your own script for the teleprompter.",
                )}
              </p>

              {/* Stage chips + search */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {PRESENTATION_STAGES.map((s) => {
                  const active = !searching && s.id === stage;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => pickStage(s.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      <span className="mr-1">{s.emoji}</span>{t(s.labelVi, s.label)}
                    </button>
                  );
                })}
              </div>

              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("Tìm cụm từ...", "Search a phrase...")}
                  className="pl-9 h-9 text-sm"
                />
              </div>

              {/* Drill toggle + score */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Button
                  size="sm"
                  variant={drillOn ? "default" : "outline"}
                  className="h-8 gap-1.5 text-xs"
                  onClick={() => { setDrillOn((v) => !v); setRevealed(false); }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {drillOn ? t("Đóng luyện nhớ", "Close recall drill") : t("Luyện nhớ cụm từ", "Recall drill")}
                </Button>
                {drill.attempts > 0 && (
                  <>
                    <Badge variant="secondary" className="text-[11px]">
                      {drill.score}/{drill.attempts} {t("đúng", "correct")}
                    </Badge>
                    <Badge variant="secondary" className="text-[11px]">
                      {t("Chuỗi", "Streak")} {drill.streak} · {t("tốt nhất", "best")} {drill.best}
                    </Badge>
                    <Button
                      size="sm" variant="ghost" className="h-8 gap-1.5 text-xs text-muted-foreground"
                      onClick={() => saveDrill({ score: 0, attempts: 0, streak: 0, best: 0 })}
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> {t("Đặt lại", "Reset")}
                    </Button>
                  </>
                )}
              </div>

              {/* Recall drill */}
              {drillOn && drillItem && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 mb-4">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                    {stageMeta.emoji} {t(stageMeta.labelVi, stageMeta.label)}
                  </div>
                  <p className="text-sm font-medium mb-1">
                    {t("Nói câu tiếng Anh cho nghĩa sau:", "Say the English pattern for this meaning:")}
                  </p>
                  <p className="text-base font-semibold text-primary">{drillItem.vi}</p>

                  {!revealed ? (
                    <Button size="sm" className="mt-3" onClick={() => setRevealed(true)}>
                      {t("Hiện đáp án", "Show the answer")}
                    </Button>
                  ) : (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <p className="text-base font-semibold flex-1">{drillItem.en}</p>
                        <PhraseAudio
                          api={audio}
                          itemKey={`drill-${drillItem.id}`}
                          text={phraseCore(drillItem.en)}
                          label={t("Nghe", "Listen")}
                          slowLabel={t("Nghe chậm", "Listen slowly")}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground italic">{drillItem.example}</p>
                      <div className="flex gap-2 pt-1">
                        <Button size="sm" onClick={() => answer(true)}>{t("Tôi nói đúng", "I said it right")}</Button>
                        <Button size="sm" variant="outline" onClick={() => answer(false)}>{t("Cần luyện thêm", "Needs more practice")}</Button>
                        <Button size="sm" variant="secondary" className="gap-1" onClick={() => startSayIt(drillItem)}>
                          <Mic className="w-3.5 h-3.5" /> {t("Nói lại câu này", "Say it again")}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Phrase list */}
              {list.length > 0 && <PlayAllBar api={audio} items={playAllItems} playLabel={t("Nghe tất cả", "Listen to all")} stopLabel={t("Dừng", "Stop")} />}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {list.map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-xl border p-3 transition-colors ${
                      used.has(p.id) ? "border-primary/50 bg-primary/5" : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <p className="text-sm font-semibold flex-1 leading-snug">
                        {used.has(p.id) && <Check className="w-3.5 h-3.5 text-primary inline mr-1 -mt-0.5" />}
                        {p.en}
                      </p>
                      <PhraseAudio
                        api={audio}
                        itemKey={p.id}
                        text={phraseCore(p.en)}
                        label={t("Nghe", "Listen")}
                        slowLabel={t("Nghe chậm", "Listen slowly")}
                      />
                    </div>
                    <p className="text-xs text-primary/90 mt-1">{p.vi}</p>
                    <p className="text-xs text-muted-foreground italic mt-1">{p.example}</p>
                    <div className="flex flex-wrap items-center gap-1 mt-2">
                      {sayId === p.id && recognizer.isRecording ? (
                        <Button
                          size="sm" variant="destructive"
                          className="h-7 gap-1 text-[11px]"
                          onClick={() => recognizer.stop()}
                        >
                          <Square className="w-3 h-3" /> {t("Dừng", "Stop")} · {recognizer.seconds}s
                        </Button>
                      ) : (
                        <Button
                          size="sm" variant="outline"
                          className="h-7 gap-1 text-[11px]"
                          onClick={() => startSayIt(p)}
                        >
                          <Mic className="w-3 h-3" /> {t("Nói lại câu này", "Say it again")}
                        </Button>
                      )}
                      {onInsert && (
                        <Button
                          size="sm" variant="ghost"
                          className="h-7 gap-1 text-[11px] text-muted-foreground hover:text-primary"
                          onClick={() => onInsert(p.en)}
                        >
                          <Plus className="w-3 h-3" /> {t("Thêm vào kịch bản", "Insert into my script")}
                        </Button>
                      )}
                      {sayScores[p.id] !== undefined && sayId !== p.id && (
                        <Badge variant="secondary" className="text-[10px] gap-1">
                          <Trophy className="w-3 h-3" /> {sayScores[p.id]}%
                        </Badge>
                      )}
                    </div>

                    {sayId === p.id && (
                      <div className="mt-2 rounded-lg border border-primary/30 bg-primary/5 p-2.5">
                        {recognizer.isRecording && (
                          <p className="text-[11px] text-primary font-medium">
                            {t("Đang nghe... hãy nói cả câu thật rõ ràng.", "Listening... say the whole sentence clearly.")}
                          </p>
                        )}
                        {recognizer.transcript && (
                          <p className="text-xs mt-1 italic text-muted-foreground">"{recognizer.transcript}"</p>
                        )}
                        {recognizer.error && (
                          <p className="text-[11px] text-destructive mt-1">{sayErrorText(recognizer.error)}</p>
                        )}
                        {sayResult && !recognizer.isRecording && (
                          <div className="mt-1.5">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${sayResult.accuracy >= 85 ? "text-primary" : sayResult.accuracy >= 60 ? "text-amber-500" : "text-destructive"}`}>
                                {sayResult.accuracy}%
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {sayResult.accuracy >= 85
                                  ? t("Rất tốt, câu này bạn nói gần như hoàn hảo.", "Excellent, that was almost word perfect.")
                                  : sayResult.accuracy >= 60
                                    ? t("Khá tốt, hãy nói lại và chú ý các từ còn thiếu.", "Good effort, repeat it and watch the missing words.")
                                    : t("Hãy nghe mẫu một lần nữa rồi nói lại chậm hơn.", "Listen to the model once more, then say it again more slowly.")}
                              </span>
                            </div>
                            {sayResult.missing.length > 0 && (
                              <p className="text-[11px] text-muted-foreground mt-1">
                                {t("Từ còn thiếu", "Missing words")}: <span className="text-destructive font-medium">{sayResult.missing.join(", ")}</span>
                              </p>
                            )}
                          </div>
                        )}
                        <div className="flex gap-1.5 mt-2">
                          {!recognizer.isRecording && (
                            <Button size="sm" variant="secondary" className="h-7 gap-1 text-[11px]" onClick={() => startSayIt(p)}>
                              <Repeat2 className="w-3 h-3" /> {t("Nói lại", "Try again")}
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="h-7 text-[11px] text-muted-foreground" onClick={closeSayIt}>
                            {t("Đóng", "Close")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {list.length === 0 && (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  {t("Không tìm thấy cụm từ nào.", "No phrase matches that search.")}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PresentationPhraseBank;
