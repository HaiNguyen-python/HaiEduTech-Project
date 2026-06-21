import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type FeedAuthor = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
};

export type FeedPost = {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  author: FeedAuthor | null;
  reaction_count: number;
  liked_by_me: boolean;
  comment_count: number;
};

export function useYourCornerFeed(enabled: boolean) {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const myId = userData.user?.id ?? null;

    const { data: rawPosts, error } = await supabase
      .from("your_corner_posts")
      .select("id, user_id, content, image_url, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !rawPosts) {
      setPosts([]);
      setLoading(false);
      return;
    }

    const userIds = Array.from(new Set(rawPosts.map((p) => p.user_id)));
    const postIds = rawPosts.map((p) => p.id);

    const [profilesRes, reactionsRes, commentsRes] = await Promise.all([
      userIds.length
        ? supabase.rpc("get_public_profiles", { _ids: userIds })
        : Promise.resolve({ data: [] as FeedAuthor[] }),
      postIds.length
        ? supabase.from("your_corner_reactions").select("post_id, user_id").in("post_id", postIds)
        : Promise.resolve({ data: [] as { post_id: string; user_id: string }[] }),
      postIds.length
        ? supabase.from("your_corner_comments").select("post_id").in("post_id", postIds)
        : Promise.resolve({ data: [] as { post_id: string }[] }),
    ]);

    const profileMap = new Map<string, FeedAuthor>();
    (profilesRes.data ?? []).forEach((p: any) => profileMap.set(p.id, p));

    const reactionCount = new Map<string, number>();
    const likedByMe = new Set<string>();
    (reactionsRes.data ?? []).forEach((r: any) => {
      reactionCount.set(r.post_id, (reactionCount.get(r.post_id) ?? 0) + 1);
      if (myId && r.user_id === myId) likedByMe.add(r.post_id);
    });

    const commentCount = new Map<string, number>();
    (commentsRes.data ?? []).forEach((c: any) => {
      commentCount.set(c.post_id, (commentCount.get(c.post_id) ?? 0) + 1);
    });

    setPosts(
      rawPosts.map((p) => ({
        ...p,
        author: profileMap.get(p.user_id) ?? null,
        reaction_count: reactionCount.get(p.id) ?? 0,
        liked_by_me: likedByMe.has(p.id),
        comment_count: commentCount.get(p.id) ?? 0,
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    fetchFeed();
    const channel = supabase
      .channel("your-corner-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_posts" }, () => fetchFeed())
      .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_reactions" }, () => fetchFeed())
      .on("postgres_changes", { event: "*", schema: "public", table: "your_corner_comments" }, () => fetchFeed())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, fetchFeed]);

  return { posts, loading, refresh: fetchFeed };
}
