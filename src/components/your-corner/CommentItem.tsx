import { useState } from "react";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Trash2, Send, Reply } from "lucide-react";
import { toast } from "sonner";
import type { FeedAuthor } from "@/hooks/useYourCornerFeed";

export type CornerComment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  author: FeedAuthor | null;
};

export type CommentLikeMap = Record<string, { count: number; me: boolean }>;

interface Props {
  comment: CornerComment;
  replies: CornerComment[];
  currentUserId: string;
  postOwnerId: string;
  likes: CommentLikeMap;
  onToggleLike: (commentId: string) => void;
  onSubmitReply: (parentId: string, text: string) => Promise<void>;
  onDelete: (commentId: string) => void;
  depth?: number;
  /** Top-level comment id; replies always attach to the thread root (1-level nesting). */
  threadId?: string;
}

/** One comment bubble with like + one-level reply (Facebook style). */
export default function CommentItem({
  comment,
  replies,
  currentUserId,
  postOwnerId,
  likes,
  onToggleLike,
  onSubmitReply,
  onDelete,
  depth = 0,
  threadId,
}: Props) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  const name = comment.author?.full_name?.trim() || "Học viên";
  const initials = name.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
  const like = likes[comment.id] ?? { count: 0, me: false };
  const canDelete = comment.user_id === currentUserId || postOwnerId === currentUserId;
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: vi });

  const handleLike = () => {
    if (!like.me) {
      setHeartPop(true);
      setTimeout(() => setHeartPop(false), 500);
    }
    onToggleLike(comment.id);
  };

  const openReply = () => {
    setReplyOpen((v) => !v);
    if (!replyOpen) {
      const tag = `@${name.replace(/\s+/g, "_")} `;
      setReplyText((t) => (t.startsWith("@") ? t : tag));
    }
  };

  const sendReply = async () => {
    const t = replyText.trim();
    if (!t || sending) return;
    if (t.length > 1000) {
      toast.error("Trả lời tối đa 1000 ký tự");
      return;
    }
    setSending(true);
    await onSubmitReply(threadId ?? comment.id, t);
    setSending(false);
    setReplyText("");
    setReplyOpen(false);
  };

  return (
    <div className={depth > 0 ? "ml-9" : ""}>
      <div className="flex items-start gap-2 animate-fade-in">
        <Avatar className={`${depth > 0 ? "h-6 w-6" : "h-7 w-7"} flex-shrink-0`}>
          {comment.author?.avatar_url && <AvatarImage src={comment.author.avatar_url} alt={name} />}
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="bg-muted/50 rounded-2xl px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold">{name}</p>
              {canDelete && (
                <button
                  onClick={() => onDelete(comment.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Xoá"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
            <p className="text-sm whitespace-pre-wrap break-words">
              {DOMPurify.sanitize(comment.content, { ALLOWED_TAGS: [] })}
            </p>
          </div>
          <div className="flex items-center gap-3 px-2 pt-0.5 text-xs text-muted-foreground">
            <span>{timeAgo}</span>
            <button
              type="button"
              onClick={handleLike}
              className={`inline-flex items-center gap-1 font-semibold transition-colors ${
                like.me ? "text-red-500" : "hover:text-red-500"
              }`}
              aria-label="Thích bình luận"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform ${like.me ? "fill-current" : ""} ${
                  heartPop ? "scale-150" : "scale-100"
                }`}
              />
              {like.count > 0 ? like.count : "Thích"}
            </button>
            <button
              type="button"
              onClick={openReply}
              className="inline-flex items-center gap-1 font-semibold hover:text-primary"
              aria-label="Trả lời bình luận"
            >
              <Reply className="w-3.5 h-3.5" /> Trả lời
            </button>
          </div>

          {replyOpen && (
            <div className="flex items-center gap-2 mt-2">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendReply();
                  }
                }}
                placeholder={`Trả lời ${name}...`}
                maxLength={1000}
                className="rounded-full h-9 text-sm"
                autoFocus
              />
              <Button size="sm" onClick={sendReply} disabled={!replyText.trim() || sending}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}

          {replies.length > 0 && (
            <div className="mt-2 space-y-2">
              {replies.map((r) => (
                <CommentItem
                  key={r.id}
                  comment={r}
                  replies={[]}
                  currentUserId={currentUserId}
                  postOwnerId={postOwnerId}
                  likes={likes}
                  onToggleLike={onToggleLike}
                  onSubmitReply={onSubmitReply}
                  onDelete={onDelete}
                  depth={depth + 1}
                  threadId={threadId ?? comment.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
