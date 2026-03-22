import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, BookOpen, FileText, GraduationCap, Sparkles, Check, X, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const ENGLISH_LEVELS = [
  { value: "A1", label: "A1 – Beginner" },
  { value: "A2", label: "A2 – Elementary" },
  { value: "B1", label: "B1 – Intermediate" },
  { value: "B2", label: "B2 – Upper Intermediate" },
  { value: "C1", label: "C1 – Advanced" },
];

const CHINESE_LEVELS = [
  { value: "HSK1", label: "HSK 1 – Sơ cấp 1" },
  { value: "HSK2", label: "HSK 2 – Sơ cấp 2" },
  { value: "HSK3", label: "HSK 3 – Trung cấp 1" },
  { value: "HSK4", label: "HSK 4 – Trung cấp 2" },
  { value: "HSK5", label: "HSK 5 – Cao cấp 1" },
  { value: "HSK6", label: "HSK 6 – Cao cấp 2" },
];

const MATERIAL_TYPES = [
  { value: "reading", label: "Bài đọc hiểu", labelEn: "Reading", icon: BookOpen },
  { value: "grammar", label: "Ngữ pháp", labelEn: "Grammar", icon: FileText },
  { value: "vocabulary", label: "Từ vựng", labelEn: "Vocabulary", icon: GraduationCap },
];

const QUESTION_COUNTS = [3, 5, 8, 10];

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface GeneratedContent {
  title: string;
  passage?: string;
  questions: Question[];
}

export default function SmartResources() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [language, setLanguage] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [materialType, setMaterialType] = useState<string>("reading");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const levels = language === "english" ? ENGLISH_LEVELS : language === "chinese" ? CHINESE_LEVELS : [];

  const handleGenerate = async () => {
    if (!language || !level || !materialType) {
      toast({ title: "Thiếu thông tin", description: "Vui lòng chọn đầy đủ ngôn ngữ, cấp độ và loại tài liệu.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setContent(null);
    setUserAnswers({});
    setShowResults(false);

    try {
      const { data, error } = await supabase.functions.invoke("generate-exercise", {
        body: { language, level, materialType, questionCount },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setContent(data);

      // Save to database if logged in
      if (user) {
        await supabase.from("learning_materials").insert({
          language,
          level,
          material_type: materialType,
          title: data.title,
          content: data,
          question_count: questionCount,
          created_by: user.id,
        });
      }
    } catch (err: any) {
      console.error("Generate error:", err);
      toast({ title: "Lỗi tạo bài tập", description: err.message || "Không thể tạo nội dung. Vui lòng thử lại.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    if (!content) return;
    const correct = content.questions.filter((q, i) => userAnswers[i] === q.correct).length;
    toast({
      title: `Kết quả: ${correct}/${content.questions.length}`,
      description: correct === content.questions.length ? "Xuất sắc! Bạn trả lời đúng tất cả! 🎉" : "Xem lại các giải thích để học thêm nhé!",
    });
  };

  const handleDownloadPDF = () => {
    if (!content) return;
    const html = `
      <html><head><meta charset="utf-8"><title>${content.title}</title>
      <style>body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:32px;line-height:1.6}
      h1{color:#1a365d;border-bottom:2px solid #3182ce;padding-bottom:8px}
      .passage{background:#f7fafc;padding:20px;border-radius:8px;margin:16px 0;border-left:4px solid #3182ce}
      .question{margin:20px 0;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:8px}
      .option{margin:4px 0;padding:4px 0}.correct{color:#38a169;font-weight:bold}
      .explanation{margin-top:8px;padding:12px;background:#f0fff4;border-radius:6px;font-size:0.9em;color:#2d3748}</style></head>
      <body><h1>${content.title}</h1>
      ${content.passage ? `<div class="passage">${content.passage}</div>` : ""}
      ${content.questions.map((q, i) => `
        <div class="question"><strong>Câu ${i + 1}:</strong> ${q.question}
        ${q.options.map((o, j) => `<div class="option ${j === q.correct ? "correct" : ""}">${String.fromCharCode(65 + j)}. ${o}</div>`).join("")}
        <div class="explanation"><strong>Giải thích:</strong> ${q.explanation}</div></div>
      `).join("")}
      </body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${content.title.replace(/\s+/g, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {t("AI-Powered", "AI-Powered")}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t("Kho Học Liệu Thông Minh", "Smart Learning Resources")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Tạo bài tập tùy chỉnh theo cấp độ và ngôn ngữ bạn đang học. AI sẽ tự động soạn nội dung phù hợp với trình độ của bạn.",
              "Generate custom exercises by level and language. AI will automatically create content matching your proficiency."
            )}
          </p>
        </motion.div>

        {/* Selection Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Card className="max-w-3xl mx-auto mb-10 shadow-md border-border/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{t("Tùy chỉnh bài tập", "Customize Exercise")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Row 1: Language + Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("Ngôn ngữ", "Language")}</Label>
                  <Select value={language} onValueChange={(v) => { setLanguage(v); setLevel(""); }}>
                    <SelectTrigger><SelectValue placeholder={t("Chọn ngôn ngữ", "Select language")} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">🇬🇧 {t("Tiếng Anh", "English")}</SelectItem>
                      <SelectItem value="chinese">🇨🇳 {t("Tiếng Trung", "Chinese")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("Cấp độ", "Level")}</Label>
                  <Select value={level} onValueChange={setLevel} disabled={!language}>
                    <SelectTrigger><SelectValue placeholder={t("Chọn cấp độ", "Select level")} /></SelectTrigger>
                    <SelectContent>
                      {levels.map((l) => (
                        <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Material Type */}
              <div className="space-y-2">
                <Label>{t("Loại tài liệu", "Material Type")}</Label>
                <div className="grid grid-cols-3 gap-3">
                  {MATERIAL_TYPES.map((mt) => {
                    const Icon = mt.icon;
                    const isActive = materialType === mt.value;
                    return (
                      <button
                        key={mt.value}
                        onClick={() => setMaterialType(mt.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 active:scale-[0.97] ${
                          isActive
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{t(mt.label, mt.labelEn)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Question Count */}
              <div className="space-y-2">
                <Label>{t("Số lượng câu hỏi", "Number of Questions")}</Label>
                <div className="flex gap-2">
                  {QUESTION_COUNTS.map((n) => (
                    <button
                      key={n}
                      onClick={() => setQuestionCount(n)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 ${
                        questionCount === n
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {n} {t("câu", "Q")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={loading || !language || !level}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("Đang tạo bài tập...", "Generating...")}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t("Tạo bài tập", "Generate Exercise")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Generated Content */}
        <AnimatePresence mode="wait">
          {content && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="shadow-lg border-border/60">
                <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
                  <div>
                    <CardTitle className="text-xl">{content.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === "english" ? "🇬🇧" : "🇨🇳"} {level} · {MATERIAL_TYPES.find(m => m.value === materialType)?.label} · {content.questions.length} {t("câu hỏi", "questions")}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                    <Download className="w-4 h-4 mr-1" />
                    {t("Tải xuống", "Download")}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Passage */}
                  {content.passage && (
                    <div className="p-5 bg-muted/50 rounded-lg border border-border/50 leading-relaxed text-foreground/90 whitespace-pre-wrap">
                      {content.passage}
                    </div>
                  )}

                  {/* Questions */}
                  <div className="space-y-5">
                    {content.questions.map((q, qi) => (
                      <motion.div
                        key={qi}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: qi * 0.08 }}
                        className="p-4 rounded-lg border border-border/50 bg-card"
                      >
                        <p className="font-medium mb-3">
                          <span className="text-primary font-bold mr-2">Câu {qi + 1}.</span>
                          {q.question}
                        </p>
                        <RadioGroup
                          value={userAnswers[qi]?.toString()}
                          onValueChange={(v) => setUserAnswers((prev) => ({ ...prev, [qi]: parseInt(v) }))}
                          disabled={showResults}
                          className="space-y-2"
                        >
                          {q.options.map((opt, oi) => {
                            const isCorrect = oi === q.correct;
                            const isSelected = userAnswers[qi] === oi;
                            let optClass = "";
                            if (showResults) {
                              if (isCorrect) optClass = "bg-green-50 border-green-300 dark:bg-green-950/30 dark:border-green-800";
                              else if (isSelected && !isCorrect) optClass = "bg-red-50 border-red-300 dark:bg-red-950/30 dark:border-red-800";
                            }
                            return (
                              <label
                                key={oi}
                                className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${optClass} ${
                                  !showResults && isSelected ? "border-primary bg-primary/5" : !showResults ? "hover:bg-muted/50" : ""
                                }`}
                              >
                                <RadioGroupItem value={oi.toString()} />
                                <span className="text-sm flex-1">
                                  <span className="font-medium mr-1.5">{String.fromCharCode(65 + oi)}.</span>
                                  {opt}
                                </span>
                                {showResults && isCorrect && <Check className="w-4 h-4 text-green-600" />}
                                {showResults && isSelected && !isCorrect && <X className="w-4 h-4 text-red-500" />}
                              </label>
                            );
                          })}
                        </RadioGroup>
                        {showResults && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 p-3 rounded-md bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-sm text-foreground/80"
                          >
                            <strong>{t("Giải thích:", "Explanation:")}</strong> {q.explanation}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Submit / Reset */}
                  <div className="flex gap-3 pt-2">
                    {!showResults ? (
                      <Button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(userAnswers).length < content.questions.length}
                        className="flex-1"
                      >
                        {t("Nộp bài", "Submit")}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => { setUserAnswers({}); setShowResults(false); }}
                        variant="outline"
                        className="flex-1"
                      >
                        {t("Làm lại", "Retry")}
                      </Button>
                    )}
                    <Button variant="outline" onClick={handleGenerate} disabled={loading}>
                      <Sparkles className="w-4 h-4 mr-1" />
                      {t("Tạo bài mới", "New Exercise")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
