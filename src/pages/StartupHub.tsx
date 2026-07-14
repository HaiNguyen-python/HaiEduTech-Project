import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Compass, GraduationCap, Trophy, Workflow, MessagesSquare, Sparkles, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { startupModules } from "@/data/curriculum/startupLessons";
import { useLanguage } from "@/contexts/LanguageContext";

const StartupHub = () => {
  const { t } = useLanguage();

  const cta = [
    { to: "/programming/startup/roadmap", label: t("Lộ trình 0→1", "Roadmap 0→1"), icon: Sparkles, color: "from-orange-500 to-rose-600" },
    { to: "/programming/startup-1-founder/su-1-1", label: t("Bắt đầu học", "Start Learning"), icon: GraduationCap, color: "from-emerald-500 to-teal-600" },
    { to: "/programming/startup/case-studies", label: t("Case Studies", "Case Studies"), icon: Trophy, color: "from-amber-500 to-orange-600" },
    { to: "/programming/startup/toolkit", label: t("Toolkit", "Toolkit"), icon: Workflow, color: "from-blue-500 to-indigo-600" },
    { to: "/programming/startup/pitch-simulator", label: t("Pitch Simulator", "Pitch Simulator"), icon: MessagesSquare, color: "from-fuchsia-500 to-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Helmet>
        <title>Startup Tech Track - HaiEduTech</title>
        <meta name="description" content="Learn to build a tech startup from 0 to 1: 6 modules, 30 lessons, VN case studies, and an AI investor pitch simulator." />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-600 text-white text-xs font-bold mb-4">
            <Rocket className="w-4 h-4" /> {t("Track mới - dành cho founder Việt", "New Track - for Vietnamese founders")}
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent mb-3">
            {t("Startup Tech - từ ý tưởng đến MVP đến Series A", "Startup Tech - from idea to MVP to Series A")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              "6 module - 30 bài học - toolkit tương tác - AI Investor Simulator. Học từ ELSA, VinAI, Misa AVA, Got It, Trusting Social và các founder Việt đang đi ra thế giới.",
              "6 modules - 30 lessons - interactive toolkit - AI Investor Simulator. Learn from ELSA, VinAI, Misa AVA, Got It, Trusting Social, and Vietnamese founders going global.",
            )}
          </p>
        </motion.header>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {cta.map((c) => (
            <Link key={c.to} to={c.to} className={`group rounded-2xl p-4 bg-gradient-to-br ${c.color} text-white shadow-lg hover:scale-[1.03] transition`}>
              <c.icon className="w-6 h-6 mb-2" />
              <div className="text-sm font-bold">{c.label}</div>
              <ArrowRight className="w-4 h-4 mt-2 opacity-70 group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {startupModules.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border-2 border-border bg-card p-5 hover:shadow-xl transition"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`text-3xl w-14 h-14 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow`}>{m.icon}</div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Module {idx + 1}</div>
                  <h3 className="text-lg font-black text-foreground leading-tight">{m.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-3">
                {m.lessons.map((l, i) => (
                  <li key={l.id}>
                    <Link
                      to={`/programming/${m.id}/${l.id}`}
                      className="flex items-center gap-2 text-sm text-foreground hover:text-orange-600 transition"
                    >
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="line-clamp-1">{l.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={`/programming/${m.id}/${m.lessons[0].id}`}
                className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${m.color} text-white`}
              >
                <Compass className="w-3.5 h-3.5" /> {t("Vào module", "Open module")}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border-2 border-orange-400/40 bg-gradient-to-br from-orange-500/10 to-rose-500/10 p-6 text-center">
          <p className="text-sm text-muted-foreground italic">
            💡 {t(
              "Bí mật của thầy Hải: đừng làm ChatGPT VN. Hãy làm cái ChatGPT KHÔNG giải được - một pain cực Việt Nam, một data cực địa phương.",
              "Teacher Hai's tip: don't build 'ChatGPT for Vietnam'. Build what ChatGPT cannot - a deeply Vietnamese pain, a deeply local dataset.",
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartupHub;
