/**
 * @file SatRoadmap.tsx
 * @description SAT Success Path — 3-phase timeline with milestones and curated resources.
 */
import { motion } from "framer-motion";
import { Compass, BookOpen, Calculator, Target, Clock, FileText, ChevronRight, ExternalLink, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const SatRoadmap = () => {
  const { t } = useLanguage();

  const PHASES = [
    {
      n: 1,
      gradient: "from-emerald-500 to-teal-600",
      icon: BookOpen,
      title: t("Giai đoạn 1 · Nền móng", "Phase 1 · Foundation"),
      duration: t("8-10 tuần", "8-10 weeks"),
      target: t("Mục tiêu: 1100-1250 (cơ bản chắc)", "Target: 1100-1250 (solid base)"),
      milestones: [
        t("Học hết 30 luật ngữ pháp SAT (Subject-Verb, Pronoun, Modifier...)", "Master 30 SAT grammar rules (SV agreement, pronouns, modifiers...)"),
        t("Ôn lại Algebra I + II, Linear Equations, Functions", "Review Algebra I + II, Linear Equations, Functions"),
        t("Đọc 2 passage/ngày — gạch main idea, tone", "Read 2 passages/day — highlight main idea, tone"),
        t("Build vocab: 500 từ học thuật cao tần", "Build vocab: 500 high-frequency academic words"),
      ],
      resources: [
        { label: "Khan Academy SAT (free official)", url: "https://www.khanacademy.org/test-prep/v2-sat" },
        { label: "Erica Meltzer — The Critical Reader", url: "https://thecriticalreader.com/" },
      ],
    },
    {
      n: 2,
      gradient: "from-sky-500 to-indigo-600",
      icon: Target,
      title: t("Giai đoạn 2 · Chiến thuật", "Phase 2 · Strategy"),
      duration: t("6-8 tuần", "6-8 weeks"),
      target: t("Mục tiêu: 1300-1450", "Target: 1300-1450"),
      milestones: [
        t("Reading: kỹ thuật line-reference, evidence pairing", "Reading: line-reference & evidence-pairing techniques"),
        t("Writing: khử bẫy redundancy, transition words", "Writing: spot redundancy traps, transition words"),
        t("Math No-Calc: speed strategies cho 25 phút", "Math No-Calc: speed strategies for the 25-min section"),
        t("Math Calc: dùng Desmos cho graphing & solver", "Math Calc: use Desmos for graphing & solver"),
        t("4 mock exam (1/tuần) + error log chi tiết", "4 mock exams (1/week) + detailed error log"),
      ],
      resources: [
        { label: "Bluebook (official Digital SAT app)", url: "https://bluebook.collegeboard.org/" },
        { label: "Desmos Online Calculator", url: "https://www.desmos.com/calculator" },
      ],
    },
    {
      n: 3,
      gradient: "from-violet-500 to-fuchsia-600",
      icon: Clock,
      title: t("Giai đoạn 3 · Thành thục", "Phase 3 · Mastery"),
      duration: t("4-6 tuần", "4-6 weeks"),
      target: t("Mục tiêu: 1500+", "Target: 1500+"),
      milestones: [
        t("8-10 mock exam full-length, đúng giờ thực tế", "8-10 full-length mock exams, real timing"),
        t("Time management: 1 phút/câu Reading, 30s/câu Writing", "Time management: 1min/Q Reading, 30s/Q Writing"),
        t("Tâm lý phòng thi: chiến lược skip & guess", "Test-day psychology: skip & guess strategy"),
        t("Phân tích error log → ưu tiên 3 weakness lớn nhất", "Analyze error log → focus on 3 biggest weaknesses"),
        t("Đăng ký thi chính thức + 1 lần backup", "Register official + 1 backup attempt"),
      ],
      resources: [
        { label: "CollegeBoard SAT Practice Tests", url: "https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests" },
        { label: "1600.io Math Drills", url: "https://1600.io/" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-4">
              <Compass className="w-3.5 h-3.5" />
              {t("Lộ trình SAT chuyên nghiệp", "Professional SAT Roadmap")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              {t("SAT Success Path", "SAT Success Path")}
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {t("3 giai đoạn rõ ràng từ 0 đến 1500+. Mỗi giai đoạn có cột mốc và tài nguyên cụ thể.", "3 clear phases from 0 to 1500+. Every phase has milestones and curated resources.")}
            </p>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-sky-500 to-violet-500 -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {PHASES.map((p, idx) => {
                const Icon = p.icon;
                const flip = idx % 2 === 1;
                return (
                  <motion.div
                    key={p.n}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.05 * idx }}
                    className={`md:grid md:grid-cols-2 md:gap-8 items-center ${flip ? "md:[&>:first-child]:order-2" : ""}`}
                  >
                    <div className={`${flip ? "md:text-left" : "md:text-right"}`}>
                      <Card className="hover:shadow-xl transition-shadow">
                        <CardContent className="p-5">
                          <div className={`flex items-center gap-3 mb-3 ${flip ? "" : "md:flex-row-reverse"}`}>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`${flip ? "" : "md:text-right"}`}>
                              <h3 className="font-bold text-lg">{p.title}</h3>
                              <div className="flex gap-2 flex-wrap mt-1">
                                <Badge variant="outline" className="text-xs">{p.duration}</Badge>
                                <Badge className="text-xs bg-primary/10 text-primary border-primary/30">{p.target}</Badge>
                              </div>
                            </div>
                          </div>
                          <ul className="space-y-2 text-sm text-left">
                            {p.milestones.map((m, i) => (
                              <li key={i} className="flex gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 pt-4 border-t">
                            <div className="text-xs font-semibold text-muted-foreground mb-2 text-left">{t("Tài nguyên đề xuất", "Recommended Resources")}</div>
                            <div className="space-y-1.5">
                              {p.resources.map((r) => (
                                <a key={r.url} href={r.url} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                                  <ExternalLink className="w-3.5 h-3.5" />{r.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-2xl ring-4 ring-background`}>
                        {p.n}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Card className="mt-12 bg-gradient-to-br from-primary/5 to-emerald-500/5 border-primary/30">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2">{t("Cần lộ trình cá nhân hoá?", "Need a personalized roadmap?")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("Đăng ký tư vấn 1-1 với thầy Hải để có lộ trình cụ thể theo điểm hiện tại của em", "Book a 1-on-1 consultation for a roadmap tailored to your current score")}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                {t("Liên hệ tư vấn", "Book Consultation")}<ChevronRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SatRoadmap;
