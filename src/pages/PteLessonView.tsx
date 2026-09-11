/**
 * @file PteLessonView.tsx
 * @description Reader for a single PTE strategy lesson: method steps, worked example,
 *   scoring notes, common mistakes, drills and a 5-question check (75% to pass).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Target, ListChecks, AlertTriangle, Dumbbell, Lightbulb, CheckCircle2,
  XCircle, ChevronLeft, ChevronRight, RotateCcw, Clock,
} from "lucide-react";
import PteShell from "@/components/pte/PteShell";
import { PTE_LESSONS, PTE_SKILL_META, getPteLesson } from "@/data/pteLessonsData";
import { savePteLessonAttempt } from "@/lib/pteLessonProgress";

const PteLessonView = () => {
  const { lessonId = "" } = useParams();
  const navigate = useNavigate();
  const lesson = getPteLesson(lessonId);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!lesson) {
    return (
      <PteShell title="Lesson not found" subtitle="This lesson is no longer available.">
        <Link to="/pte/lessons" className="text-[#003580] font-semibold hover:underline">
          Back to all lessons
        </Link>
      </PteShell>
    );
  }

  const index = PTE_LESSONS.findIndex((l) => l.id === lesson.id);
  const prev = PTE_LESSONS[index - 1];
  const next = PTE_LESSONS[index + 1];
  const meta = PTE_SKILL_META[lesson.skill];

  const score = lesson.quiz.reduce((s, q, i) => (answers[i] === q.answer ? s + 1 : s), 0);
  const passed = score / lesson.quiz.length >= 0.75;

  const submit = () => {
    setSubmitted(true);
    savePteLessonAttempt(lesson.id, score, lesson.quiz.length);
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <PteShell
      title={lesson.title}
      subtitle={`${meta.label} · ${lesson.taskTypes}`}
      backTo="/pte/lessons"
      backLabel="PTE Strategy Lessons"
    >
      <div className="flex flex-wrap gap-2 mb-5 text-xs">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#003580]/10 text-[#003580] font-bold">
          <Clock size={12} /> {lesson.minutes} min
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 font-bold">
          <Target size={12} /> Band {lesson.targetBand}
        </span>
        <Link
          to={lesson.practiceRoute}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
        >
          <Dumbbell size={12} /> Practise {meta.label}
        </Link>
      </div>

      <section className="bg-white rounded-2xl border border-[#003580]/15 p-5 sm:p-6 shadow-sm mb-5">
        <p className="text-slate-800 leading-relaxed">{lesson.overview}</p>
        <h2 className="mt-4 font-bold text-[#003580] text-sm uppercase tracking-wide">What you will be able to do</h2>
        <ul className="mt-2 space-y-1.5">
          {lesson.objectives.map((o) => (
            <li key={o} className="flex gap-2 text-sm text-slate-700">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-2xl border border-[#003580]/15 p-5 sm:p-6 shadow-sm mb-5">
        <h2 className="font-bold text-[#003580] mb-3 flex items-center gap-2">
          <ListChecks size={18} /> The method
        </h2>
        <ol className="space-y-3">
          {lesson.steps.map((s) => (
            <li key={s.title} className="border-l-2 border-[#003580]/30 pl-3">
              <p className="font-semibold text-[#003580] text-sm">{s.title}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#eef4fc] rounded-2xl border border-[#003580]/20 p-5 sm:p-6 mb-5">
        <h2 className="font-bold text-[#003580] mb-3 flex items-center gap-2">
          <Lightbulb size={18} /> Worked example
        </h2>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Task</p>
        <p className="text-sm text-slate-800 leading-relaxed mb-3">{lesson.example.prompt}</p>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Model answer</p>
        <div className="text-sm text-slate-900 leading-relaxed whitespace-pre-wrap bg-white rounded-xl p-3 border border-[#003580]/15">
          {lesson.example.model}
        </div>
        <ul className="mt-3 space-y-1.5">
          {lesson.example.notes.map((n) => (
            <li key={n} className="text-sm text-slate-700 flex gap-2">
              <span className="text-[#003580] font-bold">·</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <section className="bg-white rounded-2xl border border-[#003580]/15 p-5 shadow-sm">
          <h2 className="font-bold text-[#003580] mb-2 flex items-center gap-2">
            <Target size={18} /> How it is scored
          </h2>
          <ul className="space-y-1.5">
            {lesson.scoring.map((s) => (
              <li key={s} className="text-sm text-slate-700 flex gap-2">
                <span className="text-[#003580] font-bold">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-2xl border border-amber-300/70 p-5 shadow-sm">
          <h2 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle size={18} /> Common mistakes
          </h2>
          <ul className="space-y-1.5">
            {lesson.mistakes.map((m) => (
              <li key={m} className="text-sm text-slate-700 flex gap-2">
                <span className="text-amber-700 font-bold">·</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="bg-white rounded-2xl border border-[#003580]/15 p-5 sm:p-6 shadow-sm mb-5">
        <h2 className="font-bold text-[#003580] mb-2 flex items-center gap-2">
          <Dumbbell size={18} /> Practice drills
        </h2>
        <ol className="space-y-1.5 list-decimal list-inside">
          {lesson.drills.map((d) => (
            <li key={d} className="text-sm text-slate-700">{d}</li>
          ))}
        </ol>
        <Link
          to={lesson.practiceRoute}
          className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#003580] hover:underline"
        >
          Open the {meta.label} practice bank <ChevronRight size={16} />
        </Link>
      </section>

      {/* Quiz */}
      <section className="bg-white rounded-2xl border border-[#003580]/15 p-5 sm:p-6 shadow-sm">
        <h2 className="font-bold text-[#003580] mb-1 flex items-center gap-2">
          <ListChecks size={18} /> Knowledge check
        </h2>
        <p className="text-xs text-slate-600 mb-4">
          {lesson.quiz.length} questions · answer at least 75% correctly to pass this lesson.
        </p>

        <div className="space-y-5">
          {lesson.quiz.map((q, qi) => {
            const chosen = answers[qi];
            return (
              <div key={q.question} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-slate-900 text-sm mb-2">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isChosen = chosen === oi;
                    const isRight = oi === q.answer;
                    let cls = "border-slate-200 bg-white text-slate-800 hover:bg-[#eef4fc] hover:text-[#003580]";
                    if (submitted && isRight) cls = "border-emerald-500 bg-emerald-50 text-emerald-900";
                    else if (submitted && isChosen) cls = "border-rose-400 bg-rose-50 text-rose-900";
                    else if (isChosen) cls = "border-[#003580] bg-[#eef4fc] text-[#003580]";
                    return (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        className={`w-full text-left text-sm px-3 py-2 rounded-xl border font-medium transition-colors disabled:cursor-default ${cls}`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="mt-2 text-xs text-slate-700 flex gap-1.5">
                    {chosen === q.answer ? (
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={14} className="text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span>{q.explanation}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={submit}
            disabled={Object.keys(answers).length < lesson.quiz.length}
            className="mt-5 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#003580] text-white font-bold text-sm hover:bg-[#0052cc] disabled:bg-slate-300 disabled:text-slate-600 transition-colors"
          >
            Submit answers
          </button>
        ) : (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                passed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
              }`}
            >
              {passed ? "Passed" : "Not passed yet"} · {score}/{lesson.quiz.length}
            </span>
            <button
              onClick={retry}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#003580]/30 text-[#003580] font-bold text-sm hover:bg-[#eef4fc] transition-colors"
            >
              <RotateCcw size={14} /> Try again
            </button>
          </div>
        )}
      </section>

      {/* Prev / next */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          disabled={!prev}
          onClick={() => prev && navigate(`/pte/lessons/${prev.id}`)}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-[#003580]/25 bg-white text-[#003580] font-bold text-sm hover:bg-[#eef4fc] disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span className="text-xs text-slate-600 font-semibold">
          Lesson {index + 1} of {PTE_LESSONS.length}
        </span>
        <button
          disabled={!next}
          onClick={() => next && navigate(`/pte/lessons/${next.id}`)}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-[#003580]/25 bg-white text-[#003580] font-bold text-sm hover:bg-[#eef4fc] disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </PteShell>
  );
};

export default PteLessonView;
