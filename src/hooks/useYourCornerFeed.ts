import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { extractHashtags } from "@/lib/yourCornerMeta";

export type FeedAuthor = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
};

export type PollData = {
  question: string;
  options: string[];
  subject?: string | null;
  allow_change?: boolean;
};

export type FeedPost = {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  subject: string | null;
  mood: string | null;
  visibility: string | null;
  created_at: string;
  author: FeedAuthor | null;
  reaction_count: number;
  liked_by_me: boolean;
  comment_count: number;
  bookmarked_by_me: boolean;
  poll: PollData | null;
  poll_votes: Record<string, number> | null;
  my_vote: number | null;
};


export function useYourCornerFeed(enabled: boolean) {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = useCallback(async () => {
    const { data, error } = await supabase.rpc("get_your_corner_feed", { _limit: 10 });
    if (error || !data) {
      setPosts([]);
      setLoading(false);
      return;
    }
    const payload = data as { posts: any[]; authors: FeedAuthor[] };
    const authorMap = new Map<string, FeedAuthor>();
    (payload.authors ?? []).forEach((a) => authorMap.set(a.id, a));
    setPosts(
      (payload.posts ?? []).map((p) => ({
        id: p.id,
        user_id: p.user_id,
        content: p.content,
        image_url: p.image_url,
        subject: p.subject,
        mood: p.mood,
        visibility: p.visibility,
        created_at: p.created_at,
        author: authorMap.get(p.user_id) ?? null,
        reaction_count: Number(p.reaction_count ?? 0),
        liked_by_me: !!p.liked_by_me,
        comment_count: Number(p.comment_count ?? 0),
        bookmarked_by_me: !!p.bookmarked_by_me,
        poll: p.poll ?? null,
        poll_votes: p.poll_votes ?? null,
        my_vote: p.my_vote ?? null,
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    fetchFeed();
    let pending = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const throttled = () => {
      if (pending) return;
      pending = true;
      timer = setTimeout(() => {
        pending = false;
        fetchFeed();
      }, 2500);
    };
    const channel = supabase
      .channel("your-corner-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_posts" }, throttled)
      .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_reactions" }, throttled)
      .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_comments" }, throttled)
      .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_poll_votes" }, throttled)
      .subscribe();
    return () => {
      if (timer) clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [enabled, fetchFeed]);


  const trendingTags = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const counts = new Map<string, number>();
    posts.forEach((p) => {
      if (new Date(p.created_at).getTime() < cutoff) return;
      extractHashtags(p.content).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1));
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  return { posts, loading, refresh: fetchFeed, trendingTags };
}
