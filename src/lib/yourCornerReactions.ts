// Multi-emotion reactions for Your Corner posts.
// 'like' stays the default so existing rows keep working.

export type ReactionType = "like" | "love" | "haha" | "wow" | "sad";

export const REACTIONS: { key: ReactionType; emoji: string; label: string; color: string }[] = [
  { key: "like", emoji: "👍", label: "Thích", color: "text-blue-600 dark:text-blue-300" },
  { key: "love", emoji: "❤️", label: "Yêu thích", color: "text-rose-600 dark:text-rose-300" },
  { key: "haha", emoji: "😄", label: "Haha", color: "text-amber-600 dark:text-amber-300" },
  { key: "wow", emoji: "😮", label: "Wow", color: "text-purple-600 dark:text-purple-300" },
  { key: "sad", emoji: "😢", label: "Buồn", color: "text-cyan-600 dark:text-cyan-300" },
];

export const reactionMap = new Map(REACTIONS.map((r) => [r.key, r]));

/** Top reaction emojis for a post, ordered by count desc. */
export function topReactionEmojis(counts: Record<string, number> | null, max = 3): string[] {
  if (!counts) return [];
  return Object.entries(counts)
    .filter(([k, v]) => reactionMap.has(k as ReactionType) && Number(v) > 0)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, max)
    .map(([k]) => reactionMap.get(k as ReactionType)!.emoji);
}
