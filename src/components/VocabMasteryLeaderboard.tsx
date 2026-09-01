import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Star, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { MASTERY_UPDATED_EVENT } from "@/hooks/useMasteredVocab";
import { dedupeByDisplayName } from "@/lib/leaderboardDedup";
import VocabBadgePill from "@/components/VocabBadgePill";
import {
  fetchWithCache,
  getCached,
  getCurrentUserId,
  invalidateCache,
  subscribeTable,
} from "@/lib/leaderboardCache";

interface LeaderboardEntry {
  user_id: string;
  score: number;
  display_name: string;
}

interface VocabMasteryLeaderboardProps {
  subject: string;
  currentCount: number;
  label?: string;
}

/**
 * @deprecated Kept for backward compatibility. `useMasteredVocab` now syncs the
 * full word set to the database, so leaderboard counts are derived server-side.
 * Calls become no-ops.
 */
export async function syncMasteredCount(_subject: string, _count: number) {
  /* no-op */
}

const TTL_MS = 60_000; // 1 minute — keeps displayed scores close to the DB truth

const VocabMasteryLeaderboard = ({ subject, currentCount, label }: VocabMasteryLeaderboardProps) => {
  const { t } = useLanguage();
  const cacheKey = `mastery::${subject}`;
  const initialCached = getCached<LeaderboardEntry[]>(cacheKey, 10 * 60_000);
  const [entries, setEntries] = useState<LeaderboardEntry[]>(initialCached || []);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(!initialCached);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);

  const fetchLeaderboard = useCallback(async (force = false) => {
    setError(false);
    try {
      // Resolve user id from local session (no network) — instant.
      getCurrentUserId().then(uid => { if (mountedRef.current) setCurrentUserId(uid); });

      if (force) invalidateCache(cacheKey);
      const data = await fetchWithCache<any[]>(
        cacheKey,
        async () => {
          const { data, error: rpcError } = await (supabase as any)
            .rpc("get_mastery_leaderboard", { _subject: subject });
          if (rpcError) throw rpcError;
          return data || [];
        },
        { ttlMs: TTL_MS, timeoutMs: 9000 },
      );
      if (!mountedRef.current) return;
      const merged = data.map((row: any) => ({
        user_id: row.user_id,
        score: Number(row.score) || 0,
        display_name: row.display_name || t("Học viên", "Student"),
      })) as LeaderboardEntry[];
      setEntries(dedupeByDisplayName(merged));
      setLoading(false);
    } catch (e) {
      console.error("Failed to fetch mastery leaderboard:", e);
      if (!mountedRef.current) return;
      // Keep cached entries visible if any; only show error when we have nothing.
      if (entries.length === 0) setError(true);
      setLoading(false);
    }
  }, [subject, cacheKey, t, entries.length]);

  useEffect(() => {
    mountedRef.current = true;
    fetchLeaderboard();

    let timer: number | undefined;
    const onLocal = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.subject && detail.subject !== subject) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fetchLeaderboard(true), 350);
    };
    window.addEventListener(MASTERY_UPDATED_EVENT, onLocal);
    // Refresh when the student comes back to the tab so the ranking is current.
    const onFocus = () => fetchLeaderboard(true);
    window.addEventListener("focus", onFocus);



    const unsubscribe = subscribeTable(
      "user_vocab_mastered",
      `subject=eq.${subject}`,
      () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => fetchLeaderboard(true), 500);
      },
    );

    return () => {
      mountedRef.current = false;
      window.removeEventListener(MASTERY_UPDATED_EVENT, onLocal);
      window.removeEventListener("focus", onFocus);
      window.clearTimeout(timer);


      unsubscribe();
    };
  }, [subject, fetchLeaderboard]);

  const rankIcons = [
    <Crown key="1" className="w-4 h-4 text-amber-400" />,
    <Medal key="2" className="w-4 h-4 text-gray-400" />,
    <Medal key="3" className="w-4 h-4 text-amber-700" />,
  ];

  if (loading && entries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
          <RefreshCw className="w-4 h-4 animate-spin" />
          {t("Đang tải bảng xếp hạng...", "Loading leaderboard...")}
        </div>
      </div>
    );
  }

  if (error && entries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4 text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          {t("Không tải được bảng xếp hạng.", "Couldn't load the leaderboard.")}
        </p>
        <button
          onClick={() => { setLoading(true); fetchLeaderboard(true); }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <RefreshCw className="w-3 h-3" /> {t("Thử lại", "Retry")}
        </button>
      </div>
    );
  }

  // The ranking must always show the SAVED score (database = single source of
  // truth). Previously the local count could inflate the current user's row,
  // which made the ranking disagree with everyone else's numbers. Any local
  // words that have not reached the database yet are surfaced separately as a
  // "syncing" hint instead of being added to the rank.
  const userEntry = entries.find(e => e.user_id === currentUserId);
  const serverScore = userEntry?.score || 0;
  const notSynced = Math.max(0, (currentCount || 0) - serverScore);
  const displayEntries = [...entries].sort((a, b) => b.score - a.score);

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 space-y-2">
      <h3 className="text-sm font-bold text-foreground flex items-center justify-between gap-2 mb-3">
        <span className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          {label || t("BXH Từ vựng đã thuộc", "Mastered Words Ranking")}
        </span>
        <button
          type="button"
          onClick={() => fetchLeaderboard(true)}
          title={t("Cập nhật điểm", "Refresh scores")}
          className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </h3>


      {displayEntries.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          {t("Chưa có ai. Hãy là người đầu tiên!", "No one yet. Be the first!")}
        </p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
          {displayEntries.map((entry, i) => {
            const isCurrentUser = entry.user_id === currentUserId;
            return (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i, 10) * 0.03 }}
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
                  <VocabBadgePill score={entry.score} className="ml-1" />
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

      {(serverScore > 0 || notSynced > 0) && (
        <div className="mt-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs space-y-1">
          <span className="block text-primary font-bold">
            {t("Bạn đã thuộc", "You mastered")}: {serverScore} {t("từ", "words")}
            <VocabBadgePill score={serverScore} className="ml-2" alwaysShowLabel />
          </span>
          {notSynced > 0 && (
            <span className="block text-muted-foreground">
              {t(`Đang đồng bộ thêm ${notSynced} từ...`, `Syncing ${notSynced} more word(s)...`)}
            </span>
          )}
        </div>
      )}

    </div>
  );
};

export default VocabMasteryLeaderboard;
