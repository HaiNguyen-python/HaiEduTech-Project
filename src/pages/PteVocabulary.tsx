/**
 * @file PteVocabulary.tsx
 * @description PTE Academic Vocabulary — 150 words with list, flashcard, search, mastery, and quiz modes.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Star, Volume2, ChevronLeft, ChevronRight, RotateCw,
  BookOpen, Layers, Trophy, CheckCircle2, XCircle, Sparkles,
} from "lucide-react";
import PteShell from "@/components/pte/PteShell";
import { PTE_VOCAB_BANK, PteVocabWord } from "@/data/pteData";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "pte-vocab-mastered";
const MIGRATED_KEY = "pte-vocab-migrated-v1";

type Mode = "list" | "flashcard" | "quiz";

interface QuizQ {
  word: PteVocabWord;
  options: string[];
  correctIndex: number;
}

const speak = (text: string) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
};

const PteVocabulary = () => {
  const [mode, setMode] = useState<Mode>("list");
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState<string>("all");
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Flashcard state
  const [flashIdx, setFlashIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Quiz state
  const [quizQs, setQuizQs] = useState<QuizQ[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizPick, setQuizPick] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  // Read localStorage mastery (guest fallback / migration source)
  const readLocal = (): Set<string> => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  };

  const writeLocal = (set: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
    } catch {
      // Ignore quota errors
    }
  };

  // Load mastery: Supabase if logged in (with one-time migration from localStorage), else localStorage
  useEffect(() => {
    let cancelled = false;

    const loadForUser = async (uid: string) => {
      setSyncing(true);
      try {
        // One-time migration of any existing localStorage entries to Supabase
        if (!localStorage.getItem(MIGRATED_KEY)) {
          const local = readLocal();
          if (local.size > 0) {
            const rows = Array.from(local).map(word => ({ user_id: uid, word, mastered: true }));
            await supabase.from("pte_vocab_mastery").upsert(rows, { onConflict: "user_id,word" });
          }
          localStorage.setItem(MIGRATED_KEY, "1");
        }

        const { data, error } = await supabase
          .from("pte_vocab_mastery")
          .select("word, mastered")
          .eq("user_id", uid);

        if (!error && data && !cancelled) {
          const set = new Set(data.filter(r => r.mastered).map(r => r.word));
          setMastered(set);
          writeLocal(set); // keep local cache in sync for offline reads
        }
      } finally {
        if (!cancelled) setSyncing(false);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        loadForUser(uid);
      } else {
        setMastered(readLocal());
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) loadForUser(uid);
      else setMastered(readLocal());
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const toggleMastered = async (word: string) => {
    const next = new Set(mastered);
    const willMaster = !next.has(word);
    if (willMaster) next.add(word);
    else next.delete(word);
    setMastered(next);
    writeLocal(next);

    if (userId) {
      if (willMaster) {
        await supabase
          .from("pte_vocab_mastery")
          .upsert({ user_id: userId, word, mastered: true }, { onConflict: "user_id,word" });
      } else {
        await supabase
          .from("pte_vocab_mastery")
          .delete()
          .eq("user_id", userId)
          .eq("word", word);
      }
    }
  };

  // Unique parts of speech
  const posOptions = useMemo(() => {
    const set = new Set(PTE_VOCAB_BANK.map(w => w.partOfSpeech));
    return ["all", ...Array.from(set).sort()];
  }, []);

  // Filtered words
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PTE_VOCAB_BANK.filter(w => {
      if (posFilter !== "all" && w.partOfSpeech !== posFilter) return false;
      if (!q) return true;
      return (
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        w.example.toLowerCase().includes(q)
      );
    });
  }, [search, posFilter]);

  const masteryPct = Math.round((mastered.size / PTE_VOCAB_BANK.length) * 100);

  // ===== Flashcard handlers =====
  const flashCard = filtered[flashIdx];
  const handleFlashNext = () => {
    setFlipped(false);
    setFlashIdx(i => (i + 1) % Math.max(filtered.length, 1));
  };
  const handleFlashPrev = () => {
    setFlipped(false);
    setFlashIdx(i => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
  };

  // ===== Quiz handlers =====
  const startQuiz = () => {
    const pool = [...PTE_VOCAB_BANK].sort(() => Math.random() - 0.5).slice(0, 10);
    const qs: QuizQ[] = pool.map(word => {
      const distractors = PTE_VOCAB_BANK
        .filter(w => w.word !== word.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.meaning);
      const options = [...distractors, word.meaning].sort(() => Math.random() - 0.5);
      return {
        word,
        options,
        correctIndex: options.indexOf(word.meaning),
      };
    });
    setQuizQs(qs);
    setQuizIdx(0);
    setQuizScore(0);
    setQuizPick(null);
    setQuizDone(false);
    setMode("quiz");
  };

  const handleQuizPick = (i: number) => {
    if (quizPick !== null) return;
    setQuizPick(i);
    if (i === quizQs[quizIdx].correctIndex) setQuizScore(s => s + 1);
  };

  const handleQuizNext = () => {
    if (quizIdx + 1 >= quizQs.length) {
      setQuizDone(true);
    } else {
      setQuizIdx(i => i + 1);
      setQuizPick(null);
    }
  };

  // Reset flashcard index when filter changes
  useEffect(() => {
    setFlashIdx(0);
    setFlipped(false);
  }, [search, posFilter]);

  return (
    <PteShell
      title="PTE Vocabulary"
      subtitle="150 high-frequency academic words. Search, flip flashcards, and quiz yourself."
      backTo="/pte"
      backLabel="PTE Hub"
    >
      {/* Mastery tracker */}
      <div className="bg-white rounded-2xl p-5 border border-[#003580]/15 shadow-sm mb-5">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="text-[#003580]" size={20} />
          <h2 className="font-bold text-[#003580]">Mastery Progress</h2>
          <span className="ml-auto text-sm font-semibold text-[#003580]">
            {mastered.size} / {PTE_VOCAB_BANK.length} ({masteryPct}%)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#003580] to-[#0052cc]"
            initial={{ width: 0 }}
            animate={{ width: `${masteryPct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {syncing
            ? "Syncing your progress…"
            : userId
            ? "☁️ Synced to your account — progress follows you across devices."
            : "💾 Saved on this device. Sign in to sync progress across devices."}
        </p>
      </div>

      {/* Mode tabs + Quiz button */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: "list" as Mode, icon: BookOpen, label: "Word List" },
          { id: "flashcard" as Mode, icon: Layers, label: "Flashcards" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setMode(t.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              mode === t.id
                ? "bg-[#003580] text-white"
                : "bg-white text-[#003580] border border-[#003580]/20 hover:bg-[#003580]/5"
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
        <button
          onClick={startQuiz}
          className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm hover:shadow-md transition-shadow"
        >
          <Sparkles size={16} /> Quick Quiz (10 Qs)
        </button>
      </div>

      {/* Search + filter (hidden in quiz mode) */}
      {mode !== "quiz" && (
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by word, meaning, or example..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-[#003580]/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003580]/30 bg-white"
            />
          </div>
          <select
            value={posFilter}
            onChange={e => setPosFilter(e.target.value)}
            className="px-3 py-2.5 border border-[#003580]/20 rounded-lg text-sm bg-white text-[#003580] font-semibold focus:outline-none focus:ring-2 focus:ring-[#003580]/30"
          >
            {posOptions.map(p => (
              <option key={p} value={p}>{p === "all" ? "All Parts" : p}</option>
            ))}
          </select>
        </div>
      )}

      {/* ===== LIST MODE ===== */}
      {mode === "list" && (
        <div>
          <p className="text-xs text-slate-500 mb-3">{filtered.length} words</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map(w => {
              const isMastered = mastered.has(w.word);
              return (
                <div
                  key={w.word}
                  className={`bg-white rounded-xl p-4 border transition-all ${
                    isMastered
                      ? "border-emerald-300 bg-emerald-50/30"
                      : "border-[#003580]/15 hover:border-[#003580]/30"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-[#003580] text-lg">{w.word}</h3>
                        <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-[#003580]/10 text-[#003580] font-semibold">
                          {w.partOfSpeech}
                        </span>
                        <button
                          onClick={() => speak(w.word)}
                          className="text-[#003580]/60 hover:text-[#003580] transition-colors"
                          aria-label={`Pronounce ${w.word}`}
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                      <p className="text-sm text-slate-700 mt-1 leading-relaxed">{w.meaning}</p>
                      <p className="text-xs text-slate-500 italic mt-1.5 leading-relaxed">
                        e.g. {w.example}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleMastered(w.word)}
                      className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                        isMastered
                          ? "text-amber-500 hover:bg-amber-50"
                          : "text-slate-300 hover:text-amber-400 hover:bg-amber-50"
                      }`}
                      aria-label={isMastered ? "Unmark mastered" : "Mark mastered"}
                    >
                      <Star size={20} fill={isMastered ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-slate-500 py-8 text-sm">
                No words match your search.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ===== FLASHCARD MODE ===== */}
      {mode === "flashcard" && flashCard && (
        <div>
          <p className="text-xs text-slate-500 mb-3 text-center">
            Card {flashIdx + 1} of {filtered.length}
          </p>
          <div
            onClick={() => setFlipped(f => !f)}
            className="relative cursor-pointer min-h-[320px] sm:min-h-[360px] mb-4"
            style={{ perspective: "1000px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${flashCard.word}-${flipped}`}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 rounded-2xl p-6 sm:p-10 grid place-items-center text-center shadow-lg ${
                  flipped
                    ? "bg-gradient-to-br from-[#0052cc] to-[#003580] text-white"
                    : "bg-white border-2 border-[#003580]/20"
                }`}
              >
                {!flipped ? (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#003580]/60 font-semibold mb-2">
                      {flashCard.partOfSpeech}
                    </p>
                    <h2 className="text-3xl sm:text-5xl font-bold text-[#003580] mb-3">
                      {flashCard.word}
                    </h2>
                    <button
                      onClick={(e) => { e.stopPropagation(); speak(flashCard.word); }}
                      className="inline-flex items-center gap-1 text-sm text-[#003580]/70 hover:text-[#003580] transition-colors"
                    >
                      <Volume2 size={16} /> Listen
                    </button>
                    <p className="text-xs text-slate-500 mt-6">Tap card to reveal meaning</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">Meaning</p>
                    <p className="text-xl sm:text-2xl font-semibold leading-relaxed mb-4">
                      {flashCard.meaning}
                    </p>
                    <p className="text-sm sm:text-base italic text-white/85 leading-relaxed">
                      "{flashCard.example}"
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFlashPrev}
              className="px-4 py-2 rounded-lg bg-white border border-[#003580]/20 text-[#003580] font-semibold inline-flex items-center gap-1 hover:bg-[#003580]/5"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button
              onClick={() => toggleMastered(flashCard.word)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
                mastered.has(flashCard.word)
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-200"
              }`}
            >
              <Star size={16} fill={mastered.has(flashCard.word) ? "currentColor" : "none"} />
              {mastered.has(flashCard.word) ? "Mastered" : "Mark as Mastered"}
            </button>
            <button
              onClick={handleFlashNext}
              className="px-4 py-2 rounded-lg bg-[#003580] text-white font-semibold inline-flex items-center gap-1 hover:bg-[#0052cc]"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ===== QUIZ MODE ===== */}
      {mode === "quiz" && quizQs.length > 0 && !quizDone && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#003580]/15 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#003580]">
              Question {quizIdx + 1} / {quizQs.length}
            </span>
            <span className="text-xs font-semibold text-emerald-600">Score: {quizScore}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
            <motion.div
              className="h-full bg-[#003580]"
              animate={{ width: `${((quizIdx + 1) / quizQs.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="text-sm text-slate-500 mb-1">What does this word mean?</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003580] mb-1">
            {quizQs[quizIdx].word.word}
          </h2>
          <p className="text-xs text-slate-500 mb-5 italic">({quizQs[quizIdx].word.partOfSpeech})</p>

          <div className="space-y-2">
            {quizQs[quizIdx].options.map((opt, i) => {
              const isCorrect = i === quizQs[quizIdx].correctIndex;
              const isPicked = quizPick === i;
              const showResult = quizPick !== null;
              return (
                <button
                  key={i}
                  onClick={() => handleQuizPick(i)}
                  disabled={showResult}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 text-sm transition-all ${
                    !showResult
                      ? "border-slate-200 hover:border-[#003580] hover:bg-[#003580]/5"
                      : isCorrect
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : isPicked
                      ? "border-rose-500 bg-rose-50 text-rose-900"
                      : "border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#003580] text-xs w-5">{String.fromCharCode(65 + i)}.</span>
                    <span className="flex-1">{opt}</span>
                    {showResult && isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                    {showResult && isPicked && !isCorrect && <XCircle size={18} className="text-rose-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {quizPick !== null && (
            <button
              onClick={handleQuizNext}
              className="mt-5 w-full py-3 rounded-lg bg-[#003580] text-white font-bold hover:bg-[#0052cc] transition-colors"
            >
              {quizIdx + 1 >= quizQs.length ? "See Results" : "Next Question →"}
            </button>
          )}
        </div>
      )}

      {/* ===== QUIZ DONE ===== */}
      {mode === "quiz" && quizDone && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#003580]/15 shadow-sm text-center">
          <Trophy size={56} className="mx-auto text-amber-500 mb-3" />
          <h2 className="text-2xl font-bold text-[#003580]">Quiz Complete!</h2>
          <p className="text-5xl font-bold my-4 text-[#003580]">
            {quizScore} / {quizQs.length}
          </p>
          <p className="text-sm text-slate-600 mb-6">
            {quizScore >= 8
              ? "🔥 Excellent! You're PTE-ready."
              : quizScore >= 5
              ? "👍 Solid effort. Keep practicing the trickier ones."
              : "💪 Time to study more flashcards. You've got this!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={startQuiz}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#003580] text-white font-bold hover:bg-[#0052cc]"
            >
              <RotateCw size={16} /> Try Again
            </button>
            <button
              onClick={() => setMode("flashcard")}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-white border border-[#003580]/20 text-[#003580] font-bold hover:bg-[#003580]/5"
            >
              <Layers size={16} /> Back to Flashcards
            </button>
          </div>
        </div>
      )}
    </PteShell>
  );
};

export default PteVocabulary;
