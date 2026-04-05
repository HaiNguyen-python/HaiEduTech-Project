import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Crown, Medal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface StreakEntry {
  display_name: string;
  streak_days: number;
  user_id: string;
}

const StudyStreakLeaderboard = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<StreakEntry[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUserId(user?.id || null);

        const { data, error } = await supabase.rpc("get_streak_leaderboard") as { data: StreakEntry[] | null; error: any };
        if (error) throw error;
        setEntries(data || []);
      } catch (e) {
        console.error("Failed to fetch streak leaderboard:", e);
      }
      setLoading(false);
    };
    fetch();
  }, []);

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
        <Flame className="w-4 h-4 text-orange-500" />
        {t("BXH Streak học tập", "Study Streak Ranking")}
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
                    ? "bg-orange-500/10 border border-orange-500/30 ring-1 ring-orange-500/20"
                    : i === 0 && entry.streak_days > 0
                    ? "bg-amber-500/10 border border-amber-500/30"
                    : "bg-card/50 border border-border/50"
                }`}
              >
                <span className="w-5 flex-shrink-0">
                  {i < 3 ? rankIcons[i] : <span className="text-muted-foreground font-mono">#{i + 1}</span>}
                </span>
                <span className="flex-1 truncate font-medium text-foreground">
                  {entry.display_name}
                  {isCurrentUser && <span className="ml-1 text-orange-500">(you)</span>}
                </span>
                <span className="font-bold text-orange-500 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {entry.streak_days}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudyStreakLeaderboard;
