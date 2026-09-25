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
  initialRoomCode?: string;
}

const ClassroomBattle = ({ onBack, initialRoomCode }: ClassroomBattleProps) => {
  const { t } = useLanguage();
  const [roomCode, setRoomCode] = useState((initialRoomCode || "").toUpperCase());
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
      const { data: rooms, error: roomErr } = await (supabase as any)
        .rpc("find_game_room", { _code: roomCode });
      const room = (rooms as any[] | null)?.[0];

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

  // Students used to be stuck on the waiting screen if they joined the wrong
  // room. Leaving removes their participant row so the lobby stays accurate.
  const handleLeaveRoom = async () => {
    if (participantId) {
      await supabase.from("game_participants").delete().eq("id", participantId);
    }
    setParticipantId(null);
    setRoomId(null);
    setPhase("join");
    onBack();
  };

  const fetchLeaderboard = async () => {
    if (!roomId) return;
    const { data, error } = await supabase
      .from("game_participants")
      .select("display_name, score, finished_at")
      .eq("room_id", roomId)
      .order("score", { ascending: false })
      .order("finished_at", { ascending: true, nullsFirst: false });
    if (error) {
      console.warn("[ClassroomBattle] leaderboard fetch failed", error);
      return;
    }
    if (data) setLeaderboard(data);
  };

  // Subscribe to room status changes + participants. Realtime alone is not
  // reliable enough (websocket can drop / buffer), so we also poll every 2s
  // while the room is active. This is what guarantees students see live
  // score updates instead of staying stuck at the initial 0-pts snapshot.
  useEffect(() => {
    if (!roomId) return;

    fetchLeaderboard();

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
            fetchLeaderboard();
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "game_participants", filter: `room_id=eq.${roomId}` },
        () => fetchLeaderboard()
      )
      .subscribe();

    // Polling fallback - 2s while active so the leaderboard cannot get stuck.
    // Also poll room status (guest players may not receive room realtime events).
    const interval = setInterval(async () => {
      fetchLeaderboard();
      const { data: status } = await (supabase as any).rpc("get_game_room_status", { _room_id: roomId });
      if (status === "playing" && phase === "waiting") setPhase("playing");
      if (status === "ended" && phase !== "results") setPhase("results");
    }, 2000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, phase]);


  // Handle game end
  const handleGameEnd = async (gameResult: GameResult) => {
    setResult(gameResult);
    setPhase("results");

    if (participantId) {
      const { error } = await supabase
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
      if (error) {
        // Surface so teachers can see why their leaderboard might be stale.
        console.error("[ClassroomBattle] final score write failed", error);
      }
    }
  };

  // JOIN screen
  if (phase === "join") {
    return (
      <div className="max-w-md mx-auto text-center py-8 sm:py-16">
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
      <div className="max-w-md mx-auto text-center py-8 sm:py-16">
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
        <Button variant="outline" className="mt-6" onClick={handleLeaveRoom}>
          {t("Rời phòng", "Leave room")}
        </Button>
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
          onQuit={handleLeaveRoom}
          onGameEnd={handleGameEnd}
          onProgress={(update) => {
            if (participantId) {
              supabase
                .from("game_participants")
                .update({
                  current_question: update.index,
                  current_word: update.word,
                  score: update.score,
                  answers_correct: update.correct,
                  answers_total: update.total,
                  streak: update.streak,
                })
                .eq("id", participantId)
                .then(({ error }) => {
                  if (error) {
                    // Don't toast every question - just log. A persistent
                    // failure here is why teacher leaderboards used to show 0.
                    console.warn("[ClassroomBattle] progress write failed", error);
                  }
                });
            }
          }}
        />
        {/* Mini leaderboard sidebar - live, top 5, current player highlighted */}
        <div className="fixed top-24 right-4 w-52 rounded-xl bg-card border-2 border-primary/30 p-3 shadow-lg hidden lg:block">
          <h4 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            {t("BXH Trực tiếp", "Live Leaderboard")}
            <span className="ml-auto inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </h4>
          {leaderboard.slice(0, 5).map((p, i) => {
            const isMe = p.display_name === (nickname || "").trim().slice(0, 30);
            return (
              <div
                key={i}
                className={`flex items-center justify-between text-xs py-1 px-1.5 rounded ${
                  isMe ? "bg-primary/15 ring-1 ring-primary/40" : ""
                }`}
              >
                <span className="text-foreground truncate flex items-center gap-1">
                  <span className={i === 0 ? "text-amber-600 font-bold" : "text-muted-foreground"}>
                    {i === 0 ? "👑" : `#${i + 1}`}
                  </span>
                  <span className={isMe ? "font-bold" : ""}>{p.display_name}</span>
                </span>
                <span className="text-primary font-bold tabular-nums">{p.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // RESULTS
  if (result) {
    const myName = (nickname || "").trim().slice(0, 30);
    return (
      <div>
        <GameOver result={result} onReplay={onBack} onHome={onBack} showAnalytics={result.wordResults} />
        {/* Final leaderboard */}
        <div className="max-w-md mx-auto mt-8">
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600" /> {t("Bảng xếp hạng cuối cùng", "Final Leaderboard")}
          </h3>
          {leaderboard.map((p, i) => {
            const isMe = p.display_name === myName;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-2 ${
                i === 0
                  ? "border-amber-500 bg-amber-500/10"
                  : isMe
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg font-bold ${i === 0 ? "text-amber-600" : isMe ? "text-primary" : "text-muted-foreground"}`}>
                  {i === 0 ? "👑" : `#${i + 1}`}
                </span>
                <span className="font-semibold text-foreground">
                  {p.display_name}
                  {isMe && <span className="ml-1 text-xs text-primary">({t("bạn", "you")})</span>}
                </span>
              </div>
              <span className="font-bold text-primary tabular-nums">{p.score} pts</span>
            </motion.div>
            );
          })}
        </div>

      </div>
    );
  }

  return null;
};

export default ClassroomBattle;
