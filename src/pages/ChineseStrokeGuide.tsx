/**
 * @file ChineseStrokeGuide.tsx
 * @description Chinese stroke order guide - 8 basic strokes, 7 stroke-order rules,
 * animated practice sets, free character lookup and a stroke-order quiz.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, CheckCircle2, XCircle, RefreshCw, ArrowRight, PenLine, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import HanziStrokeOrder from "@/components/HanziStrokeOrder";
import { useLanguage } from "@/contexts/LanguageContext";
import { playChineseTts, stopChineseTts } from "@/lib/chineseTts";
import {
  basicStrokes,
  strokeRules,
  practiceSets,
  strokeQuizzes,
  type PracticeChar,
} from "@/data/chineseStrokes";
import { safeStorage } from "@/lib/safeStorage";

const STORAGE_KEY = "chinese-stroke-progress";

const speak = (text: string) => {
  stopChineseTts();
  void playChineseTts(text, { playbackRate: 0.85, speechRate: 0.65 });
};

const CharCard = ({ char, meta, size = 120 }: { char: string; meta?: PracticeChar; size?: number }) => {
  const { t } = useLanguage();
  return (
    <div className="rounded-xl border border-border bg-card/70 p-3 flex flex-col items-center gap-2">
      <HanziStrokeOrder character={char} size={size} compact />
      {meta && (
        <div className="text-center">
          <p className="text-base font-semibold text-primary">{meta.pinyin}</p>
          <p className="text-base text-muted-foreground">{t(meta.meaningVi, meta.meaningEn)}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {meta.strokes} {t("nét", "strokes")}
          </p>
        </div>
      )}
      <Button size="sm" variant="secondary" onClick={() => speak(char)} className="gap-1.5">
        <Volume2 className="w-4 h-4" /> {t("Nghe", "Listen")}
      </Button>
    </div>
  );
};

const Quiz = ({ onScore }: { onScore: (score: number) => void }) => {
  const { t, lang } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = strokeQuizzes[idx];
  const options = lang === "vi" ? q.options : (q.optionsEn ?? q.options);

  const next = () => {
    if (picked === null) return;
    const gained = picked === q.answer ? 1 : 0;
    const newScore = score + gained;
    setScore(newScore);
    setPicked(null);
    if (idx + 1 >= strokeQuizzes.length) {
      setDone(true);
      onScore(newScore);
    } else {
      setIdx(idx + 1);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="text-center py-8">
        <p className="text-3xl font-bold text-primary mb-2">
          {score}/{strokeQuizzes.length}
        </p>
        <p className="text-base text-muted-foreground mb-4">
          {score >= strokeQuizzes.length * 0.8
            ? t("Tuyệt vời, bạn đã nắm chắc quy tắc nét bút!", "Excellent, you know the stroke rules well!")
            : t("Hãy xem lại các quy tắc phía trên rồi thử lại nhé.", "Review the rules above and try again.")}
        </p>
        <Button onClick={restart} className="gap-2">
          <RefreshCw className="w-4 h-4" /> {t("Làm lại", "Try again")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Badge variant="secondary">
          {t("Câu", "Question")} {idx + 1}/{strokeQuizzes.length}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {t("Điểm", "Score")}: {score}
        </span>
      </div>
      <p className="text-base sm:text-lg font-semibold text-foreground mb-4">{t(q.questionVi, q.questionEn)}</p>
      <div className="grid gap-2">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const revealed = picked !== null;
          const correct = i === q.answer;
          return (
            <button
              key={i}
              onClick={() => picked === null && setPicked(i)}
              disabled={revealed}
              className={`text-left px-4 py-3 rounded-xl border text-base transition-colors ${
                revealed && correct
                  ? "border-emerald-500 bg-emerald-500/10"
                  : isPicked
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-card hover:bg-primary/5"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {revealed && correct && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {revealed && isPicked && !correct && <XCircle className="w-4 h-4 text-destructive" />}
                {opt}
              </span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-4 p-3 rounded-xl bg-secondary/60 border border-border">
          <p className="text-base text-muted-foreground whitespace-pre-wrap">{t(q.explainVi, q.explainEn)}</p>
        </div>
      )}
      <Button onClick={next} disabled={picked === null} className="mt-4 gap-2">
        {idx + 1 >= strokeQuizzes.length ? t("Xem kết quả", "See result") : t("Câu tiếp theo", "Next question")}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

const ChineseStrokeGuide = () => {
  const { t } = useLanguage();
  const [activeSet, setActiveSet] = useState(practiceSets[0].id);
  const [lookup, setLookup] = useState("");
  const [bestScore, setBestScore] = useState<number>(() => safeStorage.get<number>(STORAGE_KEY, 0) ?? 0);

  const currentSet = useMemo(
    () => practiceSets.find((s) => s.id === activeSet) ?? practiceSets[0],
    [activeSet]
  );

  const lookupChar = useMemo(() => {
    const match = lookup.match(/[\u4e00-\u9fff]/);
    return match ? match[0] : "";
  }, [lookup]);

  const handleScore = useCallback(
    (score: number) => {
      setBestScore((prev) => {
        const next = Math.max(prev, score);
        safeStorage.set(STORAGE_KEY, next);
        return next;
      });
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hướng dẫn nét bút chữ Hán | HaiEduTech"
        description="Học thứ tự nét chữ Hán: 8 nét cơ bản, 7 quy tắc viết, hoạt ảnh nét bút cho từng chữ và quiz kiểm tra."
      />
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Badge className="mb-3 bg-amber-500/15 text-amber-600 border-amber-500/30">
              ✍️ {t("Chữ Hán", "Chinese characters")}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
              {t("Hướng dẫn nét bút chữ Hán", "Chinese Stroke Order Guide")}
            </h1>
            <p className="text-base text-muted-foreground max-w-3xl">
              {t(
                "Nắm 8 nét cơ bản và 7 quy tắc thứ tự nét, xem hoạt ảnh viết từng chữ và kiểm tra lại bằng quiz. Bấm vào mỗi chữ để xem lại nét bút.",
                "Master the 8 basic strokes and 7 ordering rules, watch each character being written, then check yourself with a quiz. Click a character to replay its strokes."
              )}
            </p>
            {bestScore > 0 && (
              <p className="text-sm text-emerald-600 mt-2">
                {t("Điểm quiz tốt nhất", "Best quiz score")}: {bestScore}/{strokeQuizzes.length}
              </p>
            )}
          </motion.div>

          {/* 8 basic strokes */}
          <section className="glass-card rounded-2xl p-5 sm:p-7 mb-8 border border-border">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <PenLine className="w-5 h-5 text-primary" /> {t("8 nét cơ bản", "The 8 basic strokes")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-3 text-sm font-semibold text-muted-foreground">{t("Nét", "Stroke")}</th>
                    <th className="py-2 pr-3 text-sm font-semibold text-muted-foreground">{t("Tên", "Name")}</th>
                    <th className="py-2 pr-3 text-sm font-semibold text-muted-foreground">{t("Cách viết", "How to write")}</th>
                    <th className="py-2 pr-3 text-sm font-semibold text-muted-foreground">{t("Chữ ví dụ", "Examples")}</th>
                  </tr>
                </thead>
                <tbody>
                  {basicStrokes.map((s) => (
                    <tr key={s.nameZh} className="border-b border-border/50 last:border-0 hover:bg-primary/5">
                      <td className="py-3 pr-3 text-3xl font-bold text-primary">{s.glyph}</td>
                      <td className="py-3 pr-3 align-top min-w-[130px]">
                        <p className="text-base font-semibold text-foreground">
                          {s.nameZh} <span className="text-primary">{s.pinyin}</span>
                        </p>
                        <p className="text-base text-muted-foreground">{t(s.nameVi, s.nameEn)}</p>
                      </td>
                      <td className="py-3 pr-3 align-top text-base text-muted-foreground min-w-[220px]">
                        {t(s.howVi, s.howEn)}
                      </td>
                      <td className="py-3 pr-3 align-top">
                        <div className="flex flex-wrap gap-1.5">
                          {s.examples.map((ex) => (
                            <button
                              key={ex}
                              onClick={() => speak(ex)}
                              className="px-2.5 py-1 rounded-lg border border-border bg-card text-xl hover:bg-primary/10 transition-colors"
                              title={t("Nghe phát âm", "Listen")}
                            >
                              {ex}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 7 rules */}
          <section className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              {t("7 quy tắc thứ tự nét", "The 7 stroke-order rules")}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {strokeRules.map((rule, i) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="glass-card rounded-2xl p-5 border border-border"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{t(rule.titleVi, rule.titleEn)}</h3>
                    <Badge variant="secondary" className="ml-auto text-base">{rule.ruleZh}</Badge>
                  </div>
                  <p className="text-base text-muted-foreground mb-4">{t(rule.explainVi, rule.explainEn)}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {rule.examples.map((ex) => (
                      <CharCard
                        key={ex.char}
                        char={ex.char}
                        size={92}
                        meta={{
                          char: ex.char,
                          pinyin: ex.pinyin,
                          meaningVi: ex.meaningVi,
                          meaningEn: ex.meaningEn,
                          strokes: ex.strokes,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Practice sets */}
          <section className="glass-card rounded-2xl p-5 sm:p-7 mb-8 border border-border">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              {t("Luyện viết theo nhóm chữ", "Practice by character set")}
            </h2>
            <div className="flex flex-wrap gap-2 mb-5">
              {practiceSets.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSet(s.id)}
                  className={`px-4 py-2 rounded-xl text-base font-semibold border transition-colors ${
                    activeSet === s.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:bg-primary/5"
                  }`}
                >
                  {s.emoji} {t(s.titleVi, s.titleEn)}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentSet.chars.map((c) => (
                <CharCard key={c.char} char={c.char} meta={c} />
              ))}
            </div>
          </section>

          {/* Free lookup */}
          <section className="glass-card rounded-2xl p-5 sm:p-7 mb-8 border border-border">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" /> {t("Tra nét bút bất kỳ chữ nào", "Look up any character")}
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              {t("Gõ hoặc dán một chữ Hán để xem hoạt ảnh nét bút.", "Type or paste a Chinese character to watch its stroke animation.")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Input
                value={lookup}
                onChange={(e) => setLookup(e.target.value)}
                placeholder={t("Ví dụ: 爱", "For example: 爱")}
                className="max-w-[220px] text-base"
              />
              {lookupChar && (
                <Button variant="secondary" onClick={() => speak(lookupChar)} className="gap-1.5">
                  <Volume2 className="w-4 h-4" /> {t("Nghe", "Listen")}
                </Button>
              )}
            </div>
            {lookupChar ? (
              <div className="mt-5 w-fit">
                <HanziStrokeOrder key={lookupChar} character={lookupChar} size={180} />
              </div>
            ) : (
              lookup.trim().length > 0 && (
                <p className="mt-4 text-base text-muted-foreground">
                  {t("Chưa tìm thấy chữ Hán trong ô nhập.", "No Chinese character found in your input.")}
                </p>
              )
            )}
          </section>

          {/* Quiz */}
          <section className="glass-card rounded-2xl p-5 sm:p-7 mb-8 border border-border">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              {t("Quiz thứ tự nét", "Stroke-order quiz")}
            </h2>
            <Quiz onScore={handleScore} />
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/chinese/pronunciation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold hover:brightness-110 transition-all"
            >
              🔊 {t("Học phát âm Pinyin", "Pinyin pronunciation")} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/chinese/hsk/vocabulary"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground font-semibold border border-border hover:bg-primary/5 transition-all"
            >
              📖 {t("HSK Vocabulary", "HSK Vocabulary")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChineseStrokeGuide;
