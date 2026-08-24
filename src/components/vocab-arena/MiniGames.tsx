import { useState, useEffect, useMemo, useCallback, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Brain, Target, Keyboard, User, Users, Trophy, Timer, RotateCcw, Sparkles, Volume2, Shuffle, Link2, Flame, CalendarDays, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsVocabData, type IeltsWord } from "@/data/ieltsVocabData";
import confetti from "canvas-confetti";
import { sfx, saveHighScore, getHighScores, getPlayerName, setPlayerName, dailyLabel, pickWords, type GameKey } from "./gameFx";
import { logArenaGame } from "./arenaScore";
import { CollocationSnap, OddOneOut, ContextClozeRush, ListeningCatch } from "./games/ExtraGames";
import { ComboBadge, HighScorePanel, useGameFx, ShakeWrap } from "./GameEffects";

type Game = "menu" | "memory" | "hunt" | "sprint" | "synonym" | "scramble" | "collocation" | "oddone" | "cloze" | "listen";
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
  const [name, setName] = useState(getPlayerName());
  // Remounting a game with a fresh key restarts it while keeping the player
  // name and Solo/Team mode - the old "Play again" reloaded the whole page.
  const [runId, setRunId] = useState(0);
  const restart = useCallback(() => setRunId((n) => n + 1), []);

  useEffect(() => { setPlayerName(name); }, [name]);

  if (game === "menu") {
    const totalGames: GameKey[] = ["memory", "hunt", "sprint", "synonym", "scramble", "collocation", "oddone", "cloze", "listen"];
    const grandBest = totalGames.reduce((acc, g) => {
      const top = getHighScores(g)[0];
      return top && top.score > acc ? top.score : acc;
    }, 0);

    return (
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại", "Back")}
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4" /> {t("Mini Games", "Mini Games")}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-2">
            {t("Trò chơi", "Fun")}{" "}
            <span className="text-gradient">{t("Từ vựng", "Vocab Games")}</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            {t("Combo 3-5-8 nhân điểm × thi đấu bảng xếp hạng lớp", "Combo 3-5-8 score multipliers × class leaderboards")}
          </p>
        </div>

        {/* Player + Daily Challenge */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-border bg-card">
            <Crown className="w-5 h-5 text-amber-500 shrink-0" />
            <label className="text-xs text-muted-foreground shrink-0">{t("Tên", "Name")}:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              placeholder={t("Tên của bạn", "Your name")}
              className="flex-1 bg-transparent text-sm font-bold text-foreground outline-none placeholder:text-muted-foreground/60"
            />
            {grandBest > 0 && (
              <span className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
                🏆 {grandBest}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-fuchsia-500/40 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10">
            <CalendarDays className="w-5 h-5 text-fuchsia-500 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400">{t("Thử thách hôm nay", "Daily Challenge")}</p>
              <p className="text-[10px] text-muted-foreground">{dailyLabel()} • {t("Chơi mỗi ngày để giữ chuỗi!", "Play daily to keep your streak!")}</p>
            </div>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => { setMode("solo"); sfx("flip"); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === "solo" ? "bg-primary text-primary-foreground shadow-lg" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" /> Solo
          </button>
          <button
            onClick={() => { setMode("team"); sfx("flip"); }}
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
            gameKey="memory"
            onClick={() => setGame("memory")}
          />
          <GameCard
            icon={<Target className="w-7 h-7 text-rose-500" />}
            color="rose"
            title={t("Săn từ", "Word Hunt")}
            desc={t("Chọn đúng từ theo định nghĩa", "Pick the word that fits the clue")}
            gameKey="hunt"
            onClick={() => setGame("hunt")}
          />
          <GameCard
            icon={<Keyboard className="w-7 h-7 text-emerald-500" />}
            color="emerald"
            title={t("Gõ tốc độ", "Definition Sprint")}
            desc={t("Gõ từ đúng theo IPA + định nghĩa", "Type the word from IPA + definition")}
            gameKey="sprint"
            onClick={() => setGame("sprint")}
          />
          <GameCard
            icon={<Link2 className="w-7 h-7 text-amber-500" />}
            color="amber"
            title={t("Ghép từ đồng nghĩa", "Synonym Showdown")}
            desc={t("Chọn từ đồng nghĩa với từ cho sẵn", "Pick the synonym of the given word")}
            gameKey="synonym"
            onClick={() => setGame("synonym")}
          />
          <GameCard
            icon={<Shuffle className="w-7 h-7 text-sky-500" />}
            color="sky"
            title={t("Xếp chữ cái", "Word Scramble")}
            desc={t("Sắp xếp lại các chữ cái thành từ đúng", "Unscramble letters to form the word")}
            gameKey="scramble"
            onClick={() => setGame("scramble")}
          />
          <GameCard
            icon={<Link2 className="w-7 h-7 text-teal-500" />}
            color="teal"
            title={t("Ghép cụm từ", "Collocation Snap")}
            desc={t("Ghép nửa cụm từ tự nhiên trong IELTS", "Snap the natural IELTS collocation")}
            gameKey="collocation"
            onClick={() => setGame("collocation")}
          />
          <GameCard
            icon={<Target className="w-7 h-7 text-fuchsia-500" />}
            color="fuchsia"
            title={t("Tìm từ khác nhóm", "Odd One Out")}
            desc={t("Chọn từ không cùng nhóm nghĩa", "Spot the word that doesn't belong")}
            gameKey="oddone"
            onClick={() => setGame("oddone")}
          />
          <GameCard
            icon={<Sparkles className="w-7 h-7 text-orange-500" />}
            color="orange"
            title={t("Điền từ trong ngữ cảnh", "Context Cloze Rush")}
            desc={t("Điền từ đúng vào câu ví dụ thật", "Fill the gap in a real example sentence")}
            gameKey="cloze"
            onClick={() => setGame("cloze")}
          />
          <GameCard
            icon={<Volume2 className="w-7 h-7 text-indigo-500" />}
            color="indigo"
            title={t("Nghe và gõ", "Listening Catch")}
            desc={t("Nghe từ rồi gõ lại đúng chính tả", "Hear the word, then type it correctly")}
            gameKey="listen"
            onClick={() => setGame("listen")}
          />
          <div className="hidden md:block rounded-2xl border-2 border-dashed border-border bg-card/50 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="text-sm font-bold text-foreground">{t("Mẹo chơi", "Pro tip")}</h3>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li>🔥 {t("3 đúng liên tiếp = x1.5 điểm", "3 correct in a row = x1.5 pts")}</li>
              <li>⚡ {t("5 chuỗi = x2 + pháo hoa", "5-streak = x2 + confetti")}</li>
              <li>👑 {t("8 chuỗi = x3 'ON FIRE'", "8-streak = x3 'ON FIRE'")}</li>
              <li>🏆 {t("Top 10 lưu lại trên thiết bị", "Top 10 saved on this device")}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const exit = () => setGame("menu");
  if (game === "memory") return <MemoryMatch key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  if (game === "hunt") return <WordHunt key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  if (game === "sprint") return <DefinitionSprint key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  if (game === "synonym") return <SynonymShowdown key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  if (game === "scramble") return <WordScramble key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  if (game === "collocation") return <CollocationSnap key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  if (game === "oddone") return <OddOneOut key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  if (game === "cloze") return <ContextClozeRush key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  if (game === "listen") return <ListeningCatch key={runId} mode={mode} onExit={exit} onReplay={restart} />;
  return null;
};

const GameCard = ({ icon, color, title, desc, gameKey, onClick }: { icon: React.ReactNode; color: "purple" | "rose" | "emerald" | "amber" | "sky" | "teal" | "fuchsia" | "orange" | "indigo"; title: string; desc: string; gameKey: GameKey; onClick: () => void }) => {
  const bg =
    color === "purple" ? "bg-purple-500/10" :
    color === "rose" ? "bg-rose-500/10" :
    color === "emerald" ? "bg-emerald-500/10" :
    color === "amber" ? "bg-amber-500/10" :
    color === "teal" ? "bg-teal-500/10" :
    color === "fuchsia" ? "bg-fuchsia-500/10" :
    color === "orange" ? "bg-orange-500/10" :
    color === "indigo" ? "bg-indigo-500/10" :
    "bg-sky-500/10";
  const top = getHighScores(gameKey)[0];
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => { sfx("powerup"); onClick(); }}
      className="relative text-left rounded-2xl border-2 border-border bg-card p-6 hover:border-primary/50 transition-all overflow-hidden"
    >
      {top && (
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-black flex items-center gap-1">
          <Crown className="w-3 h-3" /> {top.score}
        </span>
      )}
      <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-4`}>{icon}</div>
      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{desc}</p>
      {top && (
        <p className="text-[11px] text-muted-foreground/70 truncate">
          👑 {top.name} · <span className="font-bold text-primary">{top.score}</span>
        </p>
      )}
    </motion.button>
  );
};

// ============ Shared header ============
const GameHeader = ({ title, mode, onExit, currentPlayer, scoreA, scoreB, combo }: { title: string; mode: Mode; onExit: () => void; currentPlayer?: 1 | 2; scoreA: number; scoreB?: number; combo?: number }) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <button onClick={onExit} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> {t("Thoát", "Exit")}
      </button>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="flex items-center gap-2 flex-wrap">
        {combo !== undefined && combo >= 2 && <ComboBadge combo={combo} />}
        {mode === "solo" ? (
          <motion.span
            key={scoreA}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center gap-1"
          >
            <Trophy className="w-4 h-4" /> {scoreA}
          </motion.span>
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

// ============ Shared Final Screen ============
const FinalScreen = ({
  mode, scoreA, scoreB, maxCombo, rank, isNew, gameKey, gameTitle, onReplay, onExit,
}: {
  mode: Mode; scoreA: number; scoreB: number; maxCombo: number;
  rank: number | null; isNew: boolean; gameKey: GameKey; gameTitle: string;
  onReplay: () => void; onExit: () => void;
}) => {
  const { t } = useLanguage();
  return (
    <div className="p-8 rounded-2xl bg-card border-2 border-primary text-center">
      {isNew && (
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black mb-3 shadow-lg"
        >
          👑 {t("KỶ LỤC MỚI!", "NEW RECORD!")}
        </motion.div>
      )}
      <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-3" />
      <h3 className="text-2xl font-bold mb-2">
        {mode === "solo"
          ? t(`Tổng điểm: ${scoreA}`, `Final score: ${scoreA}`)
          : scoreA === scoreB ? t("Hòa!", "Tie!") : scoreA > scoreB ? `🏆 P1 ${scoreA} - ${scoreB} P2` : `P1 ${scoreA} - ${scoreB} P2 🏆`}
      </h3>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4 text-sm">
        {maxCombo > 0 && (
          <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 font-bold">
            🔥 {t(`Combo cao nhất: ${maxCombo}`, `Max combo: ${maxCombo}`)}
          </span>
        )}
        {rank && mode === "solo" && (
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
            🏅 {t(`Hạng #${rank} trên thiết bị`, `Rank #${rank} on this device`)}
          </span>
        )}
      </div>
      {mode === "solo" && (
        <div className="max-w-sm mx-auto mb-4">
          <HighScorePanel game={gameKey} title={t(`Top ${gameTitle}`, `Top ${gameTitle}`)} highlight={scoreA} />
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

// ============ MEMORY MATCH ============
interface Card {
  id: number;
  pairId: number;
  type: "word" | "def";
  text: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryMatch = ({ mode, onExit, onReplay }: { mode: Mode; onExit: () => void; onReplay: () => void }) => {
  const { t } = useLanguage();
  const PAIRS = 8;
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);
  const [savedMemory, setSavedMemory] = useState<{ rank: number | null; isNew: boolean } | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const init = useCallback(() => {
    const picks = pickWords(ieltsVocabData, PAIRS);
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

  // Memory Match never saved a high score, so its record crown stayed empty.
  useEffect(() => {
    if (!done || mode !== "solo" || savedMemory) return;
    sfx("win");
    setSavedMemory(saveHighScore("memory", scoreA));
    void logArenaGame({ game: "memory", score: scoreA, accuracy: moves ? Math.min(1, PAIRS / moves) : 0, correctWords });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, savedMemory]);

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
          setCorrectWords((prev) => [...prev, a.type === "word" ? a.text : b.text]);
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
            {savedMemory?.isNew && (
              <p className="text-xs font-black text-amber-500 mb-2">👑 {t("KỶ LỤC MỚI!", "NEW RECORD!")}</p>
            )}
            <div className="flex items-center justify-center gap-2 flex-wrap mt-2">
              <Button onClick={init} className="gap-2"><RotateCcw className="w-4 h-4" /> {t("Chơi lại", "Play again")}</Button>
              <Button variant="outline" onClick={onExit} className="gap-2"><ArrowLeft className="w-4 h-4" /> {t("Về menu game", "Back to games")}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============ WORD HUNT ============
const WordHunt = ({ mode, onExit, onReplay }: { mode: Mode; onExit: () => void; onReplay: () => void }) => {
  const { t } = useLanguage();
  const ROUNDS = 10;
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);
  const fx = useGameFx();
  const [saved, setSaved] = useState<{ rank: number | null; isNew: boolean } | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const questions = useMemo(() => {
    return pickWords(ieltsVocabData, ROUNDS).map((correct) => {
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

  useEffect(() => {
    if (done && mode === "solo" && !saved) {
      sfx("win");
      setSaved(saveHighScore("hunt", scoreA));
      void logArenaGame({ game: "hunt", score: scoreA, accuracy: correctWords.length / ROUNDS, maxStreak: fx.maxCombo, correctWords });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, saved]);

  const handlePick = (word: string, evt?: MouseEvent<HTMLButtonElement>) => {
    if (picked) return;
    setPicked(word);
    const isCorrect = word === q.correct.word;
    if (isCorrect) {
      setCorrectWords((prev) => [...prev, q.correct.word]);
      const base = 10 + Math.round(timeLeft / 2);
      const pts = fx.onCorrect(base, { clientX: evt?.clientX, clientY: evt?.clientY });
      if (mode === "solo") setScoreA((s) => s + pts);
      else if (player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
    } else {
      fx.onWrong();
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
        <FinalScreen
          mode={mode}
          scoreA={scoreA}
          scoreB={scoreB}
          maxCombo={fx.maxCombo}
          rank={saved?.rank ?? null}
          isNew={saved?.isNew ?? false}
          gameKey="hunt"
          gameTitle={t("Săn từ", "Word Hunt")}
          onReplay={onReplay}
          onExit={onExit}
        />
      </div>
    );
  }

  return (
    <ShakeWrap trigger={fx.shake}>
    <div className="max-w-2xl mx-auto">
      <fx.FxOverlay />
      <GameHeader title={t("Săn từ", "Word Hunt")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} combo={fx.combo} />

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
              onClick={(e) => handlePick(o.word, e)}
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
    </ShakeWrap>
  );
};

// ============ DEFINITION SPRINT ============
const DefinitionSprint = ({ mode, onExit, onReplay }: { mode: Mode; onExit: () => void; onReplay: () => void }) => {
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
  const fx = useGameFx();
  const [saved, setSaved] = useState<{ rank: number | null; isNew: boolean } | null>(null);

  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const words = useMemo(() => pickWords(ieltsVocabData, ROUNDS), []);
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

  useEffect(() => {
    if (done && mode === "solo" && !saved) {
      sfx("win");
      setSaved(saveHighScore("sprint", scoreA));
      void logArenaGame({ game: "sprint", score: scoreA, accuracy: correctWords.length / ROUNDS, maxStreak: fx.maxCombo, correctWords });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, saved]);

  const submit = (timedOut = false) => {
    if (feedback) return;
    const isCorrect = !timedOut && input.trim().toLowerCase() === w.word.toLowerCase();
    if (isCorrect) {
      setCorrectWords((prev) => [...prev, w.word]);
      const base = Math.max(5, 20 + timeLeft - hint * 3);
      const pts = fx.onCorrect(base);
      if (mode === "solo") setScoreA((s) => s + pts);
      else if (player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
      setFeedback("correct");
    } else {
      fx.onWrong();
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
        <FinalScreen
          mode={mode} scoreA={scoreA} scoreB={scoreB} maxCombo={fx.maxCombo}
          rank={saved?.rank ?? null} isNew={saved?.isNew ?? false}
          gameKey="sprint" gameTitle={t("Gõ tốc độ", "Definition Sprint")}
          onReplay={onReplay} onExit={onExit}
        />
      </div>
    );
  }

  return (
    <ShakeWrap trigger={fx.shake}>
    <div className="max-w-2xl mx-auto">
      <fx.FxOverlay />
      <GameHeader title={t("Gõ tốc độ", "Definition Sprint")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} combo={fx.combo} />

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
    </ShakeWrap>
  );
};

// ============ SYNONYM SHOWDOWN ============
const SynonymShowdown = ({ mode, onExit, onReplay }: { mode: Mode; onExit: () => void; onReplay: () => void }) => {
  const { t } = useLanguage();
  const ROUNDS = 10;
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [done, setDone] = useState(false);
  const fx = useGameFx();
  const [saved, setSaved] = useState<{ rank: number | null; isNew: boolean } | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const questions = useMemo(() => {
    const pool = ieltsVocabData.filter((w) => w.synonyms && w.synonyms.length > 0);
    return pickWords(pool, ROUNDS).map((target) => {
      const correct = target.synonyms![Math.floor(Math.random() * target.synonyms!.length)];
      const distractors = shuffle(
        ieltsVocabData
          .filter((w) => w.word !== target.word && (!target.synonyms || !target.synonyms.includes(w.word)))
          .map((w) => w.word)
      ).slice(0, 3);
      const options = shuffle([correct, ...distractors]);
      return { target, correct, options };
    });
  }, []);

  const q = questions[round];

  useEffect(() => {
    if (done || picked) return;
    setTimeLeft(15);
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); handlePick("__timeout__"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done]);

  useEffect(() => {
    if (done && mode === "solo" && !saved) {
      sfx("win");
      setSaved(saveHighScore("synonym", scoreA));
      void logArenaGame({ game: "synonym", score: scoreA, accuracy: correctWords.length / ROUNDS, maxStreak: fx.maxCombo, correctWords });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, saved]);

  const handlePick = (word: string, evt?: MouseEvent<HTMLButtonElement>) => {
    if (picked) return;
    setPicked(word);
    if (word === q.correct) {
      setCorrectWords((prev) => [...prev, q.target.word]);
      const base = 10 + Math.round(timeLeft / 2);
      const pts = fx.onCorrect(base, { clientX: evt?.clientX, clientY: evt?.clientY });
      if (mode === "solo") setScoreA((s) => s + pts);
      else if (player === 1) setScoreA((s) => s + pts);
      else setScoreB((s) => s + pts);
    } else if (word !== "__timeout__") {
      fx.onWrong();
    } else {
      fx.onWrong();
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
        <GameHeader title={t("Ghép từ đồng nghĩa", "Synonym Showdown")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} />
        <FinalScreen
          mode={mode} scoreA={scoreA} scoreB={scoreB} maxCombo={fx.maxCombo}
          rank={saved?.rank ?? null} isNew={saved?.isNew ?? false}
          gameKey="synonym" gameTitle={t("Đồng nghĩa", "Synonym")}
          onReplay={onReplay} onExit={onExit}
        />
      </div>
    );
  }

  return (
    <ShakeWrap trigger={fx.shake}>
    <div className="max-w-2xl mx-auto">
      <fx.FxOverlay />
      <GameHeader title={t("Ghép từ đồng nghĩa", "Synonym Showdown")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} combo={fx.combo} />

      <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
        <span>{t(`Câu ${round + 1}/${ROUNDS}`, `Q ${round + 1}/${ROUNDS}`)}</span>
        <span className={`flex items-center gap-1 font-bold ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
          <Timer className="w-4 h-4" /> {timeLeft}s
        </span>
      </div>

      <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border-2 border-border mb-4 text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{t("Tìm từ đồng nghĩa với", "Find a synonym of")}</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <p className="text-3xl font-black text-foreground">{q.target.word}</p>
          <button onClick={() => speak(q.target.word)} className="text-primary hover:scale-110 transition"><Volume2 className="w-5 h-5" /></button>
        </div>
        <code className="px-2 py-1 rounded bg-secondary text-primary text-xs">{q.target.ipa}</code>
        <p className="text-sm text-muted-foreground italic mt-3">{q.target.definition.vi}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        {q.options.map((o) => {
          const isCorrect = picked && o === q.correct;
          const isWrong = picked === o && o !== q.correct;
          return (
            <motion.button
              key={o}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handlePick(o, e)}
              disabled={!!picked}
              className={`px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                isCorrect ? "bg-emerald-500 text-white border-emerald-600" :
                isWrong ? "bg-red-500 text-white border-red-600" :
                picked ? "bg-secondary border-border text-muted-foreground" :
                "bg-card border-border hover:border-primary hover:bg-primary/5 text-foreground"
              }`}
            >
              {o}
            </motion.button>
          );
        })}
      </div>
    </div>
    </ShakeWrap>
  );
};

// ============ WORD SCRAMBLE ============
const WordScramble = ({ mode, onExit, onReplay }: { mode: Mode; onExit: () => void; onReplay: () => void }) => {
  const { t } = useLanguage();
  const ROUNDS = 8;
  const [round, setRound] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [player, setPlayer] = useState<1 | 2>(1);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [timeLeft, setTimeLeft] = useState(25);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState<{ rank: number | null; isNew: boolean } | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const words = useMemo(
    () => pickWords(ieltsVocabData.filter((w) => w.word.length >= 4 && w.word.length <= 11), ROUNDS),
    []
  );
  const w = words[round];

  const scrambled = useMemo(() => {
    if (!w) return "";
    let s = w.word;
    for (let i = 0; i < 5; i++) {
      const arr = shuffle(s.split(""));
      s = arr.join("");
      if (s.toLowerCase() !== w.word.toLowerCase()) break;
    }
    return s.toUpperCase();
  }, [w]);

  // Word Scramble also skipped high scores + system logging until now.
  useEffect(() => {
    if (!done || mode !== "solo" || saved) return;
    sfx("win");
    setSaved(saveHighScore("scramble", scoreA));
    void logArenaGame({ game: "scramble", score: scoreA, accuracy: correctWords.length / ROUNDS, correctWords });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, mode, scoreA, saved]);

  useEffect(() => {
    if (done || feedback) return;
    setTimeLeft(25);
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
      setCorrectWords((prev) => [...prev, w.word]);
      const pts = Math.max(5, 15 + timeLeft);
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

  if (done) {
    return (
      <div className="max-w-2xl mx-auto">
        <GameHeader title={t("Xếp chữ cái", "Word Scramble")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} />
        <FinalScreen
          mode={mode} scoreA={scoreA} scoreB={scoreB} maxCombo={0}
          rank={saved?.rank ?? null} isNew={saved?.isNew ?? false}
          gameKey="scramble" gameTitle={t("Xếp chữ cái", "Word Scramble")}
          onReplay={onReplay} onExit={onExit}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <GameHeader title={t("Xếp chữ cái", "Word Scramble")} mode={mode} onExit={onExit} scoreA={scoreA} scoreB={scoreB} currentPlayer={player} />

      <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
        <span>{t(`Câu ${round + 1}/${ROUNDS}`, `Q ${round + 1}/${ROUNDS}`)}</span>
        <span className={`flex items-center gap-1 font-bold ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
          <Timer className="w-4 h-4" /> {timeLeft}s
        </span>
      </div>

      <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-card border-2 border-border mb-4 text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">{t("Sắp xếp lại chữ cái", "Unscramble the letters")}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {scrambled.split("").map((ch, i) => (
            <span key={i} className="w-10 h-12 rounded-lg bg-gradient-to-br from-sky-500 to-primary text-white text-xl font-black flex items-center justify-center shadow">
              {ch}
            </span>
          ))}
        </div>
        <p className="text-sm text-foreground font-medium">{w.definition.en}</p>
        <p className="text-xs text-muted-foreground italic mt-1">{w.definition.vi}</p>
      </motion.div>

      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          disabled={!!feedback}
          placeholder={t("Gõ từ đúng…", "Type the word…")}
          className={`flex-1 px-4 py-3 rounded-xl bg-secondary border-2 text-foreground font-semibold text-lg transition-all ${
            feedback === "correct" ? "border-emerald-500 bg-emerald-500/10" :
            feedback === "wrong" ? "border-red-500 bg-red-500/10" :
            "border-border focus:border-primary"
          }`}
          autoFocus
        />
        <Button onClick={() => submit()} disabled={!!feedback}>OK</Button>
      </div>

      {feedback === "wrong" && (
        <p className="text-xs text-red-500 text-right">{t("Đáp án:", "Answer:")} <b>{w.word}</b></p>
      )}
    </div>
  );
};

export default MiniGames;
