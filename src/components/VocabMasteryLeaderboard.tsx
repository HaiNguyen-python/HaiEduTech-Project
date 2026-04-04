import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface LeaderboardEntry {
  user_id: string;
  score: number;
  display_name: string;
}

interface VocabMasteryLeaderboardProps {
  subject: string; // e.g. "ielts", "hsk", "toeic", "finnish"
  currentCount: number;
  label?: string;
}

// Sync mastered count to game_scores (insert-only, leaderboard picks max)
export async function syncMasteredCount(subject: string, count: number) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Check if there's already a row with this exact score to avoid duplicates
    const { data: existing } = await (supabase as any)
      .from("game_scores")
      .select("id, score")
      .eq("user_id", user.id)
      .eq("game_type", `mastery-${subject}`)
      .order("score", { ascending: false })
      .limit(1);

    // Only insert if score changed
    if (existing && existing.length > 0 && existing[0].score === count) return;

    await (supabase as any).from("game_scores").insert({
      user_id: user.id,
      game_type: `mastery-${subject}`,
      score: count,
      max_streak: 0,
    });
  } catch (e) {
    console.error("Failed to sync mastered count:", e);
  }
}

const VocabMasteryLeaderboard = ({ subject, currentCount, label }: VocabMasteryLeaderboardProps) => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);

      // Fetch all profiles and scores in parallel
      const [profilesRes, scoresRes] = await Promise.all([
        supabase.from("profiles").select("id, full_name"),
        (supabase as any)
          .from("game_scores")
          .select("user_id, score")
          .eq("game_type", `mastery-${subject}`)
          .order("score", { ascending: false }),
      ]);

      const allProfiles = profilesRes.data || [];
      const scoreData = scoresRes.data || [];

      // Build best-score map
      const bestScores = new Map<string, number>();
      for (const row of scoreData) {
        const existing = bestScores.get(row.user_id);
        if (!existing || row.score > existing) {
          bestScores.set(row.user_id, row.score);
        }
      }

      // Merge all profiles with scores (default 0)
      const merged = allProfiles.map((p: any) => ({
        user_id: p.id,
        score: bestScores.get(p.id) || 0,
        display_name: p.full_name || t("Học viên", "Student"),
      })).sort((a: any, b: any) => b.score - a.score);

      setEntries(merged);
    } catch (e) {
      console.error("Failed to fetch mastery leaderboard:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();

    const channel = supabase
      .channel(`mastery-lb-${subject}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "game_scores",
        filter: `game_type=eq.mastery-${subject}`,
      }, () => {
        fetchLeaderboard();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [subject]);

  const rankIcons = [
    <Crown key="1" className="w-4 h-4 text-amber-400" />,
    <Medal key="2" className="w-4 h-4 text-gray-400" />,
    <Medal key="3" className="w-4 h-4 text-amber-700" />,
  ];

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <p className="text-sm text-muted-foreground text-center py-4">{t("Đang tải...", "Loading...")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
      <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-400" />
        {label || t("BXH Từ vựng đã thuộc", "Mastered Words Ranking")}
      </h3>

      {entries.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          {t("Chưa có ai. Hãy là người đầu tiên!", "No one yet. Be the first!")}
        </p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
          {entries.map((entry, i) => {
            const isCurrentUser = entry.user_id === currentUserId;
            return (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                  isCurrentUser
                    ? "bg-primary/10 border border-primary/30 ring-1 ring-primary/20"
                    : i === 0
                    ? "bg-amber-500/10 border border-amber-500/30"
                    : "bg-card/50 border border-border/50"
                }`}
              >
                <span className="w-5 flex-shrink-0">
                  {i < 3 ? rankIcons[i] : <span className="text-muted-foreground font-mono">#{i + 1}</span>}
                </span>
                <span className="flex-1 truncate font-medium text-foreground">
                  {entry.display_name}
                  {isCurrentUser && <span className="ml-1 text-primary">(you)</span>}
                </span>
                <span className="font-bold text-primary flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {entry.score}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      {currentCount > 0 && (
        <div className="mt-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs">
          <span className="text-primary font-bold">
            {t("Bạn đã thuộc", "You mastered")}: {currentCount} {t("từ", "words")}
          </span>
        </div>
      )}
    </div>
  );
};

export default VocabMasteryLeaderboard;
