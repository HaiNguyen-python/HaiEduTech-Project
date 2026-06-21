import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Trash2, Send } from "lucide-react";
import { toast } from "sonner";
import type { FeedPost, FeedAuthor } from "@/hooks/useYourCornerFeed";

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author: FeedAuthor | null;
};

interface Props {
  post: FeedPost;
  currentUserId: string;
  onChanged: () => void;
}

export default function PostCard({ post, currentUserId, onChanged }: Props) {
  const [liked, setLiked] = useState(post.liked_by_me);
  const [likeCount, setLikeCount] = useState(post.reaction_count);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    setLiked(post.liked_by_me);
    setLikeCount(post.reaction_count);
  }, [post.liked_by_me, post.reaction_count]);

  const authorName = post.author?.full_name?.trim() || "Học viên";
  const initials = authorName.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";

  const toggleLike = async () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => c + (next ? 1 : -1));
    if (next) {
      const { error } = await supabase
        .from("your_corner_reactions")
        .insert({ post_id: post.id, user_id: currentUserId });
      if (error) {
        setLiked(false);
        setLikeCount((c) => c - 1);
      }
    } else {
      const { error } = await supabase
        .from("your_corner_reactions")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", currentUserId);
      if (error) {
        setLiked(true);
        setLikeCount((c) => c + 1);
      }
    }
  };

  const loadComments = async () => {
    setLoadingComments(true);
    const { data } = await supabase
      .from("your_corner_comments")
      .select("id, post_id, user_id, content, created_at")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true });
    const list = data ?? [];
    const ids = Array.from(new Set(list.map((c) => c.user_id)));
    const { data: profs } = ids.length
      ? await supabase.rpc("get_public_profiles", { _ids: ids })
      : { data: [] as FeedAuthor[] };
    const pmap = new Map<string, FeedAuthor>();
    (profs ?? []).forEach((p: any) => pmap.set(p.id, p));
    setComments(list.map((c) => ({ ...c, author: pmap.get(c.user_id) ?? null })));
    setLoadingComments(false);
  };

  const openComments = async () => {
    setShowComments((v) => !v);
    if (!showComments && comments.length === 0) await loadComments();
  };

  const submitComment = async () => {
    const t = commentText.trim();
    if (!t) return;
    if (t.length > 1000) {
      toast.error("Bình luận tối đa 1000 ký tự");
      return;
    }
    const { error } = await supabase
      .from("your_corner_comments")
      .insert({ post_id: post.id, user_id: currentUserId, content: t });
    if (error) {
      toast.error("Không gửi được bình luận");
      return;
    }
    setCommentText("");
    await loadComments();
    onChanged();
  };

  const deletePost = async () => {
    if (!confirm("Xoá bài viết này?")) return;
    const { error } = await supabase.from("your_corner_posts").delete().eq("id", post.id);
    if (error) {
      toast.error("Không xoá được");
      return;
    }
    toast.success("Đã xoá bài viết");
    onChanged();
  };

  const deleteComment = async (id: string) => {
    const { error } = await supabase.from("your_corner_comments").delete().eq("id", id);
    if (error) {
      toast.error("Không xoá được bình luận");
      return;
    }
    await loadComments();
    onChanged();
  };

  const isMine = post.user_id === currentUserId;
  const sanitized = DOMPurify.sanitize(post.content.replace(/\n/g, "<br/>"));
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: vi });

  return (
    <Card className="p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {post.author?.avatar_url && <AvatarImage src={post.author.avatar_url} alt={authorName} />}
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{authorName}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
        {isMine && (
          <Button variant="ghost" size="sm" onClick={deletePost} className="text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div
        className="text-base whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />

      {post.image_url && (
        <img src={post.image_url} alt="post" className="rounded-lg max-h-[500px] w-full object-cover" />
      )}

      <div className="flex items-center gap-1 border-t pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLike}
          className={liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground"}
        >
          <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
          {likeCount > 0 ? likeCount : ""} Thích
        </Button>
        <Button variant="ghost" size="sm" onClick={openComments} className="text-muted-foreground">
          <MessageCircle className="w-4 h-4 mr-2" />
          {post.comment_count > 0 ? post.comment_count : ""} Bình luận
        </Button>
      </div>

      {showComments && (
        <div className="border-t pt-3 space-y-3">
          {loadingComments ? (
            <p className="text-sm text-muted-foreground text-center">Đang tải...</p>
          ) : (
            comments.map((c) => {
              const cname = c.author?.full_name?.trim() || "Học viên";
              const cinit = cname.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
              const canDelete = c.user_id === currentUserId || isMine;
              return (
                <div key={c.id} className="flex items-start gap-2">
                  <Avatar className="h-7 w-7 flex-shrink-0">
                    {c.author?.avatar_url && <AvatarImage src={c.author.avatar_url} alt={cname} />}
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-xs">
                      {cinit}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted/50 rounded-2xl px-3 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold">{cname}</p>
                      {canDelete && (
                        <button
                          onClick={() => deleteComment(c.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Xoá"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {DOMPurify.sanitize(c.content, { ALLOWED_TAGS: [] })}
                    </p>
                  </div>
                </div>
              );
            })
          )}

          <div className="flex items-center gap-2">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitComment();
                }
              }}
              placeholder="Viết bình luận..."
              maxLength={1000}
              className="rounded-full"
            />
            <Button size="sm" onClick={submitComment} disabled={!commentText.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
