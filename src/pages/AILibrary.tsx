import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookMarked, Sparkles } from "lucide-react";
import SmartResourcesContent from "@/components/SmartResourcesContent";
import LessonLibraryContent from "@/components/LessonLibraryContent";

const AILibrary = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("lessons");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("Thư Viện", "Library")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "Khám phá kho bài học khổng lồ ở mọi chủ đề Ngôn ngữ Anh - Trung - Lập Trình",
                "Explore a vast library of lessons across English, Chinese, and Programming"
              )}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="lessons" className="flex items-center gap-2">
                <BookMarked className="w-4 h-4" />
                {t("Bài Học AI", "AI Lessons")}
              </TabsTrigger>
              <TabsTrigger value="generator" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t("Tạo Bài Tập", "Generate Exercises")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lessons">
              <LessonLibraryContent />
            </TabsContent>
            <TabsContent value="generator">
              <SmartResourcesContent />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AILibrary;
