/**
 * @file PlacementTest.tsx
 * @description CEFR placement test (40 Q) with diversified item-type UI.
 *   Listening 12 + Reading 16 + Writing 7 + Speaking 5.
 *   Results are persisted to `placement_test_results` and speaking
 *   recordings to the public `placement-audio` bucket.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, Mic, Square, ArrowLeft, ArrowRight, CheckCircle2,
  Loader2, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CodeBlock from "@/components/CodeBlock";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  type PlacementQuestion, type Skill,
  SKILL_LABEL, inferCefr,
} from "@/data/placementTest";
import {
  getPlacementBank, parseSubject, SUBJECT_META,
} from "@/data/placementBanks";
import Navbar from "@/components/Navbar";

/** Module-level current speak locale; set by the main component per subject. */
let CURRENT_SPEAK_LANG = "en-US";

/** Speak text via browser SpeechSynthesis (uses CURRENT_SPEAK_LANG by default). */
const speak = (text: string, lang?: string) => {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang ?? CURRENT_SPEAK_LANG; u.rate = 0.92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch { /* noop */ }
};

const FRAME =
  "bg-white border border-slate-200 rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.04)]";

/** Section pill labels for the Programming bank's 4 technical blocks. */
const DOMAIN_LABEL: Record<"logic" | "python" | "sql" | "ai", string> = {
  logic: "Logic",
  python: "Python",
  sql: "SQL",
  ai: "Data & AI",
};

/** Tiny SVG waveform stand-in for B1-B2 listening audio. */
const Waveform = ({ playing }: { playing: boolean }) => (
  <div className="flex items-end gap-[3px] h-10">
    {Array.from({ length: 32 }).map((_, i) => (
      <span
        key={i}
        className={`w-[3px] rounded-full bg-slate-400 ${playing ? "animate-pulse" : ""}`}
        style={{
          height: `${20 + Math.sin(i * 0.7) * 14 + (i % 3) * 6}%`,
          animationDelay: `${i * 30}ms`,
        }}
      />
    ))}
  </div>
);

/** Circular SVG countdown ring (0-100). */
const Ring = ({ pct, label }: { pct: number; label: string }) => {
  const r = 32, c = 2 * Math.PI * r;
  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 -rotate-90">
        <circle cx="40" cy="40" r={r} stroke="#e2e8f0" strokeWidth="6" fill="none" />
        <circle
          cx="40" cy="40" r={r} stroke="#0f172a" strokeWidth="6" fill="none"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
          strokeLinecap="round" className="transition-all duration-300"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-800">
        {label}
      </span>
    </div>
  );
};

/* ── Microphone recorder hook ──────────────────────────────────────── */
function useRecorder() {
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);

  const start = async (): Promise<void> => {
    chunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mediaRef.current = mr;
    mr.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
    mr.start();
    setRecording(true);
  };

  const stop = (): Promise<Blob | null> =>
    new Promise((resolve) => {
      const mr = mediaRef.current;
      if (!mr) return resolve(null);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        mr.stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
        resolve(blob);
      };
      mr.stop();
    });

  return { start, stop, recording };
}

const PlacementTest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subject = useMemo(() => parseSubject(searchParams.get("subject")), [searchParams]);
  const meta = SUBJECT_META[subject];
  const bank = useMemo(() => getPlacementBank(subject), [subject]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, unknown>>({});
  const [audioBlobs, setAudioBlobs] = useState<Record<number, Blob>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { total: number; cefr: string }>(null);
  const startedAtRef = useRef(Date.now());

  // Reset progress and switch TTS locale whenever the subject changes.
  useEffect(() => {
    CURRENT_SPEAK_LANG = meta.speakLang;
    setIdx(0); setAnswers({}); setAudioBlobs({}); setDone(null);
    startedAtRef.current = Date.now();
  }, [subject, meta.speakLang]);

  const q = bank[idx];
  const pct = Math.round(((idx + 1) / bank.length) * 100);

  const setA = (val: unknown) => setAnswers((a) => ({ ...a, [q.id]: val }));
  const goNext = () => setIdx((i) => Math.min(i + 1, bank.length - 1));
  const goPrev = () => setIdx((i) => Math.max(i - 1, 0));

  /* ── Submit & score ───────────────────────────────────────────── */
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to submit the placement test.");
        navigate("/login");
        return;
      }

      // Skill scores (out of 100 per skill)
      const totals: Record<Skill, { right: number; total: number }> = {
        listening: { right: 0, total: 0 },
        reading: { right: 0, total: 0 },
        writing: { right: 0, total: 0 },
        speaking: { right: 0, total: 0 },
      };
      const essays: Record<number, string> = {};

      for (const item of bank) {
        const ans = answers[item.id];
        totals[item.skill].total += 1;
        let correct = false;
        switch (item.type) {
          case "listen-image":
          case "listen-mcq":
          case "read-mcq":
          case "read-analytical":
            correct = ans === item.correct;
            break;
          case "listen-dictation": {
            const a = (ans as string[] | undefined) ?? [];
            const score = item.blanks.reduce(
              (s, b, i) => s + (a[i]?.trim().toLowerCase() === b.toLowerCase() ? 1 : 0),
              0
            );
            correct = score / item.blanks.length >= 0.6;
            break;
          }
          case "read-cloze": {
            const a = (ans as number[] | undefined) ?? [];
            const score = item.correct.reduce(
              (s, c, i) => s + (a[i] === c ? 1 : 0), 0
            );
            correct = score / item.correct.length >= 0.6;
            break;
          }
          case "write-scramble": {
            const a = (ans as string[] | undefined) ?? [];
            correct = a.join(" ").trim().toLowerCase() ===
              item.answer.trim().toLowerCase();
            break;
          }
          case "write-picture": {
            const a = (ans as string | undefined) ?? "";
            essays[item.id] = a;
            correct = a.trim().split(/\s+/).filter(Boolean).length >= item.minWords;
            break;
          }
          case "write-essay": {
            const a = (ans as string | undefined) ?? "";
            essays[item.id] = a;
            const n = a.trim().split(/\s+/).filter(Boolean).length;
            correct = n >= item.minWords && n <= item.maxWords + 30;
            break;
          }
          case "speak-read":
          case "speak-reply":
          case "speak-present":
            // Speaking is scored by Teacher Hai; count attempted as half credit.
            correct = !!audioBlobs[item.id];
            break;
        }
        if (correct) totals[item.skill].right += 1;
      }

      const skillScore = (s: Skill) =>
        totals[s].total === 0 ? 0
          : Math.round((totals[s].right / totals[s].total) * 100);
      const listening = skillScore("listening");
      const reading = skillScore("reading");
      const writing = skillScore("writing");
      const speaking = skillScore("speaking");

      // ── Programming-specific scoring ──────────────────────────────
      // Aggregate raw correct counts per technical domain and derive a
      // 0-18 raw score plus a Novice / Intermediate / Advanced band.
      let total: number;
      let cefr: string;
      const techMetrics: {
        logic_score: number; python_score: number;
        sql_score: number; ai_score: number;
        raw_correct: number; category: string;
      } = { logic_score: 0, python_score: 0, sql_score: 0, ai_score: 0,
            raw_correct: 0, category: "" };

      if (subject === "programming") {
        const perDomain: Record<"logic"|"python"|"sql"|"ai", number> =
          { logic: 0, python: 0, sql: 0, ai: 0 };
        let rawCorrect = 0;
        for (const item of bank) {
          const ans = answers[item.id];
          let ok = false;
          if (item.type === "read-mcq" || item.type === "read-analytical") {
            ok = ans === item.correct;
          } else if (item.type === "read-cloze") {
            const a = (ans as number[] | undefined) ?? [];
            ok = item.correct.every((c, i) => a[i] === c);
          }
          if (ok) {
            rawCorrect += 1;
            const d = item.domain ?? "logic";
            perDomain[d] += 1;
          }
        }
        techMetrics.logic_score  = perDomain.logic;
        techMetrics.python_score = perDomain.python;
        techMetrics.sql_score    = perDomain.sql;
        techMetrics.ai_score     = perDomain.ai;
        techMetrics.raw_correct  = rawCorrect;
        techMetrics.category = rawCorrect <= 5 ? "Novice"
          : rawCorrect <= 12 ? "Intermediate" : "Advanced";
        total = Math.round((rawCorrect / bank.length) * 100);
        cefr = techMetrics.category;
      } else {
        total = Math.round((listening + reading + writing + speaking) / 4);
        cefr = inferCefr(total);
      }

      // Upload speaking recordings to placement-audio bucket
      const audioUrls: Record<number, string> = {};
      for (const [qid, blob] of Object.entries(audioBlobs)) {
        const path = `${user.id}/${Date.now()}_q${qid}.webm`;
        const { error: upErr } = await supabase.storage
          .from("placement-audio").upload(path, blob, { contentType: "audio/webm" });
        if (!upErr) {
          // Store the storage path; consumers create a short-lived signed URL
          // via supabase.storage.from("placement-audio").createSignedUrl(path, ttl).
          audioUrls[Number(qid)] = path;
        }
      }

      // Resolve student display name
      const { data: prof } = await supabase
        .from("profiles").select("full_name").eq("id", user.id).maybeSingle();

      const answersPayload: Record<string, unknown> = {
        __subject: subject, ...answers,
      };
      if (subject === "programming") {
        answersPayload.__tech_metrics = techMetrics;
      }

      const { error } = await supabase.from("placement_test_results").insert({
        user_id: user.id,
        student_name: prof?.full_name ?? user.email ?? "Student",
        listening_score: listening,
        reading_score: reading,
        writing_score: writing,
        speaking_score: speaking,
        total_score: total,
        cefr_band: cefr,
        answers: answersPayload as never,
        essays: essays as never,
        audio_urls: audioUrls as never,
        duration_seconds: Math.round((Date.now() - startedAtRef.current) / 1000),
        status: "pending",
      });
      if (error) throw error;

      setDone({ total, cefr });
      toast.success("Placement test submitted!");
    } catch (e) {
      console.error(e);
      toast.error("Could not submit your test. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Result screen ───────────────────────────────────────────── */
  if (done) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-16">
          <div className={`${FRAME} p-10 text-center`}>
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Test completed</h1>
            <p className="text-slate-600 mb-6">
              Your overall score is <b>{done.total}/100</b> — estimated CEFR band <b>{done.cefr}</b>.
              Teacher Hai will review your speaking and writing answers and confirm your class placement shortly.
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={() => navigate("/dashboard")}>Go to dashboard</Button>
              <Button variant="outline" onClick={() => navigate("/")}>Home</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ── Layout shell ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        <header className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-xs font-medium text-slate-500">
              Question {idx + 1} of {bank.length}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {meta.title}
          </h1>
          <p className="text-sm text-slate-500">
            {meta.subtitle}
          </p>
          <Progress value={pct} className="h-1.5 mt-3" />
        </header>

        {/* Skill / level badge row.
         * For the Programming bank we hide CEFR and language-skill pills
         * and replace them with a single tech-domain tag (Logic / Python
         * / SQL / Data & AI) in a corporate slate tint. */}
        <div className="flex items-center gap-2 mb-4 text-xs">
          {subject === "programming" ? (
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
              {DOMAIN_LABEL[q.domain ?? "logic"]}
            </span>
          ) : (
            <>
              <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                {SKILL_LABEL[q.skill]}
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-900 text-white font-semibold">
                {q.cefr}
              </span>
            </>
          )}
        </div>

        {/* Question frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`${FRAME} p-5 sm:p-7 mb-5`}
          >
            <QuestionRenderer
              q={q}
              answer={answers[q.id]}
              setAnswer={setA}
              recordBlob={(b) => setAudioBlobs((s) => ({ ...s, [q.id]: b }))}
              hasRecording={!!audioBlobs[q.id]}
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={goPrev} disabled={idx === 0}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          {idx < bank.length - 1 ? (
            <Button onClick={goNext}>
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Submitting…</>
              ) : (
                <>Submit test <ChevronRight className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

/* ───── Per-type renderers ───────────────────────────────────────── */

interface RenderProps {
  q: PlacementQuestion;
  answer: unknown;
  setAnswer: (v: unknown) => void;
  recordBlob: (b: Blob) => void;
  hasRecording: boolean;
}

const QuestionRenderer = (p: RenderProps) => {
  const { q } = p;
  switch (q.type) {
    case "listen-image":     return <ListenImage {...p} />;
    case "listen-mcq":       return <ListenMcq {...p} />;
    case "listen-dictation": return <ListenDictation {...p} />;
    case "read-mcq":         return <ReadMcq {...p} />;
    case "read-cloze":       return <ReadCloze {...p} />;
    case "read-analytical":  return <ReadAnalytical {...p} />;
    case "write-scramble":   return <WriteScramble {...p} />;
    case "write-picture":    return <WritePicture {...p} />;
    case "write-essay":      return <WriteEssay {...p} />;
    case "speak-read":       return <SpeakRead {...p} />;
    case "speak-reply":      return <SpeakReply {...p} />;
    case "speak-present":    return <SpeakPresent {...p} />;
  }
};

/* Listening Q1-Q4 — 4-image grid */
const ListenImage = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "listen-image") return null;
  const sel = answer as number | undefined;
  return (
    <div>
      <p className="text-slate-800 font-medium mb-4">{q.prompt}</p>
      <Button variant="outline" onClick={() => speak(q.audioText)} className="mb-5">
        <Volume2 className="w-4 h-4 mr-2" /> Play audio
      </Button>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => setAnswer(i)}
            className={`aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 bg-white
              ${sel === i ? "border-slate-900 ring-2 ring-slate-900/10"
                          : "border-slate-200 hover:border-slate-400"}`}
          >
            <span className="text-5xl">{o.emoji}</span>
            <span className="text-xs text-slate-600">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* Listening Q5-Q8 — waveform + MCQ */
const ListenMcq = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "listen-mcq") return null;
  const [playing, setPlaying] = useState(false);
  const sel = answer as number | undefined;
  return (
    <div>
      <p className="text-slate-800 font-medium mb-4">{q.prompt}</p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4 mb-5">
        <button
          onClick={() => {
            setPlaying(true); speak(q.audioText);
            setTimeout(() => setPlaying(false), 4500);
          }}
          className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center"
        >
          <Volume2 className="w-4 h-4" />
        </button>
        <div className="flex-1"><Waveform playing={playing} /></div>
      </div>
      <div className="space-y-2">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => setAnswer(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all
              ${sel === i ? "border-slate-900 bg-slate-50"
                          : "border-slate-200 hover:border-slate-400"}`}
          >
            <span className="font-semibold mr-2 text-slate-500">
              {String.fromCharCode(65 + i)}.
            </span>
            <span className="text-slate-800">{o}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* Listening Q9-Q12 — long monologue dictation */
const ListenDictation = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "listen-dictation") return null;
  const vals = (answer as string[] | undefined) ?? Array(q.blanks.length).fill("");
  const parts = q.template.split("___");
  return (
    <div>
      <p className="text-slate-800 font-medium mb-4">{q.prompt}</p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 flex items-center justify-between">
        <span className="text-xs text-slate-500">Monologue audio</span>
        <Button variant="outline" size="sm" onClick={() => speak(q.audioText)}>
          <Volume2 className="w-4 h-4 mr-1" /> Play
        </Button>
      </div>
      <div className="text-base leading-9 text-slate-800">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < q.blanks.length && (
              <Input
                value={vals[i] ?? ""}
                onChange={(e) => {
                  const next = [...vals]; next[i] = e.target.value;
                  setAnswer(next);
                }}
                className="inline-block w-32 mx-1 h-8 align-baseline"
                placeholder="…"
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

/* Reading Q13-Q17 — basic MCQ (with optional code / schema panels for Programming) */
const ReadMcq = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "read-mcq") return null;
  const sel = answer as number | undefined;
  const monoBox =
    "font-mono text-sm leading-6 bg-slate-900 text-slate-100 rounded-lg p-4 " +
    "whitespace-pre-wrap break-words overflow-x-auto border border-slate-800";
  return (
    <div>
      {q.schema && (
        <div className="mb-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1.5 font-semibold">
            Schema
          </p>
          <div className="font-mono text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 whitespace-pre-wrap">
            {q.schema}
          </div>
        </div>
      )}
      <p className="text-lg text-slate-900 font-medium mb-4">{q.prompt}</p>
      {q.code && (
        <div className="mb-5">
          <CodeBlock code={q.code} language={q.language || "python"} />
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-2">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => setAnswer(i)}
            className={`px-4 py-3 rounded-lg border text-left transition-all
              ${sel === i ? "border-slate-900 bg-slate-50"
                          : "border-slate-200 hover:border-slate-400"}`}
          >
            <span className="font-semibold mr-2 text-slate-500">
              {String.fromCharCode(65 + i)}.
            </span>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
};

/* Reading Q18-Q22 — inline dropdown cloze */
const ReadCloze = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "read-cloze") return null;
  const vals = (answer as number[] | undefined) ?? Array(q.choices.length).fill(-1);

  // Split paragraph on [[N]] markers and intersperse <select>
  const tokens = q.paragraph.split(/(\[\[\d\]\])/g);

  return (
    <div>
      <p className="text-slate-800 font-medium mb-4">{q.prompt}</p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-base leading-9 text-slate-800">
        {tokens.map((tok, i) => {
          const m = tok.match(/\[\[(\d)\]\]/);
          if (!m) return <span key={i}>{tok}</span>;
          const blankIdx = Number(m[1]);
          return (
            <select
              key={i}
              value={vals[blankIdx] ?? -1}
              onChange={(e) => {
                const next = [...vals]; next[blankIdx] = Number(e.target.value);
                setAnswer(next);
              }}
              className="inline-block mx-1 px-2 py-1 rounded-md border border-slate-300 bg-white text-sm font-medium text-slate-900"
            >
              <option value={-1} disabled>— pick —</option>
              {q.choices[blankIdx].map((c, j) => (
                <option key={j} value={j}>{c}</option>
              ))}
            </select>
          );
        })}
      </div>
    </div>
  );
};

/* Reading Q23-Q28 — split-pane analytical */
const ReadAnalytical = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "read-analytical") return null;
  const sel = answer as number | undefined;
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-h-[420px] overflow-y-auto">
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Passage</p>
        <p className="text-slate-800 leading-7 whitespace-pre-wrap">{q.passage}</p>
      </div>
      <div>
        <p className="text-slate-900 font-medium mb-4">{q.prompt}</p>
        <div className="space-y-2">
          {q.options.map((o, i) => (
            <button
              key={i}
              onClick={() => setAnswer(i)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all
                ${sel === i ? "border-slate-900 bg-slate-50"
                            : "border-slate-200 hover:border-slate-400"}`}
            >
              <span className="font-semibold mr-2 text-slate-500">
                {String.fromCharCode(65 + i)}.
              </span>
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* Writing Q29-Q31 — syntax puzzle builder */
const WriteScramble = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "write-scramble") return null;
  const placed = (answer as string[] | undefined) ?? [];
  // Multiset difference: render every token still available in the pool.
  const placedCopy = [...placed];
  const pool = q.tokens.filter((tok) => {
    const idx = placedCopy.indexOf(tok);
    if (idx === -1) return true;
    placedCopy.splice(idx, 1);
    return false;
  });

  return (
    <div>
      <p className="text-slate-800 font-medium mb-4">{q.prompt}</p>
      <div className="min-h-[60px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-3 mb-4 flex flex-wrap gap-2 items-center">
        {placed.length === 0 && (
          <span className="text-sm text-slate-400 px-2">Tap a word below to build your sentence…</span>
        )}
        {placed.map((tok, i) => (
          <button
            key={`${tok}-${i}`}
            onClick={() => setAnswer(placed.filter((_, j) => j !== i))}
            className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700"
          >
            {tok}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {pool.map((tok, i) => (
          <button
            key={`pool-${tok}-${i}`}
            onClick={() => setAnswer([...placed, tok])}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 hover:border-slate-900"
          >
            {tok}
          </button>
        ))}
      </div>
    </div>
  );
};

/* Writing Q32-Q34 — picture prompt + one-line input */
const WritePicture = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "write-picture") return null;
  const val = (answer as string | undefined) ?? "";
  const wc = val.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div>
      <p className="text-slate-800 font-medium mb-4">{q.prompt}</p>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-24 h-24 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-5xl">
          {q.emoji}
        </div>
        <p className="text-sm text-slate-500 italic">{q.hint}</p>
      </div>
      <Input
        value={val}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your sentence here…"
        className="h-11"
      />
      <p className="text-xs text-slate-500 mt-2">
        {wc} words · target ≥ {q.minWords}
      </p>
    </div>
  );
};

/* Writing Q35 — long essay */
const WriteEssay = ({ q, answer, setAnswer }: RenderProps) => {
  if (q.type !== "write-essay") return null;
  const val = (answer as string | undefined) ?? "";
  const wc = val.trim().split(/\s+/).filter(Boolean).length;
  const within = wc >= q.minWords && wc <= q.maxWords;
  return (
    <div>
      <p className="text-slate-800 font-medium mb-4 leading-relaxed">{q.prompt}</p>
      <div className="relative">
        <Textarea
          value={val}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your essay here…"
          className="min-h-[260px] font-serif text-base leading-7"
        />
        <span
          className={`absolute bottom-2 right-3 text-xs font-semibold px-2 py-1 rounded-md
            ${within ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"}`}
        >
          {wc} / {q.minWords}–{q.maxWords} words
        </span>
      </div>
    </div>
  );
};

/* Speaking Q36-Q37 — read aloud */
const SpeakRead = ({ q, recordBlob, hasRecording }: RenderProps) => {
  if (q.type !== "speak-read") return null;
  const rec = useRecorder();
  const handle = async () => {
    if (rec.recording) {
      const blob = await rec.stop();
      if (blob) recordBlob(blob);
    } else {
      await rec.start();
    }
  };
  return (
    <div>
      <p className="text-slate-800 font-medium mb-4">{q.prompt}</p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center mb-5">
        <p className="text-xl text-slate-900 font-serif leading-relaxed">"{q.text}"</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handle}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all
            ${rec.recording ? "bg-red-500 text-white animate-pulse"
                            : "bg-slate-900 text-white hover:bg-slate-700"}`}
        >
          {rec.recording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        <span className="text-xs text-slate-500">
          {rec.recording ? "Tap to stop"
            : hasRecording ? "Recording saved ✓"
            : "Tap to record"}
        </span>
      </div>
    </div>
  );
};

/* Speaking Q38-Q39 — listen and reply with countdown ring */
const SpeakReply = ({ q, recordBlob, hasRecording }: RenderProps) => {
  if (q.type !== "speak-reply") return null;
  const rec = useRecorder();
  const [remain, setRemain] = useState(q.seconds);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); }, []);

  const startRec = async () => {
    await rec.start();
    setRemain(q.seconds);
    timerRef.current = window.setInterval(() => {
      setRemain((s) => {
        if (s <= 1) { stopRec(); return 0; }
        return s - 1;
      });
    }, 1000);
  };
  const stopRec = async () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    const blob = await rec.stop();
    if (blob) recordBlob(blob);
  };

  return (
    <div>
      <p className="text-slate-800 font-medium mb-4">{q.prompt}</p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-5 flex items-center justify-between">
        <span className="text-sm text-slate-700">Examiner question</span>
        <Button variant="outline" size="sm" onClick={() => speak(q.audioText)}>
          <Volume2 className="w-4 h-4 mr-1" /> Play
        </Button>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Ring
          pct={rec.recording ? ((q.seconds - remain) / q.seconds) * 100 : 0}
          label={rec.recording ? `${remain}s` : `${q.seconds}s`}
        />
        <button
          onClick={rec.recording ? stopRec : startRec}
          className={`w-14 h-14 rounded-full flex items-center justify-center
            ${rec.recording ? "bg-red-500 text-white"
                            : "bg-slate-900 text-white hover:bg-slate-700"}`}
        >
          {rec.recording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      </div>
      {hasRecording && !rec.recording && (
        <p className="text-center text-xs text-emerald-600 mt-3">Recording saved ✓</p>
      )}
    </div>
  );
};

/* Speaking Q40 — presentation arena (30s prep + 60s record) */
const SpeakPresent = ({ q, recordBlob, hasRecording }: RenderProps) => {
  if (q.type !== "speak-present") return null;
  const rec = useRecorder();
  const [phase, setPhase] = useState<"idle" | "prep" | "record" | "done">("idle");
  const [remain, setRemain] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); }, []);

  const startPrep = () => {
    setPhase("prep"); setRemain(q.prepSeconds);
    timerRef.current = window.setInterval(() => {
      setRemain((s) => {
        if (s <= 1) {
          window.clearInterval(timerRef.current!);
          startRecord();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };
  const startRecord = async () => {
    setPhase("record"); setRemain(q.recordSeconds);
    await rec.start();
    timerRef.current = window.setInterval(() => {
      setRemain((s) => {
        if (s <= 1) { stopRecord(); return 0; }
        return s - 1;
      });
    }, 1000);
  };
  const stopRecord = async () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    const blob = await rec.stop();
    if (blob) recordBlob(blob);
    setPhase("done");
  };

  const total = phase === "prep" ? q.prepSeconds
              : phase === "record" ? q.recordSeconds : 1;
  const pct = phase === "idle" ? 0 : ((total - remain) / total) * 100;

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Presentation Arena · B2</p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-5">
        <p className="text-slate-900 leading-relaxed font-medium">{q.prompt}</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Ring pct={pct} label={
          phase === "idle" ? "Start"
          : phase === "prep" ? `Prep ${remain}s`
          : phase === "record" ? `Rec ${remain}s`
          : "✓"
        } />
        {phase === "idle" && (
          <Button onClick={startPrep}>Begin 30s preparation</Button>
        )}
        {phase === "record" && (
          <Button variant="destructive" onClick={stopRecord}>
            <Square className="w-4 h-4 mr-1" /> Stop early
          </Button>
        )}
        {phase === "done" && hasRecording && (
          <span className="text-sm text-emerald-600 font-medium">Recording saved ✓</span>
        )}
      </div>
    </div>
  );
};

export default PlacementTest;
