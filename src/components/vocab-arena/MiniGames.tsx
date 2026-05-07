import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Brain, Target, Keyboard, User, Users, Trophy, Timer, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsVocabData, type IeltsWord } from "@/data/ieltsVocabData";
import confetti from "canvas-confetti";

type Game = "menu" | "memory" | "hunt" | "sprint";
type Mode = "solo" | "team";

const shuffle = <T,>(a: T[]) => {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
};

const burst = () =>
  confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

interface Props {
  onBack: () => void;
}

const MiniGames = ({ onBack }: Props) => {
  const { t } = useLanguage();
  const [game, setGame] = useState<Game>("menu");
  const [mode, setMode] = useState<Mode>("solo");

  if (game === "menu") {
    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại", "Back")}
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4" /> {t("Mini Games", "Mini Games")}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-2">
            {t("Trò chơi", "Fun")}{" "}
            <span className="text-gradient">{t("Từ vựng", "Vocab Games")}</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            {t("Chơi solo hoặc chia lượt cùng bạn (2 người 1 máy)", "Play solo or take turns with a friend (2 players, 1 device)")}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setMode("solo")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === "solo" ? "bg-primary text-primary-foreground shadow-lg" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" /> Solo
          </button>
          <button
            onClick={() => setMode("team")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === "team" ? "bg-amber-500 text-white shadow-lg" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4" /> {t("Đội (2 người)", "Team (2P)")}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <GameCard
            icon={<Brain className="w-7 h-7 text-purple-500" />}
            color="purple"
            title={t("Lật thẻ ghi nhớ", "Memory Match")}
            desc={t("Ghép từ với định nghĩa", "Match word ↔ definition pairs")}
            onClick={() => setGame("memory")}
          />
          <GameCard
            icon={<Target className="w-7 h-7 text-rose-500" />}
            color="rose"
            title={t("Săn từ", "Word Hunt")}
            desc={t("Chọn đúng từ theo định nghĩa", "Pick the word that fits the clue")}
            onClick={() => setGame("hunt")}
          />
          <GameCard
            icon={<Keyboard className="w-7 h-7 text-emerald-500" />}
            color="emerald"
            title={t("Gõ tốc độ", "Definition Sprint")}
            desc={t("Gõ từ đúng theo IPA + định nghĩa", "Type the word from IPA + definition")}
            onClick={() => setGame("sprint")}
          />
        </div>
      </div>
    );
  }

  if (game === "memory") return <MemoryMatch mode={mode} onExit={() => setGame("menu")} />;
  if (game === "hunt") return <WordHunt mode={mode} onExit={() => setGame("menu")} />;
  if (game === "sprint") return <DefinitionSprint mode={mode} onExit={() => setGame("menu")} />;
  return null;
};

const GameCard = ({ icon, color, title, desc, onClick }: { icon: React.ReactNode; color: "purple" | "rose" | "emerald"; title: string; desc: string; onClick: () => void }) => {
  const bg = color === "purple" ? "bg-purple-500/10" : color === "rose" ? "bg-rose-500/10" : "bg-emerald-500/10";
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="text-left rounded-2xl border-2 border-border bg-card p-6 hover:border-primary/50 transition-all"
    >
      <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-4`}>{icon}</div>
      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </motion.button>
  );
};

// ============ Shared header ============
const GameHeader = ({ title, mode, onExit, currentPlayer, scoreA, scoreB }: { title: string; mode: Mode; onExit: () => void; currentPlayer?: 1 | 2; scoreA: number; scoreB?: number }) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <button onClick={onExit} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> {t("Thoát", "Exit")}
      </button>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="flex items-center gap-2">
        {mode === "solo" ? (
          <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center gap-1">
            <Trophy className="w-4 h-4" /> {scoreA}
          </span>
        ) : (
          <>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-all ${currentPlayer === 1 ? "bg-blue-500 text-white scale-110" : "bg-blue-500/10 text-blue-500"}`}>
              P1: {scoreA}
            </span>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-all ${currentPlayer === 2 ? "bg-rose-500 text-white scale-110" : "bg-rose-500/10 text-rose-500"}`}>
              P2: {scoreB ?? 0}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// ============ MEMORY MATCH ============
interface Card {
  id: number;
  pairId: number;
  type: "word" | "def";
  text: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryMatch = ({ mode, onExit }: { mode: Mode; onExit: () => void }) => {
  const { t } = useLanguage();
  const PAIRS = 8;
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  const init = useCallback(() => {
    const picks = shuffle(ieltsVocabData).slice(0, PAIRS);
    const deck: Card[] = [];
    picks.forEach((w, i) => {
      deck.push({ id: i * 2, pairId: i, type: "word", text: w.word, flipped: false, matched: false });
      deck.push({ id: i * 2 + 1, pairId: i, type: "def", text: w.definition.en, flipped: false, matched: false });
    });
    setCards(shuffle(deck));
    setFlipped([]);
    setScoreA(0);
    setScoreB(0);
    setPlayer(1);
    setMoves(0);
    setDone(false);
  }, []);

  useEffect(() => { init(); }, [init]);

  const handleFlip = (id: number) => {
    if (flipped.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || card.flipped) return;
    const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(next);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped.map((fid) => next.find((c) => c.id === fid)!);
      if (a.pairId === b.pairId) {
        setTimeout(() => {
          const matched = next.map((c) => (c.pairId === a.pairId ? { ...c, matched: true } : c));
          setCards(matched);
          setFlipped([]);
          if (mode === "solo") setScoreA((s) => s + 10);
          else if (player === 1) setScoreA((s) => s + 10);
          else setScoreB((s) => s + 10);
          if (matched.every((c) => c.matched)) {
            setDone(true);
            burst();
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(next.map((c) => (newFlipped.includes(c.id) ? { ...c, flipped: false } : c)));
          setFlipped([]);
          if (mode === "team") setPlayer((p) => (p === 1 ? 2 : 1));
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <GameHeader title={t("Lật thẻ ghi nhớ", "Memory Match")} mode={mode} onExit={onExit} currentPlayer={player} scoreA={scoreA} scoreB={scoreB} />
      <p className="text-sm text-muted-foreground text-center mb-4">
        {t(`Lượt: ${moves} • Tìm cặp từ ↔ định nghĩa`, `Moves: ${moves} • Match word ↔ definition`)}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((c) => (
          <motion.button
            key={c.id}
            onClick={() => handleFlip(c.id)}
            disabled={c.matched || c.flipped}
            className={`aspect-[3/4] rounded-xl border-2 p-3 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center text-center ${
              c.matched
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-700 dark:text-emerald-300"
                : c.flipped
                ? c.type === "word"
                  ? "bg-primary/10 border-primary/40 text-foreground"
                  : "bg-amber-500/10 border-amber-500/40 text-foreground"
                : "bg-gradient-to-br from-primary to-primary-glow border-primary text-primary-foreground"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {c.flipped || c.matched ? c.text : "?"}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl bg-card border-2 border-primary text-center"
          >
            <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-2" />
            <h3 className="text-xl font-bold mb-2">
              {mode === "solo"
                ? t(`Hoàn thành! ${scoreA} điểm trong ${moves} lượt`, `Done! ${scoreA} pts in ${moves} moves`)
                : scoreA === scoreB
                ? t("Hòa!", "It's a tie!")
                : scoreA > scoreB
                ? t(`Người chơi 1 thắng! ${scoreA}-${scoreB}`, `Player 1 wins! ${scoreA}-${scoreB}`)
                : t(`Người chơi 2 thắng! ${scoreB}-${scoreA}`, `Player 2 wins! ${scoreB}-${scoreA}`)}
            </h3>
            <Button onClick={init} className="mt-2 gap-2"><RotateCcw className="w-4 h-4" /> {t("Chơi lại", "Play again")}</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============ WORD HUNT ============
const WordHunt = ({ mode, onExit }: { mode: Mode; onExit: () => void }) => {
  const { t } = useLanguage();
  const ROUNDS = 10;
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);

  const questions = useMemo(() => {
    return shuffle(ieltsVocabData).slice(0, ROUNDS).map((correct) => {
      const distractors = shuffle(ieltsVocabData.filter((w) => w.word !== correct.word)).slice(0, 8);
      const options = shuffle([correct, ...distractors]);
      return { correct, options };
    });
  }, []);

  const q = questions[round];

  useEffect(() => {
    if (done || picked) return;
    setTimeLeft(15);
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          handlePick("__timeout__");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done]);

  const handlePick = (word: string) => {
    if (picked) return;
    setPicked(word);
    const correct = word === q.correct.word;
    if (correct) {
      const pts = 10 + Math.round(timeLeft / 2);
      if (mode === "solo") setScoreA((s) => s + pts);
      else if (player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
      burst();
    }
    setTimeout(() => {
      if (round + 1 >= ROUNDS) { setDone(true); return; }
      setRound((r) => r + 1);
      setPicked(null);
      if (mode === "team") setPlayer((p) => (p === 1 ? 2 : 1));
    }, 1100);
  };

  if (done) {
    return (
      <div className="max-w-2xl mx-auto">
        <GameHeader title={t("Săn từ", "Word Hunt")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} />
        <div className="p-8 rounded-2xl bg-card border-2 border-primary text-center">
          <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-3">
            {mode === "solo"
              ? t(`Tổng điểm: ${scoreA}`, `Final score: ${scoreA}`)
              : scoreA === scoreB ? t("Hòa!", "Tie!") : scoreA > scoreB ? `🏆 P1 ${scoreA} - ${scoreB} P2` : `P1 ${scoreA} - ${scoreB} P2 🏆`}
          </h3>
          <Button onClick={() => window.location.reload()} className="gap-2"><RotateCcw className="w-4 h-4" /> {t("Chơi lại", "Play again")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <GameHeader title={t("Săn từ", "Word Hunt")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} />

      <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
        <span>{t(`Câu ${round + 1}/${ROUNDS}`, `Q ${round + 1}/${ROUNDS}`)}</span>
        <span className={`flex items-center gap-1 font-bold ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
          <Timer className="w-4 h-4" /> {timeLeft}s
        </span>
      </div>

      <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border-2 border-border mb-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{t("Định nghĩa", "Definition")}</p>
        <p className="text-lg font-semibold text-foreground mb-2">{q.correct.definition.en}</p>
        <p className="text-sm text-muted-foreground italic">{q.correct.definition.vi}</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-2">
        {q.options.map((o) => {
          const isCorrect = picked && o.word === q.correct.word;
          const isWrong = picked === o.word && o.word !== q.correct.word;
          return (
            <motion.button
              key={o.word}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePick(o.word)}
              disabled={!!picked}
              className={`px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                isCorrect ? "bg-emerald-500 text-white border-emerald-600" :
                isWrong ? "bg-red-500 text-white border-red-600" :
                picked ? "bg-secondary border-border text-muted-foreground" :
                "bg-card border-border hover:border-primary hover:bg-primary/5 text-foreground"
              }`}
            >
              {o.word}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// ============ DEFINITION SPRINT ============
const DefinitionSprint = ({ mode, onExit }: { mode: Mode; onExit: () => void }) => {
  const { t } = useLanguage();
  const ROUNDS = 8;
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [hint, setHint] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [done, setDone] = useState(false);

  const words = useMemo(() => shuffle(ieltsVocabData).slice(0, ROUNDS), []);
  const w = words[round];

  useEffect(() => {
    if (done || feedback) return;
    setTimeLeft(20);
    setHint(0);
    setInput("");
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); submit(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done]);

  const submit = (timedOut = false) => {
    if (feedback) return;
    const correct = !timedOut && input.trim().toLowerCase() === w.word.toLowerCase();
    if (correct) {
      const pts = Math.max(5, 20 + timeLeft - hint * 3);
      if (mode === "solo") setScoreA((s) => s + pts);
      else if (player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
      setFeedback("correct");
      burst();
    } else {
      setFeedback("wrong");
    }
    setTimeout(() => {
      if (round + 1 >= ROUNDS) { setDone(true); return; }
      setRound((r) => r + 1);
      setFeedback(null);
      if (mode === "team") setPlayer((p) => (p === 1 ? 2 : 1));
    }, 1400);
  };

  const reveal = w?.word ?? "";
  const masked = reveal.split("").map((ch, i) => (i < hint || ch === " " ? ch : "_")).join(" ");

  if (done) {
    return (
      <div className="max-w-2xl mx-auto">
        <GameHeader title={t("Gõ tốc độ", "Definition Sprint")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} />
        <div className="p-8 rounded-2xl bg-card border-2 border-primary text-center">
          <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-3">
            {mode === "solo"
              ? t(`Tổng điểm: ${scoreA}`, `Final score: ${scoreA}`)
              : scoreA === scoreB ? t("Hòa!", "Tie!") : scoreA > scoreB ? `🏆 P1 ${scoreA} - ${scoreB} P2` : `P1 ${scoreA} - ${scoreB} P2 🏆`}
          </h3>
          <Button onClick={() => window.location.reload()} className="gap-2"><RotateCcw className="w-4 h-4" /> {t("Chơi lại", "Play again")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <GameHeader title={t("Gõ tốc độ", "Definition Sprint")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} />

      <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
        <span>{t(`Câu ${round + 1}/${ROUNDS}`, `Q ${round + 1}/${ROUNDS}`)}</span>
        <span className={`flex items-center gap-1 font-bold ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
          <Timer className="w-4 h-4" /> {timeLeft}s
        </span>
      </div>

      <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border-2 border-border mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("Định nghĩa", "Definition")}</p>
          <button onClick={() => speak(w.definition.en)} className="text-primary hover:scale-110 transition"><Volume2 className="w-4 h-4" /></button>
        </div>
        <p className="text-lg font-semibold text-foreground mb-2">{w.definition.en}</p>
        <p className="text-sm text-muted-foreground italic mb-3">{w.definition.vi}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <code className="px-2 py-1 rounded bg-secondary text-primary text-sm">{w.ipa}</code>
          <span className="text-2xl font-mono font-black tracking-widest text-primary">{masked}</span>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          disabled={!!feedback}
          placeholder={t("Gõ từ tại đây…", "Type the word…")}
          className={`flex-1 px-4 py-3 rounded-xl bg-secondary border-2 text-foreground font-semibold text-lg transition-all ${
            feedback === "correct" ? "border-emerald-500 bg-emerald-500/10" :
            feedback === "wrong" ? "border-red-500 bg-red-500/10" :
            "border-border focus:border-primary"
          }`}
          autoFocus
        />
        <Button onClick={() => submit()} disabled={!!feedback}>OK</Button>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setHint((h) => Math.min(h + 1, reveal.length - 1))}
          disabled={!!feedback || hint >= reveal.length - 1}
          className="text-xs text-amber-500 hover:underline disabled:opacity-50"
        >
          💡 {t("Gợi ý chữ tiếp theo (-3đ)", "Reveal next letter (-3pts)")}
        </button>
        {feedback === "wrong" && <span className="text-xs text-red-500">{t("Đáp án:", "Answer:")} <b>{w.word}</b></span>}
      </div>
    </div>
  );
};

export default MiniGames;
