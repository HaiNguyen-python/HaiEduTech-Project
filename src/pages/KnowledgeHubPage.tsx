import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain, BookOpen, BarChart3, Sparkles, ExternalLink,
  Loader2, Star, Search, Filter
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Category metadata for icons and colors
const CATEGORY_META: Record<string, { icon: any; gradient: string; labelVi: string; labelEn: string }> = {
  ai_education: {
    icon: Brain,
    gradient: "from-violet-500/20 to-violet-600/5",
    labelVi: "AI & Giáo dục",
    labelEn: "AI & Education",
  },
  language_tech: {
    icon: BookOpen,
    gradient: "from-sky-500/20 to-sky-600/5",
    labelVi: "Công nghệ Ngôn ngữ",
    labelEn: "Language Tech",
  },
  edtech: {
    icon: BarChart3,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    labelVi: "EdTech",
    labelEn: "EdTech",
  },
  programming: {
    icon: Sparkles,
    gradient: "from-amber-500/20 to-amber-600/5",
    labelVi: "Lập trình",
    labelEn: "Programming",
  },
};

interface Post {
  id: string;
  title: string;
  title_vi: string | null;
  summary: string;
  summary_vi: string | null;
  category: string;
  source_url: string | null;
  source_name: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
  created_at: string;
  engagement_score: number;
}

const KnowledgeHubPage = () => {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("knowledge_hub_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      setPosts((data || []) as Post[]);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Track article click interest
  const handleArticleClick = async (post: Post) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("article_interests").insert({
        user_id: user.id,
        article_id: post.id,
        category: post.category,
      });
    }
    if (post.source_url) {
      window.open(post.source_url, "_blank", "noopener");
    }
  };

  // Filter posts
  const filtered = posts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const title = lang === "vi" ? (p.title_vi || p.title) : p.title;
    const summary = lang === "vi" ? (p.summary_vi || p.summary) : p.summary;
    const matchesSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filtered.filter((p) => p.is_featured);
  const regular = filtered.filter((p) => !p.is_featured);
  const categories = ["all", ...Object.keys(CATEGORY_META)];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t("Knowledge Hub", "Knowledge Hub")}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "Cập nhật xu hướng AI, EdTech và công nghệ học ngôn ngữ mới nhất — tự động cập nhật hàng ngày bởi AI.",
                "Stay updated with the latest AI, EdTech, and language learning technology trends — auto-curated daily by AI."
              )}
            </p>
          </motion.div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("Tìm bài viết...", "Search articles...")}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => {
                const meta = CATEGORY_META[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat === "all" ? t("Tất cả", "All") : (lang === "vi" ? meta?.labelVi : meta?.labelEn) || cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t("Chưa có bài viết nào. Hệ thống sẽ tự động cập nhật hàng ngày!", "No articles yet. The system auto-updates daily!")}
              </p>
            </div>
          )}

          {/* Featured articles */}
          {featured.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                {t("Nổi bật", "Featured")}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {featured.map((post, i) => {
                  const meta = CATEGORY_META[post.category] || CATEGORY_META.edtech;
                  const Icon = meta.icon;
                  const title = lang === "vi" ? (post.title_vi || post.title) : post.title;
                  const summary = lang === "vi" ? (post.summary_vi || post.summary) : post.summary;
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card
                        className="cursor-pointer group hover:shadow-lg transition-all border-primary/20 overflow-hidden"
                        onClick={() => handleArticleClick(post)}
                      >
                        <CardContent className="p-0">
                          {post.thumbnail_url && (
                            <div className="h-48 overflow-hidden">
                              <img src={post.thumbnail_url} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                          )}
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${meta.gradient}`}>
                                <Icon className="w-4 h-4 text-foreground" />
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {lang === "vi" ? meta.labelVi : meta.labelEn}
                              </Badge>
                              <Badge variant="outline" className="text-xs ml-auto">
                                <Star className="w-3 h-3 mr-1 text-amber-500" /> Featured
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{summary}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{new Date(post.created_at).toLocaleDateString()}</span>
                              {post.source_name && (
                                <span className="flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" /> {post.source_name}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular articles grid */}
          {regular.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {regular.map((post, i) => {
                const meta = CATEGORY_META[post.category] || CATEGORY_META.edtech;
                const Icon = meta.icon;
                const title = lang === "vi" ? (post.title_vi || post.title) : post.title;
                const summary = lang === "vi" ? (post.summary_vi || post.summary) : post.summary;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className="cursor-pointer group hover:shadow-md transition-all h-full"
                      onClick={() => handleArticleClick(post)}
                    >
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${meta.gradient}`}>
                            <Icon className="w-4 h-4 text-foreground" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {lang === "vi" ? meta.labelVi : meta.labelEn}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-3 flex-1 mb-3">{summary}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          {post.source_url && (
                            <span className="flex items-center gap-1 text-primary">
                              {t("Đọc thêm", "Read more")} <ExternalLink className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KnowledgeHubPage;
