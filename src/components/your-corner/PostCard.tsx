import { memo, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, MessageCircle, Trash2, Send, Bookmark, Share2, Pencil, X, Check, Globe2, GraduationCap, Lock, Pin, PinOff, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import type { FeedPost, FeedAuthor } from "@/hooks/useYourCornerFeed";
import { subjectMap, linkifyHashtags } from "@/lib/yourCornerMeta";
import { REACTIONS, reactionMap, topReactionEmojis, type ReactionType } from "@/lib/yourCornerReactions";
import { useUserRole } from "@/hooks/useUserRole";
import PollBlock from "./PollBlock";





import CommentItem, { type CornerComment, type CommentLikeMap } from "./CommentItem";

type Comment = CornerComment;

interface Props {
  post: FeedPost;
  currentUserId: string;
  onChanged: () => void;
}

function PostCardImpl({ post, currentUserId, onChanged }: Props) {
  const [liked, setLiked] = useState(post.liked_by_me);
  const [likeCount, setLikeCount] = useState(post.reaction_count);
  const [bookmarked, setBookmarked] = useState(post.bookmarked_by_me);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [heartPop, setHeartPop] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.content);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [commentLikes, setCommentLikes] = useState<CommentLikeMap>({});
  const [myReaction, setMyReaction] = useState<ReactionType | null>((post.my_reaction as ReactionType) ?? null);
  const [reactionTypes, setReactionTypes] = useState<Record<string, number>>(post.reaction_types ?? {});
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pinnedAt, setPinnedAt] = useState<string | null>(post.pinned_at);
  const { roles } = useUserRole();
  const isStaff = roles.some((r) => r === "admin" || r === "teacher" || r === "assistant");

  useEffect(() => {
    setLiked(post.liked_by_me);
    setLikeCount(post.reaction_count);
    setBookmarked(post.bookmarked_by_me);
    setMyReaction((post.my_reaction as ReactionType) ?? null);
    setReactionTypes(post.reaction_types ?? {});
    setPinnedAt(post.pinned_at);
  }, [post.liked_by_me, post.reaction_count, post.bookmarked_by_me, post.my_reaction, post.reaction_types, post.pinned_at]);

  // Auto-scroll to anchored post (e.g. #post-<id> in URL)
  useEffect(() => {
    if (window.location.hash === `#post-${post.id}`) {
      const el = document.getElementById(`post-${post.id}`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
        el.classList.add("ring-2", "ring-primary");
        setTimeout(() => el.classList.remove("ring-2", "ring-primary"), 2500);
      }
    }
  }, [post.id]);




  const authorName = post.author?.full_name?.trim() || "Học viên";
  const initials = authorName.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
  const subjMeta = post.subject ? subjectMap.get(post.subject as any) : null;

  /**
   * One reaction per user per post. Clicking the same emoji removes it,
   * picking another one switches type without changing the total count.
   */
  const setReaction = async (type: ReactionType | null) => {
    setPickerOpen(false);
    const prev = { my: myReaction, count: likeCount, types: reactionTypes };
    const remove = type === null || type === myReaction;
    const nextType = remove ? null : type;

    // Optimistic UI
    setMyReaction(nextType);
    setLiked(!!nextType);
    setLikeCount((c) => Math.max(0, c + (prev.my ? 0 : 1) - (nextType ? 0 : 1)));
    setReactionTypes((m) => {
      const copy = { ...m };
      if (prev.my) copy[prev.my] = Math.max(0, (copy[prev.my] ?? 1) - 1);
      if (nextType) copy[nextType] = (copy[nextType] ?? 0) + 1;
      return copy;
    });
    if (nextType) {
      setHeartPop(true);
      setTimeout(() => setHeartPop(false), 600);
    }

    const table = supabase.from("your_corner_reactions") as any;
    let error: any = null;
    if (!nextType) {
      ({ error } = await table.delete().eq("post_id", post.id).eq("user_id", currentUserId));
    } else if (prev.my) {
      ({ error } = await table.update({ type: nextType }).eq("post_id", post.id).eq("user_id", currentUserId));
    } else {
      ({ error } = await table.insert({ post_id: post.id, user_id: currentUserId, type: nextType }));
    }
    if (error) {
      setMyReaction(prev.my);
      setLiked(!!prev.my);
      setLikeCount(prev.count);
      setReactionTypes(prev.types);
      toast.error("Không cập nhật được cảm xúc");
    }
  };

  const togglePin = async () => {
    const next = pinnedAt ? null : new Date().toISOString();
    setPinnedAt(next);
    const { error } = await (supabase.from("your_corner_posts") as any)
      .update({ pinned_at: next, pinned_by: next ? currentUserId : null })
      .eq("id", post.id);
    if (error) {
      setPinnedAt(pinnedAt);
      toast.error("Không cập nhật được ghim");
      return;
    }
    toast.success(next ? "Đã ghim bài viết 📌" : "Đã bỏ ghim");
    onChanged();
  };

  const toggleBookmark = async () => {
    const next = !bookmarked;
    setBookmarked(next);
    if (next) {
      const { error } = await supabase
        .from("your_corner_bookmarks")
        .insert({ post_id: post.id, user_id: currentUserId });
      if (error) {
        setBookmarked(false);
        toast.error("Không lưu được");
      } else {
        toast.success("Đã lưu vào Góc của bạn 🔖");
      }
    } else {
      const { error } = await supabase
        .from("your_corner_bookmarks")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", currentUserId);
      if (error) {
        setBookmarked(true);
        toast.error("Không bỏ lưu được");
      }
    }
  };

  const sharePost = async () => {
    const url = `${window.location.origin}/your-corner#post-${post.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Your Corner - HaiEduTech", text: post.content.slice(0, 120), url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Đã sao chép link bài viết");
      }
    } catch {
      // user cancelled
    }
  };

  const loadComments = async () => {
    setLoadingComments(true);
    const { data } = await supabase
      .from("your_corner_comments")
      .select("id, post_id, user_id, content, created_at, parent_id")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true });
    const list = (data ?? []) as any[];
    const ids = Array.from(new Set(list.map((c) => c.user_id as string)));
    const { data: profs } = ids.length
      ? await supabase.rpc("get_public_profiles", { _ids: ids })
      : { data: [] as FeedAuthor[] };
    const pmap = new Map<string, FeedAuthor>();
    (profs ?? []).forEach((p: any) => pmap.set(p.id, p));
    setComments(list.map((c) => ({ ...c, parent_id: c.parent_id ?? null, author: pmap.get(c.user_id) ?? null })));

    // Per-comment hearts
    const commentIds = list.map((c) => c.id as string);
    if (commentIds.length > 0) {
      const { data: rx } = await (supabase.from("your_corner_comment_reactions" as any) as any)
        .select("comment_id, user_id")
        .in("comment_id", commentIds);
      const map: CommentLikeMap = {};
      (rx ?? []).forEach((r: any) => {
        const cur = map[r.comment_id] ?? { count: 0, me: false };
        cur.count += 1;
        if (r.user_id === currentUserId) cur.me = true;
        map[r.comment_id] = cur;
      });
      setCommentLikes(map);
    } else {
      setCommentLikes({});
    }
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

  const submitReply = async (parentId: string, text: string) => {
    const { error } = await (supabase.from("your_corner_comments") as any)
      .insert({ post_id: post.id, user_id: currentUserId, content: text, parent_id: parentId });
    if (error) {
      toast.error("Không gửi được trả lời");
      return;
    }
    toast.success("Đã trả lời 💬");
    await loadComments();
    onChanged();
  };

  const toggleCommentLike = async (commentId: string) => {
    const cur = commentLikes[commentId] ?? { count: 0, me: false };
    const next = !cur.me;
    setCommentLikes((m) => ({
      ...m,
      [commentId]: { count: Math.max(0, cur.count + (next ? 1 : -1)), me: next },
    }));
    const table = supabase.from("your_corner_comment_reactions" as any) as any;
    const { error } = next
      ? await table.insert({ comment_id: commentId, user_id: currentUserId })
      : await table.delete().eq("comment_id", commentId).eq("user_id", currentUserId);
    if (error) {
      setCommentLikes((m) => ({ ...m, [commentId]: cur }));
    }
  };

  const deletePost = async () => {
    setConfirmDelete(false);
    const { error } = await supabase.from("your_corner_posts").delete().eq("id", post.id);
    if (error) {
      toast.error("Không xoá được");
      return;
    }
    toast.success("Đã xoá bài viết");
    onChanged();
  };

  const saveEdit = async () => {
    const t = editText.trim();
    if (!t) {
      toast.error("Nội dung không được để trống");
      return;
    }
    if (t.length > 5000) {
      toast.error("Nội dung tối đa 5000 ký tự");
      return;
    }
    const { error } = await supabase
      .from("your_corner_posts")
      .update({ content: t })
      .eq("id", post.id);
    if (error) {
      toast.error("Không lưu được chỉnh sửa");
      return;
    }
    setEditing(false);
    toast.success("Đã cập nhật bài viết");
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
  const escaped = DOMPurify.sanitize(post.content, { ALLOWED_TAGS: [] });
  const withBreaks = escaped.replace(/\n/g, "<br/>");
  const sanitized = linkifyHashtags(withBreaks);
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: vi });


  return (
    <Card
      id={`post-${post.id}`}
      className={`p-5 space-y-3 backdrop-blur-md bg-white/85 dark:bg-card/85 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in border-l-4 ${
        subjMeta?.border ?? "border-l-primary/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/10">
            {post.author?.avatar_url && <AvatarImage src={post.author.avatar_url} alt={authorName} />}
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm flex items-center gap-1.5">
              {authorName}
              {post.mood && <span className="text-base leading-none">{post.mood}</span>}
              {pinnedAt && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  <Pin className="w-3 h-3" /> Ghim
                </span>
              )}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
              {timeAgo}
              {(() => {
                const v = post.visibility ?? "public";
                const Icn = v === "public" ? Globe2 : v === "teacher_only" ? GraduationCap : Lock;
                const label = v === "public" ? "Công khai" : v === "teacher_only" ? "Chỉ giáo viên" : "Chỉ mình tôi";
                return (
                  <>
                    <span>·</span>
                    <span title={label} className="inline-flex items-center"><Icn className="w-3 h-3" /></span>
                  </>
                );
              })()}
              {subjMeta && (
                <>
                  <span>·</span>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${subjMeta.bg} ${subjMeta.color}`}>
                    {subjMeta.emoji} {subjMeta.label}
                  </span>
                </>
              )}
            </p>

          </div>
        </div>
        {isStaff && (
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePin}
            title={pinnedAt ? "Bỏ ghim bài viết" : "Ghim bài viết lên đầu"}
            className={pinnedAt ? "text-amber-600" : "text-muted-foreground"}
          >
            {pinnedAt ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
          </Button>
        )}
        {isMine && (
          <div className="flex items-center gap-1">
            {!editing && (
              <Button variant="ghost" size="sm" onClick={() => { setEditText(post.content); setEditing(true); }} className="text-muted-foreground">
                <Pencil className="w-4 h-4" />
              </Button>
            )}
            {confirmDelete ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)} className="text-muted-foreground">
                  <X className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={deletePost} className="text-destructive">
                  <Check className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(true)} className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {editing ? (
        <div className="space-y-2">
          <Textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="min-h-[100px] text-base"
            maxLength={5000}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Huỷ</Button>
            <Button size="sm" onClick={saveEdit} className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
              Lưu thay đổi
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="text-base whitespace-pre-wrap break-words leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
      )}

      {(() => {
        const gallery = (post.image_urls && post.image_urls.length > 0)
          ? post.image_urls
          : (post.image_url ? [post.image_url] : []);
        if (gallery.length === 0) return null;
        const gridClass =
          gallery.length === 1 ? "grid-cols-1"
          : gallery.length === 2 ? "grid-cols-2"
          : gallery.length === 3 ? "grid-cols-3"
          : "grid-cols-2 sm:grid-cols-3";
        return (
          <>
            <div className={`grid ${gridClass} gap-1.5`}>
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                  className={`block overflow-hidden rounded-lg group ${gallery.length === 1 ? "" : "aspect-square"}`}
                >
                  <img
                    src={src}
                    alt={`post-${i + 1}`}
                    loading="lazy"
                    className={`w-full ${gallery.length === 1 ? "max-h-[500px] object-cover" : "h-full object-cover"} transition-transform duration-300 group-hover:scale-[1.03]`}
                  />
                </button>
              ))}
            </div>

            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
              <DialogContent className="max-w-5xl p-2 bg-background/95 backdrop-blur">
                <div className="flex items-center justify-center gap-2">
                  {gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                      className="shrink-0 px-3 py-2 rounded-full bg-muted hover:bg-muted/80"
                      aria-label="Trước"
                    >‹</button>
                  )}
                  <img src={gallery[lightboxIndex] ?? gallery[0]} alt="post" className="w-full h-auto max-h-[85vh] object-contain rounded" />
                  {gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setLightboxIndex((i) => (i + 1) % gallery.length)}
                      className="shrink-0 px-3 py-2 rounded-full bg-muted hover:bg-muted/80"
                      aria-label="Sau"
                    >›</button>
                  )}
                </div>
                {gallery.length > 1 && (
                  <p className="text-center text-xs text-muted-foreground mt-2">{lightboxIndex + 1} / {gallery.length}</p>
                )}
              </DialogContent>
            </Dialog>
          </>
        );
      })()}

      {post.poll && (
        <PollBlock
          postId={post.id}
          userId={currentUserId}
          poll={post.poll}
          votes={post.poll_votes}
          myVote={post.my_vote}
          onChanged={onChanged}
        />
      )}


      {/* Reaction summary */}
      {likeCount > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="flex -space-x-1">
            {topReactionEmojis(reactionTypes).map((e, i) => (
              <span key={e + i} className="text-base leading-none">{e}</span>
            ))}
          </span>
          <span>{likeCount}</span>
        </div>
      )}

      <div className="flex items-center gap-1 border-t pt-2 flex-wrap">
        <div
          className="relative"
          onMouseEnter={() => setPickerOpen(true)}
          onMouseLeave={() => setPickerOpen(false)}
        >
          {pickerOpen && (
            <div className="absolute bottom-full left-0 mb-1 z-20 flex items-center gap-1 rounded-full border bg-popover px-2 py-1 shadow-lg animate-fade-in">
              {REACTIONS.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  title={r.label}
                  aria-label={r.label}
                  onClick={() => setReaction(r.key)}
                  className={`text-xl leading-none transition-transform hover:scale-125 ${myReaction === r.key ? "scale-125" : ""}`}
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReaction(myReaction ?? "like")}
            onFocus={() => setPickerOpen(true)}
            className={myReaction ? reactionMap.get(myReaction)?.color : "text-muted-foreground"}
          >
            {myReaction ? (
              <span className={`mr-2 text-base leading-none transition-transform ${heartPop ? "scale-150" : "scale-100"}`}>
                {reactionMap.get(myReaction)?.emoji}
              </span>
            ) : (
              <ThumbsUp className="w-4 h-4 mr-2" />
            )}
            {myReaction ? reactionMap.get(myReaction)?.label : "Thích"}
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={openComments} className="text-muted-foreground">
          <MessageCircle className="w-4 h-4 mr-2" />
          {post.comment_count > 0 ? post.comment_count : ""} Bình luận
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleBookmark}
          className={bookmarked ? "text-amber-600 hover:text-amber-700" : "text-muted-foreground"}
        >
          <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? "fill-current" : ""}`} />
          {bookmarked ? "Đã lưu" : "Lưu"}
        </Button>
        <Button variant="ghost" size="sm" onClick={sharePost} className="text-muted-foreground">
          <Share2 className="w-4 h-4 mr-2" /> Chia sẻ
        </Button>
      </div>

      {showComments && (
        <div className="border-t pt-3 space-y-3">
          {loadingComments ? (
            <p className="text-sm text-muted-foreground text-center">Đang tải...</p>
          ) : (
            (() => {
              const topLevel = comments.filter((c) => !c.parent_id);
              const repliesOf = (id: string) => comments.filter((c) => c.parent_id === id);
              return topLevel.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  replies={repliesOf(c.id)}
                  currentUserId={currentUserId}
                  postOwnerId={post.user_id}
                  likes={commentLikes}
                  onToggleLike={toggleCommentLike}
                  onSubmitReply={submitReply}
                  onDelete={deleteComment}
                />
              ));
            })()
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

const PostCard = memo(PostCardImpl, (prev, next) => prev.post === next.post && prev.currentUserId === next.currentUserId);
export default PostCard;
