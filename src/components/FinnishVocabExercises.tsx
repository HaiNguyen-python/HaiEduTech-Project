// Finnish Vocabulary Exercise System - 4 interactive modes for YKI A2 prep
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Check, X, Clock, Shuffle, ArrowRight, RotateCcw, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FinnishVocabEntry } from "@/data/finnishCurriculum/types";
import { playFinnishTts } from "@/lib/finnishTts";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import { supabase } from "@/integrations/supabase/client";

interface FinnishVocabExercisesProps {
  vocabulary: FinnishVocabEntry[];
  onExerciseComplete?: (score: number, total: number) => void;
}

const speakFinnish = (text: string) => {
  void playFinnishTts(text).then((played) => {
    if (!played) {
      toast.error("Không thể phát âm chuẩn tiếng Phần Lan trên thiết bị này.");
    }
  });
};

// Shuffle utility
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

// ============ WORD MATCHING ============
const WordMatching = ({ vocabulary, onComplete }: { vocabulary: FinnishVocabEntry[]; onComplete?: (s: number, t: number) => void }) => {
  const items = useMemo(() => shuffle(vocabulary).slice(0, 8), [vocabulary]);
  const [selectedFi, setSelectedFi] = useState<number | null>(null);
  const [selectedEn, setSelectedEn] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<[number, number] | null>(null);
  const [attempts, setAttempts] = useState(0);

  const shuffledEn = useMemo(() => {
    const indexed = items.map((v, i) => ({ meaning: v.meaningEn, idx: i }));
    return shuffle(indexed);
  }, [items]);

  useEffect(() => {
    if (selectedFi !== null && selectedEn !== null) {
      setAttempts(a => a + 1);
      if (selectedFi === selectedEn) {
        setMatched(prev => new Set([...prev, selectedFi]));
        setSelectedFi(null);
        setSelectedEn(null);
        if (matched.size + 1 === items.length) {
          onComplete?.(items.length, items.length);
        }
      } else {
        setWrong([selectedFi, selectedEn]);
        setTimeout(() => {
          setWrong(null);
          setSelectedFi(null);
          setSelectedEn(null);
        }, 800);
      }
    }
  }, [selectedFi, selectedEn]);

  const reset = () => { setMatched(new Set()); setSelectedFi(null); setSelectedEn(null); setWrong(null); setAttempts(0); };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground">🔗 Word Matching</h4>
        <Badge variant="outline">{matched.size}/{items.length} matched</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Click a Finnish word, then click its English meaning.</p>
      <div className="grid grid-cols-2 gap-4">
        {/* Finnish column */}
        <div className="space-y-2">
          {items.map((v, i) => (
            <button
              key={`fi-${i}`}
              disabled={matched.has(i)}
              onClick={() => setSelectedFi(i)}
              className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm font-medium transition-all
                ${matched.has(i) ? "bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60" :
                  selectedFi === i ? "bg-[#003580]/10 border-[#003580] text-[#003580]" :
                  wrong?.[0] === i ? "bg-red-50 border-red-400 text-red-600" :
                  "bg-card border-border hover:border-[#003580]/40"}`}
            >
              <button onClick={(e) => { e.stopPropagation(); speakFinnish(v.word); }} className="inline mr-1.5">
                <Volume2 className="w-3.5 h-3.5 inline text-[#003580]" />
              </button>
              {v.word}
            </button>
          ))}
        </div>
        {/* English column */}
        <div className="space-y-2">
          {shuffledEn.map((item, i) => (
            <button
              key={`en-${i}`}
              disabled={matched.has(item.idx)}
              onClick={() => setSelectedEn(item.idx)}
              className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all
                ${matched.has(item.idx) ? "bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60" :
                  selectedEn === item.idx ? "bg-[#003580]/10 border-[#003580] text-[#003580]" :
                  wrong?.[1] === item.idx ? "bg-red-50 border-red-400 text-red-600" :
                  "bg-card border-border hover:border-[#003580]/40"}`}
            >
              {item.meaning}
            </button>
          ))}
        </div>
      </div>
      {matched.size === items.length && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
          <p className="text-lg font-bold text-emerald-600 mb-2">Hienoa! All matched! 🎉</p>
          <p className="text-sm text-muted-foreground mb-3">Completed in {attempts} attempts</p>
          <Button size="sm" variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" /> Try Again</Button>
        </motion.div>
      )}
    </div>
  );
};

// ============ SENTENCE GAP FILL ============
const SentenceGapFill = ({ vocabulary, onComplete }: { vocabulary: FinnishVocabEntry[]; onComplete?: (s: number, t: number) => void }) => {
  const sentences = useMemo(() => {
    return shuffle(
      vocabulary.filter(v => v.example && new RegExp(v.word, "i").test(v.example))
    )
      .slice(0, 6)
      .map(v => ({
        word: v.word,
        sentence: v.example.replace(new RegExp(v.word, "i"), "___"),
        original: v.example,
        hint: v.meaningEn,
      }));
  }, [vocabulary]);

  const [answers, setAnswers] = useState<string[]>(Array(sentences.length).fill(""));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (i: number, val: string) => {
    const next = [...answers];
    next[i] = val;
    setAnswers(next);
  };

  const score = useMemo(() => {
    if (!submitted) return 0;
    return sentences.reduce((acc, s, i) => acc + (answers[i].toLowerCase().trim() === s.word.toLowerCase() ? 1 : 0), 0);
  }, [submitted, answers, sentences]);

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete?.(score, sentences.length);
  };

  const reset = () => { setAnswers(Array(sentences.length).fill("")); setSubmitted(false); };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground">📝 Sentence Gap Fill</h4>
        {submitted && <Badge className={score >= sentences.length * 0.7 ? "bg-emerald-500" : "bg-amber-500"}>{score}/{sentences.length}</Badge>}
      </div>
      <p className="text-sm text-muted-foreground mb-4">Fill in the missing Finnish word. Hint: the English meaning is shown.</p>
      <div className="space-y-4">
        {sentences.map((s, i) => (
          <div key={i} className="space-y-1">
            <p className="text-sm text-foreground font-medium">{i + 1}. {s.sentence}</p>
            <p className="text-xs text-muted-foreground italic">Hint: {s.hint}</p>
            <div className="flex gap-2 items-center">
              <Input
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={submitted}
                placeholder="Type the Finnish word..."
                className="max-w-xs text-sm"
              />
              {submitted && (
                answers[i].toLowerCase().trim() === s.word.toLowerCase()
                  ? <Check className="w-5 h-5 text-emerald-500" />
                  : <span className="text-sm text-red-500 flex items-center gap-1"><X className="w-4 h-4" /> {s.word}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={answers.every(a => !a.trim())}>
            <Check className="w-4 h-4 mr-1" /> Check Answers
          </Button>
        ) : (
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" /> Retry</Button>
        )}
      </div>
    </div>
  );
};

// ============ TRANSLATION CHALLENGE ============
const TranslationChallenge = ({ vocabulary, onComplete }: { vocabulary: FinnishVocabEntry[]; onComplete?: (s: number, t: number) => void }) => {
  const words = useMemo(() => shuffle(vocabulary).slice(0, 8), [vocabulary]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const word = words[current];
  const isCorrect = answer.toLowerCase().trim() === word?.word.toLowerCase();

  const handleCheck = () => {
    setShowResult(true);
    setResults(prev => [...prev, isCorrect]);
    if (isCorrect) speakFinnish(word.word);
  };

  const handleNext = () => {
    setShowResult(false);
    setAnswer("");
    if (current + 1 < words.length) {
      setCurrent(c => c + 1);
    } else {
      const s = results.filter(Boolean).length + (isCorrect ? 1 : 0);
      onComplete?.(s, words.length);
    }
  };

  const reset = () => { setCurrent(0); setAnswer(""); setResults([]); setShowResult(false); };
  const finished = current >= words.length || (current === words.length - 1 && showResult);
  const finalScore = results.filter(Boolean).length;

  if (!word && finished) {
    return (
      <div className="text-center py-6">
        <p className="text-2xl font-bold text-foreground mb-2">{finalScore}/{words.length}</p>
        <p className="text-sm text-muted-foreground mb-4">{finalScore >= words.length * 0.7 ? "Mahtavaa! 🎉" : "Yritä uudelleen! 💪"}</p>
        <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" /> Try Again</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground">🔄 Translation Challenge</h4>
        <Badge variant="outline">{current + 1}/{words.length}</Badge>
      </div>
      <Progress value={((current) / words.length) * 100} className="h-1.5 mb-4" />
      <p className="text-sm text-muted-foreground mb-2">Type the Finnish word for:</p>

      <Card className="mb-4 border-[#003580]/15">
        <CardContent className="p-5 text-center">
          <p className="text-xl font-bold text-[#003580] mb-1">{word.meaningEn}</p>
          <p className="text-sm text-muted-foreground">{word.meaningVi}</p>
        </CardContent>
      </Card>

      <div className="flex gap-2 items-center mb-4">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !showResult) handleCheck(); if (e.key === "Enter" && showResult) handleNext(); }}
          disabled={showResult}
          placeholder="Type Finnish word..."
          className="text-lg"
          autoFocus
        />
        {!showResult ? (
          <Button onClick={handleCheck} disabled={!answer.trim()}>Check</Button>
        ) : (
          <Button onClick={handleNext}><ArrowRight className="w-4 h-4" /></Button>
        )}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`p-3 rounded-lg ${isCorrect ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
            {isCorrect ? (
              <p className="text-emerald-700 font-medium flex items-center gap-2"><Check className="w-4 h-4" /> Oikein! ✨</p>
            ) : (
              <div>
                <p className="text-red-700 font-medium flex items-center gap-2"><X className="w-4 h-4" /> Incorrect</p>
                <p className="text-sm text-red-600 mt-1">Correct: <strong>{word.word}</strong></p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============ FLASHCARD RAPID FIRE ============
const FlashcardRapidFire = ({ vocabulary, onComplete }: { vocabulary: FinnishVocabEntry[]; onComplete?: (s: number, t: number) => void }) => {
  const cards = useMemo(() => shuffle(vocabulary).slice(0, 10), [vocabulary]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const card = cards[current];

  // Generate 4 options (1 correct + 3 wrong)
  const options = useMemo(() => {
    if (!card) return [];
    const wrong = shuffle(vocabulary.filter(v => v.word !== card.word)).slice(0, 3).map(v => v.meaningEn);
    const all = shuffle([...wrong, card.meaningEn]);
    return all;
  }, [card, vocabulary]);

  // Timer
  useEffect(() => {
    if (gameOver || !card) return;
    if (timeLeft <= 0) {
      handleNext(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameOver, card]);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = options[i] === card.meaningEn;
    if (correct) {
      setScore(s => s + 1);
      speakFinnish(card.word);
    }
    setTimeout(() => handleNext(correct), 800);
  };

  const handleNext = (wasCorrect?: boolean) => {
    setSelected(null);
    setTimeLeft(10);
    if (current + 1 >= cards.length) {
      const finalScore = score + (wasCorrect ? 1 : 0);
      setGameOver(true);
      onComplete?.(finalScore, cards.length);
    } else {
      setCurrent(c => c + 1);
    }
  };

  const reset = () => { setCurrent(0); setScore(0); setTimeLeft(10); setGameOver(false); setSelected(null); };

  if (gameOver) {
    return (
      <div className="text-center py-8">
        <Zap className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <p className="text-2xl font-bold text-foreground mb-1">{score}/{cards.length}</p>
        <p className="text-sm text-muted-foreground mb-4">{score >= cards.length * 0.7 ? "Loistavaa! Lightning fast! ⚡" : "Keep practicing! 💪"}</p>
        <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" /> Play Again</Button>
      </div>
    );
  }

  if (!card) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground">⚡ Flashcard Rapid Fire</h4>
        <div className="flex items-center gap-3">
          <Badge variant="outline">{current + 1}/{cards.length}</Badge>
          <Badge className={timeLeft <= 3 ? "bg-red-500" : "bg-[#003580]"}>
            <Clock className="w-3 h-3 mr-1" />{timeLeft}s
          </Badge>
        </div>
      </div>
      <Progress value={(timeLeft / 10) * 100} className="h-1.5 mb-4" />

      <Card className="mb-4 border-[#003580]/15">
        <CardContent className="p-6 text-center">
          <button onClick={() => speakFinnish(card.word)} className="mb-2">
            <Volume2 className="w-5 h-5 text-[#003580] mx-auto" />
          </button>
          <p className="text-2xl font-bold text-foreground">{card.word}</p>
          {card.puhekieli && <p className="text-xs text-muted-foreground mt-1">Puhekieli: {card.puhekieli}</p>}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, i) => {
          const isCorrectOpt = opt === card.meaningEn;
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`p-3 rounded-lg border text-sm font-medium transition-all
                ${selected !== null
                  ? isCorrectOpt ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                    : isSelected ? "bg-red-50 border-red-400 text-red-600"
                    : "bg-card border-border opacity-50"
                  : "bg-card border-border hover:border-[#003580]/40 hover:bg-[#003580]/5"}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Helper: save Finnish vocab score
const saveFinnishScore = async (score: number, total: number) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await (supabase as any).from("game_scores").insert({
        user_id: user.id, score, game_type: "vocab-finnish", max_streak: 0,
        accuracy: total > 0 ? Math.round((score / total) * 100) : 0,
      });
    }
  } catch (e) {
    console.error("Failed to save Finnish vocab score:", e);
  }
};

// ============ MAIN EXERCISES COMPONENT ============
const FinnishVocabExercises = ({ vocabulary, onExerciseComplete }: FinnishVocabExercisesProps) => {
  const [lastScore, setLastScore] = useState<number | null>(null);
  const scoreSavedRef = useRef(false);

  const handleComplete = (score: number, total: number) => {
    setLastScore(score);
    if (!scoreSavedRef.current) {
      scoreSavedRef.current = true;
      saveFinnishScore(score, total);
    }
    onExerciseComplete?.(score, total);
  };

  // Reset saved flag when tab changes
  const handleTabChange = () => {
    setLastScore(null);
    scoreSavedRef.current = false;
  };

  if (!vocabulary || vocabulary.length < 4) {
    return (
      <Card className="border-[#003580]/10">
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>Not enough vocabulary for exercises. Need at least 4 words.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Shuffle className="w-5 h-5 text-[#003580]" /> Harjoitukset (Exercises)
      </h3>
      <Tabs defaultValue="matching" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-4 w-full max-w-xl h-10 mb-4">
          <TabsTrigger value="matching" className="text-xs">🔗 Match</TabsTrigger>
          <TabsTrigger value="gapfill" className="text-xs">📝 Gap Fill</TabsTrigger>
          <TabsTrigger value="translate" className="text-xs">🔄 Translate</TabsTrigger>
          <TabsTrigger value="rapid" className="text-xs">⚡ Rapid</TabsTrigger>
        </TabsList>

        <Card className="border-[#003580]/10">
          <CardContent className="p-5">
            <TabsContent value="matching">
              <WordMatching vocabulary={vocabulary} onComplete={handleComplete} />
            </TabsContent>
            <TabsContent value="gapfill">
              <SentenceGapFill vocabulary={vocabulary} onComplete={handleComplete} />
            </TabsContent>
            <TabsContent value="translate">
              <TranslationChallenge vocabulary={vocabulary} onComplete={handleComplete} />
            </TabsContent>
            <TabsContent value="rapid">
              <FlashcardRapidFire vocabulary={vocabulary} onComplete={handleComplete} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {lastScore !== null && (
        <div className="mt-4 max-w-sm mx-auto">
          <GameLeaderboard gameType="vocab-finnish" currentScore={lastScore} />
        </div>
      )}
    </div>
  );
};

export default FinnishVocabExercises;
