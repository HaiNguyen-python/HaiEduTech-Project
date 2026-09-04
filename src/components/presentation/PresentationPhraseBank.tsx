/**
 * @file PresentationPhraseBank.tsx
 * @description "Useful phrases & sentence patterns" panel for the Presentation
 *   & Public Speaking Studio. Phrases are grouped by presentation stage with
 *   bilingual meanings, examples, normal/slow audio, a one-click insert into the
 *   learner's own script, and a reveal-style recall drill.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenCheck, ChevronDown, Search, Plus, Check, Sparkles, RotateCcw } from "lucide-react";
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

const DRILL_KEY = "presentation-phrase-drill";
const STAGE_KEY = "presentation-phrase-stage";

interface DrillState {
  score: number;
  attempts: number;
  streak: number;
  best: number;
}

const loadDrill = (): DrillState => {
  try {
    const raw = safeStorage.getItem(DRILL_KEY);
    if (raw) return { score: 0, attempts: 0, streak: 0, best: 0, ...JSON.parse(raw) };
  } catch { /* ignore corrupt data */ }
  return { score: 0, attempts: 0, streak: 0, best: 0 };
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
    () => (safeStorage.getItem(STAGE_KEY) as PresentationStageId | null) ?? "opening",
  );
  const [query, setQuery] = useState("");

  const [drillOn, setDrillOn] = useState(false);
  const [drill, setDrill] = useState<DrillState>(loadDrill);
  const [drillIndex, setDrillIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const used = useMemo(() => new Set(usedIds), [usedIds]);

  const pickStage = (id: PresentationStageId) => {
    setStage(id);
    safeStorage.setItem(STAGE_KEY, id);
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
    safeStorage.setItem(DRILL_KEY, JSON.stringify(next));
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
                  "Pick a stage of your talk, listen to the pattern, then send it straight into your own script and rehearse it on the teleprompter.",
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
                    {onInsert && (
                      <Button
                        size="sm" variant="ghost"
                        className="h-7 mt-2 gap-1 text-[11px] text-muted-foreground hover:text-primary"
                        onClick={() => onInsert(p.en)}
                      >
                        <Plus className="w-3 h-3" /> {t("Thêm vào kịch bản", "Insert into my script")}
                      </Button>
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
