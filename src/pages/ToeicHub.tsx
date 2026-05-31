// TOEIC Hub - Combined entry for Lectures + Vocabulary
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Library, ArrowRight, Headphones, FileText, Briefcase, Sparkles, GraduationCap, Mic, PenLine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import chibiBoy from "@/assets/chibi-boy-study.png";
import chibiGirl from "@/assets/chibi-girl-study.png";

const ToeicHub = () => {
  const { t } = useLanguage();

  const sections = [
    {
      to: "/toeic-lectures",
      icon: BookOpen,
      title: t("Bài giảng TOEIC", "TOEIC Lectures"),
      desc: t(
        "Hệ thống bài giảng Parts 1-7, mẹo tốc độ, ngữ pháp & chiến lược điểm cao.",
        "Comprehensive lectures for Parts 1-7, speed hacks, grammar & high-score strategies."
      ),
      badges: [
        { icon: Headphones, label: t("Listening P1-4", "Listening P1-4") },
        { icon: FileText, label: t("Reading P5-7", "Reading P5-7") },
        { icon: Sparkles, label: t("Mẹo & Chiến lược", "Tips & Strategy") },
      ],
      // Soft corporate blue accent
      iconWrap: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
      badge: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
      cardBorder: "border-2 border-sky-400 hover:border-sky-500",
      cardShadow: "shadow-sky-100/50",
    },
    {
      to: "/toeic-vocabulary",
      icon: Library,
      title: t("Từ vựng TOEIC", "TOEIC Vocabulary"),
      desc: t(
        "Ngân hàng từ vựng Business Blue, flashcard tự mở rộng, luyện theo chủ đề công sở.",
        "Business Blue vocabulary bank, auto-expanding flashcards, themed by workplace topics."
      ),
      badges: [
        { icon: Briefcase, label: t("Business Topics", "Business Topics") },
        { icon: Library, label: t("Flashcards", "Flashcards") },
        { icon: Sparkles, label: t("Theo Part", "By Part") },
      ],
      // Soft indigo/cobalt accent
      iconWrap: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
      badge: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
      cardBorder: "border-2 border-indigo-400 hover:border-indigo-500",
      cardShadow: "shadow-indigo-100/50",
    },
    {
      to: "/toeic-exams",
      icon: GraduationCap,
      title: t("Phòng thi TOEIC 4 kỹ năng", "TOEIC 4-Skills Exam Hub"),
      desc: t(
        "Listening, Reading, Speaking & Writing - timer, audio speed, ghi âm, quy đổi điểm 990.",
        "Listening, Reading, Speaking & Writing - timer, audio speed, voice recorder, 990-scale conversion."
      ),
      badges: [
        { icon: Headphones, label: t("LR Test", "LR Test") },
        { icon: Mic, label: t("Speaking", "Speaking") },
        { icon: PenLine, label: t("Writing", "Writing") },
      ],
      // Soft teal/emerald accent
      iconWrap: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      cardBorder: "border-2 border-emerald-400 hover:border-emerald-500",
      cardShadow: "shadow-emerald-100/50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="TOEIC Hub - HaiEduTech"
        description="Bài giảng & Từ vựng TOEIC trong cùng một nơi - học thông minh, dẫn đầu kỷ nguyên số."
      />
      <Navbar />

      <main className="container mx-auto px-4 py-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 ring-1 ring-slate-200 mb-4">
            {t("Trung tâm TOEIC", "TOEIC Center")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            TOEIC
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            {t(
              "Tất cả bài giảng và từ vựng TOEIC gói gọn trong một trang truy cập nhanh.",
              "All TOEIC lectures and vocabulary in one quick-access hub."
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={s.to} className="block group h-full">
                <div className={`relative h-full rounded-2xl p-6 lg:p-8 bg-white ${s.cardBorder} shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col`}>
                  <div className={`w-14 h-14 rounded-xl ${s.iconWrap} flex items-center justify-center mb-5`}>
                    <s.icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl lg:text-[1.6rem] font-bold text-slate-900 mb-3 leading-tight">{s.title}</h2>
                  <p className="text-slate-600 text-base leading-relaxed mb-5">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.badges.map((b) => (
                      <span
                        key={b.label}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${s.badge}`}
                      >
                        <b.icon className="w-3 h-3" />
                        {b.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">
                      {t("Vào học ngay", "Enter now")}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Side chibis - fixed to viewport edges so they never extend page height */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden select-none lg:block"
      >
        <img
          src={chibiBoy}
          alt=""
          width={110}
          height={110}
          loading="lazy"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-24 h-24 object-contain drop-shadow-lg"
          style={{
            filter:
              "drop-shadow(0 6px 14px rgba(59,130,246,0.35)) drop-shadow(0 3px 6px rgba(16,185,129,0.25))",
          }}
        />
        <img
          src={chibiGirl}
          alt=""
          width={110}
          height={110}
          loading="lazy"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 object-contain drop-shadow-lg"
          style={{
            filter:
              "drop-shadow(0 6px 14px rgba(244,114,182,0.35)) drop-shadow(0 3px 6px rgba(16,185,129,0.25))",
          }}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ToeicHub;
