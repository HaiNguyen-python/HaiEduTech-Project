/**
 * @file SatErrorLog.tsx
 * @description "Mistake notebook" — every wrong SAT answer the student
 * submitted is grouped by section/type. Each card lets them re-attempt;
 * 2 correct streaks in a row marks it Mastered.
 */
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Trash2, RotateCcw, CheckCircle2, BookOpen, Calculator, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSatMistakes, type SatMistake } from "@/hooks/useSatMistakes";
import { cn } from "@/lib/utils";

const MistakeCard = ({ m, onAnswered, onDelete }: { m: SatMistake; onAnswered: (ok: boolean) => void; onDelete: () => void }) => {
  const { t } = useLanguage();
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const mastered = !!m.mastered_at;

  return (
    <div className={cn(
      "rounded-2xl border-2 p-4 md:p-5 bg-card",
      mastered ? "border-emerald-500/70 bg-emerald-500/5" : "border-border"
    )}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold">
          {m.section === "math" ? (
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
          ) : (
            <BookOpen className="w-3.5 h-3.5 text-violet-600" />
          )}
          <span className="text-muted-foreground uppercase tracking-wide">
            {m.section === "math" ? "Math" : "R&W"}
            {m.question_type ? ` · ${m.question_type}` : ""}
          </span>
          {mastered && (
            <span className="ml-2 inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("Đã thuộc", "Mastered")}
            </span>
          )}
        </div>
        <button onClick={onDelete} className="text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[15px] leading-7 text-foreground font-medium mb-3 whitespace-pre-wrap">{m.question}</p>

      <div className="grid sm:grid-cols-2 gap-2 mb-3">
        {m.options.map((opt, i) => {
          const isCorrect = i === m.correct_index;
          const isPicked = i === picked;
          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => { setPicked(i); }}
              className={cn(
                "text-left text-sm px-3 py-2 rounded-lg border transition-all",
                revealed
                  ? isCorrect
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : isPicked
                      ? "border-destructive bg-destructive/10 text-destructive"
                      : "border-border text-muted-foreground"
                  : isPicked
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
              )}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
      </div>

      {revealed && m.explanation && (
        <p className="text-xs leading-6 text-muted-foreground mb-3 p-3 rounded-lg bg-muted/50">
          💬 {m.explanation}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {!revealed ? (
          <button
            disabled={picked === null}
            onClick={() => {
              setRevealed(true);
              onAnswered(picked === m.correct_index);
            }}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
          >
            {t("Kiểm tra", "Check")}
          </button>
        ) : (
          <button
            onClick={() => { setPicked(null); setRevealed(false); }}
            className="px-4 py-2 rounded-lg border border-border text-sm font-semibold inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t("Làm lại", "Try again")}
          </button>
        )}
        <span className="text-xs text-muted-foreground">
          {t(`Đúng liên tiếp: ${m.correct_streak}/2`, `Streak: ${m.correct_streak}/2`)}
        </span>
      </div>
    </div>
  );
};

const SatErrorLog = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, loading, markReviewed, remove } = useSatMistakes();
  const [tab, setTab] = useState<"all" | "rw" | "math" | "mastered">("all");

  const filtered = useMemo(() => {
    if (tab === "rw") return items.filter((i) => i.section === "reading-writing");
    if (tab === "math") return items.filter((i) => i.section === "math");
    if (tab === "mastered") return items.filter((i) => !!i.mastered_at);
    return items;
  }, [items, tab]);

  const masteredCount = items.filter((i) => !!i.mastered_at).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Helmet>
        <title>{t("Sổ ghi lỗi SAT — HaiEduTech", "SAT Error Log — HaiEduTech")}</title>
        <meta name="description" content={t("Sổ tay ôn lại mọi câu SAT bạn từng làm sai.", "Notebook to review every SAT question you got wrong.")} />
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <button onClick={() => navigate("/sat-curriculum")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại SAT Curriculum", "Back to SAT Curriculum")}
        </button>

        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {t("📓 Sổ ghi lỗi SAT", "📓 SAT Error Log")}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              `Mọi câu bạn làm sai trên SAT được lưu ở đây. Trả lời đúng 2 lần liên tiếp = câu được đánh dấu "Đã thuộc". Tổng: ${items.length} câu · Đã thuộc: ${masteredCount}.`,
              `Every SAT question you missed lives here. Get it right 2 times in a row to mark it "Mastered". Total: ${items.length} · Mastered: ${masteredCount}.`
            )}
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-5">
          {([
            { k: "all", label: t("Tất cả", "All") },
            { k: "rw", label: "R&W" },
            { k: "math", label: "Math" },
            { k: "mastered", label: t("Đã thuộc", "Mastered") },
          ] as const).map((x) => (
            <button
              key={x.k}
              onClick={() => setTab(x.k)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors",
                tab === x.k ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
              )}
            >
              {x.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">{t("Đang tải...", "Loading...")}</p>
        ) : filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-3xl mb-2">🎯</p>
            <p className="text-foreground font-semibold">
              {t("Chưa có câu sai nào trong mục này.", "No mistakes recorded in this view yet.")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("Hãy làm quiz / exercise trong các bài SAT, câu sai sẽ tự xuất hiện ở đây.", "Take SAT quizzes/exercises and missed questions will land here automatically.")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((m) => (
              <MistakeCard
                key={m.id}
                m={m}
                onAnswered={(ok) => markReviewed(m.id, ok)}
                onDelete={() => remove(m.id)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SatErrorLog;
