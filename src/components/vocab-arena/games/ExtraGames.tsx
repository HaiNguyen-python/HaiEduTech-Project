// Four extra IELTS vocabulary mini games for the Vocab Arena.
// They reuse the existing FX hooks, combo multipliers, local high scores and
// the shared arena logging so scores reach the class leaderboard, the daily
// mission and the 3D Vocabulary Brain like Solo Challenge does.
import { useState, useEffect, useMemo, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Timer, RotateCcw, Volume2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsVocabData, type IeltsWord } from "@/data/ieltsVocabData";
import { sfx, saveHighScore, pickWords, type GameKey } from "../gameFx";
import { logArenaGame } from "../arenaScore";
import { ComboBadge, useGameFx, ShakeWrap, HighScorePanel } from "../GameEffects";

export type Mode = "solo" | "team";

interface GameProps {
  mode: Mode;
  onExit: () => void;
  onReplay: () => void;
}

const shuffle = <T,>(a: T[]) => {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const speak = (text: string, rate = 0.9) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  window.speechSynthesis.speak(u);
};

const Shell = ({
  title,
  mode,
  onExit,
  scoreA,
  scoreB,
  currentPlayer,
  combo,
  children,
}: {
  title: string;
  mode: Mode;
  onExit: () => void;
  scoreA: number;
  scoreB?: number;
  currentPlayer?: 1 | 2;
  combo?: number;
  children: ReactNode;
}) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <button onClick={onExit} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> {t("Thoát", "Exit")}
        </button>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {combo !== undefined && combo >= 2 && <ComboBadge combo={combo} />}
          {mode === "solo" ? (
            <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center gap-1">
              <Trophy className="w-4 h-4" /> {scoreA}
            </span>
          ) : (
            <>
              <span
                className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                  currentPlayer === 1 ? "bg-blue-500 text-white scale-110" : "bg-blue-500/10 text-blue-500"
                }`}
              >
                P1: {scoreA}
              </span>
              <span
                className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                  currentPlayer === 2 ? "bg-rose-500 text-white scale-110" : "bg-rose-500/10 text-rose-500"
                }`}
              >
                P2: {scoreB ?? 0}
              </span>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

const EndCard = ({
  mode,
  scoreA,
  scoreB,
  maxCombo,
  saved,
  gameKey,
  gameTitle,
  onReplay,
  onExit,
}: {
  mode: Mode;
  scoreA: number;
  scoreB: number;
  maxCombo: number;
  saved: { rank: number | null; isNew: boolean } | null;
  gameKey: GameKey;
  gameTitle: string;
  onReplay: () => void;
  onExit: () => void;
}) => {
  const { t } = useLanguage();
  return (
    <div className="p-8 rounded-2xl bg-card border-2 border-primary text-center">
      {saved?.isNew && (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black mb-3">
          <Crown className="w-3 h-3" /> {t("KỶ LỤC MỚI!", "NEW RECORD!")}
        </div>
      )}
      <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-3" />
      <h3 className="text-2xl font-bold mb-2">
        {mode === "solo"
          ? t(`Tổng điểm: ${scoreA}`, `Final score: ${scoreA}`)
          : scoreA === scoreB
          ? t("Hòa!", "Tie!")
          : scoreA > scoreB
          ? `🏆 P1 ${scoreA} - ${scoreB} P2`
          : `P1 ${scoreA} - ${scoreB} P2 🏆`}
      </h3>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4 text-sm">
        {maxCombo > 0 && (
          <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 font-bold">
            🔥 {t(`Combo cao nhất: ${maxCombo}`, `Max combo: ${maxCombo}`)}
          </span>
        )}
        {saved?.rank && mode === "solo" && (
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
            🏅 {t(`Hạng #${saved.rank} trên thiết bị`, `Rank #${saved.rank} on this device`)}
          </span>
        )}
      </div>
      {mode === "solo" && (
        <div className="max-w-sm mx-auto mb-4">
          <HighScorePanel game={gameKey} title={`Top ${gameTitle}`} highlight={scoreA} />
        </div>
      )}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button onClick={onReplay} className="gap-2">
          <RotateCcw className="w-4 h-4" /> {t("Chơi lại", "Play again")}
        </Button>
        <Button variant="outline" onClick={onExit} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> {t("Về menu game", "Back to games")}
        </Button>
      </div>
    </div>
  );
};

const TimerRow = ({ round, total, timeLeft }: { round: number; total: number; timeLeft: number }) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
      <span>{t(`Câu ${round + 1}/${total}`, `Q ${round + 1}/${total}`)}</span>
      <span className={`flex items-center gap-1 font-bold ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
        <Timer className="w-4 h-4" /> {timeLeft}s
      </span>
    </div>
  );
};

const optionClass = (state: "idle" | "correct" | "wrong" | "dim") =>
  `px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
    state === "correct"
      ? "bg-emerald-500 text-white border-emerald-600"
      : state === "wrong"
      ? "bg-red-500 text-white border-red-600"
      : state === "dim"
      ? "bg-secondary border-border text-muted-foreground"
      : "bg-card border-border hover:border-primary hover:bg-primary/5 text-foreground"
  }`;

// ============ 1. COLLOCATION SNAP ============
export const CollocationSnap = ({ mode, onExit, onReplay }: GameProps) => {
  const { t } = useLanguage();
  const ROUNDS = 10;
  const fx = useGameFx();
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState<{ rank: number | null; isNew: boolean } | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  // The head word is masked in every option, otherwise the correct phrase
  // literally contains the prompt word and the round gives itself away.
  const mask = (phrase: string, owner: string) => {
    const stem = owner.slice(0, Math.max(4, owner.length - 3));
    const masked = phrase.replace(new RegExp(`\\b${stem}\\w*`, "gi"), "___");
    return masked === phrase ? `___ ${phrase}` : masked;
  };

  const questions = useMemo(() => {
    const pool = ieltsVocabData.filter((w) => (w.collocations?.length ?? 0) > 0);
    const owned = pool.flatMap((w) => (w.collocations ?? []).map((c) => ({ phrase: c, owner: w.word })));
    return pickWords(pool, ROUNDS).map((target) => {
      const phrase = target.collocations![Math.floor(Math.random() * target.collocations!.length)];
      const correct = mask(phrase, target.word);
      const distractors = shuffle(owned.filter((o) => o.owner !== target.word))
        .map((o) => mask(o.phrase, o.owner))
        .filter((text, i, arr) => text !== correct && arr.indexOf(text) === i)
        .slice(0, 3);
      return { target, phrase: correct, options: shuffle([correct, ...distractors]) };
    });
  }, []);

  const q = questions[round];

  useEffect(() => {
    if (done || picked || !q) return;
    setTimeLeft(15);
    const id = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          handlePick("__timeout__");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done, q, picked]);

  useEffect(() => {
    if (!done || mode !== "solo" || saved) return;
    sfx("win");
    setSaved(saveHighScore("collocation", scoreA));
    void logArenaGame({
      game: "collocation",
      score: scoreA,
      accuracy: correctWords.length / ROUNDS,
      maxStreak: fx.maxCombo,
      correctWords,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, saved]);

  const handlePick = (value: string, evt?: MouseEvent<HTMLButtonElement>) => {
    if (picked || !q) return;
    setPicked(value);
    if (value === q.phrase) {
      setCorrectWords((prev) => [...prev, q.target.word]);
      const pts = fx.onCorrect(10 + Math.round(timeLeft / 2), { clientX: evt?.clientX, clientY: evt?.clientY });
      if (mode === "solo" || player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
    } else {
      fx.onWrong();
    }
    setTimeout(() => {
      if (round + 1 >= questions.length) {
        setDone(true);
        return;
      }
      setRound((r) => r + 1);
      setPicked(null);
      if (mode === "team") setPlayer((p) => (p === 1 ? 2 : 1));
    }, 1100);
  };

  const title = t("Ghép cụm từ", "Collocation Snap");

  if (done || !q) {
    return (
      <Shell title={title} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player}>
        <EndCard
          mode={mode}
          scoreA={scoreA}
          scoreB={scoreB}
          maxCombo={fx.maxCombo}
          saved={saved}
          gameKey="collocation"
          gameTitle={title}
          onReplay={onReplay}
          onExit={onExit}
        />
      </Shell>
    );
  }

  return (
    <ShakeWrap trigger={fx.shake}>
      <Shell title={title} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} combo={fx.combo}>
        <fx.FxOverlay />
        <TimerRow round={round} total={questions.length} timeLeft={timeLeft} />
        <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border-2 border-border mb-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            {t("Cụm từ nào đi với từ này?", "Which collocation goes with this word?")}
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <p className="text-3xl font-black text-foreground">{q.target.word}</p>
            <button onClick={() => speak(q.target.word)} className="text-primary hover:scale-110 transition">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground italic">{q.target.definition.vi}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-2">
          {q.options.map((o) => (
            <motion.button
              key={o}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handlePick(o, e)}
              disabled={!!picked}
              className={optionClass(
                picked && o === q.phrase ? "correct" : picked === o ? "wrong" : picked ? "dim" : "idle"
              )}
            >
              {o}
            </motion.button>
          ))}
        </div>
      </Shell>
    </ShakeWrap>
  );
};

// ============ 2. ODD ONE OUT ============
export const OddOneOut = ({ mode, onExit, onReplay }: GameProps) => {
  const { t } = useLanguage();
  const ROUNDS = 10;
  const fx = useGameFx();
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState<{ rank: number | null; isNew: boolean } | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const questions = useMemo(() => {
    // A round = 3 words from one topic + 1 intruder from a different topic.
    const byCategory = new Map<string, IeltsWord[]>();
    ieltsVocabData.forEach((w) => {
      const list = byCategory.get(w.category) ?? [];
      list.push(w);
      byCategory.set(w.category, list);
    });
    const usable = [...byCategory.entries()].filter(([, list]) => list.length >= 4);
    const rounds: { family: string; options: string[]; odd: string; kept: string[] }[] = [];
    if (usable.length < 2) return rounds;
    // Categories can be fewer than ROUNDS, so cycle through them until the
    // round list is full instead of ending the game after 3-4 questions.
    const order = shuffle(usable);
    for (let i = 0; rounds.length < ROUNDS && i < ROUNDS * 3; i++) {
      const [category, list] = order[i % order.length];
      const trio = shuffle(list).slice(0, 3);
      const trioWords = trio.map((w) => w.word);
      const otherCats = usable.filter(([c]) => c !== category);
      if (!otherCats.length) break;
      const [, otherList] = otherCats[Math.floor(Math.random() * otherCats.length)];
      // The intruder must not repeat a word already shown in the trio,
      // otherwise the round has two identical options and no valid answer.
      const odd = shuffle(otherList).find((w) => !trioWords.includes(w.word));
      if (!odd) continue;
      rounds.push({
        family: category,
        options: shuffle([...trioWords, odd.word]),
        odd: odd.word,
        kept: trioWords,
      });
    }
    return rounds;
  }, []);

  const q = questions[round];

  useEffect(() => {
    if (done || picked || !q) return;
    setTimeLeft(15);
    const id = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          handlePick("__timeout__");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done, q, picked]);

  useEffect(() => {
    if (!done || mode !== "solo" || saved) return;
    sfx("win");
    setSaved(saveHighScore("oddone", scoreA));
    void logArenaGame({
      game: "oddone",
      score: scoreA,
      accuracy: questions.length ? correctWords.length / (questions.length * 3) : 0,
      maxStreak: fx.maxCombo,
      correctWords,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, saved]);

  const handlePick = (value: string, evt?: MouseEvent<HTMLButtonElement>) => {
    if (picked || !q) return;
    setPicked(value);
    if (value === q.odd) {
      setCorrectWords((prev) => [...prev, ...q.kept]);
      const pts = fx.onCorrect(12 + Math.round(timeLeft / 2), { clientX: evt?.clientX, clientY: evt?.clientY });
      if (mode === "solo" || player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
    } else {
      fx.onWrong();
    }
    setTimeout(() => {
      if (round + 1 >= questions.length) {
        setDone(true);
        return;
      }
      setRound((r) => r + 1);
      setPicked(null);
      if (mode === "team") setPlayer((p) => (p === 1 ? 2 : 1));
    }, 1100);
  };

  const title = t("Tìm từ khác nhóm", "Odd One Out");

  if (done || !q) {
    return (
      <Shell title={title} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player}>
        <EndCard
          mode={mode}
          scoreA={scoreA}
          scoreB={scoreB}
          maxCombo={fx.maxCombo}
          saved={saved}
          gameKey="oddone"
          gameTitle={title}
          onReplay={onReplay}
          onExit={onExit}
        />
      </Shell>
    );
  }

  return (
    <ShakeWrap trigger={fx.shake}>
      <Shell title={title} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} combo={fx.combo}>
        <fx.FxOverlay />
        <TimerRow round={round} total={questions.length} timeLeft={timeLeft} />
        <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-card border-2 border-border mb-4 text-center">
          <p className="text-sm font-semibold text-foreground">
            {t("Ba từ cùng một chủ đề - hãy chọn từ không thuộc nhóm.", "Three words share a topic - pick the one that doesn't.")}
          </p>
          {picked && (
            <p className="text-xs text-muted-foreground mt-2">
              {t("Chủ đề", "Topic")}: <b>{q.family}</b>
            </p>
          )}
        </motion.div>
        <div className="grid grid-cols-2 gap-2">
          {q.options.map((o) => (
            <motion.button
              key={o}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handlePick(o, e)}
              disabled={!!picked}
              className={optionClass(picked && o === q.odd ? "correct" : picked === o ? "wrong" : picked ? "dim" : "idle")}
            >
              {o}
            </motion.button>
          ))}
        </div>
      </Shell>
    </ShakeWrap>
  );
};

// ============ 3. CONTEXT CLOZE RUSH ============
export const ContextClozeRush = ({ mode, onExit, onReplay }: GameProps) => {
  const { t } = useLanguage();
  const ROUNDS = 10;
  const fx = useGameFx();
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(18);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState<{ rank: number | null; isNew: boolean } | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const questions = useMemo(() => {
    const pool = ieltsVocabData.filter(
      (w) => w.example && w.example.toLowerCase().includes(w.word.toLowerCase().slice(0, Math.max(4, w.word.length - 3)))
    );
    return pickWords(pool.length >= ROUNDS ? pool : ieltsVocabData, ROUNDS).map((target) => {
      const stem = target.word.slice(0, Math.max(4, target.word.length - 3));
      const gapped = target.example.replace(new RegExp(`\\b${stem}\\w*`, "gi"), "_____");
      const distractors = shuffle(
        ieltsVocabData.filter((w) => w.word !== target.word && w.partOfSpeech === target.partOfSpeech).map((w) => w.word)
      ).slice(0, 3);
      const filler = shuffle(ieltsVocabData.map((w) => w.word).filter((w) => w !== target.word)).slice(0, 3);
      const wrongs = (distractors.length === 3 ? distractors : filler).slice(0, 3);
      return { target, sentence: gapped, options: shuffle([target.word, ...wrongs]) };
    });
  }, []);

  const q = questions[round];

  useEffect(() => {
    if (done || picked || !q) return;
    setTimeLeft(18);
    const id = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          handlePick("__timeout__");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done, q, picked]);

  useEffect(() => {
    if (!done || mode !== "solo" || saved) return;
    sfx("win");
    setSaved(saveHighScore("cloze", scoreA));
    void logArenaGame({
      game: "cloze",
      score: scoreA,
      accuracy: correctWords.length / ROUNDS,
      maxStreak: fx.maxCombo,
      correctWords,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, saved]);

  const handlePick = (value: string, evt?: MouseEvent<HTMLButtonElement>) => {
    if (picked || !q) return;
    setPicked(value);
    if (value === q.target.word) {
      setCorrectWords((prev) => [...prev, q.target.word]);
      const pts = fx.onCorrect(12 + Math.round(timeLeft / 2), { clientX: evt?.clientX, clientY: evt?.clientY });
      if (mode === "solo" || player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
    } else {
      fx.onWrong();
    }
    setTimeout(() => {
      if (round + 1 >= questions.length) {
        setDone(true);
        return;
      }
      setRound((r) => r + 1);
      setPicked(null);
      if (mode === "team") setPlayer((p) => (p === 1 ? 2 : 1));
    }, 1300);
  };

  const title = t("Điền từ trong ngữ cảnh", "Context Cloze Rush");

  if (done || !q) {
    return (
      <Shell title={title} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player}>
        <EndCard
          mode={mode}
          scoreA={scoreA}
          scoreB={scoreB}
          maxCombo={fx.maxCombo}
          saved={saved}
          gameKey="cloze"
          gameTitle={title}
          onReplay={onReplay}
          onExit={onExit}
        />
      </Shell>
    );
  }

  return (
    <ShakeWrap trigger={fx.shake}>
      <Shell title={title} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} combo={fx.combo}>
        <fx.FxOverlay />
        <TimerRow round={round} total={questions.length} timeLeft={timeLeft} />
        <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border-2 border-border mb-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{t("Điền vào chỗ trống", "Fill the gap")}</p>
          <p className="text-lg font-semibold text-foreground leading-relaxed">{q.sentence}</p>
          {picked && (
            <p className="text-sm text-muted-foreground italic mt-3">
              {q.target.word} - {q.target.definition.vi}
            </p>
          )}
        </motion.div>
        <div className="grid grid-cols-2 gap-2">
          {q.options.map((o) => (
            <motion.button
              key={o}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handlePick(o, e)}
              disabled={!!picked}
              className={optionClass(
                picked && o === q.target.word ? "correct" : picked === o ? "wrong" : picked ? "dim" : "idle"
              )}
            >
              {o}
            </motion.button>
          ))}
        </div>
      </Shell>
    </ShakeWrap>
  );
};

// ============ 4. LISTENING CATCH ============
export const ListeningCatch = ({ mode, onExit, onReplay }: GameProps) => {
  const { t } = useLanguage();
  const ROUNDS = 10;
  const fx = useGameFx();
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState<{ rank: number | null; isNew: boolean } | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const words = useMemo(() => pickWords(ieltsVocabData, ROUNDS), []);
  const w = words[round];

  useEffect(() => {
    if (done || feedback || !w) return;
    setInput("");
    setTimeLeft(20);
    speak(w.word);
    const id = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          submit(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done, w, feedback]);

  useEffect(() => {
    if (!done || mode !== "solo" || saved) return;
    sfx("win");
    setSaved(saveHighScore("listen", scoreA));
    void logArenaGame({
      game: "listen",
      score: scoreA,
      accuracy: correctWords.length / ROUNDS,
      maxStreak: fx.maxCombo,
      correctWords,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, saved]);

  const submit = (timedOut = false) => {
    if (feedback || !w) return;
    const isCorrect = !timedOut && input.trim().toLowerCase() === w.word.toLowerCase();
    if (isCorrect) {
      setCorrectWords((prev) => [...prev, w.word]);
      const pts = fx.onCorrect(Math.max(6, 15 + timeLeft));
      if (mode === "solo" || player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
      setFeedback("correct");
    } else {
      fx.onWrong();
      setFeedback("wrong");
    }
    setTimeout(() => {
      if (round + 1 >= words.length) {
        setDone(true);
        return;
      }
      setRound((r) => r + 1);
      setFeedback(null);
      if (mode === "team") setPlayer((p) => (p === 1 ? 2 : 1));
    }, 1400);
  };

  const title = t("Nghe và gõ", "Listening Catch");

  if (done || !w) {
    return (
      <Shell title={title} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player}>
        <EndCard
          mode={mode}
          scoreA={scoreA}
          scoreB={scoreB}
          maxCombo={fx.maxCombo}
          saved={saved}
          gameKey="listen"
          gameTitle={title}
          onReplay={onReplay}
          onExit={onExit}
        />
      </Shell>
    );
  }

  return (
    <ShakeWrap trigger={fx.shake}>
      <Shell title={title} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} combo={fx.combo}>
        <fx.FxOverlay />
        <TimerRow round={round} total={words.length} timeLeft={timeLeft} />
        <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border-2 border-border mb-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
            {t("Nghe rồi gõ lại từ", "Listen, then type the word")}
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button onClick={() => speak(w.word)} className="gap-2">
              <Volume2 className="w-4 h-4" /> {t("Nghe lại", "Play again")}
            </Button>
            <Button variant="outline" onClick={() => speak(w.word, 0.55)} className="gap-2">
              🐢 {t("Nghe chậm", "Slow")}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground italic mt-3">{w.definition.vi}</p>
        </motion.div>
        <div className="flex gap-2 mb-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            disabled={!!feedback}
            placeholder={t("Gõ từ bạn nghe được…", "Type what you hear…")}
            className={`flex-1 px-4 py-3 rounded-xl bg-secondary border-2 text-foreground font-semibold text-lg transition-all ${
              feedback === "correct"
                ? "border-emerald-500 bg-emerald-500/10"
                : feedback === "wrong"
                ? "border-red-500 bg-red-500/10"
                : "border-border focus:border-primary"
            }`}
            autoFocus
          />
          <Button onClick={() => submit()} disabled={!!feedback}>
            OK
          </Button>
        </div>
        {feedback === "wrong" && (
          <p className="text-xs text-red-500 text-right">
            {t("Đáp án:", "Answer:")} <b>{w.word}</b> <code className="ml-1">{w.ipa}</code>
          </p>
        )}
      </Shell>
    </ShakeWrap>
  );
};
