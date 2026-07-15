import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lightbulb, MessageCircle, Wrench, Rocket, TrendingUp, Coins, Trophy, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const stages = [
  { icon: Lightbulb, name: { vi: "Idea", en: "Idea" }, color: "from-amber-400 to-orange-500", weeks: "W0-2",
    desc: { vi: "Painstorm 30 ngày, chọn top-3 pain có WTP > 50k/tháng.", en: "30-day painstorm; pick top-3 pains with WTP > 50k/month." } },
  { icon: MessageCircle, name: { vi: "Interview", en: "Interview" }, color: "from-orange-500 to-rose-500", weeks: "W2-6",
    desc: { vi: "10 customer interviews theo Mom Test. 7/10 xác nhận pain = go.", en: "10 customer interviews via the Mom Test. 7/10 confirming = go." } },
  { icon: Wrench, name: { vi: "MVP", en: "MVP" }, color: "from-rose-500 to-pink-500", weeks: "W6-14",
    desc: { vi: "1 job, 3 features, dùng Lovable/no-code trước khi code.", en: "1 job, 3 features, ship via no-code before writing code." } },
  { icon: Rocket, name: { vi: "Beta", en: "Beta" }, color: "from-pink-500 to-fuchsia-500", weeks: "W14-24",
    desc: { vi: "100 beta user thật. Đo D7 retention, Sean Ellis test.", en: "100 real beta users. Measure D7 retention and Sean Ellis." } },
  { icon: TrendingUp, name: { vi: "PMF", en: "PMF" }, color: "from-fuchsia-500 to-purple-600", weeks: "M6-12",
    desc: { vi: "Sean Ellis ≥ 40%, retention flatten, WoM organic.", en: "Sean Ellis ≥ 40%, retention flattens, organic WoM." } },
  { icon: Coins, name: { vi: "Seed", en: "Seed" }, color: "from-purple-600 to-indigo-600", weeks: "M12-18",
    desc: { vi: "Gọi $200-500k. SAFE cap $4-6M. 12-18 tháng runway.", en: "Raise $200-500k. SAFE cap $4-6M. 12-18 months runway." } },
  { icon: Trophy, name: { vi: "Series A", en: "Series A" }, color: "from-indigo-600 to-blue-600", weeks: "Y2-3",
    desc: { vi: "$2-5M priced round. ARR $1M+, LTV/CAC > 3.", en: "$2-5M priced round. ARR $1M+, LTV/CAC > 3." } },
];

const StartupRoadmap = () => {
  const { t, lang } = useLanguage();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 dark:from-slate-950 dark:to-slate-900">
      <Helmet><title>{t("Lộ trình Founder 0→1 - Startup", "Founder Roadmap 0→1 - Startup")}</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link to="/programming/startup" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Về Hub", "Back to Hub")}
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
          {t("Lộ trình Founder 0 → 1 → A", "Founder Roadmap 0 → 1 → A")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("7 cột mốc, 2-3 năm, mỗi cột mốc có tiêu chí đo lường rõ ràng.", "7 milestones, 2-3 years, each with a measurable exit criterion.")}
        </p>

        <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-fuchsia-500 before:to-blue-600">
          {stages.map((s, i) => (
            <motion.div
              key={s.name.en}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative"
            >
              <div className={`absolute -left-[26px] top-1 w-8 h-8 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <div className="rounded-xl border-2 border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-black text-foreground">{lang === "vi" ? s.name.vi : s.name.en}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${s.color} text-white`}>{s.weeks}</span>
                </div>
                <p className="text-sm text-muted-foreground">{lang === "vi" ? s.desc.vi : s.desc.en}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default StartupRoadmap;
