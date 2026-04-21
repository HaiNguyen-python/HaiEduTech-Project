// Reusable promo banner that links to the dedicated /songs/:lang page
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Music, Mic, Languages, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type SongLanguage = "english" | "chinese" | "finnish" | "vietnamese";

interface Props {
  language: SongLanguage;
  delay?: number;
}

const THEME: Record<SongLanguage, { gradient: string; emoji: string; songs: string }> = {
  english: {
    gradient: "from-violet-500/20 via-fuchsia-500/15 to-pink-500/10",
    emoji: "🎤",
    songs: "Lemon Tree • Perfect • You Are My Sunshine",
  },
  chinese: {
    gradient: "from-rose-500/20 via-amber-500/15 to-orange-500/10",
    emoji: "🎶",
    songs: "月亮代表我的心 • 童话 • 小幸运 • 朋友",
  },
  finnish: {
    gradient: "from-sky-500/20 via-cyan-500/15 to-blue-500/10",
    emoji: "❄️",
    songs: "Sininen ja valkoinen • Muumilaulu • Maamme",
  },
  vietnamese: {
    gradient: "from-emerald-500/20 via-yellow-500/15 to-lime-500/10",
    emoji: "🪷",
    songs: "Bèo dạt mây trôi • Nhật ký của mẹ • Trống cơm",
  },
};

export default function SongsBanner({ language, delay = 0 }: Props) {
  const { t } = useLanguage();
  const theme = THEME[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="mb-10"
    >
      <Link to={`/songs/${language}`} className="block group">
        <div
          className={`relative overflow-hidden rounded-2xl border-2 border-primary/15 bg-gradient-to-br ${theme.gradient} p-6 md:p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300`}
        >
          {/* Decorative musical notes */}
          <div className="absolute top-4 right-6 text-6xl opacity-10 select-none">
            {theme.emoji}
          </div>
          <div className="absolute bottom-4 right-12 text-3xl opacity-10 select-none">♪</div>
          <div className="absolute top-12 right-24 text-4xl opacity-10 select-none">♫</div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center shadow-lg">
              <Music className="w-8 h-8 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                  <Sparkles className="w-3 h-3" />
                  {t("Mới", "New")}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {t("Học qua bài hát", "Learn through Songs")}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 flex items-center gap-2">
                🎵 {t("Thư viện bài hát", "Song Library")}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-2 leading-relaxed">
                {t(
                  "Lyrics song ngữ • Hover từ để dịch nghĩa & phát âm • Karaoke highlight • Quiz điền từ • Ghi chú văn hóa.",
                  "Bilingual lyrics • Hover words for meaning & pronunciation • Karaoke highlight • Fill-in-blanks quiz • Cultural notes.",
                )}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 text-foreground/70">
                  <Languages className="w-3.5 h-3.5 text-primary" /> {theme.songs}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md group-hover:gap-3 transition-all">
              <Mic className="w-4 h-4" />
              {t("Mở thư viện", "Open Library")}
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
