import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Sparkles, Trophy, AlertTriangle, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

interface PitchForm {
  startupName: string; oneLiner: string; problem: string; solution: string;
  market: string; product: string; traction: string; businessModel: string;
  competition: string; team: string; ask: string;
}

interface Result {
  overallScore: number;
  verdict: "Pass" | "Maybe" | "Would invest";
  scores: { problem: number; solution: number; market: number; traction: number; team: number };
  strengths: string[];
  concerns: string[];
  toughQuestions: string[];
  nextSteps: string[];
}

const EMPTY: PitchForm = {
  startupName: "", oneLiner: "", problem: "", solution: "",
  market: "", product: "", traction: "", businessModel: "",
  competition: "", team: "", ask: "",
};

const SAMPLE: PitchForm = {
  startupName: "PhonicPal",
  oneLiner: "AI phát âm tiếng Anh cho học sinh Việt Nam.",
  problem: "Học sinh VN nói tiếng Anh không được máy/native hiểu. Giáo viên native đắt (500k/giờ) và ít.",
  solution: "AI chấm phát âm real-time theo native language (VN), gợi ý bài luyện 5 phút/ngày.",
  market: "TAM VN 500k thí sinh IELTS × 3M VND = 1500 tỷ. SAM thành phố lớn 600 tỷ. SOM Year 3 = 18 tỷ.",
  product: "App iOS/Android, feedback IPA + waveform. 3-min lesson streak.",
  traction: "800 paid user, 220k MRR, D7 retention 34%, Sean Ellis 41%.",
  businessModel: "Freemium (3 bài/tháng), Pro 99k/tháng, School 500k/5 seats.",
  competition: "ELSA (US-first, giá cao), Duolingo (không sâu phát âm). Ta rẻ hơn + hyper-local L1 dataset.",
  team: "CEO ex-Viettel AI, CTO ex-VinAI 6 năm NLP, CPO ex-Got It.",
  ask: "Raise $400k seed @ $4M pre-money, dùng: 60% engineering, 30% GTM, 10% ops. Runway 18 tháng.",
};

const FIELD_LABELS: { key: keyof PitchForm; vi: string; en: string; rows?: number }[] = [
  { key: "startupName", vi: "Tên startup", en: "Startup name" },
  { key: "oneLiner", vi: "One-liner (1 câu)", en: "One-liner" },
  { key: "problem", vi: "Problem (pain cụ thể + số)", en: "Problem (concrete pain + numbers)", rows: 3 },
  { key: "solution", vi: "Solution (giải pháp + insight)", en: "Solution + insight", rows: 3 },
  { key: "market", vi: "Market (TAM/SAM/SOM bottom-up)", en: "Market (bottom-up TAM/SAM/SOM)", rows: 3 },
  { key: "product", vi: "Product (how it works)", en: "Product (how it works)", rows: 2 },
  { key: "traction", vi: "Traction (metric + số)", en: "Traction (metrics)", rows: 2 },
  { key: "businessModel", vi: "Business Model + pricing", en: "Business Model + pricing", rows: 2 },
  { key: "competition", vi: "Competition & Moat", en: "Competition & Moat", rows: 2 },
  { key: "team", vi: "Team (why us)", en: "Team (why us)", rows: 2 },
  { key: "ask", vi: "Ask (raise, use, milestone)", en: "Ask (raise, use, milestone)", rows: 2 },
];

const StartupPitchSimulator = () => {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<PitchForm>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const set = (k: keyof PitchForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.problem.trim() || !form.solution.trim() || !form.team.trim()) {
      toast({ title: t("Thiếu thông tin", "Missing fields"), description: t("Vui lòng điền Problem, Solution, Team.", "Please fill Problem, Solution, Team."), variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("startup-pitch-critic", { body: form });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult(data as Result);
    } catch (e) {
      toast({ title: t("Lỗi", "Error"), description: (e as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const verdictColor = result?.verdict === "Would invest" ? "from-emerald-500 to-teal-600"
    : result?.verdict === "Maybe" ? "from-amber-500 to-orange-500" : "from-rose-500 to-pink-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-slate-950 dark:to-slate-900">
      <Helmet><title>{t("Pitch Simulator - AI Investor", "Pitch Simulator - AI Investor")}</title></Helmet>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link to="/programming/startup" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Về Hub", "Back to Hub")}
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">🎤 {t("Pitch Simulator - AI Investor", "Pitch Simulator - AI Investor")}</h1>
        <p className="text-muted-foreground mb-6">
          {t("Nhập 10 slide pitch. AI đóng vai investor khó tính chấm 5 tiêu chí và hỏi câu hỏi khó.", "Fill in your 10-slide pitch. A skeptical AI investor scores 5 criteria and asks tough questions.")}
        </p>

        <button onClick={() => setForm(SAMPLE)} className="mb-4 text-xs font-bold px-3 py-1.5 rounded-full border-2 border-dashed border-fuchsia-400 text-fuchsia-600 hover:bg-fuchsia-500/10">
          ✨ {t("Điền ví dụ mẫu (PhonicPal)", "Fill sample (PhonicPal)")}
        </button>

        <div className="grid md:grid-cols-2 gap-3">
          {FIELD_LABELS.map((f) => (
            <label key={f.key} className={`block ${f.rows ? "md:col-span-2" : ""}`}>
              <span className="text-xs font-bold text-foreground">{lang === "vi" ? f.vi : f.en}</span>
              {f.rows ? (
                <textarea value={form[f.key]} onChange={set(f.key)} rows={f.rows}
                  className="mt-1 w-full rounded-lg border-2 border-border bg-background px-3 py-2 text-sm text-foreground" />
              ) : (
                <input value={form[f.key]} onChange={set(f.key)}
                  className="mt-1 w-full rounded-lg border-2 border-border bg-background px-3 py-2 text-sm text-foreground" />
              )}
            </label>
          ))}
        </div>

        <button onClick={submit} disabled={loading}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-black shadow-lg disabled:opacity-60">
          {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> {t("AI đang xem pitch...", "AI reviewing...")}</> : <><Sparkles className="w-5 h-5" /> {t("Gửi cho AI Investor", "Submit to AI Investor")}</>}
        </button>

        {result && (
          <div className="mt-8 space-y-4">
            <div className={`rounded-2xl p-5 text-white bg-gradient-to-br ${verdictColor} shadow-xl`}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="text-[11px] uppercase tracking-widest opacity-90">Investor Verdict</div>
                  <div className="text-3xl font-black">{result.verdict}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase opacity-90">Overall</div>
                  <div className="text-5xl font-black">{result.overallScore}<span className="text-xl">/100</span></div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {(["problem","solution","market","traction","team"] as const).map((k) => (
                  <div key={k} className="rounded-lg bg-white/20 backdrop-blur px-2 py-2 text-center">
                    <div className="text-[10px] uppercase opacity-90">{k}</div>
                    <div className="text-lg font-black">{result.scores[k]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="rounded-xl border-2 border-emerald-400/40 bg-emerald-500/10 p-4">
                <h3 className="font-black text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-1"><Trophy className="w-4 h-4" /> Strengths</h3>
                <ul className="space-y-1 text-sm text-foreground">{result.strengths?.map((s, i) => <li key={i}>✓ {s}</li>)}</ul>
              </div>
              <div className="rounded-xl border-2 border-rose-400/40 bg-rose-500/10 p-4">
                <h3 className="font-black text-rose-700 dark:text-rose-300 mb-2 flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> Concerns</h3>
                <ul className="space-y-1 text-sm text-foreground">{result.concerns?.map((s, i) => <li key={i}>⚠ {s}</li>)}</ul>
              </div>
              <div className="rounded-xl border-2 border-fuchsia-400/40 bg-fuchsia-500/10 p-4">
                <h3 className="font-black text-fuchsia-700 dark:text-fuchsia-300 mb-2 flex items-center gap-1"><MessageCircleQuestion className="w-4 h-4" /> Tough Questions</h3>
                <ul className="space-y-1 text-sm text-foreground">{result.toughQuestions?.map((s, i) => <li key={i}>❓ {s}</li>)}</ul>
              </div>
              <div className="rounded-xl border-2 border-blue-400/40 bg-blue-500/10 p-4">
                <h3 className="font-black text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1"><ArrowRight className="w-4 h-4" /> Next Steps</h3>
                <ul className="space-y-1 text-sm text-foreground">{result.nextSteps?.map((s, i) => <li key={i}>→ {s}</li>)}</ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupPitchSimulator;
