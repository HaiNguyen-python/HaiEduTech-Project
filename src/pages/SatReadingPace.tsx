/**
 * @file SatReadingPace.tsx
 * @description Reading-speed trainer. Shows a 25-150 word SAT-style passage,
 * times the user, then computes WPM compared to the 250 WPM SAT target.
 * History is stored in localStorage (no backend needed).
 */
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Play, Square, RotateCcw, Gauge } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const PASSAGES: { text: string; words: number }[] = [
  { text: "When chemists analyze the structure of a polymer, they often rely on infrared spectroscopy. Each functional group absorbs light at characteristic wavelengths, producing a fingerprint that reveals the molecule's identity even when the sample contains a complex mixture of compounds.", words: 41 },
  { text: "Marine biologists studying coral reefs have noted that fluctuations in ocean temperature, even of less than two degrees Celsius, can trigger widespread bleaching events. Such episodes weaken the symbiotic algae that coral depend on for survival, undermining the long-term resilience of entire reef ecosystems.", words: 45 },
  { text: "Although early critics dismissed Emily Dickinson's unconventional punctuation as eccentric, contemporary scholars argue that her dashes function as deliberate musical rests. By interrupting the meter unexpectedly, they invite the reader to pause, reconsider, and ultimately discover meanings that more conventional punctuation would have obscured.", words: 46 },
  { text: "The principle of buoyancy, articulated by Archimedes in antiquity, explains why a steel ship can float on water despite the metal's density. The vessel's hull displaces a volume of water whose weight equals the ship's own, producing an upward force that holds the boat aloft.", words: 47 },
  { text: "Economists studying behavioral incentives have found that small, immediate rewards often outperform larger, delayed ones, even when the latter are objectively more valuable. This counterintuitive finding has reshaped public-health campaigns, encouraging designers to favor instant feedback over distant benefits in motivating change.", words: 45 },
  { text: "Pre-Columbian societies in the Andes engineered terraced fields that not only prevented erosion on steep slopes but also created distinct microclimates. By varying altitude and orientation, farmers could cultivate maize, potatoes, and quinoa in adjacent terraces, ensuring food security across unpredictable growing seasons.", words: 45 },
  { text: "Recent observations from the James Webb Space Telescope suggest that some galaxies formed much earlier in cosmic history than current models predict. If confirmed, the discovery may force astronomers to revise long-standing theories about how primordial gas first collapsed into the luminous structures we see today.", words: 49 },
  { text: "While linguists once viewed creole languages as deficient mixtures, modern research has demonstrated that they possess fully developed grammars. The rapid emergence of stable, rule-governed creoles among the children of multilingual communities offers compelling evidence for an innate human capacity to systematize language.", words: 45 },
];

interface Run { wpm: number; words: number; ms: number; at: number; }

const SatReadingPace = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "reading" | "done">("idle");
  const [startMs, setStartMs] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [history, setHistory] = useState<Run[]>(() => {
    try { return JSON.parse(localStorage.getItem("sat:reading-pace") || "[]"); } catch { return []; }
  });
  const intRef = useRef<number | null>(null);

  useEffect(() => () => { if (intRef.current) window.clearInterval(intRef.current); }, []);

  const start = () => {
    setPhase("reading");
    setStartMs(performance.now());
    setElapsed(0);
    intRef.current = window.setInterval(() => {
      setStartMs((s) => { if (s !== null) setElapsed(performance.now() - s); return s; });
    }, 100);
  };
  const stop = () => {
    if (!startMs) return;
    const ms = performance.now() - startMs;
    if (intRef.current) window.clearInterval(intRef.current);
    const passage = PASSAGES[idx];
    const wpm = Math.round((passage.words / (ms / 1000)) * 60);
    const run: Run = { wpm, words: passage.words, ms, at: Date.now() };
    const next = [run, ...history].slice(0, 30);
    setHistory(next);
    localStorage.setItem("sat:reading-pace", JSON.stringify(next));
    setPhase("done");
  };
  const reset = () => { setPhase("idle"); setStartMs(null); setElapsed(0); };

  const avgWpm = history.length ? Math.round(history.reduce((s, r) => s + r.wpm, 0) / history.length) : 0;
  const lastWpm = history[0]?.wpm ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Helmet>
        <title>{t("Luyện tốc độ đọc SAT - HaiEduTech", "SAT Reading Pace Trainer - HaiEduTech")}</title>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <button onClick={() => navigate("/sat-curriculum")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại SAT Curriculum", "Back to SAT Curriculum")}
        </button>

        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-md">
              <Gauge className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {t("⏱️ Luyện tốc độ đọc SAT", "⏱️ SAT Reading Pace Trainer")}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("Mục tiêu: 250 WPM trở lên để có thời gian rà lại Module 1.", "Target: 250 WPM or higher to leave time to review Module 1.")}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-3 mb-5">
          {[
            { label: t("WPM lần trước", "Last WPM"), value: lastWpm || "-" },
            { label: t("Trung bình", "Average"), value: avgWpm || "-" },
            { label: t("Số lần luyện", "Sessions"), value: history.length },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-2xl font-display font-bold text-foreground mt-1">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t(`Passage ${idx + 1}/${PASSAGES.length}`, `Passage ${idx + 1}/${PASSAGES.length}`)}
            </span>
            <div className={cn("text-sm font-mono font-bold", phase === "reading" ? "text-primary" : "text-muted-foreground")}>
              {(elapsed / 1000).toFixed(1)}s
            </div>
          </div>

          {phase === "idle" && (
            <div className="text-center py-10">
              <p className="text-sm text-muted-foreground mb-4">
                {t("Nhấn Bắt đầu, đọc đoạn văn, nhấn Dừng khi xong.", "Press Start, read the passage, press Stop when done.")}
              </p>
              <button onClick={start} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
                <Play className="w-4 h-4" /> {t("Bắt đầu", "Start")}
              </button>
            </div>
          )}

          {phase === "reading" && (
            <>
              <p className="text-[16px] leading-8 text-foreground/95 mb-5">{PASSAGES[idx].text}</p>
              <button onClick={stop} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 text-white font-semibold">
                <Square className="w-4 h-4" /> {t("Dừng", "Stop")}
              </button>
            </>
          )}

          {phase === "done" && history[0] && (
            <div className="text-center py-6">
              <div className="text-5xl font-display font-bold text-foreground mb-1">{history[0].wpm} WPM</div>
              <p className={cn(
                "text-sm font-semibold mb-4",
                history[0].wpm >= 250 ? "text-emerald-600" : history[0].wpm >= 200 ? "text-amber-600" : "text-rose-600"
              )}>
                {history[0].wpm >= 250
                  ? t("Tuyệt vời! Đạt mục tiêu SAT.", "Excellent! Hit the SAT target.")
                  : history[0].wpm >= 200
                    ? t("Khá tốt - cần thêm 50 WPM nữa.", "Solid - push another 50 WPM.")
                    : t("Cần luyện thêm để theo kịp phòng thi.", "Keep training to handle test-day pace.")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button onClick={() => { setIdx((idx + 1) % PASSAGES.length); reset(); }} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
                  {t("Đoạn tiếp theo", "Next passage")}
                </button>
                <button onClick={reset} className="px-4 py-2 rounded-lg border border-border font-semibold text-sm inline-flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5" /> {t("Đọc lại đoạn này", "Re-read")}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SatReadingPace;
