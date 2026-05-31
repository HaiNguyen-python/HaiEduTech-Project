/**
 * @file ChineseListening.tsx
 * @description Listening practice page - embedded YouTube videos graded HSK 1 → HSK 5.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Headphones, ChevronDown, ExternalLink, Lightbulb, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  chineseListeningLevels,
  type ChineseListeningLevel,
  type ChineseListeningVideo,
} from "@/data/chineseListeningVideos";

const VideoCard = ({ video }: { video: ChineseListeningVideo }) => {
  const { t, lang } = useLanguage();
  return (
    <Card className="overflow-hidden border-2">
      <CardContent className="p-0">
        {/* Embedded YouTube - responsive 16:9 */}
        <div className="relative w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-base sm:text-lg leading-tight flex items-center gap-2">
                <span className="text-xl">{video.emoji}</span>
                {t(video.titleVi, video.title)}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {video.channel}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs gap-1">
                <Clock className="w-3 h-3" />~{video.durationMin}m
              </Badge>
              <Badge className="text-xs bg-gradient-to-r from-primary to-purple-600 text-white border-0">
                {t(video.topicVi, video.topic)}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {t(video.descriptionVi, video.description)}
          </p>

          <div className="rounded-lg border bg-muted/30 p-3 space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              {t("Mẹo luyện nghe", "Listening tips")}
            </p>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {(lang === "vi" ? video.tipsVi : video.tips).map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            {t("Mở trên YouTube", "Open on YouTube")}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const LevelSection = ({
  lvl,
  open,
  onToggle,
}: {
  lvl: ChineseListeningLevel;
  open: boolean;
  onToggle: () => void;
}) => {
  const { t } = useLanguage();
  return (
    <div className="mb-5">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${lvl.colorFrom} ${lvl.colorTo} text-white shadow-md hover:shadow-lg transition-shadow`}
        aria-expanded={open}
      >
        <img
          src={lvl.chibi}
          alt=""
          loading="lazy"
          width={56}
          height={56}
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 drop-shadow"
        />
        <span className="text-2xl font-black">HSK {lvl.level}</span>
        <div className="text-left flex-1 min-w-0">
          <p className="font-bold text-base sm:text-lg leading-tight">{t(lvl.labelVi, lvl.label)}</p>
          <p className="text-xs sm:text-sm text-white/85 leading-snug">{t(lvl.blurbVi, lvl.blurb)}</p>
        </div>
        <Badge className="bg-white/25 text-white border-white/30 shrink-0">
          {lvl.videos.length} {t("video", "videos")}
        </Badge>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5">
              {lvl.videos.map(v => (
                <VideoCard key={`${lvl.level}-${v.id}`} video={v} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChineseListening = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState<Record<number, boolean>>({ 1: true });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Luyện nghe tiếng Trung qua YouTube theo HSK | HaiEduTech"
        description="Luyện nghe tiếng Trung từ HSK 1 đến HSK 5 với các video YouTube được tuyển chọn theo chủ đề thú vị: ẩm thực, du lịch, gia đình, văn hóa, thành ngữ."
        path="/chinese/listening"
      />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <Link
          to="/chinese"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-5"
        >
          <ArrowLeft className="w-4 h-4" /> {t("Tiếng Trung", "Chinese")}
        </Link>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {t("Luyện nghe tiếng Trung", "Chinese Listening Practice")}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            {t(
              "25 video YouTube tuyển chọn từ HSK 1 đến HSK 5 - chủ đề thú vị: ẩm thực đường phố, du lịch, gia đình, thời tiết, thành ngữ, vlog bản xứ. Phát trực tiếp ngay trên trang, có mẹo nghe cho mỗi video.",
              "25 hand-picked YouTube videos from HSK 1 to HSK 5 - engaging topics: street food, travel, family, weather, idioms, native vlogs. Plays right on this page with listening tips per video."
            )}
          </p>
        </motion.div>

        {chineseListeningLevels.map(lvl => (
          <LevelSection
            key={lvl.level}
            lvl={lvl}
            open={!!open[lvl.level]}
            onToggle={() => setOpen(s => ({ ...s, [lvl.level]: !s[lvl.level] }))}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default ChineseListening;
