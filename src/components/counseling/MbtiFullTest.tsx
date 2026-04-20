import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ArrowLeft, ArrowRight, Loader2, Sparkles, Check, RotateCcw, Lightbulb, Award, GraduationCap, BookOpen, History, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { MBTI_FULL_QUESTIONS, LIKERT_LABELS, MBTI_PROFILES, computeMbtiCode } from "@/data/mbtiFullTest";

interface Props { userId: string }

type Phase = "intro" | "test" | "loading" | "result";

const MbtiFullTest = ({ userId }: Props) => {
  const { t, lang } = useLanguage();
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const total = MBTI_FULL_QUESTIONS.length;
  const current = MBTI_FULL_QUESTIONS[idx];
  const progress = useMemo(() => (Object.keys(answers).length / total) * 100, [answers, total]);

  // Load history
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("career_assessments")
        .select("*")
        .eq("user_id", userId)
        .eq("assessment_type", "mbti-full")
        .order("created_at", { ascending: false })
        .limit(10);
      if (data) setHistory(data);
    })();
  }, [userId, result]);

  const setAnswer = (val: number) => {
    setAnswers((prev) => ({ ...prev, [current.id]: val }));
    setTimeout(() => {
      if (idx < total - 1) setIdx(idx + 1);
    }, 200);
  };

  const submit = async () => {
    if (Object.keys(answers).length < total) {
      toast.error(t("Vui lòng trả lời tất cả câu", "Please answer all questions"));
      return;
    }
    setPhase("loading");
    const { code, scores } = computeMbtiCode(answers);
    const profile = MBTI_PROFILES[code];

    try {
      const { data: session } = await supabase.auth.getSession();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/counseling-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.session?.access_token}`,
          },
          body: JSON.stringify({
            mode: "mbti-career-map",
            payload: { mbti_code: code, language: lang },
          }),
        }
      );
      const aiData = await resp.json();
      const finalResult = { code, scores, profile, ai: aiData };
      setResult(finalResult);
      await supabase.from("career_assessments").insert([{
        user_id: userId,
        assessment_type: "mbti-full",
        answers: answers as any,
        result: finalResult as any,
        ai_insights: aiData?.summary || null,
      }]);
      setPhase("result");
    } catch (e: any) {
      toast.error(e.message || "Failed to analyze");
      setPhase("test");
    }
  };

  const restart = () => {
    setAnswers({});
    setIdx(0);
    setResult(null);
    setPhase("intro");
  };

  // INTRO
  if (phase === "intro") {
    return (
      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-violet-200/60 dark:border-violet-900/40 bg-gradient-to-br from-violet-50/80 via-pink-50/60 to-sky-50/60 dark:from-violet-950/30 dark:via-pink-950/20 dark:to-sky-950/20 p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">
            {t("Trắc nghiệm MBTI Đầy đủ", "Full MBTI Personality Test")}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
            {t(
              "40 câu hỏi · ~6 phút · Khám phá 1 trong 16 loại tính cách và lộ trình ngành nghề phù hợp tại HaiEduTech.",
              "40 questions · ~6 min · Discover 1 of 16 personality types and your career roadmap at HaiEduTech."
            )}
          </p>
          <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6 text-left">
            <div className="rounded-xl bg-background/70 border border-border p-3">
              <Award className="w-5 h-5 text-violet-500 mb-1" />
              <p className="text-xs font-bold">{t("16 loại tính cách", "16 personality types")}</p>
              <p className="text-[11px] text-muted-foreground">{t("Phân tích sâu", "Deep analysis")}</p>
            </div>
            <div className="rounded-xl bg-background/70 border border-border p-3">
              <GraduationCap className="w-5 h-5 text-emerald-500 mb-1" />
              <p className="text-xs font-bold">{t("Top 5 nghề nghiệp", "Top 5 careers")}</p>
              <p className="text-[11px] text-muted-foreground">{t("AI cá nhân hóa", "AI personalized")}</p>
            </div>
            <div className="rounded-xl bg-background/70 border border-border p-3">
              <BookOpen className="w-5 h-5 text-sky-500 mb-1" />
              <p className="text-xs font-bold">{t("Khóa học HaiEduTech", "HaiEduTech courses")}</p>
              <p className="text-[11px] text-muted-foreground">{t("Lộ trình cụ thể", "Specific roadmap")}</p>
            </div>
          </div>
          <button
            onClick={() => setPhase("test")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold hover:brightness-110 shadow-lg"
          >
            <Sparkles className="w-4 h-4" /> {t("Bắt đầu trắc nghiệm", "Start Test")}
          </button>
          {history.length > 0 && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="ml-3 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary"
            >
              <History className="w-4 h-4" /> {t("Lịch sử", "History")} ({history.length})
            </button>
          )}
        </motion.div>

        {showHistory && history.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="font-bold mb-3 text-sm">{t("Lịch sử trắc nghiệm", "Test History")}</h4>
            <div className="space-y-2">
              {history.map((h) => {
                const r = h.result as any;
                const profile = r?.code ? MBTI_PROFILES[r.code] : null;
                return (
                  <div key={h.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/40">
                    <div className="flex items-center gap-3">
                      <span className={`text-xl font-bold bg-gradient-to-r ${profile?.color || "from-violet-500 to-pink-500"} bg-clip-text text-transparent`}>
                        {r?.code || "—"}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{lang === "vi" ? profile?.title_vi : profile?.title_en}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(h.created_at).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US")}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setResult(r); setPhase("result"); }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-background hover:bg-secondary"
                    >
                      {t("Xem", "View")}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // LOADING
  if (phase === "loading") {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-violet-500 mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">
          {t("AI đang phân tích tính cách và map vào ngành nghề...", "AI is analyzing your personality and mapping careers...")}
        </p>
      </div>
    );
  }

  // RESULT
  if (phase === "result" && result) {
    const profile = result.profile as typeof MBTI_PROFILES[string];
    const ai = result.ai || {};
    return (
      <div className="space-y-5">
        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl bg-gradient-to-br ${profile.color} p-8 text-white shadow-2xl`}
        >
          <div className="text-center">
            <p className="text-sm opacity-90 mb-1">{t("Tính cách của em là", "Your personality type is")}</p>
            <p className="text-6xl font-display font-bold tracking-tight mb-2">{profile.code}</p>
            <p className="text-xl font-display font-semibold">{lang === "vi" ? profile.title_vi : profile.title_en}</p>
            <p className="text-sm opacity-90 italic mt-1">"{lang === "vi" ? profile.nickname_vi : profile.nickname_en}"</p>
          </div>
        </motion.div>

        {/* Dimension bars */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">{t("Phân tích 4 chiều", "4-Dimension Analysis")}</p>
          {result.scores && Object.entries(result.scores).map(([dim, s]: any) => (
            <div key={dim} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold">{dim[0]}</span>
                <span className="text-muted-foreground">{s.pct}% / {100 - s.pct}%</span>
                <span className="font-bold">{dim[1]}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm leading-relaxed">{lang === "vi" ? profile.description_vi : profile.description_en}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 mb-2">{t("Điểm mạnh", "Strengths")}</p>
            <ul className="space-y-1">{(lang === "vi" ? profile.strengths_vi : profile.strengths_en).map((s, i) => (
              <li key={i} className="text-sm flex items-start gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />{s}</li>
            ))}</ul>
          </div>
          <div className="rounded-2xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-2">{t("Cần phát triển", "Growth areas")}</p>
            <ul className="space-y-1">{(lang === "vi" ? profile.weaknesses_vi : profile.weaknesses_en).map((s, i) => (
              <li key={i} className="text-sm flex items-start gap-2"><ArrowRight className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />{s}</li>
            ))}</ul>
          </div>
        </div>

        <div className="rounded-2xl border border-sky-200/60 dark:border-sky-900/40 bg-sky-50/40 dark:bg-sky-950/20 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700 dark:text-sky-400 mb-2">{t("Phong cách giao tiếp", "Communication Style")}</p>
          <p className="text-sm leading-relaxed">{lang === "vi" ? profile.communication_vi : profile.communication_en}</p>
        </div>

        {/* Teacher Hai's note */}
        <div className="rounded-2xl border-2 border-rose-300/60 dark:border-rose-800/50 bg-gradient-to-br from-rose-50/80 to-amber-50/60 dark:from-rose-950/30 dark:to-amber-950/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-rose-500" />
            <p className="text-sm font-bold text-rose-700 dark:text-rose-300">
              {t(`Lời khuyên Thầy Hải dành cho ${profile.code}`, `Teacher Hai's Note for ${profile.code}`)}
            </p>
          </div>
          <p className="text-sm leading-relaxed italic">"{lang === "vi" ? profile.teacher_note_vi : profile.teacher_note_en}"</p>
        </div>

        {/* AI recommendations */}
        {ai.summary && (
          <div className="rounded-2xl border border-violet-200/60 dark:border-violet-900/40 bg-gradient-to-br from-violet-50/60 to-pink-50/40 dark:from-violet-950/20 dark:to-pink-950/20 p-5 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-400 mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> {t("Tóm tắt AI", "AI Summary")}
              </p>
              <p className="text-sm leading-relaxed">{ai.summary}</p>
            </div>

            {ai.recommended_courses && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-400 mb-2">
                  {t("Khóa học HaiEduTech được gợi ý", "Recommended HaiEduTech Courses")}
                </p>
                <div className="space-y-2">
                  {ai.recommended_courses.map((c: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/60 border border-border">
                      <BookOpen className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-bold">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.reason}</p>
                      </div>
                      {c.priority === "high" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 font-bold uppercase">High</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ai.top_5_careers && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-400 mb-2">
                  {t("Top 5 nghề nghiệp", "Top 5 Career Matches")}
                </p>
                <div className="space-y-2">
                  {ai.top_5_careers.map((c: any, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-background/60 border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 rounded-full bg-violet-500/15 text-violet-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                        <p className="text-sm font-bold">{c.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{c.why_fit}</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">📚 {c.academic_path}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ai.study_strategy && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-400 mb-2">
                  {t("Chiến lược học tập", "Study Strategy")}
                </p>
                <p className="text-sm leading-relaxed">{ai.study_strategy}</p>
              </div>
            )}

            {ai.scholarship_hint && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-sm">🎓 <strong>{t("Học bổng phù hợp:", "Scholarship hint:")}</strong> {ai.scholarship_hint}</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={restart}
          className="w-full py-3 rounded-xl border border-border hover:bg-secondary text-sm font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> {t("Làm lại trắc nghiệm", "Retake Test")}
        </button>
      </div>
    );
  }

  // TEST
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>{t("Câu", "Question")} {idx + 1} / {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-base md:text-lg font-medium leading-relaxed mb-6 min-h-[3rem] text-center">
            {lang === "vi" ? current.vi : current.en}
          </p>

          {/* Likert 7-scale */}
          <div className="grid grid-cols-7 gap-2 max-w-2xl mx-auto">
            {LIKERT_LABELS.map((opt) => {
              const selected = answers[current.id] === opt.value;
              const intensity = Math.abs(opt.value);
              const sizeClass = intensity === 3 ? "w-14 h-14" : intensity === 2 ? "w-12 h-12" : intensity === 1 ? "w-10 h-10" : "w-9 h-9";
              return (
                <button
                  key={opt.value}
                  onClick={() => setAnswer(opt.value)}
                  className={`flex flex-col items-center gap-1 transition-all ${selected ? "scale-110" : "hover:scale-105 opacity-70 hover:opacity-100"}`}
                  title={lang === "vi" ? opt.vi : opt.en}
                >
                  <div className={`${sizeClass} rounded-full flex items-center justify-center text-lg transition-all ${
                    selected
                      ? opt.value > 0
                        ? "bg-emerald-500 text-white ring-4 ring-emerald-300/50"
                        : opt.value < 0
                        ? "bg-rose-500 text-white ring-4 ring-rose-300/50"
                        : "bg-slate-500 text-white ring-4 ring-slate-300/50"
                      : opt.value > 0
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-500/30 hover:bg-emerald-500/25"
                      : opt.value < 0
                      ? "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-2 border-rose-500/30 hover:bg-rose-500/25"
                      : "bg-secondary border-2 border-border hover:bg-muted"
                  }`}>
                    {opt.emoji}
                  </div>
                  <span className="text-[9px] text-muted-foreground text-center leading-tight hidden sm:block">{lang === "vi" ? opt.vi : opt.en}</span>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground mt-3 max-w-2xl mx-auto">
            <span>{t("Rất không đồng ý", "Strongly Disagree")}</span>
            <span>{t("Trung lập", "Neutral")}</span>
            <span>{t("Rất đồng ý", "Strongly Agree")}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border hover:bg-secondary text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" /> {t("Trước", "Back")}
        </button>
        {idx < total - 1 ? (
          <button
            onClick={() => setIdx(Math.min(total - 1, idx + 1))}
            disabled={answers[current.id] === undefined}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-violet-500 text-white text-sm font-semibold hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("Tiếp", "Next")} <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={Object.keys(answers).length < total}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-semibold hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" /> {t("Phân tích kết quả", "Analyze")}
          </button>
        )}
      </div>
    </div>
  );
};

export default MbtiFullTest;
