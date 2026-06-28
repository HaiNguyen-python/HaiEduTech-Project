import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const PAGE_SIZE = 5;

function mapPosts(payload: any): FeedPost[] {
  const authorMap = new Map<string, FeedAuthor>();
  (payload?.authors ?? []).forEach((a: FeedAuthor) => authorMap.set(a.id, a));
  return (payload?.posts ?? []).map((p: any) => ({
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
  }));
}

export function useYourCornerFeed(enabled: boolean) {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);

  const fetchFeed = useCallback(async () => {
    const { data, error } = await supabase.rpc("get_your_corner_feed", {
      _limit: PAGE_SIZE,
      _offset: 0,
    });
    if (error || !data) {
      setPosts([]);
      setLoading(false);
      return;
    }
    const mapped = mapPosts(data);
    setPosts(mapped);
    offsetRef.current = mapped.length;
    setHasMore(mapped.length >= PAGE_SIZE);
    setLoading(false);
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const { data, error } = await supabase.rpc("get_your_corner_feed", {
      _limit: PAGE_SIZE,
      _offset: offsetRef.current,
    });
    if (error || !data) {
      setLoadingMore(false);
      return;
    }
    const mapped = mapPosts(data);
    setPosts((prev) => {
      const seen = new Set(prev.map((p) => p.id));
      const merged = [...prev];
      mapped.forEach((p) => {
        if (!seen.has(p.id)) merged.push(p);
      });
      return merged;
    });
    offsetRef.current += mapped.length;
    setHasMore(mapped.length >= PAGE_SIZE);
    setLoadingMore(false);
  }, [loadingMore, hasMore]);

  useEffect(() => {
    if (!enabled) return;
    fetchFeed();

    let pending = false;
    let throttleTimer: ReturnType<typeof setTimeout> | null = null;
    const throttled = () => {
      if (pending || document.visibilityState !== "visible") return;
      pending = true;
      throttleTimer = setTimeout(() => {
        pending = false;
        fetchFeed();
      }, 5000);
    };

    // Single consolidated channel listening to all 4 tables (vs 4 channels before).
    // Mount only after first paint + idle delay so it doesn't compete with initial render.
    let channel: ReturnType<typeof supabase.channel> | null = null;
    const subTimer = setTimeout(() => {
      if (document.visibilityState !== "visible") return;
      channel = supabase
        .channel("your-corner-feed")
        .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_posts" }, throttled)
        .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_reactions" }, throttled)
        .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_comments" }, throttled)
        .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_poll_votes" }, throttled)
        .subscribe();
    }, 2500);

    // Pause realtime when tab is hidden, refetch once when it returns.
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchFeed();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (throttleTimer) clearTimeout(throttleTimer);
      clearTimeout(subTimer);
      if (channel) supabase.removeChannel(channel);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, fetchFeed]);

  const prepend = useCallback((post: FeedPost) => {
    setPosts((prev) => {
      if (prev.some((p) => p.id === post.id)) return prev;
      offsetRef.current += 1;
      return [post, ...prev];
    });
  }, []);

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

  return { posts, loading, loadingMore, hasMore, refresh: fetchFeed, loadMore, trendingTags, prepend };
}
