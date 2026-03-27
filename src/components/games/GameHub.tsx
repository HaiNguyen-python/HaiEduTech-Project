// Game Hub - Neon/Cyberpunk-themed game selection screen
// Central hub for all mini-games with leaderboard and badge display

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Search, Swords, Gamepad2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TimelineDragDrop from "./TimelineDragDrop";
import VocabShadowFight from "./VocabShadowFight";
import CultureDetective from "./CultureDetective";
import DuelBattle from "./DuelBattle";
import GameLeaderboard from "./GameLeaderboard";

type GameId = "menu" | "timeline" | "vocab_shadow" | "culture_detective" | "duel";

const GameHub = () => {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState<GameId>("menu");
  const [lastScore, setLastScore] = useState<number | undefined>();

  const games = [
    {
      id: "timeline" as const,
      icon: <Clock className="w-8 h-8" />,
      title: t("Dòng thời gian lịch sử", "The Linguistic Time Machine"),
      desc: t("Sắp xếp các sự kiện lịch sử theo đúng thứ tự thời gian", "Drag historical events into correct chronological order"),
      color: "from-amber-500 to-orange-600",
      glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]",
      borderGlow: "hover:border-amber-500/50",
    },
    {
      id: "vocab_shadow" as const,
      icon: <Zap className="w-8 h-8" />,
      title: t("Đấu trường từ vựng", "Vocab Arena: Shadow Fight"),
      desc: t("Ghép cặp từ Việt-Anh trước khi chúng rơi xuống đáy!", "Match Vietnamese-English pairs before they hit the bottom!"),
      color: "from-cyan-500 to-blue-600",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
      borderGlow: "hover:border-cyan-500/50",
    },
    {
      id: "culture_detective" as const,
      icon: <Search className="w-8 h-8" />,
      title: t("Thám tử văn hóa", "Culture Detective"),
      desc: t("Nhận diện văn hóa Việt Nam qua từ khóa và mở khóa bí mật!", "Identify Vietnamese culture through keywords and unlock secrets!"),
      color: "from-purple-500 to-pink-600",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
      borderGlow: "hover:border-purple-500/50",
    },
    {
      id: "duel" as const,
      icon: <Swords className="w-8 h-8" />,
      title: t("Đối đầu 1v1", "1v1 Duel Battle"),
      desc: t("Thách đấu bạn bè! Ai trả lời nhanh và chính xác hơn sẽ thắng!", "Challenge a friend! Fastest and most accurate wins!"),
      color: "from-red-500 to-rose-600",
      glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
      borderGlow: "hover:border-red-500/50",
    },
  ];

  if (activeGame === "timeline") {
    return <TimelineDragDrop onBack={() => setActiveGame("menu")} />;
  }
  if (activeGame === "vocab_shadow") {
    return <VocabShadowFight onBack={() => setActiveGame("menu")} />;
  }
  if (activeGame === "culture_detective") {
    return <CultureDetective onBack={() => setActiveGame("menu")} />;
  }
  if (activeGame === "duel") {
    return <DuelBattle onBack={() => setActiveGame("menu")} />;
  }

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4"
        >
          <Gamepad2 className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold text-primary neon-text">GAME CENTER</span>
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t("Trung tâm trò chơi", "Game Center")}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {t(
            "Học mà chơi, chơi mà học! Chọn một trò chơi và chinh phục bảng xếp hạng!",
            "Learn while playing! Choose a game and conquer the leaderboard!"
          )}
        </p>
      </div>

      {/* Game cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {games.map((game, idx) => (
          <motion.button
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveGame(game.id)}
            className={`relative overflow-hidden p-5 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm text-left transition-all ${game.borderGlow} hover:${game.glow}`}
          >
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${game.color}`} />

            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white mb-3`}>
              {game.icon}
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">{game.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{game.desc}</p>

            {/* Play indicator */}
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              ▶ PLAY
            </div>
          </motion.button>
        ))}
      </div>

      {/* Leaderboard section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-card/80 border border-border/50">
          <p className="text-xs text-amber-400 font-bold mb-2">🕰️ {t("Dòng thời gian", "Timeline")}</p>
          <GameLeaderboard gameType="timeline" currentScore={lastScore} />
        </div>
        <div className="p-4 rounded-2xl bg-card/80 border border-border/50">
          <p className="text-xs text-cyan-400 font-bold mb-2">⚡ {t("Đấu trường", "Shadow Fight")}</p>
          <GameLeaderboard gameType="vocab_shadow" currentScore={lastScore} />
        </div>
        <div className="p-4 rounded-2xl bg-card/80 border border-border/50">
          <p className="text-xs text-purple-400 font-bold mb-2">🔍 {t("Thám tử", "Detective")}</p>
          <GameLeaderboard gameType="culture_detective" currentScore={lastScore} />
        </div>
      </div>
    </div>
  );
};

export default GameHub;
