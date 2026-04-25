import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Music, BookOpen, Volume2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { kidsLessons as baseKids, type KidsLesson } from "@/data/vietnamese/kidsOverseasData";
import { kidsExpansion } from "@/data/vietnamese/kidsExpansion";
import { kidsExpansion2 } from "@/data/vietnamese/kidsExpansion2";
import { kidsExpansion3 } from "@/data/vietnamese/kidsExpansion3";
const kidsLessons = [...baseKids, ...kidsExpansion, ...kidsExpansion2, ...kidsExpansion3];
import { playVietnameseTts, stopVietnameseTts } from "@/lib/vietnameseTts";
import KidsFlashcard from "@/components/KidsFlashcard";

const SpeakButton = ({ text, label, size = "icon" }: { text: string; label: string; size?: "icon" | "sm" }) => {
  const [loading, setLoading] = useState(false);
  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) {
      stopVietnameseTts();
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      await playVietnameseTts(text);
    } finally {
      setLoading(false);
    }
  };
  if (size === "sm") {
    return (
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handlePlay}
        aria-label={label}
        className="h-7 gap-1.5 px-2 text-xs"
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5" />}
        {label}
      </Button>
    );
  }
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={handlePlay}
      aria-label={label}
      className="h-7 w-7 shrink-0 text-primary hover:text-primary hover:bg-primary/10"
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5" />}
    </Button>
  );
};

const ageColor = {
  "3-6": "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-200",
  "7-10": "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  "11-14": "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
};

const KidsCard = ({ lesson }: { lesson: KidsLesson }) => {
  const { t } = useLanguage();
  const [view, setView] = useState<"flashcard" | "grid">("flashcard");

  return (
    <Card className="h-full border-border/50 hover:shadow-xl transition-shadow">
      <CardContent className="pt-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <span className="text-7xl">{lesson.emoji}</span>
          <div className="flex-1">
            <Badge className={`${ageColor[lesson.ageGroup]} text-sm font-bold px-3 py-1`}>
              {lesson.ageGroup} {t("tuổi", "yrs")}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2 leading-tight">
              {t(lesson.title, lesson.titleEn)}
            </h3>
            <p className="text-base text-muted-foreground italic">
              {t(lesson.topic, lesson.topicEn)}
            </p>
          </div>
        </div>

        {/* View toggle: Flashcard ↔ Grid */}
        <div className="bg-muted/40 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between mb-3 gap-2">
            <h4 className="text-sm font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {t("Từ vựng", "Vocabulary")} ({lesson.vocabulary.length})
            </h4>
            <div className="inline-flex rounded-full border bg-background p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setView("flashcard")}
                className={`px-3 py-1 rounded-full transition ${
                  view === "flashcard" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                🎴 {t("Thẻ", "Cards")}
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`px-3 py-1 rounded-full transition ${
                  view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                📋 {t("Lưới", "Grid")}
              </button>
            </div>
          </div>

          {view === "flashcard" ? (
            <KidsFlashcard items={lesson.vocabulary} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.vocabulary.map((v, i) => (
                <div key={i} className="bg-background/80 rounded-xl p-3 border-2 border-border/40 hover:border-primary/40 transition">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-4xl">{v.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-foreground text-lg leading-tight">{v.vi}</div>
                      <div className="text-sm text-muted-foreground">{v.en}</div>
                    </div>
                    <SpeakButton text={v.vi} label={`Phát âm ${v.vi}`} />
                  </div>
                  {v.example && (
                    <div className="flex items-start gap-1.5 mt-2 pt-2 border-t border-border/30">
                      <div className="text-sm text-foreground italic leading-snug flex-1 whitespace-pre-wrap">
                        "{v.example}"
                      </div>
                      <SpeakButton text={v.example} label="Phát âm ví dụ" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Song */}
        {lesson.song && (
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border-2 border-pink-200 dark:border-pink-900 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3 gap-2">
              <h4 className="text-base font-extrabold text-pink-800 dark:text-pink-300 flex items-center gap-1.5">
                <Music className="w-5 h-5" />
                🎵 {lesson.song.title}
              </h4>
              <SpeakButton text={`${lesson.song.title}. ${lesson.song.lyrics}`} label={t("Hát", "Sing")} size="sm" />
            </div>
            <div className="text-base whitespace-pre-wrap text-foreground leading-loose mb-2 font-medium">
              {lesson.song.lyrics}
            </div>
            <div className="text-sm whitespace-pre-wrap text-muted-foreground italic leading-relaxed">
              {lesson.song.lyricsEn}
            </div>
          </div>
        )}

        {/* Story */}
        {lesson.story && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-2 border-amber-200 dark:border-amber-900 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 gap-2">
              <h4 className="text-base font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <BookOpen className="w-5 h-5" />
                📖 {t(lesson.story.title, lesson.story.titleEn)}
              </h4>
              <SpeakButton text={lesson.story.text} label={t("Đọc", "Read")} size="sm" />
            </div>
            <p className="text-base text-foreground leading-loose mb-2 whitespace-pre-wrap">{lesson.story.text}</p>
            <p className="text-sm text-muted-foreground italic leading-relaxed whitespace-pre-wrap">{lesson.story.textEn}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const VietnameseKids = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "3-6" | "7-10" | "11-14">("all");

  const filtered = filter === "all" ? kidsLessons : kidsLessons.filter(l => l.ageGroup === filter);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Tiếng Việt cho trẻ Việt kiều | HaiEduTech" description="Bài học tiếng Việt cho trẻ em Việt kiều: gia đình, chào hỏi, hát ru, truyện ngắn — kết nối tổ tiên." path="/learn-vietnamese/kids-overseas" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8 text-rose-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("Tiếng Việt cho trẻ Việt kiều", "Vietnamese for Overseas Kids")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t("Giữ tiếng Việt qua gia đình, hát ru, truyện cổ tích — kết nối với cội nguồn", "Keep Vietnamese alive through family, lullabies, fairy tales — connect to your roots")}
            </p>
          </motion.div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
            <TabsList className="grid grid-cols-4 max-w-md">
              <TabsTrigger value="all">{t("Tất cả", "All")}</TabsTrigger>
              <TabsTrigger value="3-6">3–6 {t("tuổi", "yrs")}</TabsTrigger>
              <TabsTrigger value="7-10">7–10</TabsTrigger>
              <TabsTrigger value="11-14">11–14</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <KidsCard lesson={lesson} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseKids;
