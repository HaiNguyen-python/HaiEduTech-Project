import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { FeedPost } from "@/hooks/useYourCornerFeed";

// Defer the heavy PostCard module (DOMPurify + Recharts via PollBlock) until visible.
const PostCard = lazy(() => import("./PostCard"));

interface Props {
  post: FeedPost;
  currentUserId: string;
  onChanged: () => void;
  /** Mount immediately without waiting for intersection (for above-the-fold posts). */
  eager?: boolean;
}

/**
 * Mounts the real PostCard only when the placeholder enters the viewport.
 * Keeps a stable min-height so scroll position never jumps.
 */
export default function LazyPostCard({ post, currentUserId, onChanged, eager = false }: Props) {
  const [visible, setVisible] = useState(eager);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : 220 }}>
      {visible ? (
        <Suspense fallback={<PlaceholderCard />}>
          <PostCard post={post} currentUserId={currentUserId} onChanged={onChanged} />
        </Suspense>
      ) : (
        <PlaceholderCard />
      )}
    </div>
  );
}

function PlaceholderCard() {
  return (
    <div className="p-5 rounded-lg bg-white/40 dark:bg-card/40 backdrop-blur-sm shadow-sm border border-border/40 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-3 w-32 bg-muted rounded" />
          <div className="h-2 w-20 bg-muted rounded" />
        </div>
      </div>
      <div className="h-3 w-full bg-muted rounded mb-2" />
      <div className="h-3 w-4/5 bg-muted rounded" />
    </div>
  );
}
