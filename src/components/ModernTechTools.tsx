/**
 * @file ModernTechTools.tsx
 * @description Bento grid showcasing HaiEduTech's modern AI tools on the Home page.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PenTool, Mic, Bot, Gamepad2, Target, LineChart, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ModernTechTools = () => {
  const { t } = useLanguage();

  const tools = [
    {
      icon: PenTool,
      title: t("AI Grading", "AI Grading"),
      desc: t(
        "Chấm IELTS Writing tức thì, feedback chi tiết theo 4 tiêu chí, xuất PDF.",
        "Instant IELTS Writing grading with 4-criteria feedback and PDF export."
      ),
      to: "/english/ielts/writing",
      gradient: "from-sky-500/25 to-primary/10",
      iconColor: "text-sky-500",
    },
    {
      icon: Mic,
      title: t("AI Speaking Coach", "AI Speaking Coach"),
      desc: t(
        "Nhận diện giọng nói real-time, đánh giá phát âm theo IPA & Pinyin.",
        "Real-time speech recognition, pronunciation feedback with IPA & Pinyin."
      ),
      to: "/english/ielts/speaking",
      gradient: "from-emerald-500/25 to-primary/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Bot,
      title: t("Mr. Hai Chatbot", "Mr. Hai Chatbot"),
      desc: t(
        "Trợ lý AI 24/7, đa ngôn ngữ — giải đáp mọi câu hỏi học tập.",
        "24/7 multilingual AI tutor — answers any learning question."
      ),
      to: "/chatbot",
      gradient: "from-indigo-500/25 to-primary/10",
      iconColor: "text-indigo-500",
    },
    {
      icon: Gamepad2,
      title: t("Game Center", "Game Center"),
      desc: t(
        "Vocab Arena, Duel Battle 1v1 với bảng xếp hạng công khai.",
        "Vocab Arena & 1v1 Duel Battle with public leaderboards."
      ),
      to: "/games",
      gradient: "from-fuchsia-500/25 to-primary/10",
      iconColor: "text-fuchsia-500",
    },
    {
      icon: Target,
      title: t("Skill Assessment", "Skill Assessment"),
      desc: t(
        "Bài test 10 câu adaptive, sinh Skill Profile cá nhân cho lộ trình.",
        "10-question adaptive test generating a personal Skill Profile."
      ),
      to: "/assessment",
      gradient: "from-amber-500/25 to-primary/10",
      iconColor: "text-amber-500",
    },
    {
      icon: LineChart,
      title: t("Student Dashboard", "Student Dashboard"),
      desc: t(
        "Study Streak, Skill Radar, theo dõi tiến độ học mọi kỹ năng.",
        "Study Streak, Skill Radar and full multi-skill progress tracking."
      ),
      to: "/dashboard",
      gradient: "from-teal-500/25 to-primary/10",
      iconColor: "text-teal-500",
    },
  ];

  return (
    <section className="relative py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-10"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary sm:text-sm">
            ⚡ {t("Công nghệ hiện đại", "Modern Tech Stack")}
          </div>
          <h2 className="mb-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Công cụ ", "Modern ")}
            <span className="text-gradient">{t("AI & Tương tác", "AI Tools")}</span>
            {t(" tích hợp sẵn", " Built-In")}
          </h2>
          <p className="mx-auto max-w-2xl px-2 text-sm leading-7 text-muted-foreground sm:px-0 sm:text-base">
            {t(
              "6 công cụ thực hành trực tiếp trên web — không cần cài đặt, không cần đăng ký phức tạp.",
              "6 hands-on tools right on the web — no install, no friction."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={tool.to}
                className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-6"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                />
                <div className="relative">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient}`}
                  >
                    <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground sm:text-xl">
                    {tool.title}
                  </h3>
                  <p className="mb-4 text-sm leading-7 text-muted-foreground">{tool.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    {t("Trải nghiệm", "Try it")} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernTechTools;
