import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Swords, User, Users, Crown, Heart, Zap, Timer, Skull, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/hooks/useUserRole";
import { ieltsVocabData, IELTS_CATEGORIES, CEFR_LEVELS } from "@/data/ieltsVocabData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameEngine, { generateQuestions, type GameResult } from "@/components/vocab-arena/GameEngine";
import GameOver from "@/components/vocab-arena/GameOver";
import ClassroomBattle from "@/components/vocab-arena/ClassroomBattle";
import TeacherPanel from "@/components/vocab-arena/TeacherPanel";

type Phase = "menu" | "solo-setup" | "solo-playing" | "solo-results" | "classroom-student" | "classroom-teacher";

const VocabArena = () => {
  const { t } = useLanguage();
  const { isTeacher } = useUserRole();
  const [phase, setPhase] = useState<Phase>("menu");
  const [result, setResult] = useState<GameResult | null>(null);

  // Solo settings
  const [soloLevel, setSoloLevel] = useState("all");
  const [soloCategory, setSoloCategory] = useState("all");
  const [soloCount, setSoloCount] = useState(15);
  const [soloLives, setSoloLives] = useState(3);
  const [soloQuestions, setSoloQuestions] = useState<ReturnType<typeof generateQuestions>>([]);

  const startSolo = useCallback(() => {
    let pool = ieltsVocabData;
    if (soloLevel !== "all") pool = pool.filter((w) => w.level === soloLevel);
    if (soloCategory !== "all") pool = pool.filter((w) => w.category === soloCategory);
    setSoloQuestions(generateQuestions(pool, soloCount));
    setResult(null);
    setPhase("solo-playing");
  }, [soloLevel, soloCategory, soloCount]);

  const handleSoloEnd = (gameResult: GameResult) => {
    setResult(gameResult);
    setPhase("solo-results");

    // Update mastered / need-review in localStorage for RL integration
    try {
      const saved = localStorage.getItem("ielts_mastered");
      const mastered = saved ? new Set<string>(JSON.parse(saved)) : new Set<string>();
      gameResult.wordResults.forEach((wr) => {
        if (wr.correct) mastered.add(wr.word);
        else mastered.delete(wr.word);
      });
      localStorage.setItem("ielts_mastered", JSON.stringify([...mastered]));
    } catch {
      // Silently fail
    }
  };

  // MAIN MENU
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  <Swords className="w-4 h-4" /> IELTS Vocab Arena
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-3">
                  {t("Đấu trường", "Vocab")}{" "}
                  <span className="text-gradient">{t("Từ vựng", "Arena")}</span>
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {t(
                    "Thử thách từ vựng IELTS với 800 từ. Chơi solo hoặc thi đấu cùng lớp!",
                    "Challenge your IELTS vocabulary with 800 words. Play solo or compete with your class!"
                  )}
                </p>
              </div>

              {/* Mode cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Solo Challenge */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPhase("solo-setup")}
                  className="cursor-pointer rounded-2xl border-2 border-border bg-card p-8 hover:border-primary/50 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t("Thử thách Solo", "Solo Challenge")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(
                      "Thi đấu với thời gian, tích điểm và chinh phục chuỗi streak",
                      "Race against time, earn points and build streaks"
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-lg bg-secondary text-xs text-muted-foreground flex items-center gap-1">
                      <Timer className="w-3 h-3" /> 10s/câu
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-secondary text-xs text-muted-foreground flex items-center gap-1">
                      <Heart className="w-3 h-3" /> 3 mạng
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-secondary text-xs text-muted-foreground flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Streak bonus
                    </span>
                  </div>
                </motion.div>

                {/* Classroom Battle */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPhase("classroom-student")}
                  className="cursor-pointer rounded-2xl border-2 border-border bg-card p-8 hover:border-primary/50 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                    <Users className="w-7 h-7 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t("Thi đấu lớp học", "Classroom Battle")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(
                      "Nhập mã phòng từ giáo viên và thi đấu cùng bạn bè",
                      "Enter room code from teacher and compete with classmates"
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-lg bg-secondary text-xs text-muted-foreground flex items-center gap-1">
                      <Crown className="w-3 h-3" /> Live Leaderboard
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-secondary text-xs text-muted-foreground flex items-center gap-1">
                      <Skull className="w-3 h-3" /> Sudden Death
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Teacher controls button */}
              {isTeacher && (
                <div className="text-center">
                  <Button
                    onClick={() => setPhase("classroom-teacher")}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <Crown className="w-4 h-4 text-amber-400" />
                    {t("Tạo phòng thi (Giáo viên)", "Create Room (Teacher)")}
                  </Button>
                </div>
              )}

              <div className="text-center mt-6">
                <Link to="/ielts-vocabulary" className="text-sm text-primary hover:underline">
                  ← {t("Quay lại ngân hàng từ vựng", "Back to Word Bank")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // SOLO SETUP
  if (phase === "solo-setup") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16">
          <div className="container mx-auto px-4 max-w-lg">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => setPhase("menu")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="w-4 h-4" /> {t("Quay lại", "Back")}
              </button>

              <h2 className="text-2xl font-bold text-foreground mb-6">
                ⚔️ {t("Cài đặt Solo Challenge", "Solo Challenge Setup")}
              </h2>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    {t("Cấp độ CEFR", "CEFR Level")}
                  </label>
                  <select
                    value={soloLevel}
                    onChange={(e) => setSoloLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm"
                  >
                    <option value="all">{t("Tất cả", "All Levels")}</option>
                    {CEFR_LEVELS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    {t("Chủ đề", "Topic")}
                  </label>
                  <select
                    value={soloCategory}
                    onChange={(e) => setSoloCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm"
                  >
                    <option value="all">{t("Tất cả", "All Topics")}</option>
                    {IELTS_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1 block">
                      {t("Số câu hỏi", "Questions")}
                    </label>
                    <select
                      value={soloCount}
                      onChange={(e) => setSoloCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm"
                    >
                      {[10, 15, 20, 30].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1 block">
                      {t("Mạng sống", "Lives")}
                    </label>
                    <select
                      value={soloLives}
                      onChange={(e) => setSoloLives(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm"
                    >
                      <option value={1}>1 (Sudden Death)</option>
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button onClick={startSolo} size="lg" className="w-full gap-2">
                <Swords className="w-5 h-5" /> {t("Bắt đầu!", "Start!")}
              </Button>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // SOLO PLAYING
  if (phase === "solo-playing") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16">
          <div className="container mx-auto px-4">
            <GameEngine
              questions={soloQuestions}
              lives={soloLives}
              onGameEnd={handleSoloEnd}
              isSuddenDeath={soloLives === 1}
            />
          </div>
        </div>
      </div>
    );
  }

  // SOLO RESULTS
  if (phase === "solo-results" && result) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16">
          <div className="container mx-auto px-4">
            <GameOver
              result={result}
              onReplay={startSolo}
              onHome={() => setPhase("menu")}
              showAnalytics={result.wordResults}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // CLASSROOM — Student
  if (phase === "classroom-student") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16">
          <div className="container mx-auto px-4">
            <ClassroomBattle onBack={() => setPhase("menu")} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // CLASSROOM — Teacher
  if (phase === "classroom-teacher") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16">
          <div className="container mx-auto px-4">
            <TeacherPanel onBack={() => setPhase("menu")} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return null;
};

export default VocabArena;
