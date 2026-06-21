import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Sparkles, MessageCircle, Heart, Flame, BookOpen } from "lucide-react";
import PostComposer from "@/components/your-corner/PostComposer";
import PostCard from "@/components/your-corner/PostCard";
import { useYourCornerFeed } from "@/hooks/useYourCornerFeed";

export default function YourCorner() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userMeta, setUserMeta] = useState<{ name: string | null; avatar: string | null }>({ name: null, avatar: null });
  const [authReady, setAuthReady] = useState(false);

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

  const { posts, loading, refresh } = useYourCornerFeed(!!userId);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-background to-emerald-50/40 dark:from-blue-950/20 dark:via-background dark:to-emerald-950/20">
      <SEO
        title="Your Corner - Góc Chia Sẻ Học Viên | HaiEduTech"
        description="Không gian dành cho học viên HaiEduTech chia sẻ bài viết, kỹ năng và hành trình học tập của mình."
      />
      <Navbar />

      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      {/* Floating subject particles */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingParticles count={22} />
      </div>

      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero header */}
        <header className="text-center mb-10 max-w-3xl mx-auto">
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
          <div className="grid lg:grid-cols-[260px_minmax(0,640px)_260px] gap-6 max-w-6xl mx-auto justify-center">
            {/* Left sidebar — desktop only */}
            <aside className="hidden lg:block space-y-4">
              <Card className="p-5 backdrop-blur-md bg-white/75 dark:bg-card/75 border-primary/10 shadow-sm sticky top-24">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> Góc học tập
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-blue-500">📚</span> Chia sẻ kiến thức bạn vừa học</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500">🎯</span> Hỏi đáp cùng bạn bè</li>
                  <li className="flex items-start gap-2"><span className="text-cyan-500">💡</span> Khoe thành tựu, kỹ năng mới</li>
                  <li className="flex items-start gap-2"><span className="text-amber-500">🤝</span> Học vui hơn cùng cộng đồng</li>
                </ul>
              </Card>
            </aside>

            {/* Feed */}
            <div className="space-y-5 mx-auto w-full max-w-[640px]">
              <PostComposer userId={userId} onPosted={refresh} userName={userMeta.name} userAvatar={userMeta.avatar} />

              {loading && posts.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground backdrop-blur-md bg-white/70 dark:bg-card/70">
                  Đang tải bài viết...
                </Card>
              ) : posts.length === 0 ? (
                <Card className="p-10 text-center space-y-3 backdrop-blur-md bg-white/75 dark:bg-card/75 border-dashed border-2 border-primary/20">
                  <div className="text-5xl">✍️</div>
                  <p className="font-semibold">Chưa có bài viết nào</p>
                  <p className="text-sm text-muted-foreground">Hãy là người đầu tiên chia sẻ với cộng đồng!</p>
                </Card>
              ) : (
                posts.map((p) => (
                  <PostCard key={p.id} post={p} currentUserId={userId} onChanged={refresh} />
                ))
              )}
            </div>

            {/* Right sidebar — desktop only */}
            <aside className="hidden lg:block space-y-4">
              <Card className="p-5 backdrop-blur-md bg-white/75 dark:bg-card/75 border-primary/10 shadow-sm sticky top-24">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" /> Hoạt động
                </h3>
                <div className="space-y-3 text-sm">
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
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground italic">
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
