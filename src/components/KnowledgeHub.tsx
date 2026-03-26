import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  BarChart3,
  BookOpen,
  Sparkles,
  ExternalLink,
  Loader2,
  Star,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

// Category metadata for icons and colors
const CATEGORY_META: Record<
  string,
  { icon: any; color: string; labelVi: string; labelEn: string }
> = {
  ai_education: {
    icon: Brain,
    color: "from-violet-500/20 to-violet-600/5",
    labelVi: "AI & Giáo dục",
    labelEn: "AI & Education",
  },
  language_tech: {
    icon: BookOpen,
    color: "from-sky-500/20 to-sky-600/5",
    labelVi: "Công nghệ Ngôn ngữ",
    labelEn: "Language Learning",
  },
  data_edtech: {
    icon: BarChart3,
    color: "from-emerald-500/20 to-emerald-600/5",
    labelVi: "Data & EdTech",
    labelEn: "Data & EdTech",
  },
};

// Fallback static posts when no DB articles exist
const FALLBACK_POSTS = [
  {
    id: "static-1",
    title: "How to Use ChatGPT to Optimize 30 Minutes of Writing Practice Daily",
    title_vi: "Cách dùng ChatGPT để tối ưu hóa 30 phút luyện Writing mỗi ngày",
    summary:
      "Discover how to combine AI with traditional teaching methods to effectively improve your IELTS writing skills.",
    summary_vi:
      "Khám phá phương pháp kết hợp AI và phương pháp giảng dạy truyền thống để cải thiện kỹ năng viết IELTS hiệu quả.",
    category: "ai_education",
    source_url: null,
    source_name: null,
    is_featured: true,
  },
  {
    id: "static-2",
    title: "From Zero to Data Engineer in 6 Months: A Complete Roadmap",
    title_vi: "Lộ trình từ con số 0 đến Kỹ sư Dữ liệu trong 6 tháng",
    summary:
      "Real-world experience and a 4-step roadmap to becoming a professional Data Engineer in the Nordic market.",
    summary_vi:
      "Chia sẻ kinh nghiệm thực tế và lộ trình 4 bước để trở thành Data Engineer chuyên nghiệp tại thị trường Bắc Âu.",
    category: "data_edtech",
    source_url: null,
    source_name: null,
    is_featured: false,
  },
  {
    id: "static-3",
    title: "Why Reinforcement Learning Algorithms Help You Never Forget New Vocabulary",
    title_vi: "Tại sao thuật toán RL lại giúp bạn không bao giờ quên từ vựng mới?",
    summary:
      "Learn how HaiEduTech applies Spaced Repetition and RL to create personalized review paths for every student.",
    summary_vi:
      "Tìm hiểu cách HaiEduTech áp dụng Spaced Repetition và RL để tạo lộ trình ôn tập cá nhân hóa cho từng học viên.",
    category: "language_tech",
    source_url: null,
    source_name: null,
    is_featured: false,
  },
];

const PAGE_SIZE = 6;

const KnowledgeHub = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [featuredPost, setFeaturedPost] = useState<any>(null);

  // Fetch articles from database
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Fetch total count first
        const { count } = await supabase
          .from("knowledge_hub_posts")
          .select("*", { count: "exact", head: true });

        // Fetch featured article of the day
        const { data: featured } = await supabase
          .from("knowledge_hub_posts")
          .select("*")
          .eq("is_featured", true)
          .order("created_at", { ascending: false })
          .limit(1);

        if (featured && featured.length > 0) {
          setFeaturedPost(featured[0]);
        }

        // Fetch paginated articles
        const from = 0;
        const to = page * PAGE_SIZE - 1;

        const { data, error } = await supabase
          .from("knowledge_hub_posts")
          .select("*")
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) {
          console.error("Error fetching posts:", error);
          setPosts(FALLBACK_POSTS);
        } else if (data && data.length > 0) {
          setPosts(data);
          setHasMore((count || 0) > data.length);
        } else {
          // No articles yet — use fallback
          setPosts(FALLBACK_POSTS);
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  // Track article click for RL interest data
  const handleArticleClick = async (post: any) => {
    // Open source URL if available
    if (post.source_url) {
      window.open(post.source_url, "_blank", "noopener,noreferrer");
    }

    // Log interest for authenticated users
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("article_interests").insert({
          user_id: user.id,
          article_id: post.id?.startsWith("static-") ? null : post.id,
          category: post.category,
        });
      }
    } catch (e) {
      // Silently fail — non-critical tracking
    }

    // Engagement tracking is handled server-side via article_interests count
  };

  const meta = (category: string) =>
    CATEGORY_META[category] || CATEGORY_META.ai_education;

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Góc Chia Sẻ ", "Knowledge ")}
            <span className="text-gradient">{t("Tri Thức", "Hub")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t(
              "Bài viết chuyên sâu về AI, ngôn ngữ và giáo dục — cập nhật tự động mỗi ngày",
              "In-depth articles on AI, language & education — auto-updated daily"
            )}
          </p>
        </motion.div>

        {/* Featured Article of the Day */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-8 max-w-4xl"
          >
            <div
              onClick={() => handleArticleClick(featuredPost)}
              className="group cursor-pointer rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 p-6 shadow-md transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-wider">
                  {t("Bài viết nổi bật", "Article of the Day")}
                </span>
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground sm:text-xl">
                {t(featuredPost.title_vi || featuredPost.title, featuredPost.title)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  featuredPost.summary_vi || featuredPost.summary,
                  featuredPost.summary
                )}
              </p>
              {featuredPost.source_name && (
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <ExternalLink className="h-3 w-3" />
                  <span>{featuredPost.source_name}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Loading state */}
        {loading && posts.length === 0 && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Blog cards grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {posts.map((post, i) => {
              const catMeta = meta(post.category);
              const Icon = catMeta.icon;

              return (
                <motion.article
                  key={post.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleArticleClick(post)}
                  className="group cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${catMeta.color}`}
                  >
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>

                  <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
                    {t(catMeta.labelVi, catMeta.labelEn)}
                  </span>

                  <h3 className="mb-2 font-display text-base font-semibold leading-snug text-foreground sm:text-lg line-clamp-3">
                    {t(post.title_vi || post.title, post.title)}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {t(post.summary_vi || post.summary, post.summary)}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                      {t("Đọc thêm", "Read More")}{" "}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    {post.source_name && (
                      <span className="text-xs text-muted-foreground">
                        {post.source_name}
                      </span>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More / View Archive */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          {hasMore ? (
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {t("Xem thêm bài viết", "Load More Articles")}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          ) : (
            posts.length > PAGE_SIZE && (
              <p className="text-sm text-muted-foreground">
                {t(
                  "Đã hiển thị tất cả bài viết trong 60 ngày qua",
                  "Showing all articles from the past 60 days"
                )}
              </p>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
