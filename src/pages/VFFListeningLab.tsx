/**
 * @file VFFListeningLab.tsx
 * @description Structured listening practice with variable speed and gap-fill.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, Play, CheckCircle2, XCircle, Headphones, Gauge } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { vffListeningBank, ListeningExercise } from "@/data/vietnamese/vffListeningBank";
import { playVietnameseTts } from "@/lib/vietnameseTts";

const SPEEDS = [0.75, 1, 1.25] as const;

const Exercise = ({ ex }: { ex: ListeningExercise }) => {
  const { t } = useLanguage();
  const [speed, setSpeed] = useState<number>(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [gap, setGap] = useState<Record<number, string>>({});
  const [gapChecked, setGapChecked] = useState(false);
  const [compAns, setCompAns] = useState<Record<number, number>>({});
  const [compChecked, setCompChecked] = useState(false);

  const speak = (text: string) => {
    playVietnameseTts(text, { playbackRate: speed, speechRate: speed * 0.9 }).catch(() => {});
  };
  const playAll = () => {
    ex.lines.forEach((l, i) => setTimeout(() => speak(l.vi), i * (2600 / speed)));
  };
  const compScore = useMemo(() => {
    let s = 0;
    ex.comprehension.forEach((q, i) => { if (compAns[i] === q.answer) s++; });
    return Math.round((s / ex.comprehension.length) * 100);
  }, [compAns, ex.comprehension]);

  return (
    <Card className="border-2 border-primary/20">
      <CardContent className="pt-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <Badge className="mb-1">{ex.level}</Badge>
            <h3 className="font-bold text-lg">{t(ex.title, ex.titleEn)}</h3>
            <p className="text-xs text-muted-foreground">{ex.scenario}</p>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            {SPEEDS.map(s => (
              <button key={s} onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded text-xs font-mono border ${speed === s ? "bg-primary text-primary-foreground border-primary" : "border-muted"}`}>
                {s}x
              </button>
            ))}
          </div>
        </div>

        <Button onClick={playAll} className="w-full bg-gradient-to-r from-primary to-emerald-500 text-white">
          <Play className="w-4 h-4 mr-2" />{t("Phát toàn bộ hội thoại", "Play full dialogue")}
        </Button>

        {/* Gap-fill */}
        <div className="rounded-lg border border-primary/20 p-3 space-y-3 bg-primary/5">
          <div className="text-sm font-bold">{t("Điền vào chỗ trống khi nghe", "Fill in the gaps as you listen")}</div>
          {ex.gapFill.map((g, i) => (
            <div key={i}>
              <div className="text-sm mb-1">{i + 1}. {g.sentence.replace("___", "________")}</div>
              <Input value={gap[i] ?? ""} onChange={e => setGap(a => ({ ...a, [i]: e.target.value }))}
                placeholder={g.hint} disabled={gapChecked} className="h-8" />
              {gapChecked && (
                <div className={`text-xs mt-1 ${gap[i]?.trim().toLowerCase() === g.answer.toLowerCase() ? "text-emerald-600" : "text-red-500"}`}>
                  {gap[i]?.trim().toLowerCase() === g.answer.toLowerCase() ? "✓ " : "✗ "} {g.answer}
                </div>
              )}
            </div>
          ))}
          {!gapChecked && (
            <Button size="sm" variant="outline" onClick={() => setGapChecked(true)}>{t("Chấm điền từ", "Check gaps")}</Button>
          )}
        </div>

        {/* Transcript */}
        <div>
          <Button variant="ghost" size="sm" onClick={() => setShowTranscript(v => !v)}>
            {showTranscript ? t("Ẩn transcript", "Hide transcript") : t("Hiện transcript", "Show transcript")}
          </Button>
          {showTranscript && (
            <div className="mt-2 space-y-2">
              {ex.lines.map((l, i) => (
                <div key={i} className={`p-2 rounded text-sm ${i % 2 === 0 ? "bg-muted/40" : "bg-primary/5"}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground">{l.speaker}:</span>
                    <span className="font-medium flex-1">{l.vi}</span>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => speak(l.vi)}><Volume2 className="w-3 h-3" /></Button>
                  </div>
                  <div className="text-xs text-muted-foreground italic ml-2">{l.en}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comprehension */}
        <div className="rounded-lg border border-emerald-500/30 p-3 bg-emerald-500/5 space-y-3">
          <div className="text-sm font-bold">{t("Câu hỏi hiểu", "Comprehension questions")}</div>
          {ex.comprehension.map((q, i) => (
            <div key={i}>
              <div className="text-sm font-semibold mb-1">{i + 1}. {q.q}</div>
              <div className="grid grid-cols-3 gap-2">
                {q.options.map((opt, oi) => {
                  const chosen = compAns[i] === oi;
                  const correct = compChecked && oi === q.answer;
                  const wrong = compChecked && chosen && oi !== q.answer;
                  return (
                    <button key={oi} onClick={() => !compChecked && setCompAns(a => ({ ...a, [i]: oi }))}
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
          {!compChecked ? (
            <Button size="sm" onClick={() => setCompChecked(true)} disabled={Object.keys(compAns).length !== ex.comprehension.length}>
              {t("Chấm điểm", "Check answers")}
            </Button>
          ) : (
            <div className="text-center text-lg font-bold text-primary">{compScore}%</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const VFFListeningLab = () => {
  const { t } = useLanguage();
  const [levelFilter, setLevelFilter] = useState<"all" | "A1" | "A2" | "B1">("all");
  const filtered = vffListeningBank.filter(e => levelFilter === "all" || e.level === levelFilter);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Listening Lab | HaiEduTech" description="Practice Vietnamese listening with adjustable speed, gap-fill, and comprehension questions." path="/learn-vietnamese/for-foreigners/lab/listening" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>

          <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 to-sky-500/10 border border-blue-500/20 mb-6">
            <Headphones className="w-10 h-10 text-blue-500 mb-2" />
            <h1 className="text-3xl font-bold mb-1">{t("Phòng luyện nghe", "Listening Lab")}</h1>
            <p className="text-muted-foreground">
              {t("Bài nghe có transcript, 3 tốc độ, điền từ và câu hỏi hiểu.", "Dialogues with transcript, 3 speeds, gap-fill, and comprehension.")}
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            {(["all", "A1", "A2", "B1"] as const).map(l => (
              <Button key={l} size="sm" variant={levelFilter === l ? "default" : "outline"} onClick={() => setLevelFilter(l)}>
                {l === "all" ? t("Tất cả", "All") : l}
              </Button>
            ))}
          </div>

          <div className="space-y-5">
            {filtered.map(e => <Exercise key={e.id} ex={e} />)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFListeningLab;
