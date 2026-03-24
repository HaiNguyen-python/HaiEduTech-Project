import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Users, ThumbsUp, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/** Mocked testimonial data */
const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    avatar: "MA",
    course: "IELTS Mastery 7.5",
    score: "7.5",
    scoreLabel: "IELTS Overall",
    quoteVi: "Phương pháp dựa trên dữ liệu giúp mình cải thiện Writing từ 6.0 lên 7.5 chỉ trong 3 tháng. Hệ thống chấm bài AI phản hồi chi tiết từng tiêu chí.",
    quoteEn: "The data-driven approach helped me improve my Writing from 6.0 to 7.5 in just 3 months. The AI grading system provides detailed feedback on every criterion.",
    color: "from-sky-400 to-blue-500",
  },
  {
    name: "Trần Đức Huy",
    avatar: "DH",
    course: "SQL & Data Pipeline",
    score: "Hired",
    scoreLabel: "Data Engineer @ FPT",
    quoteVi: "Lộ trình Python → SQL → ETL → ML rất bài bản. Sau 6 tháng học, mình đã pass phỏng vấn Data Engineer ở FPT Software.",
    quoteEn: "The Python → SQL → ETL → ML roadmap is incredibly structured. After 6 months of study, I passed the Data Engineer interview at FPT Software.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    name: "Lê Thị Hồng Nhung",
    avatar: "HN",
    course: "HSK 4 Fast-track",
    score: "HSK 4",
    scoreLabel: "Passed with 280/300",
    quoteVi: "Thầy Hải dạy rất dễ hiểu, kết hợp công nghệ giúp mình ôn thi hiệu quả. Đạt HSK 4 với 280/300 điểm.",
    quoteEn: "Teacher Hai explains concepts very clearly, combining technology for effective exam prep. Achieved HSK 4 with 280/300 score.",
    color: "from-red-400 to-orange-500",
  },
  {
    name: "Phạm Quốc Bảo",
    avatar: "QB",
    course: "IELTS Foundation 5.5",
    score: "6.5",
    scoreLabel: "IELTS Overall",
    quoteVi: "Từ band 4.5 lên 6.5 trong 4 tháng. Hệ thống AI gợi ý bài tập cá nhân hóa rất chính xác, tiết kiệm thời gian ôn tập.",
    quoteEn: "From band 4.5 to 6.5 in 4 months. The AI system suggests highly accurate personalized exercises, saving valuable study time.",
    color: "from-indigo-400 to-purple-500",
  },
];

const stats = [
  { icon: Users, valueVi: "500+", valueEn: "500+", labelVi: "Học viên đang theo học", labelEn: "Active Students" },
  { icon: ThumbsUp, valueVi: "98%", valueEn: "98%", labelVi: "Tỉ lệ hài lòng", labelEn: "Satisfaction Rate" },
  { icon: Cpu, valueVi: "24/7", valueEn: "24/7", labelVi: "Hệ thống AI hỗ trợ", labelEn: "AI-Powered Support" },
];

const SocialProof = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((p) => (p + 1) % testimonials.length);

  const item = testimonials[current];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container relative mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Học Viên Tiêu Biểu & ", "Outstanding Students & ")}
            <span className="text-gradient">{t("Kết Quả Thực Tế", "Real Results")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t(
              "Bằng chứng thực tế từ học viên đã đạt mục tiêu cùng HaiEduTech",
              "Real evidence from students who achieved their goals with HaiEduTech"
            )}
          </p>
        </motion.div>

        {/* Testimonial slider */}
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            {/* Quote icon */}
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                {/* Student info row */}
                <div className="mb-5 flex items-center gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-lg font-bold text-white shadow-lg`}>
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.course}</p>
                  </div>
                  {/* Score badge */}
                  <div className="ml-auto text-right">
                    <div className="font-display text-2xl font-bold text-primary">{item.score}</div>
                    <div className="text-xs text-muted-foreground">{item.scoreLabel}</div>
                  </div>
                </div>

                {/* Quote */}
                <p className="mb-4 text-sm italic leading-7 text-foreground/80 sm:text-base">
                  "{t(item.quoteVi, item.quoteEn)}"
                </p>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="mt-6 flex items-center justify-between">
              <button onClick={prev} className="rounded-full border border-border p-2 transition-colors hover:bg-secondary" aria-label="Previous testimonial">
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-primary" : "w-2 bg-border"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="rounded-full border border-border p-2 transition-colors hover:bg-secondary" aria-label="Next testimonial">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Statistics bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="glass-card grid grid-cols-3 gap-4 rounded-2xl px-5 py-5 sm:gap-8 sm:px-8 sm:py-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <div className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  {t(s.valueVi, s.valueEn)}
                </div>
                <div className="mt-1 text-xs leading-5 text-muted-foreground">
                  {t(s.labelVi, s.labelEn)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
