import { motion } from "framer-motion";
import { Globe, Search, GraduationCap, Award, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICONS = [GraduationCap, Award, BookOpen, GraduationCap, Award];

const AdvisorLoading = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-8 sm:p-12 text-center overflow-hidden relative"
    >
      {/* Floating scholarship icons */}
      <div className="absolute inset-0 pointer-events-none">
        {ICONS.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/30"
            initial={{
              x: `${20 + i * 15}%`,
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: "-20%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          >
            <Icon className="h-8 w-8" />
          </motion.div>
        ))}
      </div>

      {/* Globe with magnifier */}
      <div className="relative inline-block mb-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="p-5 rounded-full bg-gradient-to-br from-primary to-emerald-500 text-white shadow-xl"
        >
          <Globe className="h-12 w-12" />
        </motion.div>
        <motion.div
          animate={{
            x: [0, 30, -20, 25, 0],
            y: [0, -25, 15, -10, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 -right-2 p-2 rounded-full bg-yellow-400 text-yellow-900 shadow-lg"
        >
          <Search className="h-5 w-5" />
        </motion.div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
        {t(
          "AI đang quét toàn cầu tìm học bổng phù hợp...",
          "AI is scanning the globe for matched scholarships...",
        )}
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        {t(
          "Phân tích hồ sơ → Tìm học bổng đang mở → Lập lộ trình ứng tuyển. Quá trình mất 15-30 giây.",
          "Analyzing your profile → Finding open scholarships → Building your roadmap. This takes 15-30 seconds.",
        )}
      </p>

      <div className="mt-5 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AdvisorLoading;
