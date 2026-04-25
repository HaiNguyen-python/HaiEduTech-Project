import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Headphones, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DictationExercise from "@/components/exercises/DictationExercise";
import { dictationLevels } from "@/data/vietnamese/dictationData";

const VietnameseDictation = () => {
  const { t } = useLanguage();
  const [activeLevel, setActiveLevel] = useState("easy");

  const currentLevel = dictationLevels.find(l => l.id === activeLevel) || dictationLevels[0];

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
            <div className="flex items-center gap-3 mb-2">
              <Headphones className="w-7 h-7 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t("Nghe chép chính tả", "Vietnamese Dictation")}
              </h1>
            </div>
            <p className="text-muted-foreground mb-6">
              {t(
                "Luyện nghe và viết lại chính xác các câu tiếng Việt. Chọn cấp độ phù hợp.",
                "Practice listening and writing Vietnamese sentences accurately. Choose your level."
              )}
            </p>
          </motion.div>

          <Tabs value={activeLevel} onValueChange={setActiveLevel}>
            <TabsList className="mb-6">
              {dictationLevels.map(level => (
                <TabsTrigger key={level.id} value={level.id} className="flex items-center gap-1.5">
                  <span>{level.icon}</span>
                  <span>{t(level.label, level.labelEn)}</span>
                  <Badge variant="secondary" className="text-xs ml-1">{level.sentences.length}</Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {dictationLevels.map(level => (
              <TabsContent key={level.id} value={level.id}>
                <DictationExercise
                  instruction={`Nghe và viết lại - ${level.label}`}
                  instructionEn={`Listen and write - ${level.labelEn}`}
                  sentences={level.sentences}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseDictation;
