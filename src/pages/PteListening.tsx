/**
 * @file PteListening.tsx
 * @description PTE Listening — Dictation (strict input) & Summarize Spoken Text (notepad).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Volume2, ChevronRight, RotateCcw, FileText } from "lucide-react";
import { toast } from "sonner";
import PteShell from "@/components/pte/PteShell";
import PteTimer from "@/components/pte/PteTimer";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DICTATION_ALL as DICTATION_BANK, SUMMARIZE_SPOKEN_ALL as SUMMARIZE_SPOKEN_BANK, type PteDictation, type PteSummarizeSpoken } from "@/data/pteData";
import { stringSimilarity, similarityToBand, bandLabel, diffWords, keywordCoverage } from "@/lib/pteScoring";
import { usePteProgress } from "@/hooks/usePteProgress";

type Mode = "dictation" | "summarize";

const PteListening = () => {
  const { recordCompletion } = usePteProgress();
  const [mode, setMode] = useState<Mode>("dictation");
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const dItem = DICTATION_BANK[idx];
  const sItem = SUMMARIZE_SPOKEN_BANK[idx];
  const current = mode === "dictation" ? dItem : sItem;
  const audioText = mode === "dictation" ? dItem?.audioText : sItem?.audioText;

  // Reset on change
  useEffect(() => {
    setAnswer("");
    setSubmitted(false);
    setPlayCount(0);
    setTimerKey(k => k + 1);
    window.speechSynthesis?.cancel();
    setPlaying(false);
  }, [mode, idx]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  const playAudio = () => {
    if (!audioText) return;
    if (mode === "dictation" && playCount >= 2) {
      toast.error("In real PTE Dictation, audio plays only once. (Limit: 2 plays here.)");
      return;
    }
    window.speechSynthesis?.cancel();
    const u = new SpeechSynthesisUtterance(audioText);
    u.lang = "en-US";
    u.rate = 0.9;
    u.onstart = () => setPlaying(true);
    u.onend = () => { setPlaying(false); setPlayCount(c => c + 1); };
    u.onerror = () => setPlaying(false);
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const wordCount = useMemo(
    () => answer.trim().split(/\s+/).filter(Boolean).length,
    [answer]
  );

  // Score
  const result = useMemo(() => {
    if (!submitted) return null;
    if (mode === "dictation") {
      const sim = stringSimilarity(dItem.audioText, answer);
      const diff = diffWords(dItem.audioText, answer);
      return { band: similarityToBand(sim), accuracy: sim, diff, hits: [] as string[], totalKeys: 0 };
    }
    const cov = keywordCoverage(answer, sItem.keyPoints);
    const inRange = wordCount >= sItem.minWords && wordCount <= sItem.maxWords;
    const composite = cov.coverage * (inRange ? 1 : 0.7);
    return { band: similarityToBand(composite), accuracy: cov.coverage, diff: [], hits: cov.hits, totalKeys: sItem.keyPoints.length };
  }, [submitted, mode, answer, dItem, sItem, wordCount]);

  const handleSubmit = () => {
    if (answer.trim().length < 3) {
      toast.error("Please type your answer first.");
      return;
    }
    setSubmitted(true);
    window.speechSynthesis?.cancel();
  };

  useEffect(() => {
    if (submitted && result) recordCompletion(current.id, result.band);
  }, [submitted, result, current, recordCompletion]);

  const handleNext = () => {
    const max = mode === "dictation" ? DICTATION_BANK.length : SUMMARIZE_SPOKEN_BANK.length;
    if (idx < max - 1) setIdx(idx + 1);
    else toast.success("🎉 You've completed all tasks!");
  };

  const handleReset = () => {
    setAnswer("");
    setSubmitted(false);
    setPlayCount(0);
    setTimerKey(k => k + 1);
  };

  return (
    <PteShell title="Listening" subtitle="Dictation · Summarize Spoken Text">
      {/* Mode tabs */}
      <div className="flex gap-2 mb-4">
        {([
          { id: "dictation" as Mode, label: "Write from Dictation", icon: Headphones },
          { id: "summarize" as Mode, label: "Summarize Spoken Text", icon: FileText },
        ]).map(t => (
          <button
            key={t.id}
            onClick={() => { setMode(t.id); setIdx(0); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === t.id ? "bg-[#003580] text-white shadow-md" : "bg-white text-[#003580] border border-[#003580]/20 hover:bg-[#e8eef7]"
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={`${mode}-${idx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#003580]/15 shadow-sm p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span className="text-xs font-semibold text-[#003580] bg-[#e8eef7] px-2 py-1 rounded-full">
            {mode === "dictation" ? "Dictation" : "Summarize Spoken"} · {idx + 1}/{mode === "dictation" ? DICTATION_BANK.length : SUMMARIZE_SPOKEN_BANK.length}
          </span>
          <PteTimer
            seconds={mode === "dictation" ? 60 : 600}
            label="Time"
            running={!submitted}
            resetKey={timerKey}
            onComplete={() => { toast.warning("Time's up!"); }}
          />
        </div>

        {/* Audio player */}
        <div className="bg-[#f4f7fb] border border-[#003580]/10 rounded-lg p-4 mb-4 flex items-center gap-3">
          <Button
            onClick={playAudio}
            disabled={playing || (mode === "dictation" && playCount >= 2) || submitted}
            className="bg-[#003580] hover:bg-[#002b66] text-white"
            size="sm"
          >
            <Volume2 size={16} className="mr-2" />
            {playing ? "Playing..." : playCount === 0 ? "▶ Play Audio" : `▶ Replay (${playCount}/${mode === "dictation" ? 2 : "∞"})`}
          </Button>
          <div className="flex-1 text-xs text-slate-600">
            {mode === "dictation"
              ? "🎧 Listen carefully. You will hear the sentence twice."
              : "🎧 Listen, take notes, then write a 50-70 word summary."}
          </div>
        </div>

        {/* Answer input */}
        {mode === "dictation" ? (
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Type exactly what you hear..."
            className="text-base h-12"
            autoFocus
          />
        ) : (
          <>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={submitted}
              placeholder="Write your 50-70 word summary here..."
              className="min-h-[180px] text-base leading-relaxed font-serif resize-y"
            />
            <p className={`text-xs mt-2 font-semibold ${
              wordCount >= sItem.minWords && wordCount <= sItem.maxWords ? "text-emerald-600" : "text-amber-600"
            }`}>
              {wordCount} words · Range: {sItem.minWords}-{sItem.maxWords}
            </p>
          </>
        )}

        <div className="flex items-center justify-end gap-2 mt-4">
          {!submitted ? (
            <Button onClick={handleSubmit} className="bg-[#003580] hover:bg-[#002b66] text-white" size="sm">
              Submit
            </Button>
          ) : (
            <>
              <Button onClick={handleReset} variant="outline" size="sm">
                <RotateCcw size={14} className="mr-1" /> Retry
              </Button>
              <Button onClick={handleNext} className="bg-[#003580] hover:bg-[#002b66] text-white" size="sm">
                Next <ChevronRight size={14} className="ml-1" />
              </Button>
            </>
          )}
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
              <div className="text-xs text-slate-500">Accuracy: {Math.round(result.accuracy * 100)}%</div>
            </div>
          </div>

          {mode === "dictation" && (
            <>
              <p className="text-sm text-slate-700 mb-2"><strong>Expected:</strong></p>
              <p className="text-sm bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3 italic">
                "{dItem.audioText}"
              </p>
              <p className="text-sm text-slate-700 mb-2"><strong>Word-by-word feedback:</strong></p>
              <div className="flex flex-wrap gap-1.5">
                {result.diff.map((w, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      w.status === "correct" ? "bg-emerald-100 text-emerald-700" :
                      w.status === "missing" ? "bg-amber-100 text-amber-700 line-through" :
                      "bg-red-100 text-red-700"
                    }`}
                  >
                    {w.word} {w.status === "missing" ? "(missed)" : w.status === "extra" ? "(extra)" : ""}
                  </span>
                ))}
              </div>
            </>
          )}

          {mode === "summarize" && result.totalKeys > 0 && (
            <>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Key points covered:</strong> {result.hits.length}/{result.totalKeys}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {sItem.keyPoints.map(kp => (
                  <span
                    key={kp}
                    className={`text-xs px-2 py-1 rounded-full ${
                      result.hits.includes(kp) ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {result.hits.includes(kp) ? "✓" : "○"} {kp}
                  </span>
                ))}
              </div>
              <details className="text-xs text-slate-600">
                <summary className="cursor-pointer font-semibold">Show full audio transcript</summary>
                <p className="mt-2 italic bg-slate-50 p-3 rounded">{sItem.audioText}</p>
              </details>
            </>
          )}
        </motion.div>
      )}
    </PteShell>
  );
};

export default PteListening;
