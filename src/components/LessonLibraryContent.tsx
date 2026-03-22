import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Code2, Languages, Loader2, ArrowRight, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const CATEGORY_LABELS: Record<string, { vi: string; en: string; icon: string }> = {
  grammar: { vi: "Ngữ pháp", en: "Grammar", icon: "📝" },
  vocabulary: { vi: "Từ vựng", en: "Vocabulary", icon: "📚" },
  reading: { vi: "Đọc hiểu", en: "Reading", icon: "📖" },
  "fill-blank": { vi: "Điền chỗ trống", en: "Fill Blank", icon: "✏️" },
  reorder: { vi: "Sắp xếp câu", en: "Reorder", icon: "🔀" },
  dialogue: { vi: "Hội thoại", en: "Dialogue", icon: "💬" },
  concept: { vi: "Kiến thức", en: "Concepts", icon: "💡" },
  "fix-bug": { vi: "Tìm lỗi", en: "Fix Bug", icon: "🐛" },
  "mini-project": { vi: "Dự án nhỏ", en: "Mini Project", icon: "🚀" },
};

const SUBJECT_META: Record<string, { icon: any; vi: string; en: string; color: string }> = {
  english: { icon: BookOpen, vi: "Tiếng Anh", en: "English", color: "text-sky-500" },
  chinese: { icon: Languages, vi: "Tiếng Trung", en: "Chinese", color: "text-red-500" },
  programming: { icon: Code2, vi: "Lập trình", en: "Programming", color: "text-green-500" },
};

const PAGE_SIZE = 12;

export default function LessonLibraryContent() {
  const { t } = useLanguage();
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterSubject, setFilterSubject] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchLessonsPage(0);
  }, [filterSubject, filterCategory]);

  const fetchLessonsPage = async (page: number) => {
    setLoading(true);
    setLessons([]);
    setCurrentPage(page);

    let query = supabase
      .from("generated_lessons")
      .select("*", { count: "exact" })
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (filterSubject) query = query.eq("subject", filterSubject);
    if (filterCategory) query = query.eq("category", filterCategory);

    const offset = page * PAGE_SIZE;
    query = query.range(offset, offset + PAGE_SIZE - 1);

    const { data, error, count } = await query;
    if (!error && data) {
      setLessons(data);
      setTotal(count || 0);
      setHasMore(data.length === PAGE_SIZE);
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const categories = filterSubject
    ? Object.entries(CATEGORY_LABELS).filter(([id]) => {
        if (filterSubject === "programming") return ["concept", "fix-bug", "mini-project"].includes(id);
        return ["grammar", "vocabulary", "reading", "fill-blank", "reorder", "dialogue"].includes(id);
      })
    : Object.entries(CATEGORY_LABELS);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-muted-foreground mb-6">
          {t("Bài học được tạo tự động bởi AI. Chọn bộ lọc để tìm nhanh bài phù hợp.", "AI-generated lessons. Use filters to find what fits.")}
          {total > 0 && <span className="ml-2 text-primary font-semibold">({total} {t("bài", "lessons")})</span>}
        </p>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{t("Bộ lọc", "Filters")}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <button onClick={() => { setFilterSubject(null); setFilterCategory(null); }}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${!filterSubject ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {t("Tất cả", "All")}
            </button>
            {Object.entries(SUBJECT_META).map(([id, meta]) => (
              <button key={id} onClick={() => { setFilterSubject(id); setFilterCategory(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${filterSubject === id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {t(meta.vi, meta.en)}
              </button>
            ))}
          </div>
          {filterSubject && (
            <div className="flex flex-wrap gap-2">
              {categories.map(([id, cat]) => (
                <button key={id} onClick={() => setFilterCategory(filterCategory === id ? null : id)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all ${filterCategory === id ? "bg-primary/10 text-primary font-medium border border-primary/30" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                  {cat.icon} {t(cat.vi, cat.en)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lessons grid */}
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">{t("Chưa có bài học nào.", "No lessons yet.")}</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessons.map((lesson, i) => {
                const cat = CATEGORY_LABELS[lesson.category] || { vi: lesson.category, en: lesson.category, icon: "📄" };
                const subj = SUBJECT_META[lesson.subject];
                return (
                  <motion.div key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link to={`/lesson-library/${lesson.id}`}
                      className="block glass-card rounded-xl p-5 hover:border-primary/30 transition-all h-full group">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{lesson.level}</span>
                        {subj && <span className={`text-[10px] ${subj.color}`}>{t(subj.vi, subj.en)}</span>}
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">{lesson.title}</h3>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-muted-foreground">{t(cat.vi, cat.en)}</span>
                        <span className="text-xs text-primary font-medium flex items-center gap-1">
                          {t("Làm bài", "Start")} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            {/* Pagination */}
            {total > PAGE_SIZE && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => { setLessons([]); fetchLessonsPage(Math.max(0, currentPage - 1)); }}
                  disabled={currentPage === 0 || loadingMore}
                  className="px-3 py-1.5 rounded-lg text-sm bg-secondary text-foreground disabled:opacity-40 hover:bg-primary/10 transition-colors"
                >
                  ← {t("Trước", "Prev")}
                </button>
                <span className="text-sm text-muted-foreground">
                  {currentPage + 1} / {Math.ceil(total / PAGE_SIZE)}
                </span>
                <button
                  onClick={() => { setLessons([]); fetchLessonsPage(currentPage + 1); }}
                  disabled={!hasMore || loadingMore}
                  className="px-3 py-1.5 rounded-lg text-sm bg-secondary text-foreground disabled:opacity-40 hover:bg-primary/10 transition-colors"
                >
                  {t("Sau", "Next")} →
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
