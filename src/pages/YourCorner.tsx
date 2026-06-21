import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Sparkles } from "lucide-react";
import PostComposer from "@/components/your-corner/PostComposer";
import PostCard from "@/components/your-corner/PostCard";
import { useYourCornerFeed } from "@/hooks/useYourCornerFeed";

export default function YourCorner() {
  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const { posts, loading, refresh } = useYourCornerFeed(!!userId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SEO
        title="Your Corner - Góc Chia Sẻ Học Viên | HaiEduTech"
        description="Không gian dành cho học viên HaiEduTech chia sẻ bài viết, kỹ năng và hành trình học tập của mình."
      />
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-primary/20 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Cộng đồng học viên</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Your Corner
          </h1>
          <p className="text-muted-foreground mt-2">
            Chia sẻ bài viết, kỹ năng và vui học cùng bạn bè
          </p>
        </header>

        {!authReady ? (
          <div className="text-center text-muted-foreground py-12">Đang tải...</div>
        ) : !userId ? (
          <Card className="p-8 text-center space-y-4">
            <Users className="w-12 h-12 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">Đăng nhập để tham gia</h2>
            <p className="text-muted-foreground">
              Your Corner là cộng đồng dành riêng cho học viên HaiEduTech. Đăng nhập để xem và chia sẻ bài viết.
            </p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-emerald-600">
              <Link to="/auth">Đăng nhập</Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <PostComposer userId={userId} onPosted={refresh} />

            {loading && posts.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">Đang tải bài viết...</div>
            ) : posts.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!
              </Card>
            ) : (
              posts.map((p) => (
                <PostCard key={p.id} post={p} currentUserId={userId} onChanged={refresh} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
