import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Crown, Trophy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import GameEngine, { generateQuestions, type GameResult } from "./GameEngine";
import GameOver from "./GameOver";

interface ClassroomBattleProps {
  onBack: () => void;
}

const ClassroomBattle = ({ onBack }: ClassroomBattleProps) => {
  const { t } = useLanguage();
  const [roomCode, setRoomCode] = useState("");
  const [nickname, setNickname] = useState(() => localStorage.getItem("arena-nickname") || "");
  const [phase, setPhase] = useState<"join" | "waiting" | "playing" | "results">("join");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<
    { display_name: string; score: number; finished_at: string | null }[]
  >([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [questions, setQuestions] = useState<ReturnType<typeof generateQuestions>>([]);
  const [roomSettings, setRoomSettings] = useState<{
    questionCount: number;
    level: string;
    category: string;
    lives: number;
  }>({ questionCount: 15, level: "all", category: "all", lives: 3 });

  // Join room
  const handleJoin = async () => {
    if (!roomCode.trim()) return;
    if (!nickname.trim()) {
      setError(t("Vui lòng nhập tên của bạn", "Please enter your name"));
      return;
    }
    setLoading(true);
    setError("");

    try {
      const { data: userData } = await supabase.auth.getUser();
      const currentUserId = userData.user?.id ?? null;

      // Find the room
      const { data: room, error: roomErr } = await supabase
        .from("game_rooms")
        .select("*")
        .eq("room_code", roomCode.toUpperCase().trim())
        .single();

      if (roomErr || !room) {
        setError(t("Không tìm thấy phòng", "Room not found"));
        setLoading(false);
        return;
      }

      if (room.status === "ended") {
        setError(t("Phòng đã kết thúc", "Room has ended"));
        setLoading(false);
        return;
      }

      // Parse settings
      const settings = room.settings as Record<string, unknown>;
      setRoomSettings({
        questionCount: (settings?.questionCount as number) || 15,
        level: (settings?.level as string) || "all",
        category: (settings?.category as string) || "all",
        lives: (settings?.lives as number) || 3,
      });

      const displayName = nickname.trim().slice(0, 30);
      localStorage.setItem("arena-nickname", displayName);

      const { data: participant, error: joinErr } = await supabase
        .from("game_participants")
        .insert({
          room_id: room.id,
          user_id: currentUserId,
          display_name: displayName,
        })
        .select()
        .single();

      if (joinErr) {
        setError(t("Không thể tham gia phòng", "Failed to join room"));
        setLoading(false);
        return;
      }

      setRoomId(room.id);
      setParticipantId(participant.id);
      setPhase(room.status === "playing" ? "playing" : "waiting");

      // Generate questions based on room settings
      const { ieltsVocabData } = await import("@/data/ieltsVocabData");
      let pool = ieltsVocabData;
      if ((settings?.level as string) && (settings?.level as string) !== "all") {
        pool = pool.filter((w) => w.level === settings.level);
      }
      if ((settings?.category as string) && (settings?.category as string) !== "all") {
        pool = pool.filter((w) => w.category === settings.category);
      }
      setQuestions(generateQuestions(pool, (settings?.questionCount as number) || 15));
    } catch {
      setError(t("Lỗi kết nối", "Connection error"));
    }
    setLoading(false);
  };

  // Subscribe to room status changes
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "game_rooms", filter: `id=eq.${roomId}` },
        (payload) => {
          const room = payload.new as Record<string, unknown>;
          if (room.status === "playing" && phase === "waiting") {
            setPhase("playing");
          }
          if (room.status === "ended") {
            setPhase("results");
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "game_participants", filter: `room_id=eq.${roomId}` },
        () => {
          // Refresh leaderboard
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, phase]);

  const fetchLeaderboard = async () => {
    if (!roomId) return;
    const { data } = await supabase
      .from("game_participants")
      .select("display_name, score, finished_at")
      .eq("room_id", roomId)
      .order("score", { ascending: false });
    if (data) setLeaderboard(data);
  };

  useEffect(() => {
    if (roomId) fetchLeaderboard();
  }, [roomId]);

  // Handle game end
  const handleGameEnd = async (gameResult: GameResult) => {
    setResult(gameResult);
    setPhase("results");

    if (participantId) {
      await supabase
        .from("game_participants")
        .update({
          score: gameResult.score,
          streak: gameResult.maxStreak,
          answers_correct: gameResult.correct,
          answers_total: gameResult.total,
          word_results: gameResult.wordResults,
          finished_at: new Date().toISOString(),
        })
        .eq("id", participantId);
    }
  };

  // JOIN screen
  if (phase === "join") {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <Users className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {t("Tham gia phòng thi", "Join Game Room")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("Nhập tên và mã phòng từ giáo viên", "Enter your name and the room code from your teacher")}
        </p>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t("Tên của bạn", "Your name")}
          maxLength={30}
          className="w-full text-center text-lg font-semibold px-6 py-3 rounded-xl bg-secondary border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none mb-3"
        />
        <input
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          placeholder="ABCD12"
          maxLength={6}
          className="w-full text-center text-3xl font-mono font-bold tracking-[0.3em] px-6 py-4 rounded-xl bg-secondary border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none mb-4"
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <div className="flex gap-3 justify-center">
          <Button onClick={handleJoin} disabled={loading || roomCode.length < 4} size="lg">
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {t("Tham gia", "Join")}
          </Button>
          <Button variant="outline" onClick={onBack} size="lg">
            {t("Quay lại", "Back")}
          </Button>
        </div>
      </div>
    );
  }

  // WAITING screen
  if (phase === "waiting") {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          {t("Đang chờ giáo viên bắt đầu...", "Waiting for teacher to start...")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("Phòng", "Room")}: <strong>{roomCode}</strong>
        </p>
        <div className="space-y-2">
          {leaderboard.map((p, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
              <span className="text-sm font-semibold text-foreground">{p.display_name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{t("Sẵn sàng", "Ready")}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PLAYING
  if (phase === "playing" && questions.length > 0 && !result) {
    return (
      <div>
        <GameEngine
          questions={questions}
          lives={roomSettings.lives}
          onGameEnd={handleGameEnd}
        />
        {/* Mini leaderboard sidebar */}
        <div className="fixed top-24 right-4 w-48 rounded-xl bg-card border border-border p-3 hidden lg:block">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
            <Crown className="w-3 h-3 text-amber-400" /> Live
          </h4>
          {leaderboard.slice(0, 5).map((p, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1">
              <span className="text-foreground truncate">{i + 1}. {p.display_name}</span>
              <span className="text-primary font-bold">{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // RESULTS
  if (result) {
    return (
      <div>
        <GameOver result={result} onReplay={onBack} onHome={onBack} showAnalytics={result.wordResults} />
        {/* Final leaderboard */}
        <div className="max-w-md mx-auto mt-8">
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> {t("Bảng xếp hạng", "Leaderboard")}
          </h3>
          {leaderboard.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-2 ${
                i === 0 ? "border-amber-500 bg-amber-500/10" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg font-bold ${i === 0 ? "text-amber-400" : "text-muted-foreground"}`}>
                  #{i + 1}
                </span>
                <span className="font-semibold text-foreground">{p.display_name}</span>
              </div>
              <span className="font-bold text-primary">{p.score} pts</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ClassroomBattle;
