/**
 * @file PteSpeaking.tsx
 * @description Read Aloud + Repeat Sentence with Web Speech recognition & PTE scoring.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useRef, useState } from "react";
import { Mic, Square, Volume2, ChevronRight, RotateCcw } from "lucide-react";
import PteShell from "@/components/pte/PteShell";
import PteTimer from "@/components/pte/PteTimer";
import { READ_ALOUD_BANK, REPEAT_SENTENCE_BANK } from "@/data/pteData";
import { stringSimilarity, similarityToBand, bandLabel, diffWords } from "@/lib/pteScoring";
import { usePteProgress } from "@/hooks/usePteProgress";
import { toast } from "sonner";

type Mode = "read-aloud" | "repeat";

const PteSpeaking = () => {
  const [mode, setMode] = useState<Mode>("read-aloud");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"prep" | "record" | "done">("prep");
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const recogRef = useRef<any>(null);
  const { recordCompletion } = usePteProgress();

  const bank = mode === "read-aloud" ? READ_ALOUD_BANK : REPEAT_SENTENCE_BANK;
  const item = bank[idx];
  const expectedText = item.text;
  const prepSeconds = mode === "read-aloud" ? (item as any).prepSeconds : 7;
  const recordSeconds = item.recordSeconds;

  // Reset on item/mode change
  useEffect(() => {
    setPhase("prep");
    setTranscript("");
    setScore(null);
    stopRecognition();
    // For repeat-sentence: auto-play TTS during prep
    if (mode === "repeat") {
      const u = new SpeechSynthesisUtterance(expectedText);
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.cancel();
      setTimeout(() => window.speechSynthesis.speak(u), 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, mode]);

  const stopRecognition = () => {
    try { recogRef.current?.stop(); } catch { /* ignore */ }
    recogRef.current = null;
  };

  const startRecognition = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast.error("Speech Recognition not supported in this browser. Please use Chrome.");
      return;
    }
    const r = new SR();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    let finalText = "";
    r.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText += res[0].transcript + " ";
        else interim += res[0].transcript;
      }
      setTranscript((finalText + interim).trim());
    };
    r.onerror = () => { /* ignore intermittent errors */ };
    r.onend = () => { /* will be re-evaluated when phase ends */ };
    recogRef.current = r;
    r.start();
  };

  const handlePrepEnd = () => {
    setPhase("record");
    startRecognition();
  };

  const handleRecordEnd = () => {
    stopRecognition();
    setPhase("done");
    const sim = stringSimilarity(expectedText, transcript);
    const band = similarityToBand(sim);
    setScore(band);
    recordCompletion(item.id, band);
    toast.success(`Recorded! Estimated PTE Band: ${band}`);
  };

  const handleNext = () => {
    if (idx < bank.length - 1) setIdx(i => i + 1);
    else toast.success("You finished this set! Switch mode or revisit.");
  };

  const handleRetry = () => {
    setPhase("prep");
    setTranscript("");
    setScore(null);
  };

  const playSample = () => {
    const u = new SpeechSynthesisUtterance(expectedText);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const diffs = score !== null ? diffWords(expectedText, transcript) : [];
  const bandInfo = score !== null ? bandLabel(score) : null;

  return (
    <PteShell title="Speaking Practice" subtitle="Pronunciation & Oral Fluency · Web Speech API">
      {/* Mode tabs */}
      <div className="flex gap-2 mb-4">
        {([
          { k: "read-aloud" as Mode, label: "Read Aloud" },
          { k: "repeat" as Mode, label: "Repeat Sentence" },
        ]).map(m => (
          <button
            key={m.k}
            onClick={() => { setMode(m.k); setIdx(0); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              mode === m.k ? "bg-[#003580] text-white" : "bg-white text-[#003580] border border-[#003580]/30"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#003580]/15 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="text-xs text-slate-500">
            Question {idx + 1} of {bank.length} · Item ID {item.id}
          </div>
          <div className="flex gap-2">
            {phase === "prep" && <PteTimer seconds={prepSeconds} label="Prepare" running onComplete={handlePrepEnd} resetKey={item.id} />}
            {phase === "record" && <PteTimer seconds={recordSeconds} label="Recording" running onComplete={handleRecordEnd} resetKey={item.id + "-rec"} />}
          </div>
        </div>

        {/* Prompt */}
        {mode === "read-aloud" ? (
          <p className="text-lg sm:text-xl leading-relaxed text-slate-800 font-medium bg-[#f4f7fb] rounded-xl p-4 border border-[#003580]/10">
            {expectedText}
          </p>
        ) : (
          <div className="bg-[#f4f7fb] rounded-xl p-4 border border-[#003580]/10 text-center">
            <button
              onClick={playSample}
              className="inline-flex items-center gap-2 bg-[#003580] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0052cc]"
            >
              <Volume2 size={16} /> Replay Audio
            </button>
            {phase === "done" && (
              <p className="mt-3 text-sm text-slate-600">Original: <em>{expectedText}</em></p>
            )}
          </div>
        )}

        {/* Recording UI */}
        {phase === "record" && (
          <div className="mt-4 flex items-center gap-3">
            <Mic className="text-red-500 animate-pulse" size={22} />
            <span className="text-sm text-slate-700">Speak now…</span>
            <button
              onClick={handleRecordEnd}
              className="ml-auto inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
            >
              <Square size={12} /> Stop
            </button>
          </div>
        )}

        {transcript && (
          <div className="mt-3 text-sm">
            <div className="text-xs text-slate-500 mb-1">Live transcript:</div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800">{transcript}</div>
          </div>
        )}

        {/* Result */}
        {phase === "done" && score !== null && bandInfo && (
          <div className="mt-5 border-t pt-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <div className="text-3xl font-bold text-[#003580]">Band {score}</div>
              <div className={`text-sm font-semibold ${bandInfo.color}`}>{bandInfo.label}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {diffs.map((d, i) => (
                <span
                  key={i}
                  className={`text-sm px-2 py-0.5 rounded ${
                    d.status === "correct" ? "bg-emerald-100 text-emerald-800" :
                    d.status === "missing" ? "bg-red-100 text-red-700 line-through" :
                    "bg-amber-100 text-amber-800 italic"
                  }`}
                  title={d.status}
                >
                  {d.word}
                </span>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              <span className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded mr-1">correct</span>
              <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-700 rounded mr-1">missing</span>
              <span className="inline-block px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">extra</span>
            </div>
          </div>
        )}

        {/* Next button — strict PTE flow: cannot go back */}
        <div className="mt-5 flex justify-between gap-2">
          <button
            onClick={handleRetry}
            disabled={phase === "prep"}
            className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-lg border border-slate-300 text-slate-600 disabled:opacity-40"
          >
            <RotateCcw size={14} /> Retry
          </button>
          <button
            onClick={handleNext}
            disabled={phase !== "done"}
            className="inline-flex items-center gap-1 bg-[#003580] hover:bg-[#0052cc] text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </PteShell>
  );
};

export default PteSpeaking;
