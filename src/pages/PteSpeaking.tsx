/**
 * @file PteSpeaking.tsx
 * @description PTE Speaking practice - Read Aloud, Repeat Sentence, Describe Image, Retell Lecture.
 *              Uses Web Speech API for recognition + keyword-based content scoring for image/lecture tasks.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Square, Volume2, ChevronRight, RotateCcw, Image as ImageIcon, Headphones } from "lucide-react";
import PteShell from "@/components/pte/PteShell";
import PteTimer from "@/components/pte/PteTimer";
import {
  READ_ALOUD_ALL as READ_ALOUD_BANK,
  REPEAT_SENTENCE_ALL as REPEAT_SENTENCE_BANK,
  DESCRIBE_IMAGE_ALL as DESCRIBE_IMAGE_BANK,
  RETELL_LECTURE_BANK,
} from "@/data/pteData";
import {
  stringSimilarity,
  similarityToBand,
  bandLabel,
  diffWords,
  keywordCoverage,
} from "@/lib/pteScoring";
import { usePteProgress } from "@/hooks/usePteProgress";
import { toast } from "sonner";
import PteFilterBar, { DEFAULT_PTE_FILTERS, applyPteFilter, type PteFilterState } from "@/components/pte/PteFilterBar";

type Mode = "read-aloud" | "repeat" | "describe-image" | "retell-lecture";

const PteSpeaking = () => {
  const [mode, setMode] = useState<Mode>("read-aloud");
  const [idx, setIdx] = useState(0);
  // Phases: prep -> (lecture for retell) -> record -> done
  const [phase, setPhase] = useState<"prep" | "lecture" | "record" | "done">("prep");
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [hits, setHits] = useState<string[]>([]);
  const [showModel, setShowModel] = useState(false);
  const recogRef = useRef<any>(null);
  const { recordCompletion } = usePteProgress();
  const [filters, setFilters] = useState<PteFilterState>(DEFAULT_PTE_FILTERS);

  // Resolve current filtered bank
  const filteredBank = useMemo(() => {
    const source =
      mode === "read-aloud" ? READ_ALOUD_BANK :
      mode === "repeat" ? REPEAT_SENTENCE_BANK :
      mode === "describe-image" ? DESCRIBE_IMAGE_BANK :
      RETELL_LECTURE_BANK;
    const f = applyPteFilter(source as any[], filters);
    return (f.length ? f : source) as any[];
  }, [mode, filters]);

  const sourceBankLength = useMemo(() => {
    if (mode === "read-aloud") return READ_ALOUD_BANK.length;
    if (mode === "repeat") return REPEAT_SENTENCE_BANK.length;
    if (mode === "describe-image") return DESCRIBE_IMAGE_BANK.length;
    return RETELL_LECTURE_BANK.length;
  }, [mode]);

  const item = filteredBank[Math.min(idx, filteredBank.length - 1)];
  const bankLength = filteredBank.length;

  // Determine prep/record durations per mode
  const prepSeconds =
    mode === "read-aloud" ? (item as any).prepSeconds :
    mode === "repeat" ? 7 :
    mode === "describe-image" ? (item as any).prepSeconds :
    (item as any).prepSeconds; // retell-lecture: 10s
  const recordSeconds = (item as any).recordSeconds;

  // Reset on item/mode change
  useEffect(() => {
    setTranscript("");
    setScore(null);
    setHits([]);
    setShowModel(false);
    stopRecognition();
    window.speechSynthesis.cancel();

    if (mode === "repeat") {
      // Auto-play target sentence during prep
      setPhase("prep");
      const u = new SpeechSynthesisUtterance((item as any).text);
      u.lang = "en-US";
      u.rate = 0.9;
      setTimeout(() => window.speechSynthesis.speak(u), 400);
    } else if (mode === "retell-lecture") {
      // Phase 1: play full lecture; then 10s prep; then record
      setPhase("lecture");
      const u = new SpeechSynthesisUtterance((item as any).lectureText);
      u.lang = "en-US";
      u.rate = 0.95;
      u.onend = () => setPhase("prep");
      setTimeout(() => window.speechSynthesis.speak(u), 400);
    } else {
      setPhase("prep");
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

    let band: number;
    if (mode === "read-aloud" || mode === "repeat") {
      const sim = stringSimilarity((item as any).text, transcript);
      band = similarityToBand(sim);
      setHits([]);
    } else {
      // Keyword content coverage for Describe Image / Retell Lecture
      const kws: string[] = (item as any).keywords;
      const { hits: matched, coverage } = keywordCoverage(transcript, kws);
      // Blend coverage with fluency proxy (transcript length vs ideal ~75 words)
      const fluencyRatio = Math.min(1, transcript.split(/\s+/).filter(Boolean).length / 75);
      const blended = 0.7 * coverage + 0.3 * fluencyRatio;
      band = similarityToBand(blended);
      setHits(matched);
    }
    setScore(band);
    recordCompletion(item.id, band);
    toast.success(`Recorded! Estimated PTE Band: ${band}`);
  };

  const handleNext = () => {
    if (idx < bankLength - 1) setIdx(i => i + 1);
    else toast.success("You finished this set! Switch mode or revisit.");
  };

  const handleRetry = () => {
    setTranscript("");
    setScore(null);
    setHits([]);
    setShowModel(false);
    if (mode === "retell-lecture") {
      setPhase("lecture");
      const u = new SpeechSynthesisUtterance((item as any).lectureText);
      u.lang = "en-US";
      u.rate = 0.95;
      u.onend = () => setPhase("prep");
      window.speechSynthesis.cancel();
      setTimeout(() => window.speechSynthesis.speak(u), 300);
    } else {
      setPhase("prep");
    }
  };

  const playSample = () => {
    const text = mode === "retell-lecture" ? (item as any).lectureText : (item as any).text;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const diffs = (mode === "read-aloud" || mode === "repeat") && score !== null
    ? diffWords((item as any).text, transcript) : [];
  const bandInfo = score !== null ? bandLabel(score) : null;

  const modes: { k: Mode; label: string; icon?: any }[] = [
    { k: "read-aloud", label: "Read Aloud" },
    { k: "repeat", label: "Repeat Sentence" },
    { k: "describe-image", label: "Describe Image", icon: ImageIcon },
    { k: "retell-lecture", label: "Retell Lecture", icon: Headphones },
  ];

  return (
    <PteShell title="Speaking Practice" subtitle="Pronunciation, Fluency & Content Coverage · Web Speech API">
      {/* Mode tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {modes.map(m => {
          const Ic = m.icon;
          return (
            <button
              key={m.k}
              onClick={() => { setMode(m.k); setIdx(0); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-1.5 ${
                mode === m.k ? "bg-[#003580] text-white" : "bg-white text-[#003580] border border-[#003580]/30"
              }`}
            >
              {Ic && <Ic size={14} />}
              {m.label}
            </button>
          );
        })}
      </div>

      <PteFilterBar value={filters} onChange={(f) => { setFilters(f); setIdx(0); }} resultCount={bankLength} totalCount={sourceBankLength} />
      <div className="bg-white rounded-2xl border border-[#003580]/15 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="text-xs text-slate-500">
            Question {idx + 1} of {bankLength} · Item ID {item.id}
            {mode === "describe-image" && ` · ${(item as any).chartType.toUpperCase()}`}
            {mode === "retell-lecture" && ` · ${(item as any).topic}`}
          </div>
          <div className="flex gap-2">
            {phase === "lecture" && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                <Volume2 size={12} className="animate-pulse" /> Listening to lecture…
              </span>
            )}
            {phase === "prep" && (
              <PteTimer seconds={prepSeconds} label={mode === "retell-lecture" ? "Prepare (10s)" : "Prepare"} running onComplete={handlePrepEnd} resetKey={item.id + "-prep"} />
            )}
            {phase === "record" && (
              <PteTimer seconds={recordSeconds} label="Recording" running onComplete={handleRecordEnd} resetKey={item.id + "-rec"} />
            )}
          </div>
        </div>

        {/* Prompt area - varies by mode */}
        {mode === "read-aloud" && (
          <p className="text-lg sm:text-xl leading-relaxed text-slate-800 font-medium bg-[#f4f7fb] rounded-xl p-4 border border-[#003580]/10">
            {(item as any).text}
          </p>
        )}

        {mode === "repeat" && (
          <div className="bg-[#f4f7fb] rounded-xl p-4 border border-[#003580]/10 text-center">
            <button
              onClick={playSample}
              className="inline-flex items-center gap-2 bg-[#003580] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0052cc]"
            >
              <Volume2 size={16} /> Replay Audio
            </button>
            {phase === "done" && (
              <p className="mt-3 text-sm text-slate-600">Original: <em>{(item as any).text}</em></p>
            )}
          </div>
        )}

        {mode === "describe-image" && (
          <div className="bg-[#f4f7fb] rounded-xl p-3 border border-[#003580]/10">
            <img
              src={(item as any).imageUrl}
              alt={(item as any).title}
              loading="lazy"
              width={1024}
              height={768}
              className="w-full h-auto max-h-[420px] object-contain rounded-lg bg-white"
            />
            <p className="mt-2 text-xs text-slate-600 text-center font-medium">{(item as any).title}</p>
            <p className="mt-1 text-[11px] text-slate-500 text-center">
              25s prep · 40s response · Cover: introduction → trend → key features → conclusion
            </p>
          </div>
        )}

        {mode === "retell-lecture" && (
          <div className="bg-[#f4f7fb] rounded-xl p-4 border border-[#003580]/10">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="text-sm font-semibold text-[#003580]">Topic: {(item as any).topic}</div>
              <button
                onClick={playSample}
                disabled={phase === "record"}
                className="inline-flex items-center gap-1.5 bg-[#003580] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0052cc] disabled:opacity-40"
              >
                <Volume2 size={14} /> Replay Lecture
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Listen carefully - you will retell the lecture in your own words after a 10-second prep.
            </p>
            {phase === "done" && (
              <details className="mt-3 text-sm text-slate-700">
                <summary className="cursor-pointer font-semibold text-[#003580]">Show original lecture</summary>
                <p className="mt-2 italic">{(item as any).lectureText}</p>
              </details>
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

            {/* Word-level diff for Read Aloud / Repeat */}
            {(mode === "read-aloud" || mode === "repeat") && (
              <>
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
              </>
            )}

            {/* Keyword coverage for Describe Image / Retell Lecture */}
            {(mode === "describe-image" || mode === "retell-lecture") && (
              <>
                <div className="mt-3">
                  <div className="text-xs font-semibold text-slate-700 mb-1.5">
                    Content coverage: {hits.length} / {(item as any).keywords.length} key terms
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(item as any).keywords.map((kw: string, i: number) => {
                      const got = hits.includes(kw);
                      return (
                        <span
                          key={i}
                          className={`text-xs px-2 py-0.5 rounded font-medium ${
                            got ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {got ? "✓ " : ""}{kw}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setShowModel(s => !s)}
                  className="mt-3 text-xs font-semibold text-[#003580] hover:underline"
                >
                  {showModel ? "Hide" : "Show"} model answer (Band 90)
                </button>
                {showModel && (
                  <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-slate-800 leading-relaxed">
                    {(item as any).modelAnswer}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Next button - strict PTE flow: cannot go back */}
        <div className="mt-5 flex justify-between gap-2">
          <button
            onClick={handleRetry}
            disabled={phase === "prep" || phase === "lecture"}
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
