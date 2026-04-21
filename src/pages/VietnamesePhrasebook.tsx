import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { phrasebookCategories } from "@/data/vietnamese/phrasebookData";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "vi-VN";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const VietnamesePhrasebook = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(phrasebookCategories[0].id);

  const current = phrasebookCategories.find(c => c.id === activeCategory) || phrasebookCategories[0];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Phrasebook Việt Nam: Cụm từ thực dụng | HaiEduTech" description="Cụm từ tiếng Việt theo tình huống: taxi, nhà hàng, chợ, bệnh viện, khách sạn, hỏi đường, khẩn cấp." path="/learn-vietnamese/phrasebook" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-8 h-8 text-cyan-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("Phrasebook tình huống", "Situational Phrasebook")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t("Cụm từ thực dụng theo 8 tình huống — bấm 🔊 để nghe", "Practical phrases in 8 scenarios — click 🔊 to listen")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-6">
            {/* Sidebar */}
            <div className="space-y-2 lg:sticky lg:top-20 lg:self-start">
              {phrasebookCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card border-border hover:bg-muted"
                  }`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{t(cat.title, cat.titleEn)}</div>
                    <div className={`text-xs ${activeCategory === cat.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {cat.phrases.length} {t("cụm", "phrases")}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Content */}
            <div>
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{current.emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{t(current.title, current.titleEn)}</h2>
                      <p className="text-sm text-muted-foreground">{t(current.description, current.descriptionEn)}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    {current.phrases.map((p, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors group"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
                          onClick={() => speak(p.vi)}
                          aria-label="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-foreground text-base">{p.vi}</div>
                          <div className="text-sm text-muted-foreground italic mt-0.5">{p.en}</div>
                          {p.pronunciation && (
                            <div className="text-xs text-muted-foreground/80 mt-1">/{p.pronunciation}/</div>
                          )}
                          {p.note && (
                            <div className="text-xs text-amber-700 dark:text-amber-400 mt-1.5 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded">
                              💡 {p.note}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnamesePhrasebook;
