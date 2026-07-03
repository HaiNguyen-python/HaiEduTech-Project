/**
 * @file VFFReadingLab.tsx
 * @description Graded reading with translation toggle, glossary, and comprehension.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Languages, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { vffReadingBank, ReadingPassage } from "@/data/vietnamese/vffReadingBank";

const Passage = ({ p }: { p: ReadingPassage }) => {
  const { t } = useLanguage();
  const [showTrans, setShowTrans] = useState(false);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const score = useMemo(() => {
    let s = 0;
    p.questions.forEach((q, i) => { if (ans[i] === q.answer) s++; });
    return Math.round((s / p.questions.length) * 100);
  }, [ans, p.questions]);

  return (
    <Card className="border-2 border-primary/20">
      <CardContent className="pt-5 space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <Badge className="mb-1">{p.level}</Badge>
            <h3 className="font-bold text-lg">{t(p.title, p.titleEn)}</h3>
            <div className="text-xs text-muted-foreground">{p.wordCount} {t("từ", "words")}</div>
          </div>
          <Button size="sm" variant="outline" onClick={() => setShowTrans(v => !v)}>
            <Languages className="w-3.5 h-3.5 mr-1" />
            {showTrans ? t("Ẩn dịch", "Hide translation") : t("Xem dịch", "Show translation")}
          </Button>
        </div>

        <div className="rounded-lg bg-primary/5 border border-primary/15 p-4">
          <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">{p.passage}</div>
          {showTrans && (
            <div className="mt-3 pt-3 border-t border-primary/15 whitespace-pre-wrap text-xs text-muted-foreground italic">{p.translation}</div>
          )}
        </div>

        <div>
          <div className="text-xs font-bold mb-1 uppercase text-muted-foreground">{t("Từ vựng", "Glossary")}</div>
          <div className="flex flex-wrap gap-1.5">
            {p.glossary.map((g, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted border">
                <span className="font-semibold text-primary">{g.word}</span> - {g.en}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-emerald-500/30 p-3 bg-emerald-500/5 space-y-3">
          <div className="text-sm font-bold">{t("Câu hỏi hiểu", "Comprehension")}</div>
          {p.questions.map((q, i) => (
            <div key={i}>
              <div className="text-sm font-semibold mb-1">{i + 1}. {q.q}</div>
              <div className="grid grid-cols-3 gap-2">
                {q.options.map((opt, oi) => {
                  const chosen = ans[i] === oi;
                  const correct = checked && oi === q.answer;
                  const wrong = checked && chosen && oi !== q.answer;
                  return (
                    <button key={oi} onClick={() => !checked && setAns(a => ({ ...a, [i]: oi }))}
                      className={`p-2 rounded text-xs border-2 ${
                        correct ? "border-emerald-500 bg-emerald-500/10" :
                        wrong ? "border-red-500 bg-red-500/10" :
                        chosen ? "border-primary bg-primary/10" : "border-muted hover:border-primary/40"
                      }`}>
                      {opt}
                      {correct && <CheckCircle2 className="inline w-3 h-3 ml-1 text-emerald-500" />}
                      {wrong && <XCircle className="inline w-3 h-3 ml-1 text-red-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {!checked ? (
            <Button size="sm" onClick={() => setChecked(true)} disabled={Object.keys(ans).length !== p.questions.length}>
              {t("Chấm điểm", "Check answers")}
            </Button>
          ) : (
            <div className="text-center text-lg font-bold text-primary">{score}%</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const VFFReadingLab = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState<"all" | "A1" | "A2" | "B1">("all");
  const filtered = vffReadingBank.filter(p => level === "all" || p.level === level);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Reading Lab | HaiEduTech" description="Graded Vietnamese reading passages A1-B1 with glossary, translation and comprehension." path="/learn-vietnamese/for-foreigners/lab/reading" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6">
            <BookOpen className="w-10 h-10 text-amber-600 mb-2" />
            <h1 className="text-3xl font-bold mb-1">{t("Phòng luyện đọc", "Reading Lab")}</h1>
            <p className="text-muted-foreground">{t("Bài đọc phân cấp A1-B1 với từ vựng, dịch và câu hỏi.", "Graded A1-B1 passages with glossary, translation, and comprehension.")}</p>
          </div>
          <div className="flex gap-2 mb-4">
            {(["all", "A1", "A2", "B1"] as const).map(l => (
              <Button key={l} size="sm" variant={level === l ? "default" : "outline"} onClick={() => setLevel(l)}>
                {l === "all" ? t("Tất cả", "All") : l}
              </Button>
            ))}
          </div>
          <div className="space-y-5">
            {filtered.map(p => <Passage key={p.id} p={p} />)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFReadingLab;
