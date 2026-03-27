// Real-time game leaderboard component
// Displays top scores for a specific game type with animated entries

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface LeaderboardEntry {
  user_id: string;
  score: number;
  max_streak: number;
  created_at: string;
  display_name?: string;
}

interface GameLeaderboardProps {
  gameType: string;
  currentScore?: number;
}

const GameLeaderboard = ({ gameType, currentScore }: GameLeaderboardProps) => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await (supabase as any)
        .from("game_scores")
        .select("user_id, score, max_streak, created_at")
        .eq("game_type", gameType)
        .order("score", { ascending: false })
        .limit(10);

      if (data) {
        // Fetch display names for unique user IDs
        const userIds = [...new Set(data.map((d: any) => d.user_id))];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", userIds as string[]);

        const nameMap = new Map(profiles?.map((p) => [p.id, p.full_name]) || []);

        // Keep only best score per user
        const bestScores = new Map<string, LeaderboardEntry>();
        for (const entry of data) {
          const existing = bestScores.get(entry.user_id);
          if (!existing || entry.score > existing.score) {
            bestScores.set(entry.user_id, {
              ...entry,
              display_name: nameMap.get(entry.user_id) || "Student",
            });
          }
        }

        setEntries(
          Array.from(bestScores.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
        );
      }
    } catch (e) {
      console.error("Failed to fetch leaderboard:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`leaderboard-${gameType}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "game_scores" }, () => {
        fetchLeaderboard();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameType]);

  const rankIcons = [
    <Crown key="1" className="w-4 h-4 text-amber-400" />,
    <Medal key="2" className="w-4 h-4 text-gray-400" />,
    <Medal key="3" className="w-4 h-4 text-amber-700" />,
  ];

  if (loading) {
    return (
      <div className="text-center py-4 text-muted-foreground text-sm">
        {t("Đang tải...", "Loading...")}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-400" />
        {t("Bảng xếp hạng", "Leaderboard")}
      </h3>

      {entries.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          {t("Chưa có điểm nào. Hãy là người đầu tiên!", "No scores yet. Be the first!")}
        </p>
      ) : (
        entries.map((entry, i) => (
          <motion.div
            key={`${entry.user_id}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
              i === 0
                ? "bg-amber-500/10 border border-amber-500/30"
                : "bg-card/50 border border-border/50"
            }`}
          >
            <span className="w-5 flex-shrink-0">
              {i < 3 ? rankIcons[i] : <span className="text-muted-foreground font-mono">#{i + 1}</span>}
            </span>
            <span className="flex-1 truncate font-medium text-foreground">
              {entry.display_name}
            </span>
            <span className="font-bold text-primary">{entry.score}</span>
            {entry.max_streak > 0 && (
              <span className="text-orange-400">🔥{entry.max_streak}</span>
            )}
          </motion.div>
        ))
      )}

      {currentScore !== undefined && currentScore > 0 && (
        <div className="mt-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs">
          <span className="text-primary font-bold">
            {t("Điểm của bạn", "Your score")}: {currentScore}
          </span>
        </div>
      )}
    </div>
  );
};

export default GameLeaderboard;
