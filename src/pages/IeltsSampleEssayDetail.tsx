// IELTS Sample Essay Detail - Full essay with glossary, review exercise, and confetti celebration
import { Fragment, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sampleEssays } from "@/data/ieltsSampleEssays";
import IELTSChart from "@/components/IELTSChart";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle, XCircle, RotateCcw, Download, Sparkles, ChevronDown } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import confetti from "canvas-confetti";
import SEO from "@/components/SEO";
import EssayBand8Analysis from "@/components/ielts/EssayBand8Analysis";
import GlossaryPhrasePractice from "@/components/ielts/GlossaryPhrasePractice";
import EssayOutline from "@/components/ielts/EssayOutline";
import ClickRevealEssay from "@/components/ielts/ClickRevealEssay";

const IeltsSampleEssayDetail = () => {
  const { essayId } = useParams();
  const { t } = useLanguage();
  const essay = sampleEssays.find(e => e.id === essayId);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Fire confetti for perfect score
  const fireConfetti = useCallback(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
    setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.6 } }), 300);
  }, []);

  if (!essay) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">{t("Không tìm thấy bài mẫu.", "Essay not found.")}</p>
          <Link to="/ielts-sample-essays" className="text-primary hover:underline mt-4 inline-block">
            ← {t("Quay lại", "Go back")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Render essay body with **bold** terms and paragraph breaks
  const renderEssayBody = (text: string) => {
    const paragraphs = text.split("\n\n");
    return paragraphs.map((para, pIdx) => {
      const parts = para.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={pIdx} className="mb-4 last:mb-0">
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="text-primary font-semibold">{part}</strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      );
    });
  };

  // Extract the first full sentence from the essay body that contains the given term
  const findFullSentence = (body: string, term: string): string => {
    const clean = body.replace(/\*\*/g, "").replace(/\n+/g, " ");
    const sentences = clean.match(/[^.!?]+[.!?]+/g) || [];
    const found = sentences.find((s) => s.toLowerCase().includes(term.toLowerCase()));
    return (found || "").trim();
  };

  // Render a sentence with the glossary term bolded (case-insensitive, first match)
  const renderSentenceWithTermBolded = (sentence: string, term: string) => {
    if (!sentence) return null;
    const idx = sentence.toLowerCase().indexOf(term.toLowerCase());
    if (idx === -1) return <>{sentence}</>;
    const before = sentence.slice(0, idx);
    const match = sentence.slice(idx, idx + term.length);
    const after = sentence.slice(idx + term.length);
    return (
      <>
        {before}
        <strong className="font-bold text-primary">{match}</strong>
        {after}
      </>
    );
  };

  // Build a topic illustration URL (Pollinations free image CDN) for Task 2 essays
  const topicImageUrl = (topic: string) =>
    `https://image.pollinations.ai/prompt/${encodeURIComponent(
      `A clean editorial flat illustration representing the theme: ${topic}. Modern, soft pastel palette, no text, no watermark.`
    )}?width=1200&height=480&nologo=true&seed=42`;

  const score = essay.reviewExercise.items.reduce(
    (acc, item, i) => acc + (answers[i]?.trim().toLowerCase() === item.answer.toLowerCase() ? 1 : 0), 0
  );

  const isPerfect = score === essay.reviewExercise.items.length;

  const handleSubmit = () => {
    setSubmitted(true);
    const newScore = essay.reviewExercise.items.reduce(
      (acc, item, i) => acc + (answers[i]?.trim().toLowerCase() === item.answer.toLowerCase() ? 1 : 0), 0
    );
    if (newScore === essay.reviewExercise.items.length) {
      setTimeout(fireConfetti, 300);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // PDF download handler
  const handleDownloadPDF = () => {
    const html = `
      <html><head><title>${essay.topic} - IELTS Sample Essay</title>
      <style>body{font-family:'Georgia',serif;max-width:700px;margin:40px auto;padding:20px;line-height:1.8;color:#1a1a1a}
      h1{font-size:20px;color:#3B82F6}h2{font-size:16px;margin-top:24px;color:#10B981}
      .badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:12px;background:#e0f2fe;color:#1e40af;margin-right:6px}
      table{width:100%;border-collapse:collapse;margin:12px 0}td,th{border:1px solid #ddd;padding:8px;text-align:left;font-size:13px}
      th{background:#f1f5f9}strong{color:#3B82F6}.prompt{background:#f8fafc;padding:16px;border-left:4px solid #3B82F6;margin:16px 0;font-style:italic}
      p{margin-bottom:12px}
      </style></head><body>
      <h1>📝 ${essay.topic}</h1>
      <span class="badge">Task ${essay.taskType}</span>
      <span class="badge">${essay.chartType || essay.essayType}</span>
      <div class="prompt">${essay.prompt}</div>
      <h2>📖 Sample Essay (Band 8.0+)</h2>
      <div>${essay.essayBody.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
      <h2>📚 Bilingual Glossary</h2>
      <table><tr><th>Term</th><th>Vietnamese</th><th>Context</th></tr>
      ${essay.glossary.map(g => `<tr><td><strong>${g.term}</strong></td><td>${g.vietnamese}</td><td>${g.context}</td></tr>`).join('')}
      </table>
      <p style="text-align:center;color:#999;margin-top:30px;font-size:11px">HaiEduTech - The Unique Intersection of Language & Technology</p>
      </body></html>`;
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); w.print(); }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`IELTS Task ${essay.taskType} Sample: ${essay.topic}`}
        description={`Band 8.0+ IELTS Writing Task ${essay.taskType} sample essay on "${essay.topic}". Includes bilingual glossary and review exercise.`}
        path={`/ielts-sample-essays/${essay.id}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `IELTS Task ${essay.taskType} Sample: ${essay.topic}`,
          inLanguage: "en-US",
          author: { "@type": "Person", name: "Hai Nguyen" },
          publisher: { "@type": "Organization", name: "HaiEduTech", logo: { "@type": "ImageObject", url: "https://haiedutech.com/favicon.png" } },
          mainEntityOfPage: `https://haiedutech.com/ielts-sample-essays/${essay.id}`,
          about: essay.topic,
        }}
      />
      <Navbar />
      <main className="container mx-auto px-4 py-5 max-w-4xl">
        {/* Back link */}
        <Link to="/ielts-sample-essays" className="text-sm text-primary hover:underline inline-flex items-center gap-1 mb-3">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại danh sách", "Back to list")}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant={essay.taskType === 1 ? "secondary" : "default"}>Task {essay.taskType}</Badge>
              <Badge variant="outline" className="capitalize">{essay.chartType || essay.essayType}</Badge>
              <Badge variant="outline">Band 8.0+</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground capitalize">{essay.topic}</h1>
          </div>

          {/* Topic (Prompt) */}
          <div className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-3">
            <p className="text-sm font-medium text-primary mb-0.5">{t("Chủ đề", "Topic")}</p>
            <p className="text-foreground leading-relaxed">{essay.prompt}</p>
          </div>

          {/* Topic illustration for Task 2 essays */}
          {essay.taskType === 2 && (
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card/30">
              <img
                src={topicImageUrl(essay.topic)}
                alt={`Illustration for IELTS Task 2 topic: ${essay.topic}`}
                loading="lazy"
                className="w-full h-48 md:h-60 object-cover"
              />
            </div>
          )}

          {/* Dynamic Chart/Diagram for Task 1 */}
          {essay.taskType === 1 && essay.chartConfig && (
            <IELTSChart config={essay.chartConfig} />
          )}

          {/* Outline - structure & key ideas (collapsible) */}
          <details className="glass-card rounded-xl border border-border/40 overflow-hidden group transition-shadow hover:shadow-lg [&[open]>summary]:border-b [&[open]>summary]:border-border/30" open>
            <summary className="cursor-pointer flex items-center justify-between gap-3 list-none px-4 py-3 md:px-5 md:py-4 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                🗂️ {t("Dàn ý & Cấu trúc", "Outline & Structure")}
              </h2>
              <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
            </summary>
            <div className="px-4 pb-4 pt-3 md:px-5"><EssayOutline essay={essay} /></div>
          </details>

          {/* Full essay reference with click-to-reveal teaching mode */}
          <details className="glass-card rounded-xl border border-border/40 overflow-hidden group transition-shadow hover:shadow-lg [&[open]>summary]:border-b [&[open]>summary]:border-border/30" open>
            <summary className="cursor-pointer flex items-center justify-between gap-3 list-none px-4 py-3 md:px-5 md:py-4 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                {t("Xem toàn bộ bài mẫu (Band 8.0+)", "View full sample essay (Band 8.0+)")}
              </h2>
              <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
            </summary>
            <div className="px-4 pb-4 pt-3 md:px-5 space-y-4">
              {/* Re-display chart inside the essay viewer so students can follow the visual while reading */}
              {essay.taskType === 1 && essay.chartConfig && (
                <IELTSChart config={essay.chartConfig} />
              )}
              <ClickRevealEssay essayBody={essay.essayBody} taskType={essay.taskType} />
            </div>
            <div className="mt-3 flex justify-end">
              <Button size="sm" variant="outline" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-1" /> {t("Tải PDF", "Download PDF")}
              </Button>
            </div>
          </details>


          {/* Band 7.0+ Analysis - TA/TR, CC, LR, GRA (collapsible) */}
          <details className="glass-card rounded-xl border border-border/40 overflow-hidden group transition-shadow hover:shadow-lg [&[open]>summary]:border-b [&[open]>summary]:border-border/30">
            <summary className="cursor-pointer flex items-center justify-between gap-3 list-none px-4 py-3 md:px-5 md:py-4 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                📊 {t("Phân tích Band 8.0+ (TA/CC/LR/GRA)", "Band 8.0+ Analysis (TA/CC/LR/GRA)")}
              </h2>
              <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
            </summary>
            <div className="px-4 pb-4 pt-3 md:px-5"><EssayBand8Analysis essay={essay} /></div>
          </details>

          {/* Bilingual Glossary with per-phrase writing practice (collapsible) */}
          <details className="glass-card rounded-xl border border-border/40 overflow-hidden group transition-shadow hover:shadow-lg [&[open]>summary]:border-b [&[open]>summary]:border-border/30">
            <summary className="cursor-pointer flex items-center justify-between gap-3 list-none px-4 py-3 md:px-5 md:py-4 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                📚 {t("Bảng Chú Giải Song Ngữ", "Bilingual Glossary")}
              </h2>
              <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
            </summary>
            <p className="text-xs text-muted-foreground mb-2.5">
              {t(
                "Mỗi cụm từ có sẵn câu ví dụ hoàn chỉnh - hãy viết lại câu để vận dụng và được chấm điểm ngay.",
                "Each phrase comes with a complete example sentence - rewrite it below to apply the phrase and get instant feedback."
              )}
            </p>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold w-10">#</TableHead>
                    <TableHead className="font-semibold">Term</TableHead>
                    <TableHead className="font-semibold">{t("Nghĩa tiếng Việt", "Vietnamese")}</TableHead>
                    <TableHead className="font-semibold">{t("Câu ví dụ trong bài", "Example sentence")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {essay.glossary.map((g, i) => {
                    const fullSentence = findFullSentence(essay.essayBody, g.term) || g.context;
                    return (
                      <Fragment key={i}>
                        <TableRow className="border-b-0">
                          <TableCell className="align-top font-bold text-muted-foreground text-sm pb-2">{i + 1}.</TableCell>
                          <TableCell className="align-top min-w-[160px] pb-2">
                            <div className="font-medium text-primary">{g.term}</div>
                          </TableCell>
                          <TableCell className="align-top pb-2">{g.vietnamese}</TableCell>
                          <TableCell className="text-sm align-top min-w-[260px] pb-1.5">
                            <p className="text-foreground/90">{renderSentenceWithTermBolded(fullSentence, g.term)}</p>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4} className="pt-0 pb-3">
                            <GlossaryPhrasePractice
                              phrase={g.term}
                              phraseMeaning={g.vietnamese}
                              taskType={essay.taskType}
                            />
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </details>

          {/* Interactive Mini-Review Challenge (collapsible) */}
          <details className="glass-card rounded-xl border border-border/40 overflow-hidden group transition-shadow hover:shadow-lg [&[open]>summary]:border-b [&[open]>summary]:border-border/30">
            <summary className="cursor-pointer flex items-center justify-between gap-3 list-none px-4 py-3 md:px-5 md:py-4 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {t("Bài Tập Ôn Tập", "Mini-Review Challenge")}
              </h2>
              <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
            </summary>
            <h2 className="text-lg font-semibold text-foreground mb-1.5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {t("Bài Tập Ôn Tập", "Mini-Review Challenge")}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">{essay.reviewExercise.instruction}</p>

            <div className="space-y-5">
              {essay.reviewExercise.items.map((item, idx) => {
                const userAns = answers[idx] || "";
                const isCorrect = submitted && userAns.trim().toLowerCase() === item.answer.toLowerCase();
                const isWrong = submitted && !isCorrect;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="rounded-xl border border-border/50 bg-card/50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-bold text-muted-foreground w-6 shrink-0 mt-1">{idx + 1}.</span>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap text-sm leading-relaxed">
                          {item.sentence.split("___").map((part, pi, arr) => (
                            <span key={pi}>
                              {part}
                              {pi < arr.length - 1 && (
                                <input
                                  type="text"
                                  value={userAns}
                                  onChange={(e) => { if (!submitted) setAnswers(prev => ({ ...prev, [idx]: e.target.value })); }}
                                  disabled={submitted}
                                  placeholder="..."
                                  className={`inline-block w-36 px-3 py-1.5 mx-1 rounded-lg border text-center text-sm font-medium transition-all outline-none ${
                                    submitted
                                      ? isCorrect
                                        ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
                                        : "border-destructive bg-destructive/10 text-destructive"
                                      : "border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20"
                                  }`}
                                />
                              )}
                            </span>
                          ))}
                          {submitted && (
                            isCorrect
                              ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                              : <XCircle className="w-5 h-5 text-destructive shrink-0" />
                          )}
                        </div>

                        {/* Show explanation and correct answer after submission */}
                        <AnimatePresence>
                          {submitted && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              {isWrong && (
                                <p className="text-xs text-muted-foreground">
                                  ✅ {t("Đáp án", "Answer")}: <span className="font-bold text-primary">{item.answer}</span>
                                </p>
                              )}
                              {item.explanation && (
                                <p className="text-xs text-muted-foreground italic mt-0.5">
                                  💡 {item.explanation}
                                </p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 mt-6">
              {!submitted && Object.keys(answers).length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white font-semibold px-6"
                  >
                    {t("Nộp bài & Chấm điểm", "Submit & Grade")}
                  </Button>
                </motion.div>
              )}
              {submitted && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4"
                  >
                    <span className={`text-lg font-bold ${isPerfect ? "text-green-500" : score >= essay.reviewExercise.items.length / 2 ? "text-yellow-500" : "text-destructive"}`}>
                      {isPerfect && "🎉 "}{score}/{essay.reviewExercise.items.length} {t("đúng", "correct")}
                    </span>
                    {isPerfect && (
                      <span className="text-sm text-green-500 font-medium">
                        {t("Xuất sắc! Bạn đã nắm vững từ vựng!", "Excellent! You've mastered the vocabulary!")}
                      </span>
                    )}
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="w-3 h-3 mr-1" /> {t("Làm lại", "Retry")}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </details>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsSampleEssayDetail;
