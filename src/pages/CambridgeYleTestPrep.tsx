/**
 * @file CambridgeYleTestPrep.tsx
 * @description Cambridge YLE Test Prep hub. Exams are grouped into clearly
 *              separated level bands (Starters, Movers, Flyers, KET, PET) with a
 *              sticky level filter so children and parents can find a paper fast.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { GraduationCap, Trophy } from "lucide-react";
import { cambridgeMockExams } from "@/data/cambridgeMockExamData";
import TestPrepBoard from "@/components/cambridge/TestPrepBoard";
import CambridgeWritingLab from "@/components/cambridge/CambridgeWritingLab";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingKidsDecor from "@/components/FloatingKidsDecor";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import cambridgeHeaderBg from "@/assets/course-cambridge.jpg";

const CambridgeYleTestPrep = () => {
  const { t } = useLanguage();
  const totalExams = cambridgeMockExams.length;

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #FFFDF7 0%, #FFF3F7 25%, #EEF7FF 55%, #F1FFF3 80%, #FFF8FB 100%)" }}
    >
      <FloatingKidsDecor />
      <Navbar />
      <main className="pt-20 pb-10 relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img src={cambridgeHeaderBg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/85 backdrop-blur-[1px]" />
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight text-foreground">
                {t("Cambridge YLE Test Prep 🏆", "Cambridge YLE Test Prep 🏆")}
              </h1>
              <p className="text-slate-700 font-medium" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                {t(
                  `🎈 ${totalExams} đề thi thử Cambridge theo 5 cấp độ: Starters, Movers, Flyers, KET và PET - có bài đọc đầy đủ, chế độ Bấm giờ và Tự do!`,
                  `🎈 ${totalExams} Cambridge mock papers across 5 levels: Starters, Movers, Flyers, KET and PET - full reading texts, Timed and Free modes!`
                )}
              </p>
            </motion.div>
          </div>
        </section>

        <TestPrepBoard stickyTopClass="top-16" />

        <CambridgeWritingLab />


        <section className="container mx-auto px-4 pb-8">
          {/* Link back to lectures */}
          <div className="mt-8 text-center">
            <Link to="/cambridge-lectures">
              <Button variant="outline" className="border-2 border-[#C780FA] bg-white text-[#7C3AED] hover:bg-[#F5F3FF] hover:text-[#5B21B6]">
                <GraduationCap className="mr-2 h-4 w-4" />
                {t("Xem mục Cambridge", "Back to Cambridge hub")}
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
