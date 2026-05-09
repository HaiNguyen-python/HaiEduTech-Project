import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Play, Square, Users, BarChart3, QrCode, Settings2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { IELTS_CATEGORIES, CEFR_LEVELS } from "@/data/ieltsVocabData";
import { toast } from "sonner";

interface TeacherPanelProps {
  onBack: () => void;
}

const TeacherPanel = ({ onBack }: TeacherPanelProps) => {
  const { t } = useLanguage();
  const [roomCode, setRoomCode] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [roomStatus, setRoomStatus] = useState<"idle" | "waiting" | "playing" | "ended">("idle");
  const [level, setLevel] = useState("all");
  const [category, setCategory] = useState("all");
  const [questionCount, setQuestionCount] = useState(15);
  const [lives, setLives] = useState(3);
  const [participants, setParticipants] = useState<
    { id: string; display_name: string; score: number; answers_correct: number; answers_total: number; word_results: unknown; finished_at: string | null; current_question: number; current_word: string | null }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [showLiveScreens, setShowLiveScreens] = useState(true);

  // Generate a random room code
  const genCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  };

  // Create room
  const createRoom = async () => {
    setLoading(true);
    const code = genCode();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error(t("Bạn cần đăng nhập", "Please log in"));
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("game_rooms")
      .insert({
        room_code: code,
        created_by: userData.user.id,
        status: "waiting",
        settings: { level, category, questionCount, lives },
      })
      .select()
      .single();

    if (error) {
      toast.error(t("Không thể tạo phòng", "Failed to create room"));
      setLoading(false);
      return;
    }

    setRoomCode(code);
    setRoomId(data.id);
    setRoomStatus("waiting");
    toast.success(t("Phòng đã tạo!", "Room created!"));
    setLoading(false);
  };

  // Start game
  const startGame = async () => {
    if (!roomId) return;
    await supabase.from("game_rooms").update({ status: "playing", started_at: new Date().toISOString() }).eq("id", roomId);
    setRoomStatus("playing");
    toast.success(t("Trò chơi bắt đầu!", "Game started!"));
  };

  // End game
  const endGame = async () => {
    if (!roomId) return;
    await supabase.from("game_rooms").update({ status: "ended", ended_at: new Date().toISOString() }).eq("id", roomId);
    setRoomStatus("ended");
  };

  // Subscribe to participants
  useEffect(() => {
    if (!roomId) return;

    const fetchParticipants = async () => {
      const { data } = await supabase
        .from("game_participants")
        .select("id, display_name, score, answers_correct, answers_total, word_results, finished_at")
        .eq("room_id", roomId)
        .order("score", { ascending: false });
      if (data) setParticipants(data);
    };

    fetchParticipants();

    const channel = supabase
      .channel(`teacher-${roomId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "game_participants", filter: `room_id=eq.${roomId}` },
        () => fetchParticipants()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // Compute class analytics
  const getWordAnalytics = () => {
    const wordMap: Record<string, { correct: number; total: number }> = {};
    participants.forEach((p) => {
      const results = p.word_results as { word: string; correct: boolean }[];
      if (Array.isArray(results)) {
        results.forEach((wr) => {
          if (!wordMap[wr.word]) wordMap[wr.word] = { correct: 0, total: 0 };
          wordMap[wr.word].total++;
          if (wr.correct) wordMap[wr.word].correct++;
        });
      }
    });
    return Object.entries(wordMap)
      .map(([word, data]) => ({
        word,
        errorRate: Math.round(((data.total - data.correct) / data.total) * 100),
        total: data.total,
      }))
      .sort((a, b) => b.errorRate - a.errorRate);
  };

  // SETUP screen
  if (roomStatus === "idle") {
    return (
      <div className="max-w-lg mx-auto py-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Settings2 className="w-6 h-6 text-primary" />
          {t("Tạo phòng thi đấu", "Create Game Room")}
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-semibold text-foreground mb-1 block">
              {t("Cấp độ CEFR", "CEFR Level")}
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
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
                value={lives}
                onChange={(e) => setLives(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm"
              >
                <option value={1}>1 ({t("Sudden Death", "Sudden Death")})</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={createRoom} disabled={loading} size="lg" className="gap-2">
            <Play className="w-4 h-4" /> {t("Tạo phòng", "Create Room")}
          </Button>
          <Button variant="outline" onClick={onBack} size="lg">
            {t("Quay lại", "Back")}
          </Button>
        </div>
      </div>
    );
  }

  // WAITING / PLAYING / ENDED - Teacher dashboard
  const analytics = getWordAnalytics();
  const finished = participants.filter((p) => p.finished_at).length;

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Room code display */}
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground mb-1">{t("Mã phòng", "Room Code")}</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-5xl font-mono font-black tracking-[0.3em] text-primary">
            {roomCode}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(roomCode);
              toast.success(t("Đã sao chép!", "Copied!"));
            }}
            className="p-2 rounded-lg hover:bg-primary/10"
          >
            <Copy className="w-5 h-5 text-primary" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Users className="w-4 h-4" /> {participants.length} {t("người chơi", "players")}
          </span>
          {roomStatus === "playing" && (
            <span className="text-sm text-green-400">
              {finished}/{participants.length} {t("hoàn thành", "finished")}
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center mb-8">
        {roomStatus === "waiting" && (
          <Button onClick={startGame} size="lg" className="gap-2">
            <Play className="w-4 h-4" /> {t("Bắt đầu!", "Start Game!")}
          </Button>
        )}
        {roomStatus === "playing" && (
          <Button onClick={endGame} variant="destructive" size="lg" className="gap-2">
            <Square className="w-4 h-4" /> {t("Kết thúc", "End Game")}
          </Button>
        )}
        <Button variant="outline" onClick={onBack}>
          {t("Quay lại", "Back")}
        </Button>
      </div>

      {/* Live leaderboard */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-foreground mb-3">
          🏆 {t("Bảng xếp hạng", "Leaderboard")}
        </h3>
        {participants.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            {t("Chờ học sinh tham gia...", "Waiting for students...")}
          </p>
        ) : (
          participants.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border mb-2 ${
                i === 0 && roomStatus !== "waiting"
                  ? "border-amber-500 bg-amber-500/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg font-bold ${i === 0 ? "text-amber-400" : "text-muted-foreground"}`}>
                  #{i + 1}
                </span>
                <span className="font-semibold text-foreground">{p.display_name}</span>
              </div>
              <div className="flex items-center gap-4">
                {roomStatus !== "waiting" && (
                  <span className="text-xs text-muted-foreground">
                    {p.answers_correct}/{p.answers_total}
                  </span>
                )}
                <span className="font-bold text-primary">{p.score} pts</span>
                {p.finished_at && <span className="text-xs text-green-400">✓</span>}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Word analytics - show after game ends */}
      {roomStatus === "ended" && analytics.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            {t("Phân tích từ vựng", "Word Analytics")}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t("Từ vựng học sinh sai nhiều nhất", "Most challenging words for the class")}
          </p>
          <div className="space-y-2">
            {analytics.slice(0, 10).map((w) => (
              <div
                key={w.word}
                className="flex items-center justify-between px-4 py-2 rounded-lg border border-border bg-card"
              >
                <span className="font-semibold text-foreground">{w.word}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{ width: `${w.errorRate}%` }}
                    />
                  </div>
                  <span className="text-sm text-red-400 font-bold w-12 text-right">
                    {w.errorRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPanel;
