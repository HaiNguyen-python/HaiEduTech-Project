import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Music, BookOpen, Volume2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { kidsLessons, type KidsLesson } from "@/data/vietnamese/kidsOverseasData";
import { playVietnameseTts, stopVietnameseTts } from "@/lib/vietnameseTts";

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
  return (
    <Card className="h-full border-border/50 hover:shadow-xl transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">{lesson.emoji}</span>
          <div className="flex-1">
            <Badge className={ageColor[lesson.ageGroup]}>{lesson.ageGroup} {t("tuổi", "yrs")}</Badge>
            <h3 className="text-xl font-bold text-foreground mt-2">{t(lesson.title, lesson.titleEn)}</h3>
            <p className="text-sm text-muted-foreground italic">{t(lesson.topic, lesson.topicEn)}</p>
          </div>
        </div>

        {/* Vocabulary grid */}
        <div className="bg-muted/40 rounded-lg p-4 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {t("Từ vựng", "Vocabulary")} ({lesson.vocabulary.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {lesson.vocabulary.map((v, i) => (
              <div key={i} className="bg-background/60 rounded-lg p-2.5 border border-border/40">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{v.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground text-sm truncate">{v.vi}</div>
                    <div className="text-xs text-muted-foreground truncate">{v.en}</div>
                  </div>
                </div>
                {v.example && (
                  <div className="text-[11px] text-muted-foreground italic mt-1 leading-tight">
                    "{v.example}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Song */}
        {lesson.song && (
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border border-pink-200 dark:border-pink-900 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-bold text-pink-800 dark:text-pink-300 mb-2 flex items-center gap-1.5">
              <Music className="w-4 h-4" />
              🎵 {lesson.song.title}
            </h4>
            <pre className="text-sm font-sans whitespace-pre-wrap text-foreground leading-relaxed mb-2">
              {lesson.song.lyrics}
            </pre>
            <pre className="text-xs font-sans whitespace-pre-wrap text-muted-foreground italic leading-relaxed">
              {lesson.song.lyricsEn}
            </pre>
          </div>
        )}

        {/* Story */}
        {lesson.story && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              📖 {t(lesson.story.title, lesson.story.titleEn)}
            </h4>
            <p className="text-sm text-foreground leading-relaxed mb-2">{lesson.story.text}</p>
            <p className="text-xs text-muted-foreground italic leading-relaxed">{lesson.story.textEn}</p>
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
