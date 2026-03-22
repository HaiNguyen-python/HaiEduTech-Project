import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code2, ArrowLeft, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pythonChallenges } from "@/data/pythonChallenges";
import { Progress } from "@/components/ui/progress";

const diffColors = {
  easy: "border-green-500/30 bg-green-500/5",
  medium: "border-yellow-500/30 bg-yellow-500/5",
  hard: "border-red-500/30 bg-red-500/5",
};

const PythonChallengeList = () => {
  const { t } = useLanguage();
  const completed = pythonChallenges.filter(c => localStorage.getItem(`haiedu_challenge_${c.id}_passed`) === "1").length;
  const pct = (completed / pythonChallenges.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link to="/programming" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại Lập trình", "Back to Programming")}
          </Link>

          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("150 Thử thách Python", "150 Python Challenges")}</h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              {t("Luyện tập Python ngay trên trình duyệt. Không cần cài đặt!", "Practice Python right in your browser. No installation needed!")}
            </p>
            <div className="mt-4 max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{t("Đã hoàn thành", "Completed")}</span>
                <span className="font-bold text-primary">{completed}/{pythonChallenges.length}</span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pythonChallenges.map((c, i) => {
              const done = localStorage.getItem(`haiedu_challenge_${c.id}_passed`) === "1";
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PythonChallengeList;
