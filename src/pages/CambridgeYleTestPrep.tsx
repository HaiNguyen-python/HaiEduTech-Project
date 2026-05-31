// Cambridge YLE Test Prep - Dedicated page for Cambridge mock exams
import { Link } from "react-router-dom";
import { Clock, GraduationCap, Trophy } from "lucide-react";
import { cambridgeMockExams, CAMBRIDGE_LEVEL_LABELS } from "@/data/cambridgeMockExamData";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingKidsDecor from "@/components/FloatingKidsDecor";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const CambridgeYleTestPrep = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #FFF8E7 0%, #FFE5EC 25%, #E0F4FF 50%, #E8FFE0 75%, #FFF0F5 100%)" }}>
      <FloatingKidsDecor />
      <Navbar />
      <main className="pt-20 pb-10 relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #FFE5EC 0%, #FFF8DC 30%, #E0F4FF 70%, #E8FFE0 100%)" }} />
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-[#FF6B9D]/30 blur-[100px] animate-pulse" />
          <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-[#FFD93D]/30 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />

          <div className="relative container mx-auto px-4 py-8 md:py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#F9A826] via-[#FF6B9D] to-[#C780FA] border-2 border-white shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F9A826] to-[#FF6B9D] text-white border-2 border-white shadow-md text-sm font-bold uppercase tracking-wider">
                  🎯 Cambridge YLE
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight" style={{ background: "linear-gradient(135deg, #FF6B9D 0%, #FF9F1C 35%, #6BCB77 70%, #4D96FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t("Cambridge YLE Test Prep 🏆", "Cambridge YLE Test Prep 🏆")}
              </h1>
              <p className="text-slate-700 font-medium" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                {t(
                  "🎈 Bộ đề thi thử Cambridge Young Learners English (Starters, Movers, Flyers) cùng KET & PET - luyện thi vui nhộn, có chế độ Bấm giờ và Tự do!",
                  "🎈 Cambridge Young Learners English mock exams (Starters, Movers, Flyers) plus KET & PET - fun practice with Timed and Free modes!"
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mock Exams Grid */}
        <section className="container mx-auto px-4 pt-6 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {cambridgeMockExams.map((exam) => {
              const lvl = CAMBRIDGE_LEVEL_LABELS[exam.level];
              const bestRaw = localStorage.getItem(`cambridge-mock-best-${exam.id}`);
              const best = bestRaw ? Math.round((parseInt(bestRaw) / exam.totalQuestions) * 100) : null;
              return (
                <div
                  key={exam.id}
                  className="rounded-xl border-2 p-4 hover:shadow-lg transition-all group shadow-sm"
                  style={{
                    borderColor: lvl.color,
                    background: `linear-gradient(135deg, #fff 0%, ${lvl.color}10 100%)`,
                    boxShadow: `0 2px 0 ${lvl.color}40`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{lvl.emoji}</span>
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: `${lvl.color}25`, color: lvl.color }}>{lvl.label}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2">{t(exam.titleVi, exam.title)}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{exam.duration}m</span>
                    <span>{exam.totalQuestions} {t("câu", "Qs")}</span>
                  </div>
                  {best !== null && (
                    <div className={`text-xs font-bold mb-2 ${best >= 80 ? "text-emerald-600" : best >= 60 ? "text-amber-600" : "text-red-500"}`}>
                      🏆 {t("Cao nhất", "Best")}: {best}%
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Link to={`/cambridge-mock-exam/${exam.id}?mode=timed`} className="flex-1">
                      <Button size="sm" className="w-full text-xs bg-gradient-to-r from-[#C780FA] to-[#7C3AED] hover:opacity-90 text-white">
                        <Clock className="w-3 h-3 mr-1" />{t("Có giờ", "Timed")}
                      </Button>
                    </Link>
                    <Link to={`/cambridge-mock-exam/${exam.id}?mode=untimed`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full text-xs border-2 border-slate-300 text-slate-700 hover:bg-slate-100">
                        {t("Tự do", "Free")}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Link back to lectures */}
          <div className="mt-8 text-center">
            <Link to="/cambridge-lectures">
              <Button variant="outline" className="border-2 border-[#C780FA] text-[#7C3AED] bg-white/80 hover:bg-white">
                <GraduationCap className="w-4 h-4 mr-2" />
                {t("Xem bài giảng Cambridge", "View Cambridge Lectures")}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CambridgeYleTestPrep;
