// Vietnamese Major Holidays page - hub + detail view
import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Sparkles, ChevronRight, Lightbulb, Utensils, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { vietnameseHolidays, type VietnameseHoliday } from "@/data/vietnamese/holidaysData";

const categoryLabels: Record<string, { vi: string; en: string }> = {
  spring: { vi: "Mùa Xuân", en: "Spring" },
  summer: { vi: "Mùa Hè", en: "Summer" },
  autumn: { vi: "Mùa Thu", en: "Autumn" },
  winter: { vi: "Mùa Đông", en: "Winter" },
  anytime: { vi: "Quanh năm", en: "Anytime" },
};

const typeLabels: Record<string, { vi: string; en: string }> = {
  traditional: { vi: "Truyền thống", en: "Traditional" },
  national: { vi: "Quốc lễ", en: "National" },
  cultural: { vi: "Văn hoá", en: "Cultural" },
  international: { vi: "Quốc tế", en: "International" },
};

const HolidayCard = ({ holiday, index }: { holiday: VietnameseHoliday; index: number }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/learn-vietnamese/holidays/${holiday.id}`}
        className="block h-full rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all group"
      >
        <div className={`bg-gradient-to-br ${holiday.color} p-6 relative overflow-hidden`}>
          {holiday.image ? (
            <img
              src={holiday.image}
              alt={holiday.nameEn}
              loading="lazy"
              width={768}
              height={512}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute top-2 right-3 text-7xl opacity-20 group-hover:opacity-30 transition-opacity">
              {holiday.icon}
            </div>
          )}
          {/* Gradient overlay for text contrast */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`} />
          <div className="relative z-10 min-h-[140px] flex flex-col justify-end">
            <div className="text-3xl mb-1 drop-shadow-lg">{holiday.icon}</div>
            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
              {t(holiday.name, holiday.nameEn)}
            </h3>
            <p className="text-sm text-white/95 drop-shadow-lg">
              <Calendar className="inline w-3.5 h-3.5 mr-1" />
              {t(holiday.date, holiday.dateEn)}
            </p>
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge variant="secondary" className="text-xs">
              {t(typeLabels[holiday.type].vi, typeLabels[holiday.type].en)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {t(categoryLabels[holiday.category].vi, categoryLabels[holiday.category].en)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {t(holiday.shortDesc, holiday.shortDescEn)}
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all gap-1">
            {t("Khám phá", "Explore")} <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const HolidayDetail = ({ holiday }: { holiday: VietnameseHoliday }) => {
  const { t } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  return (
    <div>
      <Link to="/learn-vietnamese/holidays">
        <Button variant="ghost" size="sm" className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại danh sách", "Back to list")}
        </Button>
      </Link>

      {/* Hero header */}
      <div className={`bg-gradient-to-br ${holiday.color} rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden min-h-[280px] md:min-h-[340px]`}>
        {holiday.image && (
          <img
            src={holiday.image}
            alt={holiday.nameEn}
            width={768}
            height={512}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute -top-10 -right-10 text-[280px] opacity-10 leading-none select-none pointer-events-none">
          {holiday.icon}
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="text-6xl mb-4 drop-shadow-lg">{holiday.icon}</div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            {t(holiday.name, holiday.nameEn)}
          </h1>
          <p className="text-white/95 text-base md:text-lg flex items-center gap-2 mb-4 drop-shadow-lg">
            <Calendar className="w-5 h-5" />
            {t(holiday.date, holiday.dateEn)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/25 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
              {t(typeLabels[holiday.type].vi, typeLabels[holiday.type].en)}
            </Badge>
            <Badge className="bg-white/25 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
              {t(categoryLabels[holiday.category].vi, categoryLabels[holiday.category].en)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Story */}
      <Card className="p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          {t("Câu chuyện & ý nghĩa", "Story & Meaning")}
        </h2>
        <div className="prose prose-sm md:prose-base max-w-none text-foreground leading-relaxed whitespace-pre-line">
          {t(holiday.story, holiday.storyEn)}
        </div>
        {holiday.funFact && (
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20 flex gap-3">
            <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm italic text-foreground">
              <strong>{t("Bạn có biết: ", "Did you know: ")}</strong>
              {t(holiday.funFact, holiday.funFactEn || holiday.funFact)}
            </p>
          </div>
        )}
      </Card>

      {/* Customs + Foods */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="text-xl">🎎</span>
            {t("Phong tục", "Customs")}
          </h3>
          <ul className="space-y-2">
            {(t(holiday.customs.join("|||"), holiday.customsEn.join("|||"))).split("|||").map((c, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-orange-500" />
            {t("Ẩm thực truyền thống", "Traditional Foods")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(t(holiday.foods.join("|||"), holiday.foodsEn.join("|||"))).split("|||").map((f, i) => (
              <Badge key={i} variant="secondary" className="text-sm py-1.5 px-3">
                {f}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Vocabulary */}
      <Card className="p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {t("Từ vựng chủ điểm", "Key Vocabulary")}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {holiday.vocabulary.map((v, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-baseline justify-between mb-1.5">
                <strong className="text-base text-primary">{v.word}</strong>
              </div>
              <p className="text-sm text-foreground mb-1">
                {t(v.meaning, v.meaningEn)}
              </p>
              <p className="text-xs text-muted-foreground italic">
                "{t(v.example, v.exampleEn)}"
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quiz */}
      <Card className="p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-xl">🧠</span>
          {t("Kiểm tra hiểu biết", "Knowledge Check")}
        </h2>
        <div className="space-y-6">
          {holiday.quiz.map((q, qi) => {
            const selected = selectedAnswers[qi];
            const answered = selected !== undefined;
            return (
              <div key={qi} className="p-5 rounded-xl border border-border">
                <p className="font-semibold mb-3 text-foreground">
                  {qi + 1}. {t(q.question, q.questionEn)}
                </p>
                <div className="space-y-2">
                  {(t(q.options.join("|||"), q.optionsEn.join("|||"))).split("|||").map((opt, oi) => {
                    const isCorrect = oi === q.answer;
                    const isSelected = selected === oi;
                    let className = "w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between gap-2 ";
                    if (!answered) {
                      className += "border-border hover:border-primary hover:bg-primary/5 cursor-pointer";
                    } else if (isCorrect) {
                      className += "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100";
                    } else if (isSelected) {
                      className += "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100";
                    } else {
                      className += "border-border opacity-60";
                    }
                    return (
                      <button
                        key={oi}
                        disabled={answered}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qi]: oi })}
                        className={className}
                      >
                        <span className="text-sm">{opt}</span>
                        {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />}
                        {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-foreground">
                      <strong>{t("Giải thích: ", "Explanation: ")}</strong>
                      {t(q.explanation, q.explanationEn)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const VietnameseHolidays = () => {
  const { t } = useLanguage();
  const { holidayId } = useParams<{ holidayId: string }>();

  const currentHoliday = useMemo(
    () => vietnameseHolidays.find((h) => h.id === holidayId),
    [holidayId]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {!currentHoliday ? (
            <>
              {/* Hub view */}
              <Link to="/learn-vietnamese">
                <Button variant="ghost" size="sm" className="mb-4 gap-2">
                  <ArrowLeft className="w-4 h-4" /> {t("Quay lại Học Tiếng Việt", "Back to Learn Vietnamese")}
                </Button>
              </Link>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <div className="inline-flex items-center justify-center gap-3 mb-3">
                  <span className="text-4xl">🎊</span>
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 via-amber-500 to-pink-500 bg-clip-text text-transparent">
                    {t("Các ngày lễ lớn của Việt Nam", "Major Vietnamese Holidays")}
                  </h1>
                  <span className="text-4xl">🇻🇳</span>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t(
                    "Khám phá 12 ngày lễ truyền thống và quốc lễ quan trọng nhất – câu chuyện, phong tục, ẩm thực và từ vựng chủ điểm.",
                    "Explore 12 most important traditional and national holidays - stories, customs, foods, and key vocabulary."
                  )}
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {vietnameseHolidays.map((h, i) => (
                  <HolidayCard key={h.id} holiday={h} index={i} />
                ))}
              </div>
            </>
          ) : (
            <HolidayDetail holiday={currentHoliday} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseHolidays;
