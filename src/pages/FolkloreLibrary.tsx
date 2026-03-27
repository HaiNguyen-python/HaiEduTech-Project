import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft, ChevronRight, Volume2, Lightbulb, X, BookMarked } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { folkloreStories, folkloreCategories, type FolkloreStory } from "@/data/vietnamese/folkloreStories";
import { useCourseAccess } from "@/hooks/useCourseAccess";
import AccessDeniedModal from "@/components/AccessDeniedModal";

const FolkloreLibrary = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { storyId } = useParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const { hasAccess, loading, user } = useCourseAccess("vietnamese-folklore");
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const filtered = activeCategory === "all"
    ? folkloreStories
    : folkloreStories.filter(s => s.category === activeCategory);

  const selectedStory = storyId ? folkloreStories.find(s => s.id === storyId) : null;

  const speakVietnamese = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  };

  const handleStoryClick = (story: FolkloreStory) => {
    if (!hasAccess && !loading) {
      setShowAccessDenied(true);
      return;
    }
    navigate(`/learn-vietnamese/folklore/${story.id}`);
  };

  // Reading mode for a selected story
  if (selectedStory) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-6 pb-16">
          <div className="container mx-auto px-6 max-w-3xl">
            {/* Back button */}
            <Link to="/learn-vietnamese/folklore" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> {t("Quay lại Kho truyện", "Back to Folklore Library")}
            </Link>

            {/* Story header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline">{lang === "vi" ? selectedStory.categoryLabel : selectedStory.categoryLabelEn}</Badge>
                <Badge variant="secondary" className="capitalize">{selectedStory.difficulty}</Badge>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                {t(selectedStory.title, selectedStory.titleEn)}
              </h1>
              <p className="text-muted-foreground mb-6">{t(selectedStory.summary, selectedStory.summaryEn)}</p>
            </motion.div>

            {/* Storyteller audio button */}
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={() => speakVietnamese(selectedStory.story)} className="gap-2">
                <Volume2 className="w-4 h-4" /> {t("Nghe kể chuyện", "Listen to Story")}
              </Button>
            </div>

            {/* Story text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-relaxed whitespace-pre-line text-foreground">
                {t(selectedStory.story, selectedStory.storyEn)}
              </div>
            </motion.div>

            {/* Vocabulary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> {t("Từ vựng", "Vocabulary")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedStory.vocabulary.map((v, i) => (
                  <Card key={i} className="p-4 flex items-start gap-3">
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={() => speakVietnamese(v.word)}>
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <div>
                      <p className="font-bold text-foreground">{v.word}</p>
                      <p className="text-sm text-muted-foreground">{v.meaningEn}</p>
                      <p className="text-xs text-muted-foreground italic">({v.meaning})</p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Lessons Learned */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" /> {t("Bài học rút ra", "Lessons Learned")}
              </h2>
              <div className="space-y-3">
                {selectedStory.lessonsLearned.map((lesson, i) => (
                  <div key={i} className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">{i + 1}.</span>
                    <p className="text-foreground">{lang === "vi" ? lesson.vi : lesson.en}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Gallery view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookMarked className="w-8 h-8 text-red-500" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t("Kho tàng Truyện cổ tích Việt Nam", "Vietnamese Folklore Treasury")}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("Khám phá văn hóa Việt Nam qua những câu chuyện cổ tích bất hủ", "Explore Vietnamese culture through timeless fairy tales and legends")}
            </p>
          </motion.div>

          {/* Category filter */}
          <ScrollArea className="w-full mb-8">
            <div className="flex gap-2 justify-center pb-2">
              {folkloreCategories.map(cat => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {t(cat.label, cat.labelEn)}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* Book gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filtered.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleStoryClick(story)}
                className="cursor-pointer group"
              >
                {/* Vintage book cover */}
                <div className={`aspect-[3/4] bg-gradient-to-br ${story.coverColor} rounded-lg shadow-lg relative overflow-hidden group-hover:shadow-xl transition-all group-hover:scale-[1.03] border-2 border-black/10`}>
                  {/* Spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20" />
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white text-center">
                    <span className="text-4xl mb-3 drop-shadow-lg">{story.coverIcon}</span>
                    <h3 className="font-serif font-bold text-sm md:text-base leading-tight drop-shadow">
                      {t(story.title, story.titleEn)}
                    </h3>
                    <Badge className="mt-2 bg-white/20 text-white border-white/30 text-[10px]">
                      {lang === "vi" ? story.categoryLabel : story.categoryLabelEn}
                    </Badge>
                  </div>
                  {/* Vintage texture overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.3))] pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <AccessDeniedModal open={showAccessDenied} onOpenChange={setShowAccessDenied} />
    </div>
  );
};

export default FolkloreLibrary;
