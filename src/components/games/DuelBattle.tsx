// 1v1 Duel Battle - Real-time head-to-head vocabulary game
// Two players join a room and race to answer vocabulary questions fastest

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swords, Users, Loader2, Copy, Check, Trophy, Flame, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { playGameSound, toggleMute, isMuted } from "./soundManager";
import TeacherHaiCommentary from "./TeacherHaiCommentary";
import confetti from "canvas-confetti";

// Simple vocab questions for duel
const DUEL_QUESTIONS = [
  { q: "\"Xin chào\" nghĩa là gì?", qEn: "What does \"Xin chào\" mean?", options: ["Hello", "Goodbye", "Thank you", "Sorry"], correct: 0 },
  { q: "\"Cảm ơn\" nghĩa là gì?", qEn: "What does \"Cảm ơn\" mean?", options: ["Hello", "Sorry", "Thank you", "Goodbye"], correct: 2 },
  { q: "\"Tạm biệt\" nghĩa là gì?", qEn: "What does \"Tạm biệt\" mean?", options: ["Hello", "Goodbye", "Please", "Help"], correct: 1 },
  { q: "\"Gia đình\" nghĩa là gì?", qEn: "What does \"Gia đình\" mean?", options: ["School", "Family", "Friends", "Home"], correct: 1 },
  { q: "\"Hạnh phúc\" nghĩa là gì?", qEn: "What does \"Hạnh phúc\" mean?", options: ["Sadness", "Anger", "Happiness", "Fear"], correct: 2 },
  { q: "\"Quê hương\" nghĩa là gì?", qEn: "What does \"Quê hương\" mean?", options: ["City", "Homeland", "School", "Market"], correct: 1 },
  { q: "\"Dũng cảm\" nghĩa là gì?", qEn: "What does \"Dũng cảm\" mean?", options: ["Lazy", "Smart", "Brave", "Quiet"], correct: 2 },
  { q: "\"Trung thực\" nghĩa là gì?", qEn: "What does \"Trung thực\" mean?", options: ["Honest", "Clever", "Strong", "Fast"], correct: 0 },
  { q: "\"Sáng tạo\" nghĩa là gì?", qEn: "What does \"Sáng tạo\" mean?", options: ["Boring", "Creative", "Tired", "Old"], correct: 1 },
  { q: "\"Hòa bình\" nghĩa là gì?", qEn: "What does \"Hòa bình\" mean?", options: ["War", "Peace", "Storm", "Fire"], correct: 1 },
];

interface DuelBattleProps {
  onBack: () => void;
}

const DuelBattle = ({ onBack }: DuelBattleProps) => {
  const { t } = useLanguage();
  const [muted, setMuted] = useState(isMuted());
  const [phase, setPhase] = useState<"menu" | "create" | "join" | "waiting" | "playing" | "results">("menu");
  const [roomCode, setRoomCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [nickname, setNickname] = useState(() => localStorage.getItem("arena-nickname") || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [questions] = useState(() => [...DUEL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 7));
  const [commentEvent, setCommentEvent] = useState<"correct" | "wrong" | "win" | "gameover" | null>(null);

  const generateCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const handleCreate = async () => {
    if (!nickname.trim()) { setError(t("Vui lòng nhập tên", "Please enter your name")); return; }
    setLoading(true);
    setError("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const uid = user?.id ?? null;
      const name = nickname.trim().slice(0, 30);
      localStorage.setItem("arena-nickname", name);

      const code = generateCode();
      const { data: room, error: err } = await supabase
        .from("game_rooms")
        .insert({ room_code: code, created_by: uid, settings: { type: "duel", questionCount: 7 }, status: "waiting" })
        .select()
        .single();

      if (err || !room) { setError(t("Không thể tạo phòng", "Failed to create room")); setLoading(false); return; }

      const { data: participant } = await supabase
        .from("game_participants")
        .insert({ room_id: room.id, user_id: uid, display_name: name })
        .select()
        .single();

      setRoomCode(code);
      setRoomId(room.id);
      setParticipantId(participant?.id || null);
      setPhase("waiting");
    } catch { setError(t("Lỗi kết nối", "Connection error")); }
    setLoading(false);
  };

  const handleJoin = async () => {
    if (inputCode.length < 4) return;
    if (!nickname.trim()) { setError(t("Vui lòng nhập tên", "Please enter your name")); return; }
    setLoading(true);
    setError("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const uid = user?.id ?? null;
      const name = nickname.trim().slice(0, 30);
      localStorage.setItem("arena-nickname", name);

      const { data: room } = await supabase.from("game_rooms").select("*").eq("room_code", inputCode.toUpperCase()).single();
      if (!room) { setError(t("Không tìm thấy phòng", "Room not found")); setLoading(false); return; }

      const { data: participant } = await supabase
        .from("game_participants")
        .insert({ room_id: room.id, user_id: uid, display_name: name })
        .select()
        .single();

      setRoomCode(inputCode.toUpperCase());
      setRoomId(room.id);
      setParticipantId(participant?.id || null);

      // Start the game
      await supabase.from("game_rooms").update({ status: "playing", started_at: new Date().toISOString() }).eq("id", room.id);
      setPhase("playing");
    } catch { setError(t("Lỗi kết nối", "Connection error")); }
    setLoading(false);
  };

  // Listen for room changes
  useEffect(() => {
    if (!roomId) return;
    const channel = supabase
      .channel(`duel-${roomId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "game_rooms", filter: `id=eq.${roomId}` }, (payload) => {
        const room = payload.new as Record<string, unknown>;
        if (room.status === "playing" && phase === "waiting") setPhase("playing");
        if (room.status === "ended") setPhase("results");
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "game_participants", filter: `room_id=eq.${roomId}` }, async () => {
        const { data } = await supabase.from("game_participants").select("display_name, score, id").eq("room_id", roomId);
        if (data) {
          const opp = data.find((p) => p.id !== participantId);
          if (opp) {
            setOpponent(opp.display_name);
            setOpponentScore(opp.score);
          }
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomId, phase, participantId]);

  const handleAnswer = async (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAns(idx);

    const isCorrect = idx === questions[currentQ].correct;
    if (isCorrect) {
      playGameSound("correct");
      setScore((s) => s + 10 + streak * 2);
      setStreak((s) => s + 1);
      setCommentEvent(streak >= 4 ? "correct" : "correct");
    } else {
      playGameSound("wrong");
      setStreak(0);
      setCommentEvent("wrong");
    }

    // Update score in DB
    if (participantId) {
      await supabase.from("game_participants").update({
        score: score + (isCorrect ? 10 + streak * 2 : 0),
        answers_correct: isCorrect ? currentQ + 1 : currentQ,
        answers_total: currentQ + 1,
      }).eq("id", participantId);
    }

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setPhase("results");
        if (roomId) supabase.from("game_rooms").update({ status: "ended" }).eq("id", roomId);
        confetti({ particleCount: 100, spread: 80 });
        setCommentEvent("win");
      } else {
        setCurrentQ((q) => q + 1);
        setAnswered(false);
        setSelectedAns(null);
        setCommentEvent(null);
      }
    }, 1200);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleMute = () => setMuted(toggleMute());

  // MENU
  if (phase === "menu") {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <Swords className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2 neon-text">
          {t("Đối đầu 1v1", "1v1 Duel Battle")}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          {t("Thách đấu bạn bè và xem ai giỏi hơn!", "Challenge a friend and see who's better!")}
        </p>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t("Tên của bạn", "Your name")}
          maxLength={30}
          className="w-full text-center text-base font-semibold px-4 py-3 rounded-xl bg-secondary border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none mb-4"
        />
        <div className="flex flex-col gap-3">
          <Button onClick={() => { handleCreate(); }} className="neon-btn gap-2" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("Tạo phòng", "Create Room")}
          </Button>
          <Button variant="outline" onClick={() => setPhase("join")}>
            {t("Nhập mã phòng", "Enter Room Code")}
          </Button>
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
            {t("Quay lại", "Back")}
          </Button>
        </div>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>
    );
  }

  // JOIN
  if (phase === "join") {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <Users className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-4">
          {t("Nhập mã phòng", "Enter Room Code")}
        </h2>
        <input
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          placeholder="ABCD12"
          maxLength={6}
          className="w-full text-center text-3xl font-mono font-bold tracking-[0.3em] px-6 py-4 rounded-xl bg-secondary border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none mb-4"
        />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <div className="flex gap-3 justify-center">
          <Button onClick={handleJoin} disabled={loading || inputCode.length < 4} className="neon-btn">
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {t("Tham gia", "Join")}
          </Button>
          <Button variant="outline" onClick={() => setPhase("menu")}>
            {t("Quay lại", "Back")}
          </Button>
        </div>
      </div>
    );
  }

  // WAITING
  if (phase === "waiting") {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          {t("Đang chờ đối thủ...", "Waiting for opponent...")}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          {t("Chia sẻ mã phòng cho bạn bè:", "Share room code with a friend:")}
        </p>
        <button onClick={copyCode} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-mono text-2xl font-bold tracking-[0.3em] hover:bg-primary/20 transition-colors">
          {roomCode}
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>
        <p className="text-xs text-muted-foreground mt-4">
          {t("Game sẽ bắt đầu tự động khi đối thủ vào phòng", "Game starts automatically when opponent joins")}
        </p>
      </div>
    );
  }

  // PLAYING
  if (phase === "playing" && currentQ < questions.length) {
    const q = questions[currentQ];
    return (
      <div className="max-w-xl mx-auto">
        {/* HUD */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{score}</p>
            <p className="text-xs text-muted-foreground">{t("Bạn", "You")}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{currentQ + 1}/{questions.length}</span>
            {streak >= 3 && <Flame className="w-4 h-4 text-orange-400" />}
            <button onClick={handleToggleMute} className="text-muted-foreground">
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-red-400">{opponentScore}</p>
            <p className="text-xs text-muted-foreground">{opponent || t("Đối thủ", "Opponent")}</p>
          </div>
        </div>

        {commentEvent && (
          <div className="mb-3">
            <TeacherHaiCommentary streak={streak} score={score} event={commentEvent} />
          </div>
        )}

        {/* Question */}
        <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-5 rounded-2xl bg-card border border-border/50 mb-4">
          <p className="font-bold text-foreground text-lg text-center">{t(q.q, q.qEn)}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {q.options.map((opt, idx) => (
            <motion.button
              key={idx}
              whileHover={!answered ? { scale: 1.03 } : {}}
              whileTap={!answered ? { scale: 0.97 } : {}}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`p-4 rounded-xl border text-sm font-bold transition-all ${
                answered
                  ? idx === q.correct
                    ? "border-green-500 bg-green-500/15 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    : idx === selectedAns
                    ? "border-red-500 bg-red-500/15 text-red-400 animate-[shake_0.5s_ease-in-out]"
                    : "border-border/30 bg-card/50 text-muted-foreground"
                  : "border-border/50 bg-card/80 text-foreground hover:border-primary/50 hover:shadow-[0_0_10px_rgba(var(--primary),0.15)]"
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // RESULTS
  if (phase === "results") {
    const won = score > opponentScore;
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4">
          <span className="text-6xl">{won ? "🏆" : score === opponentScore ? "🤝" : "💪"}</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2 neon-text">
          {won ? t("Chiến thắng!", "Victory!") : score === opponentScore ? t("Hòa!", "Draw!") : t("Thua cuộc!", "Defeated!")}
        </h2>
        <div className="flex justify-center gap-8 my-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{score}</p>
            <p className="text-sm text-muted-foreground">{t("Bạn", "You")}</p>
          </div>
          <div className="text-center">
            <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">VS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">{opponentScore}</p>
            <p className="text-sm text-muted-foreground">{opponent || t("Đối thủ", "Opponent")}</p>
          </div>
        </div>
        <TeacherHaiCommentary streak={streak} score={score} event={won ? "win" : "gameover"} />
        <div className="flex gap-3 justify-center mt-6">
          <Button onClick={onBack} className="neon-btn">
            {t("Quay lại", "Back")}
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default DuelBattle;
