// IELTS Skills Practice Hub — landing page that groups Writing/Speaking/Reading/Listening practice
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PenTool, MessageSquare, BookOpen, Mic2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

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
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      to: "/ielts-speaking-practice",
      icon: MessageSquare,
      title: t("Luyện Nói", "Speaking Practice"),
      desc: t(
        "Live transcription Part 1-2-3, Candidate Notes, kiểm tra ngữ pháp AI, nâng Band 7.5+.",
        "Live transcription for Part 1-2-3, Candidate Notes, AI grammar check, upgrade to Band 7.5+.",
      ),
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
      iconColor: "text-emerald-400",
    },
    {
      to: "/ielts-reading-practice",
      icon: BookOpen,
      title: t("Luyện Đọc", "Reading Practice"),
      desc: t(
        "Bài đọc chuẩn Cambridge IELTS, đầy đủ dạng câu hỏi (T/F/NG, Matching, Multiple Choice, ...).",
        "Cambridge-standard reading passages with every question type (T/F/NG, Matching, Multiple Choice, ...).",
      ),
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
      iconColor: "text-amber-400",
    },
    {
      to: "/ielts-listening-practice",
      icon: Mic2,
      title: t("Luyện Nghe", "Listening Practice"),
      desc: t(
        "4 Section đúng chuẩn Cambridge: Form, MCQ, Map, Matching, Sentence & Note Completion.",
        "Full 4-section Cambridge layout: Form, MCQ, Map, Matching, Sentence & Note Completion.",
      ),
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="IELTS Skills Practice | HaiEduTech"
        description="Practice all 4 IELTS skills — Writing, Speaking, Reading, Listening — with Cambridge-standard materials and AI grading."
        canonical="/ielts-skills-practice"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-10 md:py-14">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent mb-3">
            🎯 IELTS Skills Practice
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Trung tâm luyện cả 4 kỹ năng IELTS theo chuẩn Cambridge với chấm điểm tự động.",
              "One hub to practise all 4 IELTS skills, with Cambridge-standard materials and AI scoring.",
            )}
          </p>
        </motion.header>

        <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={s.to}
                  className={`block rounded-2xl border bg-gradient-to-br ${s.color} backdrop-blur-sm p-6 md:p-7 hover:scale-[1.02] hover:shadow-xl transition-all group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-background/60 ${s.iconColor}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                        {s.title}
                        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsSkillsPractice;
