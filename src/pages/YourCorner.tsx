import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Sparkles, MessageCircle, Heart, Flame, BookOpen, Bookmark, TrendingUp, Hash, Trophy, Lightbulb, Crown, Stars, Zap, Globe2 } from "lucide-react";
import PostComposer from "@/components/your-corner/PostComposer";
import PostCard from "@/components/your-corner/PostCard";
import { useYourCornerFeed } from "@/hooks/useYourCornerFeed";
import { useYourCornerPresence, type OnlineUser } from "@/hooks/useYourCornerPresence";
import { SUBJECTS, subjectMap, SubjectKey, extractHashtags } from "@/lib/yourCornerMeta";
import type { Mentionable } from "@/components/your-corner/MentionInput";
import { useLanguage } from "@/contexts/LanguageContext";

// Defer heavy/below-the-fold widgets to improve initial load time
const FloatingSubjectIcons = lazy(() => import("@/components/your-corner/FloatingSubjectIcons"));
const CornerCheerChibis = lazy(() => import("@/components/your-corner/CornerCheerChibis"));
const OnlineUsersPanel = lazy(() => import("@/components/your-corner/OnlineUsersPanel"));
const Messenger = lazy(() => import("@/components/your-corner/Messenger"));


const DAILY_PROMPTS: { emoji: string; vi: string; en: string }[] = [
  { emoji: "📘", vi: "Hôm nay em học được từ vựng mới nào? Chia sẻ 3 từ tâm đắc nhất nhé!", en: "Which new words did you learn today? Share your 3 favorite ones!" },
  { emoji: "💡", vi: "Mẹo học nào đang giúp em tiến bộ nhất tuần này?", en: "Which study tip is helping you progress most this week?" },
  { emoji: "🎯", vi: "Mục tiêu học của em trong 7 ngày tới là gì?", en: "What is your learning goal for the next 7 days?" },
  { emoji: "🔥", vi: "Khoe streak học liên tục của em với cả lớp nào!", en: "Show off your learning streak with the class!" },
  { emoji: "🎧", vi: "Bài nghe / podcast nào em mới khám phá và thấy hay?", en: "Which podcast or listening track did you just discover and love?" },
  { emoji: "✏️", vi: "Câu/đoạn viết nào em vừa hoàn thành và tự hào nhất?", en: "Which sentence/paragraph have you just finished and are most proud of?" },
  { emoji: "🌏", vi: "Ngôn ngữ em đang học có cụm/idiom nào thú vị? Chia sẻ nhé!", en: "Any interesting idiom from the language you're learning? Share it!" },
];
const todayPromptIdx = new Date().getDate() % DAILY_PROMPTS.length;

type FeedTab = "latest" | "trending" | "saved";

export default function YourCorner() {
  const { t, lang } = useLanguage();
  const todayPrompt = DAILY_PROMPTS[todayPromptIdx];
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

  // Realtime presence — who is currently on Your Corner
  const onlineUsers = useYourCornerPresence(userId, {
    full_name: userMeta.name,
    avatar_url: userMeta.avatar,
  });

  // Messenger active peer (lifted up so OnlineUsersPanel can open chats)
  const [chatPeer, setChatPeer] = useState<{ user_id: string; full_name: string | null; avatar_url: string | null } | null>(null);

  // People you can @-tag: distinct post authors + online users
  const mentionables = useMemo<Mentionable[]>(() => {
    const map = new Map<string, Mentionable>();
    posts.forEach((p) => {
      if (p.author && p.user_id !== userId) {
        map.set(p.user_id, { user_id: p.user_id, full_name: p.author.full_name, avatar_url: p.author.avatar_url });
      }
    });
    onlineUsers.forEach((u) => {
      if (u.user_id !== userId && !map.has(u.user_id)) {
        map.set(u.user_id, { user_id: u.user_id, full_name: u.full_name, avatar_url: u.avatar_url });
      }
    });
    return Array.from(map.values());
  }, [posts, onlineUsers, userId]);

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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-background to-emerald-50/40 dark:from-blue-950/20 dark:via-background dark:to-emerald-950/20">
      <SEO
        title={t("Your Corner - Góc Chia Sẻ Học Viên | HaiEduTech", "Your Corner - Student Hub | HaiEduTech")}
        description={t(
          "Không gian dành cho học viên HaiEduTech chia sẻ bài viết, kỹ năng và hành trình học tập.",
          "A space for HaiEduTech students to share posts, skills, and learning journeys."
        )}
      />
      <Navbar />

      {/* Decorative gradient orbs (animated) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-emerald-400/20 rounded-full blur-3xl animate-pulse [animation-delay:1.2s]" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-300/15 rounded-full blur-3xl animate-pulse [animation-delay:2.4s]" />
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-violet-400/15 rounded-full blur-3xl animate-pulse [animation-delay:0.6s]" />
      </div>

      <Suspense fallback={null}>
        <FloatingSubjectIcons count={14} />
        <CornerCheerChibis />
      </Suspense>



      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10 flex-1">
        {/* Hero - Enhanced */}
        <header className="relative text-center mb-10 max-w-4xl mx-auto">
          {/* Glow halo behind title - extends full width across both sides */}
          <div className="pointer-events-none absolute -left-[40vw] -right-[40vw] top-2 mx-auto h-56 rounded-full bg-gradient-to-r from-transparent via-blue-500/25 via-30% via-cyan-400/30 via-50% via-emerald-500/25 via-70% to-transparent blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -left-[30vw] -right-[30vw] top-10 mx-auto h-32 rounded-full bg-gradient-to-r from-transparent via-violet-400/15 to-transparent blur-2xl" aria-hidden />

          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-background/70 backdrop-blur-xl border border-primary/30 shadow-lg mb-5 group hover:scale-105 transition-transform">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 bg-clip-text text-transparent">
              {t("Cộng đồng học viên HaiEduTech", "HaiEduTech Student Community")}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white">LIVE</span>
          </div>

          <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            <span className="inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(59,130,246,0.25)]">
              Your Corner
            </span>
            <Stars className="hidden md:block absolute -top-2 -right-4 w-7 h-7 text-amber-400 animate-pulse" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </h1>

          <p className="relative text-base md:text-lg text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed">
            {t(
              "Góc chia sẻ bài viết, kỹ năng và hành trình học - nơi các em vui học cùng bạn bè",
              "Share posts, skills, and your learning journey - have fun studying with friends"
            )} <span className="inline-block animate-bounce">✨</span>
          </p>

          {/* Quick stat ribbons */}
          <div className="relative flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-card/70 backdrop-blur-md border border-blue-200/60 dark:border-blue-800/40 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-sm">
              <Users className="w-3.5 h-3.5" /> {onlineUsers.length} {t("đang online", "online now")}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-card/70 backdrop-blur-md border border-emerald-200/60 dark:border-emerald-800/40 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm">
              <BookOpen className="w-3.5 h-3.5" /> {posts.length} {t("bài viết", "posts")}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-card/70 backdrop-blur-md border border-rose-200/60 dark:border-rose-800/40 text-xs font-semibold text-rose-700 dark:text-rose-300 shadow-sm">
              <Heart className="w-3.5 h-3.5" /> {posts.reduce((s, p) => s + p.reaction_count, 0)} {t("lượt thích", "likes")}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/90 to-orange-500/90 text-white text-xs font-bold shadow-md">
              <Zap className="w-3.5 h-3.5" /> {t("Học vui mỗi ngày", "Learn fun daily")}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-card/70 backdrop-blur-md border border-violet-200/60 dark:border-violet-800/40 text-xs font-semibold text-violet-700 dark:text-violet-300 shadow-sm">
              <Globe2 className="w-3.5 h-3.5" /> {lang === "vi" ? "Tiếng Việt" : "English"}
            </span>
          </div>
        </header>


        {!authReady ? (
          <div className="text-center text-muted-foreground py-12">{t("Đang tải...", "Loading...")}</div>
        ) : !userId ? (
          <Card className="max-w-md mx-auto p-8 text-center space-y-4 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/20 shadow-xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold">{t("Đăng nhập để tham gia", "Sign in to join")}</h2>
            <p className="text-muted-foreground text-sm">
              {t(
                "Your Corner là cộng đồng dành riêng cho học viên HaiEduTech. Đăng nhập để xem và chia sẻ bài viết.",
                "Your Corner is an exclusive community for HaiEduTech students. Sign in to view and share posts."
              )}
            </p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md hover:shadow-lg transition-shadow">
              <Link to="/auth">{t("Đăng nhập ngay", "Sign in now")}</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-[260px_minmax(0,640px)_280px] gap-6 max-w-6xl mx-auto justify-center">
            {/* Left sidebar */}
            <aside className="hidden lg:block space-y-4">
              <Card className="p-5 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/10 shadow-sm sticky top-24 space-y-5">
                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" /> {t("Karma của bạn", "Your karma")}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-300">{myKarma.posts}</div>
                      <div className="text-[10px] text-muted-foreground">{t("Bài viết", "Posts")}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-rose-500/10">
                      <div className="text-lg font-bold text-rose-600 dark:text-rose-300">{myKarma.likes}</div>
                      <div className="text-[10px] text-muted-foreground">{t("Lượt thích", "Likes")}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-500" /> {t("Lọc theo chủ đề", "Filter by topic")}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSubjectFilter(null)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                        !subjectFilter ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"
                      }`}
                    >
                      {t("Tất cả", "All")}
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

              {/* Games / Arcade quick launcher */}
              <Card className="p-5 backdrop-blur-md bg-gradient-to-br from-violet-50/90 via-white/85 to-pink-50/90 dark:from-violet-950/30 dark:via-card/85 dark:to-pink-950/30 border-violet-300/40 shadow-sm">
                <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                  🎮 <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">{t("Mini Games ôn bài", "Mini Games to review")}</span>
                </h3>
                <p className="text-[11px] text-muted-foreground mb-3">{t("Vừa chơi vừa luyện - click để bắt đầu!", "Play while you practice - click to start!")}</p>

                {/* Multiplayer / arena highlight */}
                <Link
                  to="/vocab-arena"
                  className="block mb-3 rounded-lg p-2.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚔️</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold leading-tight">Vocab Arena 1v1</div>
                      <div className="text-[10px] opacity-90">{t("Đấu trực tiếp với bạn bè", "Duel live with friends")}</div>
                    </div>
                    <span className="text-[10px] font-bold bg-white/25 px-1.5 py-0.5 rounded">HOT</span>
                  </div>
                </Link>

                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{t("Arcade theo ngôn ngữ", "Arcade by language")}</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { to: "/cambridge/arcade", emoji: "🇬🇧", label: "English", cls: "from-blue-500 to-cyan-500" },
                    { to: "/chinese/arcade", emoji: "🐉", label: "Chinese", cls: "from-red-500 to-orange-500" },
                    { to: "/finnish/arcade", emoji: "❄️", label: "Finnish", cls: "from-sky-500 to-indigo-500" },
                    { to: "/learn-vietnamese/arcade", emoji: "🇻🇳", label: "Vietnamese", cls: "from-rose-500 to-amber-500" },
                    { to: "/programming/arcade", emoji: "💻", label: "Coding", cls: "from-emerald-500 to-teal-500" },
                    { to: "/arcade-plus", emoji: "✨", label: t("Tổng hợp", "All-in-one"), cls: "from-violet-500 to-pink-500" },
                  ].map((g) => (
                    <Link
                      key={g.to}
                      to={g.to}
                      className="group relative overflow-hidden rounded-lg p-2 bg-white/70 dark:bg-card/70 border border-white/60 hover:border-primary/40 hover:shadow-md transition-all"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${g.cls} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <div className="relative flex items-center gap-1.5">
                        <span className="text-lg leading-none">{g.emoji}</span>
                        <span className="text-[11px] font-semibold truncate">{g.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-3 mb-1.5">{t("Game luyện chuyên đề", "Topic practice games")}</div>
                <div className="space-y-1.5">
                  {[
                    { to: "/chinese/tone-drill", emoji: "🎵", label: "Tone Drill", desc: t("Luyện thanh điệu HSK", "HSK tone drills") },
                    { to: "/chinese/hskk", emoji: "🎤", label: "HSKK Speaking", desc: t("Nói tiếng Trung", "Speak Chinese") },
                    { to: "/chinese/hsk/test", emoji: "📝", label: "HSK Test Room", desc: t("Thi thử các cấp", "Mock test all levels") },
                    { to: "/ielts-lectures/master-quiz", emoji: "🏆", label: "IELTS Master Quiz", desc: t("Tổng hợp 4 kỹ năng", "All 4 skills combined") },
                    { to: "/sat/daily-warmup", emoji: "☀️", label: "SAT Daily Warmup", desc: t("5 phút mỗi ngày", "5 minutes a day") },
                    { to: "/programming/scratch-adventure", emoji: "🧩", label: "Scratch Adventure", desc: t("Lập trình thiếu nhi", "Coding for kids") },
                    { to: "/programming/ai-academy", emoji: "🤖", label: "AI Academy", desc: t("Thử thách AI/ML", "AI/ML challenges") },
                  ].map((g) => (
                    <Link
                      key={g.to}
                      to={g.to}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 bg-white/60 dark:bg-card/60 hover:bg-primary/10 hover:translate-x-0.5 transition-all"
                    >
                      <span className="text-base shrink-0">{g.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold truncate">{g.label}</div>
                        <div className="text-[9px] text-muted-foreground truncate">{g.desc}</div>
                      </div>
                      <span className="text-[10px] text-primary opacity-0 group-hover:opacity-100">▶</span>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/arcade-plus"
                  className="mt-3 block text-center text-[11px] font-bold text-violet-600 dark:text-violet-300 hover:underline"
                >
                  → {t("Khám phá tất cả game", "Explore all games")} →
                </Link>
              </Card>

            </aside>


            {/* Feed */}
            <div className="space-y-5 mx-auto w-full max-w-[640px]">


              {/* Daily Prompt */}
              <Card className="p-4 backdrop-blur-md bg-gradient-to-r from-amber-50/90 via-white/85 to-emerald-50/90 dark:from-amber-950/30 dark:via-card/85 dark:to-emerald-950/30 border-amber-300/40 shadow-sm flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md text-xl">
                  {todayPrompt.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" /> {t("Gợi ý hôm nay", "Today's prompt")}
                  </div>
                  <p className="text-sm text-foreground/90 leading-snug">{lang === "vi" ? todayPrompt.vi : todayPrompt.en}</p>
                </div>
              </Card>

              <PostComposer userId={userId} onPosted={refresh} userName={userMeta.name} userAvatar={userMeta.avatar} mentionables={mentionables} />

              {/* Tabs */}
              <Tabs value={tab} onValueChange={(v) => setTab(v as FeedTab)}>
                <TabsList className="grid grid-cols-3 w-full backdrop-blur-md bg-white/75 dark:bg-card/75">
                  <TabsTrigger value="latest"><Sparkles className="w-3.5 h-3.5 mr-1.5" /> {t("Mới nhất", "Latest")}</TabsTrigger>
                  <TabsTrigger value="trending"><TrendingUp className="w-3.5 h-3.5 mr-1.5" /> {t("Trending", "Trending")}</TabsTrigger>
                  <TabsTrigger value="saved"><Bookmark className="w-3.5 h-3.5 mr-1.5" /> {t("Đã lưu", "Saved")}</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Active filter chip */}
              {(subjectFilter || tagFilter) && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">{t("Đang lọc:", "Filtering:")}</span>
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
                  {t("Đang tải bài viết...", "Loading posts...")}
                </Card>
              ) : filtered.length === 0 ? (
                <Card className="p-10 text-center space-y-3 backdrop-blur-md bg-white/75 dark:bg-card/75 border-dashed border-2 border-primary/20">
                  <div className="text-5xl">{tab === "saved" ? "🔖" : "✍️"}</div>
                  <p className="font-semibold">
                    {tab === "saved" ? t("Chưa lưu bài nào", "No saved posts yet") : t("Chưa có bài viết phù hợp", "No matching posts yet")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {tab === "saved" ? t("Bấm Lưu trên bài bất kỳ để xem lại sau.", "Tap Save on any post to revisit it later.") : t("Hãy là người đầu tiên chia sẻ với cộng đồng!", "Be the first to share with the community!")}
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
              <Suspense fallback={null}>
                <OnlineUsersPanel
                  users={onlineUsers}
                  currentUserId={userId}
                  onOpenChat={(u: OnlineUser) =>
                    setChatPeer({ user_id: u.user_id, full_name: u.full_name, avatar_url: u.avatar_url })
                  }
                />
              </Suspense>


              <Card className="p-5 backdrop-blur-md bg-white/80 dark:bg-card/80 border-primary/10 shadow-sm sticky top-24 space-y-5">

                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-purple-500" /> {t("Đang hot 7 ngày", "Trending 7 days")}
                  </h3>
                  {trendingTags.length === 0 ? (
                    <p className="text-xs text-muted-foreground">{t("Chưa có hashtag nào. Hãy bắt đầu với #IELTS, #Python ✨", "No hashtags yet. Start with #IELTS, #Python ✨")}</p>
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

                {/* Top contributors this week */}
                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-500" /> {t("Top đóng góp 7 ngày", "Top contributors 7 days")}
                  </h3>
                  {topContributors.length === 0 ? (
                    <p className="text-xs text-muted-foreground">{t("Chưa có ai. Hãy là người đầu tiên! 🚀", "Nobody yet. Be the first! 🚀")}</p>
                  ) : (
                    <ul className="space-y-2">
                      {topContributors.map((c, i) => {
                        const medal = ["🥇", "🥈", "🥉"][i] ?? `#${i + 1}`;
                        const name = c.user?.full_name?.trim() || t("Học viên", "Student");
                        const initial = name.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
                        return (
                          <li key={c.user?.id ?? i} className="flex items-center gap-2">
                            <span className="text-base w-6 text-center">{medal}</span>
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-xs font-bold flex items-center justify-center overflow-hidden shrink-0">
                              {c.user?.avatar_url ? (
                                <img src={c.user.avatar_url} alt={name} className="w-full h-full object-cover" />
                              ) : (
                                initial
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold truncate">{name}</div>
                              <div className="text-[10px] text-muted-foreground">
                                {c.posts} {t("bài", "posts")} · {c.pts} {t("điểm", "pts")}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" /> {t("Hoạt động cộng đồng", "Community activity")}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-500" />{t("Bài viết", "Posts")}</span>
                      <span className="font-bold">{posts.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2"><Heart className="w-4 h-4 text-rose-500" />{t("Lượt thích", "Likes")}</span>
                      <span className="font-bold">{posts.reduce((s, p) => s + p.reaction_count, 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2"><MessageCircle className="w-4 h-4 text-emerald-500" />{t("Bình luận", "Comments")}</span>
                      <span className="font-bold">{posts.reduce((s, p) => s + p.comment_count, 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t text-xs text-muted-foreground italic text-center">
                  {t('"Học thông minh - Dẫn đầu kỷ nguyên số" 💙💚', '"Learn smart - Lead the digital era" 💙💚')}
                </div>
              </Card>

              <Suspense fallback={null}>
                <Messenger
                  currentUserId={userId}
                  activePeer={chatPeer}
                  setActivePeer={setChatPeer}
                  onlineUsers={onlineUsers}
                  directory={mentionables}
                />
              </Suspense>



            </aside>
          </div>
        )}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}


