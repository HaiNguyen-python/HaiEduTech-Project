import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX, BookOpen, Lightbulb, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { vietnamesePoems } from "@/data/vietnamese/poetryData";

const VietnamesePoetry = () => {
  const { t } = useLanguage();
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const selectedPoem = selectedPoemId ? vietnamesePoems.find(p => p.id === selectedPoemId) : null;

  const speakPoem = useCallback((text: string) => {
    speechSynthesis.cancel();
    const paragraphs = text.split("\n").filter(p => p.trim());
    let i = 0;
    const speakNext = () => {
      if (i >= paragraphs.length) { setIsSpeaking(false); return; }
      const u = new SpeechSynthesisUtterance(paragraphs[i]);
      u.lang = "vi-VN";
      u.rate = 0.5;
      u.pitch = 1.15 + (i % 2 === 0 ? 0.08 : -0.08);
      u.onend = () => { i++; setTimeout(speakNext, 600); };
      u.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(u);
    };
    setIsSpeaking(true);
    speakNext();
  }, []);

  const stopSpeech = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  if (selectedPoem) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-6 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <button onClick={() => { stopSpeech(); setSelectedPoemId(null); }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" />
              {t("Quay lại danh sách", "Back to list")}
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">{t(selectedPoem.period, selectedPoem.periodEn)}</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">{t(selectedPoem.author, selectedPoem.authorEn)}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t(selectedPoem.title, selectedPoem.titleEn)}</h1>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => isSpeaking ? stopSpeech() : speakPoem(selectedPoem.text)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  {isSpeaking ? t("Dừng đọc", "Stop") : t("Nghe đọc thơ", "Listen")}
                </button>
              </div>

              {/* Poem text */}
              <Card className="p-6 md:p-8 mb-6">
                <pre className="whitespace-pre-wrap font-serif text-lg md:text-xl leading-loose text-foreground">{selectedPoem.text}</pre>
                <hr className="my-4 border-border/60" />
                <pre className="whitespace-pre-wrap font-serif text-base leading-loose text-muted-foreground italic">{selectedPoem.textEn}</pre>
              </Card>

              {/* Analysis */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="p-5">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    {t("Phân tích", "Analysis")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(selectedPoem.analysis, selectedPoem.analysisEn)}</p>
                </Card>
                <Card className="p-5">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    {t("Bối cảnh văn hóa", "Cultural Context")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(selectedPoem.culturalNote, selectedPoem.culturalNoteEn)}</p>
                </Card>
              </div>

              {/* Vocabulary */}
              <Card className="p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {t("Từ vựng", "Vocabulary")}
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedPoem.vocabulary.map((v, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                      <span className="font-bold text-primary text-sm">{v.word}</span>
                      <span className="text-sm text-muted-foreground">— {t(v.meaning, v.meaningEn)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Go back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              📜 {t("Thơ Hay Việt Nam", "Vietnamese Poetry")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("Khám phá những bài thơ kinh điển của văn học Việt Nam", "Discover classic poems of Vietnamese literature")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {vietnamesePoems.map((poem, idx) => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className="p-5 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all h-full"
                  onClick={() => setSelectedPoemId(poem.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{t(poem.period, poem.periodEn)}</Badge>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{t(poem.title, poem.titleEn)}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{t(poem.author, poem.authorEn)}</p>
                  <p className="text-xs text-muted-foreground line-clamp-3 font-serif italic">{poem.text.split("\n").slice(0, 2).join(" / ")}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnamesePoetry;
