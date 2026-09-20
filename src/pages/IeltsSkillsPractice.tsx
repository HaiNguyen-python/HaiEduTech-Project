// IELTS Skills Practice Hub - landing page that groups Writing/Speaking/Reading/Listening practice
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PenTool, MessageSquare, BookOpen, Headphones, ArrowRight, BarChart3, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import writingIllustration from "@/assets/ielts-writing-illustration.png";
import speakingIllustration from "@/assets/ielts-speaking-illustration.png";
import readingIllustration from "@/assets/ielts-reading-illustration.png";
import listeningIllustration from "@/assets/ielts-listening-illustration.png";

const IeltsSkillsPractice = () => {
  const { t } = useLanguage();

  const skills = [
    {
      to: "/ielts-writing-practice",
      icon: PenTool,
      title: t("Luyện Viết", "Writing Practice"),
      desc: t(
        "Đề Task 1 & Task 2, dàn ý tương tác, chấm điểm AI theo 4 tiêu chí Band 8.0+.",
        "Task 1 & Task 2 prompts, interactive outline builder, AI grading on all 4 Band-8.0+ criteria.",
      ),
      number: "01",
      illustration: writingIllustration,
      illustrationAlt: t("Minh họa bút máy đang viết bài IELTS", "Fountain pen writing an IELTS essay"),
      accent: "border-ielts-blue/25 hover:border-ielts-blue/45 hover:shadow-ielts-blue/10",
      iconStyle: "border-ielts-blue/15 bg-ielts-blue/10 text-ielts-blue",
      numberStyle: "text-ielts-blue/70",
      illustrationSurface: "bg-ielts-blue/10",
    },
    {
      to: "/ielts-speaking-practice",
      icon: MessageSquare,
      title: t("Luyện Nói", "Speaking Practice"),
      desc: t(
        "Live transcription Part 1-2-3, Candidate Notes, kiểm tra ngữ pháp AI, nâng Band 7.5+.",
        "Live transcription for Part 1-2-3, Candidate Notes, AI grammar check, upgrade to Band 7.5+.",
      ),
      number: "02",
      illustration: speakingIllustration,
      illustrationAlt: t("Minh họa micro luyện nói IELTS", "Microphone for IELTS speaking practice"),
      accent: "border-ielts-emerald/25 hover:border-ielts-emerald/45 hover:shadow-ielts-emerald/10",
      iconStyle: "border-ielts-emerald/15 bg-ielts-emerald/10 text-ielts-emerald",
      numberStyle: "text-ielts-emerald/70",
      illustrationSurface: "bg-ielts-emerald/10",
    },
    {
      to: "/ielts-reading-practice",
      icon: BookOpen,
      title: t("Luyện Đọc", "Reading Practice"),
      desc: t(
        "Bài đọc chuẩn Cambridge IELTS, đầy đủ dạng câu hỏi (T/F/NG, Matching, Multiple Choice, ...).",
        "Cambridge-standard reading passages with every question type (T/F/NG, Matching, Multiple Choice, ...).",
      ),
      number: "03",
      illustration: readingIllustration,
      illustrationAlt: t("Minh họa sách và kính lúp luyện đọc IELTS", "Book and magnifying glass for IELTS reading practice"),
      accent: "border-ielts-gold/25 hover:border-ielts-gold/45 hover:shadow-ielts-gold/10",
      iconStyle: "border-ielts-gold/15 bg-ielts-gold/10 text-ielts-gold",
      numberStyle: "text-ielts-gold/70",
      illustrationSurface: "bg-ielts-gold/10",
    },
    {
      to: "/ielts-listening-practice",
      icon: Headphones,
      title: t("Luyện Nghe", "Listening Practice"),
      desc: t(
        "4 Section đúng chuẩn Cambridge: Form, MCQ, Map, Matching, Sentence & Note Completion.",
        "Full 4-section Cambridge layout: Form, MCQ, Map, Matching, Sentence & Note Completion.",
      ),
      number: "04",
      illustration: listeningIllustration,
      illustrationAlt: t("Minh họa tai nghe luyện nghe IELTS", "Headphones for IELTS listening practice"),
      accent: "border-ielts-violet/25 hover:border-ielts-violet/45 hover:shadow-ielts-violet/10",
      iconStyle: "border-ielts-violet/15 bg-ielts-violet/10 text-ielts-violet",
      numberStyle: "text-ielts-violet/70",
      illustrationSurface: "bg-ielts-violet/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-manrope">
      <SEO
        title="IELTS Skills Practice | HaiEduTech"
        description="Practice all 4 IELTS skills - Writing, Speaking, Reading, Listening - with Cambridge-standard materials and AI grading."
      />
      <Navbar />
      <main className="container mx-auto px-4 py-10 sm:px-6 md:py-14 lg:py-16">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          <div className="mb-5 flex items-center justify-center gap-3 sm:gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ielts-emerald text-primary-foreground shadow-lg shadow-ielts-emerald/20 sm:size-14" aria-hidden="true">
              <Lightbulb className="size-7 sm:size-8" strokeWidth={2.25} />
            </span>
            <h1 className="font-sora text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              IELTS Skills Practice
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-base font-medium leading-7 text-muted-foreground md:text-lg">
            {t(
              "Trung tâm luyện cả 4 kỹ năng IELTS theo chuẩn Cambridge với chấm điểm tự động.",
              "One hub to practise all 4 IELTS skills, with Cambridge-standard materials and AI scoring.",
            )}
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="group relative mx-auto mb-6 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-ielts-blue/35 hover:shadow-xl hover:shadow-ielts-blue/10 md:p-8"
        >
          <div className="absolute right-0 top-0 size-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-ielts-blue/10 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:gap-7 md:text-left">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-ielts-blue/15 bg-ielts-blue/10 text-ielts-blue md:size-20">
              <BarChart3 className="size-8 md:size-10" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-bold uppercase text-ielts-blue">
                {t("Tổng quan năng lực", "Performance overview")}
              </p>
              <h2 className="font-sora text-2xl font-bold text-card-foreground">
                {t("Năng lực IELTS của bạn", "Your IELTS Performance")}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                {t(
                  "Tổng hợp 4 kỹ năng, dự đoán band điểm, mức độ sẵn sàng và nội dung cần cải thiện tiếp theo.",
                  "One dashboard for all 4 skills: predicted band, test readiness and what to improve next.",
                )}
              </p>
            </div>
            <Button asChild size="lg" className="h-12 rounded-lg bg-ielts-blue px-6 font-bold text-primary-foreground shadow-lg shadow-ielts-blue/20 hover:bg-ielts-blue/90">
              <Link to="/ielts-performance">
                {t("Xem tổng quan", "View dashboard")}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.section>

        <section className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 md:gap-6" aria-label={t("Luyện tập bốn kỹ năng IELTS", "IELTS four-skill practice")}>
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.14 + i * 0.07 }}
                className="h-full"
              >
                <Link
                  to={s.to}
                  className={`group relative block h-full min-h-[270px] overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:min-h-[250px] md:p-7 ${s.accent}`}
                >
                  <div className={`absolute -right-5 -top-6 size-36 rounded-full opacity-70 transition-transform duration-500 group-hover:scale-110 md:-right-8 md:-top-10 md:size-44 ${s.illustrationSurface}`} aria-hidden="true" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl border ${s.iconStyle}`}>
                          <Icon className="size-6" strokeWidth={2} />
                        </div>
                        <span className={`font-sora text-xs font-bold ${s.numberStyle}`}>{s.number}</span>
                      </div>
                      <ArrowRight className="relative z-20 size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>
                    <div className="relative z-10 max-w-[62%] sm:max-w-[58%]">
                      <h2 className="mb-2 font-sora text-xl font-bold leading-tight text-card-foreground md:text-2xl">
                        {s.title}
                      </h2>
                      <p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">{s.desc}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute bottom-2 right-1 z-0 flex h-[58%] w-[43%] items-end justify-end sm:bottom-3 sm:right-2 sm:h-[64%] sm:w-[45%]" aria-hidden="true">
                    <img
                      src={s.illustration}
                      alt={s.illustrationAlt}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-full w-full object-contain object-bottom-right drop-shadow-md transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsSkillsPractice;
