/**
 * @file VFFVideoLounge.tsx
 * @description Culture videos with bilingual transcripts, glossary, and quizzes.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Film, CheckCircle2, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VFF_VIDEO_BANK, VFFVideoClip } from "@/data/vietnamese/vffVideoBank";

const ClipCard = ({ clip }: { clip: VFFVideoClip }) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const correct = clip.quiz.filter((q, i) => answers[i] === q.answer).length;

  return (
    <Card className="border-2">
      <CardContent className="pt-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge>{clip.level}</Badge>
          <Badge variant="outline">{clip.topic}</Badge>
        </div>
        <h3 className="text-xl font-bold mb-3">{t(clip.titleVi, clip.title)}</h3>
        <div className="aspect-video mb-4 rounded-lg overflow-hidden border bg-muted">
          {videoUnavailable ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <Film className="h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">{t("Video không phát được trong trang này.", "This video cannot play inside this page.")}</p>
              <Button asChild variant="outline">
                <a href={`https://www.youtube.com/watch?v=${clip.youtubeId}`} target="_blank" rel="noreferrer">
                  {t("Mở trên YouTube", "Open on YouTube")} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          ) : (
            <iframe className="w-full h-full" src={`https://www.youtube-nocookie.com/embed/${clip.youtubeId}`} title={clip.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowFullScreen onError={() => setVideoUnavailable(true)} />
          )}
        </div>
        {!videoUnavailable && (
          <a className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline" href={`https://www.youtube.com/watch?v=${clip.youtubeId}`} target="_blank" rel="noreferrer">
            {t("Mở video trên YouTube", "Open video on YouTube")} <ExternalLink className="h-4 w-4" />
          </a>
        )}

        <details className="mb-3">
          <summary className="cursor-pointer text-sm font-semibold">📝 {t("Lời thoại (VI + EN)", "Transcript (VI + EN)")}</summary>
          <div className="mt-2 space-y-2 pl-2">
            {clip.transcript.map((row, i) => (
              <div key={i} className="text-sm">
                <span className="text-xs text-muted-foreground mr-2">{row.t}s</span>
                <span className="font-medium">{row.vi}</span>
                <span className="text-muted-foreground italic ml-2">- {row.en}</span>
              </div>
            ))}
          </div>
        </details>

        <details className="mb-3">
          <summary className="cursor-pointer text-sm font-semibold">📚 {t("Từ vựng", "Glossary")}</summary>
          <ul className="mt-2 text-sm space-y-1 pl-4 list-disc">
            {clip.glossary.map((g, i) => (
              <li key={i}><strong>{g.vi}</strong> {g.ipa && <span className="text-xs text-muted-foreground">{g.ipa}</span>} - <span className="text-muted-foreground">{g.en}</span></li>
            ))}
          </ul>
        </details>

        <div className="mt-4 space-y-3">
          <div className="text-sm font-semibold">❓ {t("Câu hỏi", "Comprehension")}</div>
          {clip.quiz.map((q, qi) => (
            <div key={qi}>
              <div className="text-sm mb-1.5">{qi + 1}. {q.q}</div>
              <div className="flex flex-wrap gap-1.5">
                {q.choices.map((c, ci) => {
                  const picked = answers[qi] === ci;
                  const right = checked && ci === q.answer;
                  const wrong = checked && picked && ci !== q.answer;
                  return (
                    <button key={ci} disabled={checked} onClick={() => { const n = [...answers]; n[qi] = ci; setAnswers(n); }}
                      className={`text-xs px-2.5 py-1 rounded border-2 ${right ? "border-emerald-500 bg-emerald-500/10" : wrong ? "border-red-500 bg-red-500/10" : picked ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"}`}>
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {!checked ? (
            <Button size="sm" onClick={() => setChecked(true)} disabled={answers.length < clip.quiz.length}>{t("Kiểm tra", "Check")}</Button>
          ) : (
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />{correct}/{clip.quiz.length} {t("đúng", "correct")}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const VFFVideoLounge = () => {
  const { t } = useLanguage();
  return (
    <div className="vietnamese-readable min-h-screen bg-background">
      <SEO title="Vietnamese Video Immersion | HaiEduTech" description="Watch Vietnamese culture clips with bilingual transcripts, glossary, and comprehension quizzes." path="/learn-vietnamese/for-foreigners/lab/video" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20 mb-6">
            <Film className="w-10 h-10 text-amber-600 mb-2" />
            <h1 className="text-3xl font-bold mb-1">{t("Xem để học - Video văn hóa", "Video Immersion")}</h1>
            <p className="text-muted-foreground">{t("Xem video thực tế, đọc lời thoại song ngữ, làm quiz kiểm tra.", "Watch authentic clips, read bilingual transcripts, take comprehension quizzes.")}</p>
          </div>
          <div className="space-y-6">
            {VFF_VIDEO_BANK.map(c => <ClipCard key={c.id} clip={c} />)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFVideoLounge;
