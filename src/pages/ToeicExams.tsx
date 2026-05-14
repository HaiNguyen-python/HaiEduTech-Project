// TOEIC Exams Library — grid of available LR + SW practice tests.
// Score history chart pulls from localStorage (key: "toeic-score-history").
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  FileText,
  Mic,
  PenLine,
  Clock,
  ListChecks,
  TrendingUp,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { TOEIC_LR_EXAMS, TOEIC_SW_EXAMS } from "@/data/toeicExams";

interface ScoreEntry {
  date: string; // YYYY-MM-DD
  examId: string;
  examTitle: string;
  scoreLR?: number; // total 10..990
  scoreSpeaking?: number; // 0..200
  scoreWriting?: number; // 0..200
}

const HISTORY_KEY = "toeic-score-history";

const ToeicExams = () => {
  const { t } = useLanguage();
  const [history, setHistory] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      setHistory(raw ? JSON.parse(raw) : []);
    } catch {
      setHistory([]);
    }
  }, []);

  const chartData = useMemo(() => {
    return history
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((h) => ({
        date: h.date.slice(5),
        LR: h.scoreLR ?? null,
        SW: (h.scoreSpeaking ?? 0) + (h.scoreWriting ?? 0) || null,
      }));
  }, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-100">
      <SEO
        title="TOEIC Exams - HaiEduTech"
        description="Practice the full TOEIC Listening, Reading, Speaking and Writing tests with timer, audio player, voice recorder and AI-style review mode."
      />
      <Navbar />

      <main className="container mx-auto px-4 py-10 lg:py-14 max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-400/30 mb-3">
            <GraduationCap className="w-3.5 h-3.5 mr-1" />
            {t("Phòng thi TOEIC", "TOEIC Exam Center")}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-200 via-teal-200 to-blue-300 bg-clip-text text-transparent">
            {t("Phòng thi 4 kỹ năng TOEIC", "TOEIC 4-Skills Exam Hub")}
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            {t(
              "Listening, Reading, Speaking & Writing — định dạng chuẩn ETS, có timer, audio speed, ghi âm và quy đổi điểm 990.",
              "Listening, Reading, Speaking & Writing — official ETS format with timer, audio speed control, voice recorder and 990-scale score conversion."
            )}
          </p>
        </motion.header>

        {/* Section A — Listening & Reading */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {t("Section A · Listening & Reading", "Section A · Listening & Reading")}
              </h2>
              <p className="text-xs text-slate-400">
                {t("Part 1–7 · 200 câu · 120 phút (chuẩn ETS)", "Part 1–7 · 200 questions · 120 minutes (ETS standard)")}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {TOEIC_LR_EXAMS.map((exam, i) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="bg-slate-900/60 border-slate-700 p-5 hover:border-cyan-400/50 transition group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 mb-2">
                        {exam.series}
                      </Badge>
                      <h3 className="text-lg font-semibold text-white">{exam.title}</h3>
                    </div>
                    <Headphones className="w-6 h-6 text-cyan-300/70" />
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 120 min</span>
                    <span className="flex items-center gap-1"><ListChecks className="w-3 h-3" /> {exam.questions.length} {t("câu", "questions")}</span>
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Part 1–7</span>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="bg-cyan-600 hover:bg-cyan-500">
                      <Link to={`/toeic-exam/${exam.id}?mode=full`}>
                        {t("Thi đầy đủ", "Full Test")} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="border-cyan-400/60 bg-slate-800/80 text-white hover:bg-cyan-500/20 hover:text-white font-semibold">
                      <Link to={`/toeic-exam/${exam.id}?mode=practice`}>
                        {t("Luyện theo Part", "Practice by Part")}
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section B — Speaking & Writing */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {t("Section B · Speaking & Writing", "Section B · Speaking & Writing")}
              </h2>
              <p className="text-xs text-slate-400">
                {t("Speaking 11 task · 20 phút | Writing 8 task · 60 phút", "Speaking 11 tasks · 20 min | Writing 8 tasks · 60 min")}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {TOEIC_SW_EXAMS.map((exam) => (
              <Card key={exam.id} className="bg-slate-900/60 border-slate-700 p-5 hover:border-teal-400/50 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge className="bg-teal-500/20 text-teal-200 border-teal-400/30 mb-2">{exam.series}</Badge>
                    <h3 className="text-lg font-semibold text-white">{exam.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    <Mic className="w-5 h-5 text-teal-300/70" />
                    <PenLine className="w-5 h-5 text-emerald-300/70" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1"><Mic className="w-3 h-3" /> {exam.speakingTasks.length} speaking tasks</span>
                  <span className="flex items-center gap-1"><PenLine className="w-3 h-3" /> {exam.writingTasks.length} writing tasks</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 80 min</span>
                </div>
                <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-500">
                  <Link to={`/toeic-exam/${exam.id}?mode=sw`}>
                    {t("Bắt đầu thi", "Start Test")} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Score history */}
        <section className="mb-8">
          <Card className="bg-slate-900/60 border-slate-700 p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-cyan-300" />
              <h2 className="text-lg font-semibold text-white">
                {t("Lịch sử điểm số", "Score History")}
              </h2>
            </div>
            {chartData.length === 0 ? (
              <p className="text-sm text-slate-400">
                {t(
                  "Chưa có dữ liệu. Hoàn thành một bài thi để bắt đầu theo dõi tiến độ.",
                  "No data yet. Complete an exam to start tracking your progress."
                )}
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }} />
                    <Line type="monotone" dataKey="LR" stroke="#22d3ee" strokeWidth={2} name="LR (10-990)" />
                    <Line type="monotone" dataKey="SW" stroke="#2dd4bf" strokeWidth={2} name="SW (0-400)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ToeicExams;
