/**
 * @file JapaneseJlpt.tsx
 * @description JLPT mock-exam runner with Timed and Free modes, section scores
 *  and bilingual explanations after submitting.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Clock, ArrowLeft, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JA_MOCK_EXAMS, type JaMockExam } from "@/data/japanese/jlptExams";

interface Props {
  t: (vi: string, en: string) => string;
  lang: "vi" | "en";
}

const SECTION_LABEL: Record<string, [string, string]> = {
  vocab: ["Từ vựng", "Vocabulary"],
  kanji: ["Chữ Hán", "Kanji"],
  grammar: ["Ngữ pháp", "Grammar"],
  reading: ["Đọc hiểu", "Reading"],
};

const HISTORY_KEY = "japanese_jlpt_history_v1";

export default function JapaneseJlpt({ t, lang }: Props) {
  const [exam, setExam] = useState<JaMockExam | null>(null);
  const [timed, setTimed] = useState(false);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!exam || !timed || submitted) return;
    const id = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [exam, timed, submitted]);

  const score = useMemo(() => {
    if (!exam) return { total: 0, correct: 0, bySection: {} as Record<string, { n: number; ok: number }> };
    const bySection: Record<string, { n: number; ok: number }> = {};
    let correct = 0;
    exam.questions.forEach((q, i) => {
      const s = (bySection[q.section] ||= { n: 0, ok: 0 });
      s.n += 1;
      if (picks[i] === q.answer) {
        s.ok += 1;
        correct += 1;
      }
    });
    return { total: exam.questions.length, correct, bySection };
  }, [exam, picks]);

  const start = (e: JaMockExam, withTimer: boolean) => {
    setExam(e);
    setTimed(withTimer);
    setPicks({});
    setSubmitted(false);
    setLeft(e.minutes * 60);
  };

  const submit = () => {
    setSubmitted(true);
    if (!exam) return;
    try {
      const prev = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      prev.unshift({
        id: exam.id,
        level: exam.level,
        correct: score.correct,
        total: exam.questions.length,
        at: new Date().toISOString(),
      });
      localStorage.setItem(HISTORY_KEY, JSON.stringify(prev.slice(0, 30)));
    } catch {}
  };

  if (!exam) {
    return (
      <div className="space-y-4">
        <Card className="border-pink-200 bg-white/85 p-4 text-base leading-relaxed text-slate-700">
          {t(
            "Chọn một đề mô phỏng JLPT. Chế độ Bấm giờ mô phỏng phòng thi, chế độ Tự do cho bạn làm không giới hạn thời gian. Nộp bài rồi mới hiện đáp án và giải thích.",
            "Pick a JLPT mock test. Timed mode simulates the exam room; Free mode has no limit. Answers and explanations appear after you submit.",
          )}
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          {JA_MOCK_EXAMS.map((e) => (
            <Card key={e.id} className="border-pink-200 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">{e.level}</span>
                <span className="text-base font-bold text-slate-800">{lang === "vi" ? e.title_vi : e.title_en}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {e.questions.length} {t("câu", "questions")} · {e.minutes} {t("phút", "min")}
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700" onClick={() => start(e, true)}>
                  <Clock className="mr-1 h-4 w-4" /> {t("Bấm giờ", "Timed")}
                </Button>
                <Button size="sm" variant="outline" className="border-pink-200 text-rose-700" onClick={() => start(e, false)}>
                  {t("Tự do", "Free")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center gap-3 border-pink-200 bg-white/85 p-4">
        <Button variant="outline" size="sm" className="border-pink-200 text-rose-700" onClick={() => setExam(null)}>
          <ArrowLeft className="mr-1 h-4 w-4" /> {t("Danh sách đề", "Back to tests")}
        </Button>
        <span className="text-base font-bold text-slate-800">{lang === "vi" ? exam.title_vi : exam.title_en}</span>
        {timed && !submitted && (
          <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-bold text-rose-700">
            ⏱ {mm}:{ss}
          </span>
        )}
        {!submitted ? (
          <Button size="sm" className="ml-auto bg-rose-600 hover:bg-rose-700" onClick={submit}>
            <Send className="mr-1 h-4 w-4" /> {t("Nộp bài", "Submit")}
          </Button>
        ) : (
          <span className="ml-auto text-base font-bold text-rose-700">
            {t("Kết quả", "Score")}: {score.correct}/{score.total}
          </span>
        )}
      </Card>

      {submitted && (
        <Card className="border-pink-200 p-4">
          <div className="grid gap-2 sm:grid-cols-4">
            {Object.entries(score.bySection).map(([sec, v]) => (
              <div key={sec} className="rounded-lg border border-pink-200 bg-pink-50/70 p-3 text-center">
                <div className="text-sm font-semibold text-rose-700">
                  {t(SECTION_LABEL[sec][0], SECTION_LABEL[sec][1])}
                </div>
                <div className="text-xl font-bold text-slate-800">
                  {v.ok}/{v.n}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {exam.questions.map((q, i) => {
        const pick = picks[i];
        const showPassage = q.passage && (i === 0 || exam.questions[i - 1].passage !== q.passage);
        return (
          <div key={i} className="space-y-2">
            {showPassage && (
              <Card className="border-pink-200 bg-pink-50/60 p-4">
                <div className="text-sm font-bold text-rose-700">{t("Bài đọc", "Passage")}</div>
                <p className="mt-2 whitespace-pre-wrap text-base leading-8 text-slate-800">{q.passage}</p>
              </Card>
            )}
            <Card className="border-pink-200 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                  {t(SECTION_LABEL[q.section][0], SECTION_LABEL[q.section][1])}
                </span>
                <span className="text-base font-semibold text-slate-800">
                  {i + 1}. {q.q}
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((op, oi) => (
                  <button
                    key={oi}
                    onClick={() => !submitted && setPicks((p) => ({ ...p, [i]: oi }))}
                    className={`rounded-md border p-2 text-left text-base transition ${
                      submitted
                        ? oi === q.answer
                          ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                          : oi === pick
                            ? "border-rose-400 bg-rose-50 text-rose-800"
                            : "border-pink-200 bg-white text-slate-600"
                        : pick === oi
                          ? "border-rose-400 bg-rose-50 text-rose-800"
                          : "border-pink-200 bg-white hover:bg-pink-50"
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
              {submitted && (
                <p className="mt-2 text-base text-slate-700">
                  {pick === q.answer ? "✅ " : "❌ "}
                  {lang === "vi" ? q.explain_vi : q.explain_en}
                </p>
              )}
            </Card>
          </div>
        );
      })}

      {!submitted && (
        <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={submit}>
          <Send className="mr-1 h-4 w-4" /> {t("Nộp bài và xem giải thích", "Submit and see explanations")}
        </Button>
      )}
    </div>
  );
}
