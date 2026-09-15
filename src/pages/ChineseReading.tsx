/**
 * @file ChineseReading.tsx
 * @description Graded Chinese reading practice page (HSK 1 → HSK 5).
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle, Eye, EyeOff, ChevronDown, Volume2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { chineseReadingLevels, type ChineseReadingPassage, type ChineseReadingLevel } from "@/data/chineseReadingPractice";
import { chineseReadingQuestionsZh } from "@/data/chineseReadingQuestionsZh";

import { playChineseTts, stopChineseTts } from "@/lib/chineseTts";
const speak = (text: string) => {
  stopChineseTts();
  void playChineseTts(text, { playbackRate: 0.9, speechRate: 0.85 });
};

const PassageCard = ({ passage, chibi }: { passage: ChineseReadingPassage; chibi: string }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showVi, setShowVi] = useState(false);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const hanziLines = passage.hanzi.split("\n");
  const pinyinLines = passage.pinyin.split("\n");
  const viLines = passage.vi.split("\n");

  const score = passage.questions.reduce((s, q, i) => s + (selected[i] === q.answer ? 1 : 0), 0);

  return (
    <Card className="overflow-hidden border-2">
      <CardContent className="p-5 sm:p-6 space-y-5">
        <div className="flex items-start gap-4">
          <img
            src={chibi}
            alt={passage.title}
            loading="lazy"
            width={96}
            height={96}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0 drop-shadow-md"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                className="flex items-center gap-2 text-left group"
              >
                <h3 className="text-xl font-bold flex items-center gap-2 group-hover:text-primary transition-colors">
                  <span className="text-2xl">{passage.emoji}</span>
                  {t(passage.titleVi, passage.title)}
                </h3>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              <div className="flex gap-2">
                {open && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => setShowPinyin(v => !v)} className="gap-1.5">
                      {showPinyin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      Pinyin
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowVi(v => !v)} className="gap-1.5">
                      {showVi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {t("Dịch", "Translate")}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => speak(passage.hanzi)} className="gap-1.5">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button size="sm" variant={open ? "outline" : "default"} onClick={() => setOpen(v => !v)} className="gap-1.5">
                  {open ? t("Thu gọn", "Collapse") : t("Đọc bài", "Read")}
                </Button>
              </div>
            </div>
            {!open && (
              <p className="text-sm text-muted-foreground mt-1">
                {t("Nhấn Đọc bài để mở nội dung, từ mới và câu hỏi.", "Tap Read to open the passage, vocabulary and questions.")}
              </p>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="space-y-5 pt-1">

        <div className="space-y-3 bg-muted/30 rounded-xl p-4 sm:p-5 border">
          {hanziLines.map((line, i) => (
            <div key={i} className="space-y-1">
              <p className="text-lg sm:text-xl font-medium leading-relaxed text-foreground whitespace-pre-wrap">{line}</p>
              {showPinyin && pinyinLines[i] && (
                <p className="text-sm text-primary/80 italic leading-relaxed whitespace-pre-wrap">{pinyinLines[i]}</p>
              )}
              {showVi && viLines[i] && (
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">→ {viLines[i]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Vocabulary */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
            {t("Từ mới", "New words")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {passage.newWords.map((w, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-card border text-sm">
                <button onClick={() => speak(w.hanzi)} className="text-lg font-bold text-primary hover:scale-110 transition-transform">
                  {w.hanzi}
                </button>
                <span className="text-xs text-muted-foreground italic">{w.pinyin}</span>
                <span className="ml-auto text-xs">{w.vi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            {t("Câu hỏi đọc hiểu", "Comprehension")}
          </h4>
          <div className="space-y-4">
            {passage.questions.map((q, qi) => {
              const zh = chineseReadingQuestionsZh[`${passage.id}#${qi}`];
              return (
                <div key={qi} className="space-y-2">
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-foreground flex items-start gap-1.5">
                      <span className="text-primary">{qi + 1}.</span>
                      <button
                        onClick={() => zh && speak(zh.qZh)}
                        className="text-left hover:text-primary transition-colors"
                        title="Nghe / Listen"
                      >
                        {zh?.qZh ?? q.q}
                      </button>
                    </p>
                    <p className="text-xs text-muted-foreground italic pl-5">
                      → {t(q.qVi, q.q)}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const isSel = selected[qi] === oi;
                      const isCorrect = q.answer === oi;
                      let cls = "border-border hover:border-primary/50";
                      if (submitted) {
                        if (isCorrect) cls = "border-green-500 bg-green-500/10";
                        else if (isSel) cls = "border-red-500 bg-red-500/10";
                      } else if (isSel) {
                        cls = "border-primary bg-primary/10";
                      }
                      const optZh = zh?.optionsZh?.[oi];
                      return (
                        <button
                          key={oi}
                          onClick={() => !submitted && setSelected(s => ({ ...s, [qi]: oi }))}
                          disabled={submitted}
                          className={`text-left px-3 py-2 rounded-lg border-2 text-sm transition-colors ${cls}`}
                        >
                          <div className="flex items-start gap-1.5">
                            <span className="font-semibold shrink-0">{String.fromCharCode(65 + oi)}.</span>
                            <div className="min-w-0">
                              <div className="font-medium text-foreground">{optZh ?? opt}</div>
                              <div className="text-[11px] text-muted-foreground italic mt-0.5">
                                → {t(q.optionsVi[oi], opt)}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <p className="text-xs text-muted-foreground italic pl-1">
                      💡 {t(q.explanationVi, q.explanation)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3">
            {!submitted ? (
              <Button onClick={() => setSubmitted(true)} disabled={Object.keys(selected).length < passage.questions.length}>
                {t("Nộp bài", "Submit")}
              </Button>
            ) : (
              <>
                <Badge className="text-base px-3 py-1 bg-gradient-to-r from-primary to-purple-600 text-white">
                  {score}/{passage.questions.length}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setSelected({}); }}>
                  {t("Làm lại", "Try again")}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LevelSection = ({ lvl, open, onToggle }: { lvl: ChineseReadingLevel; open: boolean; onToggle: () => void }) => {
  const { t } = useLanguage();
  return (
    <div className="mb-5">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${lvl.colorFrom} ${lvl.colorTo} text-white shadow-md hover:shadow-lg transition-shadow`}
        aria-expanded={open}
      >
        <img src={lvl.chibi} alt="" loading="lazy" width={56} height={56} className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 drop-shadow" />
        <span className="text-2xl font-black">HSK {lvl.level}</span>
        <div className="text-left flex-1">
          <p className="font-bold text-base sm:text-lg leading-tight">{t(lvl.labelVi, lvl.label)}</p>
          <p className="text-xs sm:text-sm text-white/85 leading-snug">{t(lvl.descriptionVi, lvl.description)}</p>
        </div>
        <Badge className="bg-white/25 text-white border-white/30">{lvl.passages.length} {t("bài", "texts")}</Badge>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-5 pt-5">
              {lvl.passages.map(p => <PassageCard key={p.id} passage={p} chibi={lvl.chibi} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChineseReading = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState<Record<number, boolean>>({ 1: true });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Luyện đọc tiếng Trung theo cấp độ HSK | HaiEduTech"
        description="Đọc hiểu tiếng Trung theo HSK 1-5 với Hanzi, Pinyin, dịch tiếng Việt và câu hỏi trắc nghiệm."
        path="/chinese/reading"
      />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/chinese" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-5">
          <ArrowLeft className="w-4 h-4" /> {t("Tiếng Trung", "Chinese")}
        </Link>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {t("Luyện đọc tiếng Trung", "Chinese Reading Practice")}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {t(
              "25 bài đọc theo cấp độ từ HSK 1 đến HSK 5 - kèm Pinyin, dịch tiếng Việt, từ mới, câu hỏi trắc nghiệm và chibi minh hoạ vui.",
              "25 graded passages from HSK 1 to HSK 5 - with Pinyin, Vietnamese translation, vocabulary, quiz questions and cute chibi illustrations."
            )}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            {t("Mở/đóng từng cấp độ - bật Pinyin/dịch tuỳ ý", "Toggle Pinyin & translation freely")}
          </div>
        </motion.div>

        {chineseReadingLevels.map(lvl => (
          <LevelSection
            key={lvl.level}
            lvl={lvl}
            open={open[lvl.level] !== false && !!open[lvl.level]}
            onToggle={() => setOpen(s => ({ ...s, [lvl.level]: !s[lvl.level] }))}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default ChineseReading;
