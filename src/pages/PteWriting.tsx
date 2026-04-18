/**
 * @file PteWriting.tsx
 * @description PTE Writing module — Essay & Summarize Written Text with timer, word counter, AI scoring, Notebook save.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PenTool, FileText, Save, ChevronRight, RotateCcw, CheckCircle2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import PteShell from "@/components/pte/PteShell";
import PteTimer from "@/components/pte/PteTimer";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ESSAY_ALL as ESSAY_BANK, SUMMARIZE_TEXT_ALL as SUMMARIZE_TEXT_BANK, type PteEssayPrompt, type PteSummarizeText } from "@/data/pteData";
import { keywordCoverage, similarityToBand, bandLabel } from "@/lib/pteScoring";
import { usePteProgress } from "@/hooks/usePteProgress";
import { supabase } from "@/integrations/supabase/client";
import PteFilterBar, { DEFAULT_PTE_FILTERS, applyPteFilter, type PteFilterState } from "@/components/pte/PteFilterBar";

type Mode = "essay" | "summarize";

const PteWriting = () => {
  const { recordCompletion } = usePteProgress();
  const [mode, setMode] = useState<Mode>("essay");
  const [idx, setIdx] = useState(0);
  const [essay, setEssay] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [running, setRunning] = useState(true);
  const [filters, setFilters] = useState<PteFilterState>(DEFAULT_PTE_FILTERS);

  const sourceBank: (PteEssayPrompt | PteSummarizeText)[] = mode === "essay" ? ESSAY_BANK : SUMMARIZE_TEXT_BANK;
  const bank = useMemo(() => {
    const filtered = applyPteFilter(sourceBank, filters);
    return filtered.length ? filtered : sourceBank;
  }, [sourceBank, filters]);
  const current = bank[Math.min(idx, bank.length - 1)];

  // Word count
  const wordCount = useMemo(
    () => essay.trim().split(/\s+/).filter(Boolean).length,
    [essay]
  );

  // Reset on mode/question change
  useEffect(() => {
    setEssay("");
    setSubmitted(false);
    setTimerKey(k => k + 1);
    setRunning(true);
  }, [mode, idx]);

  const inRange = wordCount >= current.minWords && wordCount <= current.maxWords;

  // Compute score
  const result = useMemo(() => {
    if (!submitted) return null;
    if (mode === "summarize") {
      const sw = current as PteSummarizeText;
      const cov = keywordCoverage(essay, sw.keyPoints);
      const wordPenalty = inRange ? 1 : 0.7;
      const band = similarityToBand(cov.coverage * wordPenalty);
      return { band, coverage: cov.coverage, hits: cov.hits, totalKeys: sw.keyPoints.length };
    }
    // Essay heuristic: 0.4 word range + 0.3 length depth + 0.3 sentence variety
    const es = current as PteEssayPrompt;
    const lenScore = inRange ? 1 : Math.max(0.5, 1 - Math.abs(wordCount - es.minWords) / es.minWords);
    const sentences = essay.split(/[.!?]+/).filter(s => s.trim().length > 5).length;
    const depthScore = Math.min(1, sentences / 10);
    const varietyScore = Math.min(1, new Set(essay.toLowerCase().split(/\s+/)).size / Math.max(1, wordCount) * 1.5);
    const composite = lenScore * 0.4 + depthScore * 0.3 + varietyScore * 0.3;
    const band = similarityToBand(composite);
    return { band, coverage: composite, hits: [], totalKeys: 0 };
  }, [submitted, mode, essay, wordCount, inRange, current]);

  const handleSubmit = () => {
    if (wordCount < 5) {
      toast.error("Please write at least a few sentences before submitting.");
      return;
    }
    setSubmitted(true);
    setRunning(false);
  };

  // Save to Notebook on completion
  useEffect(() => {
    if (!submitted || !result) return;
    recordCompletion(current.id, result.band);
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const promptText = mode === "essay" ? (current as PteEssayPrompt).prompt : (current as PteSummarizeText).passage;
      const block = `<hr/><p><strong>📝 PTE ${mode === "essay" ? "Essay" : "Summarize Text"} · Band ${result.band}</strong> <em>(${new Date().toLocaleString()})</em></p><p><em>Prompt:</em> ${promptText}</p><p><strong>My response (${wordCount} words):</strong></p><p>${essay.replace(/\n/g, "<br/>")}</p>`;
      const { data: existing } = await supabase
        .from("student_notebooks")
        .select("id, content, updated_at")
        .eq("user_id", session.user.id)
        .eq("subject", "pte-writing")
        .maybeSingle();
      if (existing) {
        await supabase
          .from("student_notebooks")
          .update({ content: (existing.content || "") + block, updated_at: new Date().toISOString() })
          .eq("id", existing.id);
      } else {
        await supabase.from("student_notebooks").insert({
          user_id: session.user.id,
          subject: "pte-writing",
          title: "PTE Writing Practice",
          content: block,
        });
      }
      window.dispatchEvent(new Event("notebook:updated"));
      toast.success("Saved to your Electronic Notebook 📓");
    })();
  }, [submitted, result, current, mode, essay, wordCount, recordCompletion]);

  const handleNext = () => {
    if (idx < bank.length - 1) setIdx(idx + 1);
    else toast.success("🎉 You've completed all tasks in this set!");
  };

  const handleReset = () => {
    setEssay("");
    setSubmitted(false);
    setTimerKey(k => k + 1);
    setRunning(true);
  };

  return (
    <PteShell title="Writing" subtitle="Essay · Summarize Written Text">
      {/* Mode tabs */}
      <div className="flex gap-2 mb-4">
        {(["essay", "summarize"] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setIdx(0); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === m ? "bg-[#003580] text-white shadow-md" : "bg-white text-[#003580] border border-[#003580]/20 hover:bg-[#e8eef7]"
            }`}
          >
            {m === "essay" ? <PenTool size={16} /> : <FileText size={16} />}
            {m === "essay" ? "Essay (200-300w)" : "Summarize Text (5-75w)"}
          </button>
        ))}
      </div>

      <PteFilterBar value={filters} onChange={(f) => { setFilters(f); setIdx(0); }} resultCount={bank.length} totalCount={sourceBank.length} />

      <motion.div
        key={`${mode}-${idx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#003580]/15 shadow-sm p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <span className="text-xs font-semibold text-[#003580] bg-[#e8eef7] px-2 py-1 rounded-full">
            {mode === "essay" ? "Essay" : "Summarize Written Text"} · {idx + 1}/{bank.length}
          </span>
          <PteTimer
            seconds={current.timeMinutes * 60}
            label="Exam"
            running={running && !submitted}
            resetKey={timerKey}
            onComplete={() => { toast.warning("Time's up!"); handleSubmit(); }}
          />
        </div>

        {mode === "summarize" ? (
          <div className="bg-[#f4f7fb] border border-[#003580]/10 rounded-lg p-4 mb-4">
            <p className="text-xs uppercase tracking-wide text-[#003580] font-semibold mb-2 flex items-center gap-1">
              <BookOpen size={12} /> Passage
            </p>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {(current as PteSummarizeText).passage}
            </p>
            <p className="text-xs text-slate-500 mt-3 italic">
              Summarize in <strong>one sentence</strong> ({current.minWords}-{current.maxWords} words).
            </p>
          </div>
        ) : (
          <div className="bg-[#f4f7fb] border border-[#003580]/10 rounded-lg p-4 mb-4">
            <p className="text-xs uppercase tracking-wide text-[#003580] font-semibold mb-2">Essay Prompt</p>
            <p className="text-sm text-slate-700 leading-relaxed">{(current as PteEssayPrompt).prompt}</p>
            {(current as PteEssayPrompt).modelOutline && (
              <p className="text-xs text-slate-500 mt-2 italic">
                💡 Outline: {(current as PteEssayPrompt).modelOutline}
              </p>
            )}
          </div>
        )}

        <Textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          disabled={submitted}
          placeholder={mode === "essay" ? "Write your essay here..." : "Write a one-sentence summary..."}
          className="min-h-[260px] text-base leading-relaxed font-serif resize-y"
        />

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex items-center gap-3 text-xs">
            <span className={`font-bold ${inRange ? "text-emerald-600" : "text-amber-600"}`}>
              {wordCount} words
            </span>
            <span className="text-slate-500">
              Range: {current.minWords}-{current.maxWords}
            </span>
            {inRange && <CheckCircle2 size={14} className="text-emerald-600" />}
          </div>
          <div className="flex items-center gap-2">
            {!submitted ? (
              <Button
                onClick={handleSubmit}
                className="bg-[#003580] hover:bg-[#002b66] text-white"
                size="sm"
              >
                <Save size={14} className="mr-1" /> Submit
              </Button>
            ) : (
              <>
                <Button onClick={handleReset} variant="outline" size="sm">
                  <RotateCcw size={14} className="mr-1" /> Retry
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-[#003580] hover:bg-[#002b66] text-white"
                  size="sm"
                >
                  Next <ChevronRight size={14} className="ml-1" />
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Result */}
      {submitted && result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 bg-white rounded-2xl border border-[#003580]/15 shadow-sm p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl font-extrabold text-[#003580]">{result.band}</div>
            <div>
              <div className={`text-sm font-semibold ${bandLabel(result.band).color}`}>{bandLabel(result.band).label}</div>
              <div className="text-xs text-slate-500">PTE Band Estimate (10–90)</div>
            </div>
          </div>

          {mode === "summarize" && result.totalKeys > 0 && (
            <div className="text-sm">
              <p className="text-slate-700 mb-2">
                <strong>Key points covered:</strong> {result.hits.length}/{result.totalKeys}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(current as PteSummarizeText).keyPoints.map(kp => (
                  <span
                    key={kp}
                    className={`text-xs px-2 py-1 rounded-full ${
                      result.hits.includes(kp)
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {result.hits.includes(kp) ? "✓" : "○"} {kp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {mode === "essay" && (
            <p className="text-xs text-slate-600 leading-relaxed">
              Heuristic score based on: word-range compliance (40%), depth/sentence count (30%), and lexical variety (30%).
              For detailed grammar & coherence feedback, use the <strong>AI Grading</strong> page.
            </p>
          )}
        </motion.div>
      )}
    </PteShell>
  );
};

export default PteWriting;
