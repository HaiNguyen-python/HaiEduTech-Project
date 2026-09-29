import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Globe, MessageCircle, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { allVietnameseConvLessons, getVietnameseConvLessonById, getVietnamesePillarByLessonId } from "@/data/vietnameseConversationalCurriculum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DialoguePlayAll from "@/components/conversational/DialoguePlayAll";
import { playVietnameseTts, stopVietnameseTts } from "@/lib/vietnameseTts";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { readVnProgress, VN_CONV_STORAGE_KEY } from "./VietnameseConversationalDashboard";

const playVi = (text: string) => playVietnameseTts(text, { playbackRate: 0.85, speechRate: 0.8 });
const speakVi = (text: string) => { stopVietnameseTts(); void playVi(text); };

const VietnameseConversationalLessonView = () => {
  const { lessonId = "" } = useParams();
  const { t } = useLanguage();
  const lesson = getVietnameseConvLessonById(lessonId);
  const pillar = getVietnamesePillarByLessonId(lessonId);
  const [playingLine, setPlayingLine] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  useEffect(() => { setAnswers({}); setChecked(false); window.scrollTo(0, 0); }, [lessonId]);

  if (!lesson || !pillar) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="mb-4 text-lg font-bold">{t("Không tìm thấy bài học", "Lesson not found")}</p>
          <Button asChild><Link to="/learn-vietnamese/conversational/curriculum">{t("Quay lại", "Back")}</Link></Button>
        </div><Footer /></div>
    );
  }

  const idx = allVietnameseConvLessons.findIndex((l) => l.id === lesson.id);
  const next = allVietnameseConvLessons[idx + 1];
  const score = lesson.quiz.filter((q, i) => answers[i] === q.answer).length;

  const checkQuiz = () => {
    setChecked(true);
    const pass = score / lesson.quiz.length >= 0.75;
    if (pass) {
      const done = readVnProgress();
      if (!done.includes(lesson.id)) localStorage.setItem(VN_CONV_STORAGE_KEY, JSON.stringify([...done, lesson.id]));
    }
    void logStudentActivity({ activityType: "vietnamese_conversation_quiz", domain: "vietnamese", score, maxScore: lesson.quiz.length, metadata: { lesson_id: lesson.id, lesson_title: lesson.title, pillar: pillar.id } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Link to="/learn-vietnamese/conversational/curriculum" className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Interactive Curriculum
        </Link>
        <div className="mb-6">
          <div className="flex gap-2"><Badge variant="outline">{lesson.level}</Badge><Badge variant="secondary">{t(pillar.titleVi, pillar.title)}</Badge></div>
          <h1 className="mt-2 text-3xl font-extrabold">{lesson.title}</h1>
          <p className="text-lg font-semibold text-primary">{lesson.titleVi}</p>
          <p className="mt-1 text-muted-foreground">{lesson.description}</p>
        </div>

        <Tabs defaultValue="situations">
          <TabsList className="flex h-auto w-full justify-start overflow-x-auto">
            <TabsTrigger value="situations" className="min-h-11 font-bold">1 Situations</TabsTrigger>
            <TabsTrigger value="vocabulary" className="min-h-11 font-bold">2 Vocabulary</TabsTrigger>
            <TabsTrigger value="structures" className="min-h-11 font-bold">3 Structures</TabsTrigger>
            <TabsTrigger value="quiz" className="min-h-11 font-bold">4 Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="situations" className="space-y-6">
            {lesson.situations.map((s, si) => {
              const speakers = Array.from(new Set(s.dialogue.map((d) => d.speaker)));
              return (
                <Card key={si}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-xl font-extrabold"><MessageCircle className="h-5 w-5 text-primary" />{s.title}</CardTitle>
                    <p className="text-muted-foreground">{s.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {s.culturalNote && (
                      <div className="rounded-md border border-accent/30 bg-accent/10 p-3">
                        <p className="mb-1 flex items-center gap-1 font-extrabold"><Globe className="h-3 w-3" /> Cultural Note</p>
                        <p className="leading-7">{s.culturalNote}</p>
                      </div>
                    )}
                    <DialoguePlayAll lines={s.dialogue.map((d) => d.line)} play={playVi} stop={stopVietnameseTts} onLineChange={(i) => setPlayingLine(i === null ? null : `${si}-${i}`)} />
                    <div className="space-y-4">
                      {s.dialogue.map((d, i) => {
                        const right = speakers.indexOf(d.speaker) % 2 === 1;
                        return (
                          <div key={i} className={`flex gap-3 ${right ? "flex-row-reverse" : ""}`}>
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-extrabold ${right ? "border-conversation-b text-conversation-b" : "border-conversation-a text-conversation-a"}`}>{d.speaker.charAt(0)}</div>
                            <div className={`max-w-[82%] rounded-lg border px-4 py-3 shadow-sm ${right ? "bg-conversation-b-surface border-conversation-b/30" : "bg-conversation-a-surface border-conversation-a/30"} ${playingLine === `${si}-${i}` ? "ring-2 ring-primary ring-offset-2" : ""}`}>
                              <p className="text-sm font-extrabold text-muted-foreground">{d.speaker}</p>
                              <p className="text-lg font-extrabold leading-8">{d.line}</p>
                              <p className="mt-1 border-t border-border/60 pt-1 text-sm">{d.en}</p>
                              <Button type="button" size="icon" variant="ghost" className="mt-1 h-9 w-9" onClick={() => speakVi(d.line)} aria-label={`Listen: ${d.line}`}><Volume2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="vocabulary" className="grid gap-3 sm:grid-cols-2">
            {lesson.vocabulary.map((v) => (
              <Card key={v.vi}><CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div><p className="text-xl font-extrabold text-primary">{v.vi}</p><p className="font-semibold">{v.en}</p></div>
                  <Button type="button" size="icon" variant="outline" onClick={() => speakVi(v.vi)} aria-label={`Listen to ${v.vi}`}><Volume2 className="h-5 w-5" /></Button>
                </div>
                <button type="button" onClick={() => speakVi(v.example)} className="mt-3 block text-left">
                  <p className="font-medium">{v.example}</p><p className="text-sm text-muted-foreground">{v.exampleEn}</p>
                </button>
              </CardContent></Card>
            ))}
          </TabsContent>

          <TabsContent value="structures" className="space-y-4">
            {lesson.structures.map((s) => (
              <Card key={s.pattern}><CardContent className="p-5">
                <p className="text-lg font-extrabold text-primary">{s.pattern}</p>
                <p className="mb-3 text-muted-foreground">{s.explanation}</p>
                {s.examples.map((e) => (
                  <div key={e.vi} className="flex items-start gap-2 py-1">
                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={() => speakVi(e.vi)} aria-label={`Listen: ${e.vi}`}><Volume2 className="h-4 w-4" /></Button>
                    <div><p className="font-semibold">{e.vi}</p><p className="text-sm text-muted-foreground">{e.en}</p></div>
                  </div>
                ))}
              </CardContent></Card>
            ))}
          </TabsContent>

          <TabsContent value="quiz" className="space-y-4">
            {lesson.quiz.map((q, qi) => (
              <Card key={qi}><CardContent className="p-5">
                <p className="mb-3 font-bold">{qi + 1}. {q.q}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((o, oi) => {
                    const sel = answers[qi] === oi;
                    const state = checked ? (oi === q.answer ? "border-primary bg-primary/10" : sel ? "border-destructive bg-destructive/10" : "") : sel ? "border-primary bg-primary/5" : "";
                    return <button key={oi} type="button" disabled={checked} onClick={() => setAnswers({ ...answers, [qi]: oi })} className={`rounded-md border p-3 text-left font-medium ${state}`}>{o}</button>;
                  })}
                </div>
              </CardContent></Card>
            ))}
            {!checked ? (
              <Button onClick={checkQuiz} disabled={Object.keys(answers).length < lesson.quiz.length}>{t("Chấm điểm", "Check answers")}</Button>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <p className="flex items-center gap-2 text-lg font-extrabold"><CheckCircle className="h-5 w-5 text-primary" />{score}/{lesson.quiz.length}</p>
                <Button variant="outline" onClick={() => { setChecked(false); setAnswers({}); }}>{t("Làm lại", "Try again")}</Button>
                {next && <Button asChild className="gap-2"><Link to={`/learn-vietnamese/conversational/learn/${next.id}`}>{t("Bài tiếp", "Next lesson")}<ArrowRight className="h-4 w-4" /></Link></Button>}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseConversationalLessonView;
