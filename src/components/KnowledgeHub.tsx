import { motion } from "framer-motion";
import { ArrowRight, Brain, BarChart3, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/** Sample blog post data */
const posts = [
  {
    icon: Brain,
    categoryVi: "AI & Ngôn ngữ",
    categoryEn: "AI & Language",
    titleVi: "Cách dùng ChatGPT để tối ưu hóa 30 phút luyện Writing mỗi ngày",
    titleEn: "How to Use ChatGPT to Optimize 30 Minutes of Writing Practice Daily",
    excerptVi: "Khám phá phương pháp kết hợp AI và phương pháp giảng dạy truyền thống để cải thiện kỹ năng viết IELTS hiệu quả.",
    excerptEn: "Discover how to combine AI with traditional teaching methods to effectively improve your IELTS writing skills.",
    color: "from-violet-500/20 to-violet-600/5",
  },
  {
    icon: BarChart3,
    categoryVi: "Data Career",
    categoryEn: "Data Career",
    titleVi: "Lộ trình từ con số 0 đến Kỹ sư Dữ liệu trong 6 tháng",
    titleEn: "From Zero to Data Engineer in 6 Months: A Complete Roadmap",
    excerptVi: "Chia sẻ kinh nghiệm thực tế và lộ trình 4 bước để trở thành Data Engineer chuyên nghiệp tại thị trường Bắc Âu.",
    excerptEn: "Real-world experience and a 4-step roadmap to becoming a professional Data Engineer in the Nordic market.",
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    icon: BookOpen,
    categoryVi: "Education",
    categoryEn: "Education",
    titleVi: "Tại sao thuật toán RL lại giúp bạn không bao giờ quên từ vựng mới?",
    titleEn: "Why Reinforcement Learning Algorithms Help You Never Forget New Vocabulary",
    excerptVi: "Tìm hiểu cách HaiEduTech áp dụng Spaced Repetition và RL để tạo lộ trình ôn tập cá nhân hóa cho từng học viên.",
    excerptEn: "Learn how HaiEduTech applies Spaced Repetition and RL to create personalized review paths for every student.",
    color: "from-sky-500/20 to-sky-600/5",
  },
];

const KnowledgeHub = () => {
  const { t } = useLanguage();

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
              "Bài viết chuyên sâu từ thầy Hải về ngôn ngữ, dữ liệu và giáo dục",
              "In-depth articles from Teacher Hai on language, data, and education"
            )}
          </p>
        </motion.div>

        {/* Blog cards grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${post.color}`}>
                <post.icon className="h-5 w-5 text-foreground" />
              </div>

              <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
                {t(post.categoryVi, post.categoryEn)}
              </span>

              <h3 className="mb-2 font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
                {t(post.titleVi, post.titleEn)}
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {t(post.excerptVi, post.excerptEn)}
              </p>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                {t("Đọc thêm", "Read More")} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <button className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10">
            {t("Xem tất cả bài viết", "View All Articles")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
