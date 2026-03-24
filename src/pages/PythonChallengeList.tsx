import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code2, ArrowLeft, CheckCircle, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pythonChallenges } from "@/data/pythonChallenges";
import { Progress } from "@/components/ui/progress";
import { useState, useMemo } from "react";

const diffColors = {
  easy: "border-green-500/30 bg-green-500/5",
  medium: "border-yellow-500/30 bg-yellow-500/5",
  hard: "border-red-500/30 bg-red-500/5",
};

const SECTIONS = [
  { id: "all", labelVi: "Tất cả", labelEn: "All" },
  { id: "basics", labelVi: "Cơ bản", labelEn: "The Basics", range: [1, 20] },
  { id: "if", labelVi: "If Statements", labelEn: "If Statements", range: [21, 40] },
  { id: "strings", labelVi: "Strings", labelEn: "Strings", range: [41, 55] },
  { id: "maths", labelVi: "Toán học", labelEn: "Maths", range: [56, 70] },
  { id: "loops", labelVi: "Vòng lặp", labelEn: "Loops", range: [71, 90] },
  { id: "random", labelVi: "Random", labelEn: "Random", range: [91, 100] },
  { id: "lists", labelVi: "Lists & Dicts", labelEn: "Lists & Dicts", range: [101, 120] },
  { id: "advanced", labelVi: "Nâng cao", labelEn: "Advanced", range: [121, 150] },
];

const PAGE_SIZE = 30;

const PythonChallengeList = () => {
  const { t } = useLanguage();
  const [section, setSection] = useState("all");
  const [page, setPage] = useState(1);
  const completed = pythonChallenges.filter(c => localStorage.getItem(`haiedu_challenge_${c.id}_passed`) === "1").length;
  const pct = (completed / pythonChallenges.length) * 100;

  const filtered = useMemo(() => {
    if (section === "all") return pythonChallenges;
    const sec = SECTIONS.find(s => s.id === section);
    if (!sec || !sec.range) return pythonChallenges;
    return pythonChallenges.filter(c => {
      const num = parseInt(c.id);
      return num >= sec.range![0] && num <= sec.range![1];
    });
  }, [section]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSection = (id: string) => {
    setSection(id);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link to="/programming" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Programming
          </Link>

          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">150 Python Challenges</h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Practice Python right in your browser. No installation needed!
            </p>
            <div className="mt-4 max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{t("Đã hoàn thành", "Completed")}</span>
                <span className="font-bold text-primary">{completed}/{pythonChallenges.length}</span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          </div>

          {/* Section Filter */}
          <div className="glass-card rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{t("Chủ đề", "Topics")}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSection(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    section === s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(s.labelVi, s.labelEn)}
                  {s.range && (
                    <span className="ml-1 opacity-70">({s.range[1] - s.range[0] + 1})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {paged.map((c, i) => {
              const done = localStorage.getItem(`haiedu_challenge_${c.id}_passed`) === "1";
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                >
                  <Link
                    to={`/python-challenges/${c.id}`}
                    className={`block rounded-xl border p-4 transition-all hover:shadow-md active:scale-[0.98] ${diffColors[c.difficulty]} ${done ? "ring-2 ring-green-500/30" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold text-muted-foreground">#{c.number}</span>
                      {done && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                    <p className="font-semibold text-foreground text-sm leading-tight mb-1">{t(c.titleVi, c.title)}</p>
                    <span className={`text-[10px] font-bold uppercase ${c.difficulty === "easy" ? "text-green-600" : c.difficulty === "medium" ? "text-yellow-600" : "text-red-600"}`}>
                      {c.difficulty}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-sm bg-secondary text-foreground disabled:opacity-40 hover:bg-primary/10 transition-colors"
              >
                ← {t("Trước", "Prev")}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm transition-all ${
                    page === p ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-sm bg-secondary text-foreground disabled:opacity-40 hover:bg-primary/10 transition-colors"
              >
                {t("Sau", "Next")} →
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PythonChallengeList;
