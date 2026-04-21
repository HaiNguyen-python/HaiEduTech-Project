import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Film, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filmClips, type FilmClip } from "@/data/vietnamese/filmsData";

const levelColor = {
  A2: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
  B1: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  B2: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
};

const ClipCard = ({ clip }: { clip: FilmClip }) => {
  const { t } = useLanguage();
  const [showEn, setShowEn] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{clip.thumbnail}</span>
            <div>
              <h3 className="text-lg font-bold text-foreground">{t(clip.title, clip.titleEn)}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={levelColor[clip.level]}>{clip.level}</Badge>
                <Badge variant="outline" className="text-xs">{clip.duration}</Badge>
                <Badge variant="secondary" className="text-xs capitalize">{clip.type}</Badge>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 italic">
          {t(clip.synopsis, clip.synopsisEn)}
        </p>

        <div className="flex justify-end mb-3">
          <Button variant="ghost" size="sm" onClick={() => setShowEn(!showEn)} className="text-xs">
            {showEn ? <EyeOff className="w-3.5 h-3.5 mr-1.5" /> : <Eye className="w-3.5 h-3.5 mr-1.5" />}
            {showEn ? t("Ẩn EN", "Hide EN") : t("Hiện EN", "Show EN")}
          </Button>
        </div>

        <div className="bg-muted/40 rounded-lg p-4 mb-4 space-y-3">
          {clip.dialogue.map((line, i) => (
            <div key={i} className="border-l-2 border-primary/40 pl-3">
              <div className="text-xs font-bold text-primary mb-0.5">{line.speaker}</div>
              <div className="text-sm text-foreground">{line.vi}</div>
              {showEn && <div className="text-xs text-muted-foreground italic mt-1">{line.en}</div>}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
              🔑 {t("Từ vựng nổi bật", "Key Vocabulary")}
            </h4>
            <div className="space-y-1.5">
              {clip.vocabHighlight.map((v, i) => (
                <div key={i} className="text-xs">
                  <span className="font-semibold text-foreground">{v.vi}</span>
                  <span className="text-muted-foreground"> — {v.en}</span>
                  {v.note && <div className="text-[11px] text-muted-foreground/80 italic">{v.note}</div>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                ❓ {t("Câu hỏi hiểu bài", "Comprehension")}
              </h4>
              <Button variant="ghost" size="sm" onClick={() => setShowAnswers(!showAnswers)} className="text-[11px] h-6 px-2">
                {showAnswers ? t("Ẩn", "Hide") : t("Đáp án", "Answers")}
              </Button>
            </div>
            <div className="space-y-2">
              {clip.comprehensionQ.map((q, i) => (
                <div key={i} className="text-xs">
                  <div className="font-medium text-foreground">{i + 1}. {t(q.q, q.qEn)}</div>
                  {showAnswers && (
                    <div className="text-emerald-600 dark:text-emerald-400 mt-0.5">
                      ✓ {t(q.a, q.aEn)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const VietnameseFilms = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "A2" | "B1" | "B2">("all");

  const filtered = filter === "all" ? filmClips : filmClips.filter(c => c.level === filter);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Phim & Hội thoại Việt Nam thực tế | HaiEduTech" description="Luyện nghe tiếng Việt qua phim, vlog, drama đời thực với phụ đề song ngữ và bài tập hiểu." path="/learn-vietnamese/films" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("Phim & Hội thoại đời thực", "Films & Real Conversations")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t("Luyện nghe qua phim, vlog, hội thoại với phụ đề song ngữ", "Practice listening through films, vlogs, conversations with bilingual subtitles")}
            </p>
          </motion.div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
            <TabsList className="grid grid-cols-4 max-w-sm">
              <TabsTrigger value="all">{t("Tất cả", "All")}</TabsTrigger>
              <TabsTrigger value="A2">A2</TabsTrigger>
              <TabsTrigger value="B1">B1</TabsTrigger>
              <TabsTrigger value="B2">B2</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-5">
            {filtered.map((clip, idx) => (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <ClipCard clip={clip} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseFilms;
