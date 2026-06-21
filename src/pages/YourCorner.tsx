import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FloatingSubjectIcons from "@/components/your-corner/FloatingSubjectIcons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Sparkles, MessageCircle, Heart, Flame, BookOpen, Bookmark, TrendingUp, Hash, Trophy, Lightbulb, Crown } from "lucide-react";
import PostComposer from "@/components/your-corner/PostComposer";
import PostCard from "@/components/your-corner/PostCard";
import StoryBar from "@/components/your-corner/StoryBar";
import { useYourCornerFeed } from "@/hooks/useYourCornerFeed";
import { SUBJECTS, subjectMap, SubjectKey, extractHashtags } from "@/lib/yourCornerMeta";

const DAILY_PROMPTS = [
  { emoji: "📘", text: "Hôm nay em học được từ vựng mới nào? Chia sẻ 3 từ tâm đắc nhất nhé!" },
  { emoji: "💡", text: "Mẹo học nào đang giúp em tiến bộ nhất tuần này?" },
  { emoji: "🎯", text: "Mục tiêu học của em trong 7 ngày tới là gì?" },
  { emoji: "🔥", text: "Khoe streak học liên tục của em với cả lớp nào!" },
  { emoji: "🎧", text: "Bài nghe / podcast nào em mới khám phá và thấy hay?" },
  { emoji: "✏️", text: "Câu/đoạn viết nào em vừa hoàn thành và tự hào nhất?" },
  { emoji: "🌏", text: "Ngôn ngữ em đang học có cụm/idiom nào thú vị? Chia sẻ nhé!" },
];
const todayPrompt = DAILY_PROMPTS[new Date().getDate() % DAILY_PROMPTS.length];

type FeedTab = "latest" | "trending" | "saved";

export default function YourCorner() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userMeta, setUserMeta] = useState<{ name: string | null; avatar: string | null }>({ name: null, avatar: null });
  const [authReady, setAuthReady] = useState(false);
  const [tab, setTab] = useState<FeedTab>("latest");
  const [subjectFilter, setSubjectFilter] = useState<SubjectKey | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user;
      setUserId(u?.id ?? null);
      if (u?.id) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", u.id)
          .maybeSingle();
        setUserMeta({ name: prof?.full_name ?? null, avatar: prof?.avatar_url ?? null });
      }
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const { posts, loading, refresh, trendingTags } = useYourCornerFeed(!!userId);

  // Karma = own posts + likes received on own posts
  const myKarma = useMemo(() => {
    if (!userId) return { posts: 0, likes: 0 };
    const mine = posts.filter((p) => p.user_id === userId);
    return {
      posts: mine.length,
      likes: mine.reduce((s, p) => s + p.reaction_count, 0),
    };
  }, [posts, userId]);

  const filtered = useMemo(() => {
    let list = posts;
    if (tab === "saved") list = list.filter((p) => p.bookmarked_by_me);
    if (tab === "trending") {
      const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
      list = [...list]
        .filter((p) => new Date(p.created_at).getTime() >= cutoff)
        .sort((a, b) => b.reaction_count + b.comment_count - (a.reaction_count + a.comment_count));
    }
    if (subjectFilter) list = list.filter((p) => p.subject === subjectFilter);
    if (tagFilter) {
      const needle = tagFilter.toLowerCase();
      list = list.filter((p) => extractHashtags(p.content).includes(needle));
    }


    return list;
  }, [posts, tab, subjectFilter, tagFilter]);

  // Top contributors this week (by likes + comments received on their posts)
  const topContributors = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const score = new Map<string, { user: typeof posts[number]["author"]; pts: number; posts: number }>();
    posts.forEach((p) => {
      if (new Date(p.created_at).getTime() < cutoff || !p.author) return;
      const cur = score.get(p.user_id) ?? { user: p.author, pts: 0, posts: 0 };
      cur.pts += p.reaction_count * 2 + p.comment_count + 1;
      cur.posts += 1;
      score.set(p.user_id, cur);
    });
    return Array.from(score.values()).sort((a, b) => b.pts - a.pts).slice(0, 5);
  }, [posts]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-background to-emerald-50/40 dark:from-blue-950/20 dark:via-background dark:to-emerald-950/20">
      <SEO
        title="Your Corner - Góc Chia Sẻ Học Viên | HaiEduTech"
        description="Không gian dành cho học viên HaiEduTech chia sẻ bài viết, kỹ năng và hành trình học tập."
      />
      <Navbar />

      {/* Decorative gradient orbs (static, subtle) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-emerald-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl" />
      </div>

      <FloatingSubjectIcons count={44} />



      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero */}
        <header className="text-center mb-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-background/70 backdrop-blur-md border border-primary/20 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Cộng đồng học viên HaiEduTech
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 bg-clip-text text-transparent">
              Your Corner
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-xl mx-auto">
            Góc chia sẻ bài viết, kỹ năng và hành trình học - nơi các em vui học cùng bạn bè ✨
          </p>
        </header>

        {!authReady ? (
          <div className="text-center text-muted-foreground py-12">Đang tải...</div>
        ) : !userId ? (
          <Card className="max-w-md mx-auto p-8 text-center space-y-4 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/20 shadow-xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold">Đăng nhập để tham gia</h2>
            <p className="text-muted-foreground text-sm">
              Your Corner là cộng đồng dành riêng cho học viên HaiEduTech. Đăng nhập để xem và chia sẻ bài viết.
            </p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md hover:shadow-lg transition-shadow">
              <Link to="/auth">Đăng nhập ngay</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-[260px_minmax(0,640px)_280px] gap-6 max-w-6xl mx-auto justify-center">
            {/* Left sidebar */}
            <aside className="hidden lg:block space-y-4">
              <Card className="p-5 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/10 shadow-sm sticky top-24 space-y-5">
                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" /> Karma của bạn
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-300">{myKarma.posts}</div>
                      <div className="text-[10px] text-muted-foreground">Bài viết</div>
                    </div>
                    <div className="p-2 rounded-lg bg-rose-500/10">
                      <div className="text-lg font-bold text-rose-600 dark:text-rose-300">{myKarma.likes}</div>
                      <div className="text-[10px] text-muted-foreground">Lượt thích</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-500" /> Lọc theo chủ đề
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSubjectFilter(null)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                        !subjectFilter ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"
                      }`}
                    >
                      Tất cả
                    </button>
                    {SUBJECTS.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setSubjectFilter(subjectFilter === s.key ? null : s.key)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                          subjectFilter === s.key ? `${s.bg} ${s.color} ring-1 ring-current` : "bg-muted hover:bg-muted/70"
                        }`}
                      >
                        {s.emoji} {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </aside>

            {/* Feed */}
            <div className="space-y-5 mx-auto w-full max-w-[640px]">
              <StoryBar />
              <PostComposer userId={userId} onPosted={refresh} userName={userMeta.name} userAvatar={userMeta.avatar} />

              {/* Tabs */}
              <Tabs value={tab} onValueChange={(v) => setTab(v as FeedTab)}>
                <TabsList className="grid grid-cols-3 w-full backdrop-blur-md bg-white/75 dark:bg-card/75">
                  <TabsTrigger value="latest"><Sparkles className="w-3.5 h-3.5 mr-1.5" /> Mới nhất</TabsTrigger>
                  <TabsTrigger value="trending"><TrendingUp className="w-3.5 h-3.5 mr-1.5" /> Trending</TabsTrigger>
                  <TabsTrigger value="saved"><Bookmark className="w-3.5 h-3.5 mr-1.5" /> Đã lưu</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Active filter chip */}
              {(subjectFilter || tagFilter) && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Đang lọc:</span>
                  {subjectFilter && (
                    <button
                      onClick={() => setSubjectFilter(null)}
                      className={`px-2 py-0.5 rounded-full ${subjectMap.get(subjectFilter)?.bg} ${subjectMap.get(subjectFilter)?.color}`}
                    >
                      {subjectMap.get(subjectFilter)?.emoji} {subjectMap.get(subjectFilter)?.label} ✕
                    </button>
                  )}
                  {tagFilter && (
                    <button onClick={() => setTagFilter(null)} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {tagFilter} ✕
                    </button>
                  )}
                </div>
              )}

              {loading && posts.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground backdrop-blur-md bg-white/70 dark:bg-card/70">
                  Đang tải bài viết...
                </Card>
              ) : filtered.length === 0 ? (
                <Card className="p-10 text-center space-y-3 backdrop-blur-md bg-white/75 dark:bg-card/75 border-dashed border-2 border-primary/20">
                  <div className="text-5xl">{tab === "saved" ? "🔖" : "✍️"}</div>
                  <p className="font-semibold">
                    {tab === "saved" ? "Chưa lưu bài nào" : "Chưa có bài viết phù hợp"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {tab === "saved" ? "Bấm Lưu trên bài bất kỳ để xem lại sau." : "Hãy là người đầu tiên chia sẻ với cộng đồng!"}
                  </p>
                </Card>
              ) : (
                filtered.map((p) => (
                  <PostCard key={p.id} post={p} currentUserId={userId} onChanged={refresh} />
                ))
              )}
            </div>

            {/* Right sidebar */}
            <aside className="hidden lg:block space-y-4">
              <Card className="p-5 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/10 shadow-sm sticky top-24 space-y-5">
                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-purple-500" /> Đang hot 7 ngày
                  </h3>
                  {trendingTags.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Chưa có hashtag nào. Hãy bắt đầu với #IELTS, #Python ✨</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {trendingTags.map(({ tag, count }) => (
                        <li key={tag}>
                          <button
                            onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                            className={`w-full flex items-center justify-between text-xs px-2 py-1.5 rounded-md transition ${
                              tagFilter === tag ? "bg-primary/10 text-primary" : "hover:bg-muted"
                            }`}
                          >
                            <span className="font-semibold">{tag}</span>
                            <span className="text-muted-foreground">{count}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" /> Hoạt động cộng đồng
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-500" />Bài viết</span>
                      <span className="font-bold">{posts.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2"><Heart className="w-4 h-4 text-rose-500" />Lượt thích</span>
                      <span className="font-bold">{posts.reduce((s, p) => s + p.reaction_count, 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2"><MessageCircle className="w-4 h-4 text-emerald-500" />Bình luận</span>
                      <span className="font-bold">{posts.reduce((s, p) => s + p.comment_count, 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t text-xs text-muted-foreground italic text-center">
                  "Học thông minh - Dẫn đầu kỷ nguyên số" 💙💚
                </div>
              </Card>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
