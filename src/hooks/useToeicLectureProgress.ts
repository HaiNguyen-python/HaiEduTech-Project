// Hook to manage TOEIC lecture progress (completed + bookmarked) via database
// Falls back to localStorage for unauthenticated users
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const LOCAL_COMPLETED_KEY = "toeic-completed";
const LOCAL_BOOKMARKS_KEY = "toeic-bookmarked";

export const useToeicLectureProgress = () => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch progress from DB or localStorage
  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      if (userId) {
        const { data } = await supabase
          .from("toeic_lecture_progress")
          .select("lecture_id, is_completed, is_bookmarked")
          .eq("user_id", userId);

        if (data) {
          setCompletedIds(data.filter(d => d.is_completed).map(d => d.lecture_id));
          setBookmarkedIds(data.filter(d => d.is_bookmarked).map(d => d.lecture_id));

          // Migrate localStorage data to DB if exists
          try {
            const localCompleted: string[] = JSON.parse(localStorage.getItem(LOCAL_COMPLETED_KEY) || "[]");
            const localBookmarks: string[] = JSON.parse(localStorage.getItem(LOCAL_BOOKMARKS_KEY) || "[]");
            const existingIds = new Set(data.map(d => d.lecture_id));

            const toMigrate: { user_id: string; lecture_id: string; is_completed: boolean; is_bookmarked: boolean; completed_at?: string }[] = [];
            const allLocalIds = new Set([...localCompleted, ...localBookmarks]);

            for (const lid of allLocalIds) {
              if (!existingIds.has(lid)) {
                toMigrate.push({
                  user_id: userId,
                  lecture_id: lid,
                  is_completed: localCompleted.includes(lid),
                  is_bookmarked: localBookmarks.includes(lid),
                  ...(localCompleted.includes(lid) ? { completed_at: new Date().toISOString() } : {}),
                });
              }
            }

            if (toMigrate.length > 0) {
              await supabase.from("toeic_lecture_progress").insert(toMigrate);
              localStorage.removeItem(LOCAL_COMPLETED_KEY);
              localStorage.removeItem(LOCAL_BOOKMARKS_KEY);
              const { data: refreshed } = await supabase
                .from("toeic_lecture_progress")
                .select("lecture_id, is_completed, is_bookmarked")
                .eq("user_id", userId);
              if (refreshed) {
                setCompletedIds(refreshed.filter(d => d.is_completed).map(d => d.lecture_id));
                setBookmarkedIds(refreshed.filter(d => d.is_bookmarked).map(d => d.lecture_id));
              }
            } else {
              localStorage.removeItem(LOCAL_COMPLETED_KEY);
              localStorage.removeItem(LOCAL_BOOKMARKS_KEY);
            }
          } catch { /* ignore localStorage errors */ }
        }
      } else {
        try {
          setCompletedIds(JSON.parse(localStorage.getItem(LOCAL_COMPLETED_KEY) || "[]"));
          setBookmarkedIds(JSON.parse(localStorage.getItem(LOCAL_BOOKMARKS_KEY) || "[]"));
        } catch {
          setCompletedIds([]);
          setBookmarkedIds([]);
        }
      }
      setLoading(false);
    };

    fetchProgress();
  }, [userId]);

  const toggleBookmark = useCallback(async (lectureId: string) => {
    const isCurrentlyBookmarked = bookmarkedIds.includes(lectureId);
    const newBookmarked = isCurrentlyBookmarked
      ? bookmarkedIds.filter(id => id !== lectureId)
      : [...bookmarkedIds, lectureId];
    setBookmarkedIds(newBookmarked);

    if (userId) {
      const { data: existing } = await supabase
        .from("toeic_lecture_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("lecture_id", lectureId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("toeic_lecture_progress")
          .update({ is_bookmarked: !isCurrentlyBookmarked, updated_at: new Date().toISOString() })
          .eq("id", existing.id);
      } else {
        await supabase
          .from("toeic_lecture_progress")
          .insert({ user_id: userId, lecture_id: lectureId, is_bookmarked: true });
      }
    } else {
      localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(newBookmarked));
    }
  }, [bookmarkedIds, userId]);

  const markCompleted = useCallback(async (lectureId: string) => {
    if (completedIds.includes(lectureId)) return;
    const newCompleted = [...completedIds, lectureId];
    setCompletedIds(newCompleted);

    if (userId) {
      const { data: existing } = await supabase
        .from("toeic_lecture_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("lecture_id", lectureId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("toeic_lecture_progress")
          .update({ is_completed: true, completed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
          .eq("id", existing.id);
      } else {
        await supabase
          .from("toeic_lecture_progress")
          .insert({ user_id: userId, lecture_id: lectureId, is_completed: true, completed_at: new Date().toISOString() });
      }
    } else {
      localStorage.setItem(LOCAL_COMPLETED_KEY, JSON.stringify(newCompleted));
    }
  }, [completedIds, userId]);

  return {
    completedIds,
    bookmarkedIds,
    toggleBookmark,
    markCompleted,
    loading,
    isAuthenticated: !!userId,
  };
};
