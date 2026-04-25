// Kangxi Radicals Browser
// Renders the 214 Kangxi radicals with stroke-order animation,
// flashcards, quizzes, and a word lookup that surfaces HSK words
// containing the selected radical.
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Layers,
  List,
  BookOpen,
  Star,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";
import HanziStrokeOrder from "@/components/HanziStrokeOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  KANGXI_RADICALS,
  KANGXI_CATEGORIES,
  type KangxiRadical,
} from "@/data/kangxiRadicals";
import { hskVocabData } from "@/data/hskVocab";

const PER_PAGE = 12;
const STORAGE_KEY = "kangxi_mastered";

type ViewMode = "list" | "flashcard" | "quiz" | "lookup";

const speakChinese = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.8;
  window.speechSynthesis.speak(u);
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const KangxiRadicalsBrowser = () => {
  const { t } = useLanguage();

  const [view, setView] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [strokeFilter, setStrokeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  // Load mastered radicals from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMastered(new Set(JSON.parse(raw)));
    } catch {
      /* ignore parse errors */
    }
  }, []);

  // Persist mastered state.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...mastered]));
    } catch {
      /* ignore quota errors */
    }
  }, [mastered]);

  const toggleMastered = (n: number) => {
    setMastered((prev) => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };

  // Sort + filter the dataset.
  const filtered = useMemo(() => {
    let list = KANGXI_RADICALS;
    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.radical.includes(q) ||
          r.pinyin.toLowerCase().includes(q) ||
          r.vietnameseName.toLowerCase().includes(q) ||
          r.englishName.toLowerCase().includes(q) ||
          String(r.number) === q,
      );
    }
    if (strokeFilter !== "all") {
      const n = Number(strokeFilter);
      list = list.filter((r) => r.strokes === n);
    }
    if (categoryFilter !== "all") {
      list = list.filter((r) => r.category === categoryFilter);
    }
    return list;
  }, [search, strokeFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => setPage(1), [search, strokeFilter, categoryFilter]);

  const strokeOptions = useMemo(() => {
    const set = new Set(KANGXI_RADICALS.map((r) => r.strokes));
    return [...set].sort((a, b) => a - b);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-primary" />
          {t("214 Bộ thủ Khang Hi", "214 Kangxi Radicals")}
        </h2>
        <p className="text-muted-foreground">
          {t(
            "Học bộ thủ là chìa khoá ghi nhớ Hán tự. Mỗi bộ có hình minh hoạ viết nét, ý nghĩa, mẹo nhớ và ví dụ.",
            "Radicals are the key to memorising Hanzi. Each entry includes stroke-order animation, meaning, mnemonic and examples.",
          )}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
          <span className="text-muted-foreground">
            {t("Tổng số bộ", "Total radicals")}:{" "}
            <strong className="text-foreground">{KANGXI_RADICALS.length}</strong>
          </span>
          <span className="text-muted-foreground">
            {t("Đã thuộc", "Mastered")}:{" "}
            <strong className="text-primary">{mastered.size}</strong>
          </span>
          <span className="text-muted-foreground">
            {t("Cần ôn", "Need review")}:{" "}
            <strong className="text-orange-400">
              {KANGXI_RADICALS.length - mastered.size}
            </strong>
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(
              "Tìm bộ thủ, pinyin, Hán Việt...",
              "Search radical, pinyin, name...",
            )}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-sm"
          />
        </div>
        <select
          value={strokeFilter}
          onChange={(e) => setStrokeFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none"
        >
          <option value="all">{t("Số nét", "All strokes")}</option>
          {strokeOptions.map((n) => (
            <option key={n} value={n}>
              {n} {t("nét", "strokes")}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none max-w-[200px]"
        >
          <option value="all">{t("Tất cả chủ đề", "All categories")}</option>
          {KANGXI_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Tabs
          value={view}
          onValueChange={(v) => setView(v as ViewMode)}
          className="ml-auto"
        >
          <TabsList>
            <TabsTrigger value="list">
              <List className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="flashcard">
              <Layers className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="quiz">
              <BookOpen className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="lookup">
              <Search className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        {filtered.length} {t("kết quả", "results")}
      </p>

      {view === "quiz" ? (
        <KangxiQuiz radicals={filtered} t={t} />
      ) : view === "lookup" ? (
        <KangxiWordLookup radicals={filtered} t={t} />
      ) : view === "flashcard" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {paginated.map((r) => (
              <motion.div
                key={r.number}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <KangxiFlashcard radical={r} t={t} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((r) => (
            <KangxiCard
              key={r.number}
              radical={r}
              isMastered={mastered.has(r.number)}
              onToggleMaster={() => toggleMastered(r.number)}
              t={t}
            />
          ))}
        </div>
      )}

      {(view === "list" || view === "flashcard") && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------
// Single radical card – list view
// -----------------------------------------------------------
const KangxiCard = ({
  radical,
  isMastered,
  onToggleMaster,
  t,
}: {
  radical: KangxiRadical;
  isMastered: boolean;
  onToggleMaster: () => void;
  t: (vi: string, en: string) => string;
}) => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors flex flex-col">
      <div className="bg-secondary/40 flex items-center justify-center p-4 relative">
        <div className="absolute top-2 left-2 text-xs text-muted-foreground font-mono">
          #{radical.number}
        </div>
        <HanziStrokeOrder character={radical.radical} size={96} compact />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-base font-semibold text-primary">{radical.pinyin}</p>
            <p className="text-sm text-foreground">{radical.vietnameseName}</p>
            <p className="text-xs text-muted-foreground">{radical.englishName}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => speakChinese(radical.radical)}
              className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Play pronunciation"
            >
              <Volume2 className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={onToggleMaster}
              className="p-1.5 rounded-lg hover:bg-yellow-500/10 transition-colors"
              aria-label="Toggle mastered"
            >
              <Star
                className={`w-4 h-4 ${
                  isMastered
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <Badge variant="outline" className="text-xs">
            {radical.strokes} {t("nét", "strokes")}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {radical.category}
          </Badge>
          {radical.variants?.map((v) => (
            <Badge key={v} className="bg-primary/10 text-primary text-xs">
              {v}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-foreground mb-2">
          <span className="font-semibold">{t("Nguồn gốc", "Origin")}: </span>
          {t(radical.originVi, radical.originEn)}
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          <span className="font-semibold text-foreground">
            {t("Nghĩa", "Meaning")}:{" "}
          </span>
          {t(radical.meaningVi, radical.meaningEn)}
        </p>
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2.5 text-xs text-foreground flex gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>{radical.mnemonicVi}</span>
        </div>
        {radical.examples.length > 0 && (
          <div className="mt-auto">
            <p className="text-xs text-muted-foreground mb-1.5">
              {t("Hán tự chứa bộ này:", "Characters using this radical:")}
            </p>
            <div className="flex flex-wrap gap-2">
              {radical.examples.slice(0, 4).map((ex) => (
                <button
                  key={ex.character}
                  onClick={() => speakChinese(ex.character)}
                  className="rounded-lg bg-secondary px-2 py-1 text-sm hover:bg-primary/20 transition-colors"
                  title={`${ex.pinyin} – ${ex.meaningVi}`}
                >
                  <span className="font-bold">{ex.character}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {ex.pinyin}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// Flashcard – flip-style revealing meaning
// -----------------------------------------------------------
const KangxiFlashcard = ({
  radical,
  t,
}: {
  radical: KangxiRadical;
  t: (vi: string, en: string) => string;
}) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((v) => !v)}
      className="w-full text-left rounded-xl border border-border bg-card p-5 min-h-[260px] hover:border-primary/40 transition-colors"
    >
      {!flipped ? (
        <div className="flex flex-col items-center justify-center h-full text-center gap-3">
          <HanziStrokeOrder character={radical.radical} size={120} compact />
          <p className="text-xs text-muted-foreground">
            {t("Nhấn để xem ý nghĩa", "Tap to reveal meaning")}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-2xl font-bold text-foreground">
            {radical.radical}{" "}
            <span className="text-base text-primary">{radical.pinyin}</span>
          </p>
          <p className="text-sm text-foreground">{radical.vietnameseName}</p>
          <p className="text-xs text-muted-foreground">{radical.englishName}</p>
          <p className="text-sm text-foreground">
            {t(radical.meaningVi, radical.meaningEn)}
          </p>
          <p className="text-xs text-amber-500 italic">{radical.mnemonicVi}</p>
        </div>
      )}
    </button>
  );
};

// -----------------------------------------------------------
// Quiz – pick the correct meaning for the shown radical
// -----------------------------------------------------------
const KangxiQuiz = ({
  radicals,
  t,
}: {
  radicals: KangxiRadical[];
  t: (vi: string, en: string) => string;
}) => {
  const pool = useMemo(
    () => (radicals.length >= 4 ? radicals : KANGXI_RADICALS),
    [radicals],
  );
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [questions, setQuestions] = useState<
    { radical: KangxiRadical; choices: KangxiRadical[]; correctIndex: number }[]
  >([]);

  // Build a fresh set of 10 questions whenever the source pool changes.
  useEffect(() => {
    const sample = shuffle(pool).slice(0, 10);
    const built = sample.map((r) => {
      const distractors = shuffle(
        KANGXI_RADICALS.filter((x) => x.number !== r.number),
      ).slice(0, 3);
      const choices = shuffle([r, ...distractors]);
      return {
        radical: r,
        choices,
        correctIndex: choices.findIndex((c) => c.number === r.number),
      };
    });
    setQuestions(built);
    setIndex(0);
    setAnswer(null);
    setScore({ correct: 0, total: 0 });
  }, [pool]);

  if (questions.length === 0) {
    return (
      <p className="text-muted-foreground">
        {t("Đang chuẩn bị câu hỏi...", "Preparing quiz...")}
      </p>
    );
  }

  const finished = index >= questions.length;
  if (finished) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t("Hoàn thành!", "Completed!")}
        </h3>
        <p className="text-lg text-primary mb-4">
          {score.correct} / {score.total}
        </p>
        <Button
          onClick={() => {
            const sample = shuffle(pool).slice(0, 10);
            setQuestions(
              sample.map((r) => {
                const distractors = shuffle(
                  KANGXI_RADICALS.filter((x) => x.number !== r.number),
                ).slice(0, 3);
                const choices = shuffle([r, ...distractors]);
                return {
                  radical: r,
                  choices,
                  correctIndex: choices.findIndex((c) => c.number === r.number),
                };
              }),
            );
            setIndex(0);
            setAnswer(null);
            setScore({ correct: 0, total: 0 });
          }}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {t("Làm lại", "Try again")}
        </Button>
      </div>
    );
  }

  const q = questions[index];
  const handlePick = (i: number) => {
    if (answer !== null) return;
    setAnswer(i);
    setScore((s) => ({
      correct: s.correct + (i === q.correctIndex ? 1 : 0),
      total: s.total + 1,
    }));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <span>
          {t("Câu", "Question")} {index + 1} / {questions.length}
        </span>
        <span>
          {t("Điểm", "Score")}: {score.correct}/{score.total}
        </span>
      </div>
      <div className="flex flex-col items-center mb-6">
        <HanziStrokeOrder character={q.radical.radical} size={120} compact />
        <p className="text-sm text-muted-foreground mt-2">
          {t("Bộ thủ này có nghĩa là gì?", "What does this radical mean?")}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {q.choices.map((c, i) => {
          const isCorrect = i === q.correctIndex;
          const picked = i === answer;
          let cls =
            "rounded-lg border border-border bg-secondary/50 p-3 text-left text-sm transition-colors hover:bg-secondary";
          if (answer !== null) {
            if (isCorrect)
              cls =
                "rounded-lg border border-emerald-500 bg-emerald-500/10 p-3 text-left text-sm";
            else if (picked)
              cls =
                "rounded-lg border border-rose-500 bg-rose-500/10 p-3 text-left text-sm";
          }
          return (
            <button key={c.number} onClick={() => handlePick(i)} className={cls}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-foreground">
                  {t(c.vietnameseName, c.englishName)}{" "}
                  <span className="text-muted-foreground text-xs">
                    – {t(c.meaningVi, c.meaningEn)}
                  </span>
                </span>
                {answer !== null && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                )}
                {answer !== null && picked && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      {answer !== null && (
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => {
              setAnswer(null);
              setIndex((i) => i + 1);
            }}
          >
            {index + 1 === questions.length
              ? t("Xem kết quả", "See results")
              : t("Câu tiếp", "Next")}
          </Button>
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------
// Lookup – show HSK words that contain the chosen radical
// -----------------------------------------------------------
const KangxiWordLookup = ({
  radicals,
  t,
}: {
  radicals: KangxiRadical[];
  t: (vi: string, en: string) => string;
}) => {
  const [selected, setSelected] = useState<KangxiRadical | null>(
    radicals[0] ?? null,
  );

  useEffect(() => {
    if (radicals.length && !radicals.find((r) => r.number === selected?.number)) {
      setSelected(radicals[0]);
    }
  }, [radicals, selected]);

  const matches = useMemo(() => {
    if (!selected) return [] as typeof hskVocabData;
    const tokens = [selected.radical, ...(selected.variants ?? [])];
    return hskVocabData
      .filter((w) => tokens.some((tk) => w.character.includes(tk)))
      .slice(0, 60);
  }, [selected]);

  if (!selected) {
    return (
      <p className="text-muted-foreground">
        {t("Không có dữ liệu", "No data available")}
      </p>
    );
  }

  return (
    <div className="grid lg:grid-cols-[260px,1fr] gap-6">
      <div className="rounded-xl border border-border bg-card p-3 max-h-[640px] overflow-y-auto">
        <p className="text-xs text-muted-foreground mb-2 px-2">
          {t("Chọn một bộ thủ", "Pick a radical")}
        </p>
        <div className="space-y-1">
          {radicals.map((r) => (
            <button
              key={r.number}
              onClick={() => setSelected(r)}
              className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                selected.number === r.number
                  ? "bg-primary/15 text-foreground"
                  : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              <span className="text-lg font-bold">{r.radical}</span>
              <span className="flex-1">
                <span className="block text-foreground">
                  {r.pinyin} – {t(r.vietnameseName, r.englishName)}
                </span>
                <span className="block text-xs text-muted-foreground">
                  #{r.number} · {r.strokes} {t("nét", "strokes")}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="rounded-xl border border-border bg-card p-5 mb-4">
          <div className="flex items-center gap-4">
            <HanziStrokeOrder character={selected.radical} size={88} compact />
            <div>
              <p className="text-2xl font-bold text-foreground">
                {selected.radical}{" "}
                <span className="text-base text-primary">
                  {selected.pinyin}
                </span>
              </p>
              <p className="text-sm text-foreground">
                {selected.vietnameseName} · {selected.englishName}
              </p>
              <p className="text-xs text-muted-foreground">
                {t(selected.meaningVi, selected.meaningEn)}
              </p>
            </div>
          </div>
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          {t(
            `${matches.length} từ HSK chứa bộ ${selected.radical}`,
            `${matches.length} HSK words containing ${selected.radical}`,
          )}
        </h4>
        {matches.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t(
              "Không tìm thấy từ HSK nào trong ngân hàng từ vựng hiện tại.",
              "No matching HSK words found in the current bank.",
            )}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {matches.map((w) => (
              <div
                key={w.character + w.category}
                className="rounded-lg border border-border bg-card p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      {w.character}
                    </p>
                    <p className="text-xs text-primary">{w.pinyin}</p>
                  </div>
                  <button
                    onClick={() => speakChinese(w.character)}
                    className="p-1.5 rounded-lg hover:bg-primary/10"
                  >
                    <Volume2 className="w-4 h-4 text-primary" />
                  </button>
                </div>
                <p className="text-sm text-foreground mt-1">{w.definition.vi}</p>
                <p className="text-xs text-muted-foreground">{w.definition.en}</p>
                <Badge variant="outline" className="text-xs mt-2">
                  {w.level}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KangxiRadicalsBrowser;
