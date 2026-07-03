/**
 * @file VFFWritingLab.tsx
 * @description Diacritic typing drills, sentence builder, and AI writing grader.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, PenLine, CheckCircle2, XCircle, Shuffle, Type, Blocks, Sparkles, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const diacriticDrills = [
  { plain: "cam on", target: "cảm ơn", en: "thank you", telex: "car mown" },
  { plain: "chao ban", target: "chào bạn", en: "hello friend", telex: "chaof banj" },
  { plain: "toi ten la", target: "tôi tên là", en: "my name is", telex: "toir teen laf" },
  { plain: "bao nhieu tien", target: "bao nhiêu tiền", en: "how much money", telex: "bao nhieeu tieenf" },
  { plain: "khong hieu", target: "không hiểu", en: "don't understand", telex: "khoong hieeur" },
  { plain: "co the giup toi", target: "có thể giúp tôi", en: "can you help me", telex: "cos thees giups toir" },
  { plain: "toi la nguoi My", target: "tôi là người Mỹ", en: "I'm American", telex: "toir laf nguwowfi Myz" },
  { plain: "xin loi toi tre", target: "xin lỗi tôi trễ", en: "sorry I'm late", telex: "xin loiix toir trees" },
];

const sentenceBuilder = [
  { words: ["Tôi", "muốn", "ăn", "phở", "bò"], target: "Tôi muốn ăn phở bò", en: "I want to eat beef pho" },
  { words: ["Cho", "tôi", "một", "cà phê", "sữa", "đá"], target: "Cho tôi một cà phê sữa đá", en: "Give me one iced milk coffee" },
  { words: ["Đi", "thẳng", "rồi", "rẽ", "trái"], target: "Đi thẳng rồi rẽ trái", en: "Go straight then turn left" },
  { words: ["Tôi", "bị", "sốt", "từ", "hôm qua"], target: "Tôi bị sốt từ hôm qua", en: "I've had fever since yesterday" },
  { words: ["Bao", "nhiêu", "tiền", "một", "ký"], target: "Bao nhiêu tiền một ký", en: "How much per kilogram" },
];

const DiacriticDrill = () => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const d = diacriticDrills[idx];

  const normalized = input.trim().toLowerCase();
  const correct = normalized === d.target.toLowerCase();

  const next = () => {
    setInput(""); setChecked(false);
    setIdx(i => (i + 1) % diacriticDrills.length);
  };

  return (
    <Card>
      <CardContent className="pt-5 space-y-4">
        <div className="text-xs text-muted-foreground">{t(`Câu ${idx + 1} / ${diacriticDrills.length}`, `Sentence ${idx + 1} / ${diacriticDrills.length}`)}</div>
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">{t("Gõ có dấu:", "Type with diacritics:")}</div>
          <div className="text-2xl font-bold">{d.plain}</div>
          <div className="text-sm text-muted-foreground mt-1">{d.en}</div>
          <div className="text-xs text-amber-600 mt-2">💡 Telex: <code className="font-mono">{d.telex}</code></div>
        </div>
        <Input value={input} onChange={e => setInput(e.target.value)}
          placeholder={t("Gõ câu có dấu ở đây (Telex, VNI hoặc copy dấu)…", "Type with diacritics here (Telex, VNI, or copy accents)…")}
          disabled={checked} className="text-lg" />
        {!checked ? (
          <Button onClick={() => setChecked(true)} disabled={!input.trim()} className="w-full">
            {t("Chấm điểm", "Check")}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border-2 ${correct ? "border-emerald-500 bg-emerald-500/10" : "border-red-500 bg-red-500/10"}`}>
              {correct ? (
                <div className="text-emerald-600 font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{t("Chính xác!", "Correct!")}</div>
              ) : (
                <>
                  <div className="text-red-600 font-bold flex items-center gap-2"><XCircle className="w-4 h-4" />{t("Chưa đúng", "Not quite")}</div>
                  <div className="mt-1 text-sm">
                    {t("Bạn gõ:", "You typed:")} <code>{input}</code>
                  </div>
                  <div className="text-sm">
                    {t("Đáp án:", "Answer:")} <strong>{d.target}</strong>
                  </div>
                </>
              )}
            </div>
            <Button onClick={next} variant="outline" className="w-full"><Shuffle className="w-3.5 h-3.5 mr-2" />{t("Câu tiếp theo", "Next sentence")}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const SentenceBuilder = () => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const s = sentenceBuilder[idx];

  useMemo(() => {
    const shuffled = [...s.words].sort(() => Math.random() - 0.5);
    setPool(shuffled); setChosen([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const pick = (w: string, i: number) => {
    setChosen(c => [...c, w]);
    setPool(p => p.filter((_, pi) => pi !== i));
  };
  const unpick = (i: number) => {
    setPool(p => [...p, chosen[i]]);
    setChosen(c => c.filter((_, ci) => ci !== i));
  };
  const built = chosen.join(" ");
  const correct = built === s.target;

  return (
    <Card>
      <CardContent className="pt-5 space-y-4">
        <div className="text-xs text-muted-foreground">{t(`Câu ${idx + 1} / ${sentenceBuilder.length}`, `Sentence ${idx + 1} / ${sentenceBuilder.length}`)}</div>
        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
          <div className="text-xs font-bold uppercase text-muted-foreground mb-1">{t("Ghép câu:", "Build the sentence:")}</div>
          <div className="text-lg font-semibold">{s.en}</div>
        </div>

        <div className="min-h-16 p-3 rounded-lg border-2 border-dashed border-primary/40 flex flex-wrap gap-2">
          {chosen.length === 0 && <span className="text-xs text-muted-foreground">{t("Nhấn từ ở dưới để ghép câu", "Tap words below to build")}</span>}
          {chosen.map((w, i) => (
            <button key={i} onClick={() => unpick(i)} className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-sm font-semibold">{w}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {pool.map((w, i) => (
            <button key={i} onClick={() => pick(w, i)} className="px-3 py-1.5 rounded border-2 border-muted hover:border-primary text-sm">{w}</button>
          ))}
        </div>

        {pool.length === 0 && (
          <div className={`p-3 rounded-lg border-2 ${correct ? "border-emerald-500 bg-emerald-500/10" : "border-amber-500 bg-amber-500/10"}`}>
            {correct ? (
              <div className="text-emerald-600 font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{t("Hoàn hảo!", "Perfect!")}</div>
            ) : (
              <>
                <div className="font-bold text-amber-700">{t("Sai thứ tự", "Wrong order")}</div>
                <div className="text-sm mt-1">{t("Đúng:", "Correct:")} <strong>{s.target}</strong></div>
              </>
            )}
          </div>
        )}
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setChosen([]); setPool([...s.words].sort(() => Math.random() - 0.5)); }} className="flex-1">
            <Shuffle className="w-3.5 h-3.5 mr-2" />{t("Xáo lại", "Shuffle")}
          </Button>
          <Button onClick={() => setIdx(i => (i + 1) % sentenceBuilder.length)} className="flex-1">
            {t("Câu kế", "Next")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AI_PROMPTS = [
  { id: "self", vi: "Giới thiệu bản thân (30-60 từ): tên, tuổi, quốc tịch, nghề nghiệp.", en: "Self-intro (30-60 words): name, age, nationality, job." },
  { id: "market", vi: "Kể lại một lần bạn đi chợ ở Việt Nam (50-100 từ).", en: "Describe a market trip in Vietnam (50-100 words)." },
  { id: "weekend", vi: "Kế hoạch cuối tuần của bạn (40-80 từ).", en: "Your weekend plans (40-80 words)." },
];

interface GradeResult {
  scores?: { diacritics: number; grammar: number; vocabulary: number; coherence: number };
  overall?: number;
  summary_vi?: string;
  summary_en?: string;
  corrections?: { original: string; suggestion: string; reason_en: string }[];
}

const AIGrader = () => {
  const { t } = useLanguage();
  const [promptId, setPromptId] = useState(AI_PROMPTS[0].id);
  const [text, setText] = useState("");
  const [level, setLevel] = useState<"A1" | "A2" | "B1">("A1");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);

  const submit = async () => {
    if (!text.trim() || busy) return;
    setBusy(true); setResult(null);
    try {
      const prompt = AI_PROMPTS.find(p => p.id === promptId)!;
      const { data, error } = await supabase.functions.invoke("vff-writing-grade", {
        body: { prompt: `${prompt.vi} / ${prompt.en}`, text, level },
      });
      if (error) throw error;
      if (data?.error === "rate_limit") { toast.error(t("Quá nhiều yêu cầu, thử lại sau.", "Too many requests.")); return; }
      if (data?.error === "credits") { toast.error(t("Hết credit AI.", "AI credits exhausted.")); return; }
      if (data?.error) { toast.error(t("Lỗi AI", "AI error")); return; }
      setResult(data as GradeResult);
      // Save to cloud if signed in (best-effort)
      const { data: sess } = await supabase.auth.getSession();
      if (sess.session?.user.id) {
        await supabase.from("vff_writing_submissions").insert({
          user_id: sess.session.user.id,
          prompt: `${prompt.vi} / ${prompt.en}`,
          learner_text: text,
          scores: (data.scores || {}) as never,
          feedback: { corrections: data.corrections || [], summary_vi: data.summary_vi, summary_en: data.summary_en } as never,
          overall_score: data.overall ?? null,
          level,
        });
      }
    } catch {
      toast.error(t("Lỗi kết nối", "Connection error"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="border-2 border-fuchsia-500/25">
      <CardContent className="pt-5 space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1 block">{t("Đề bài", "Prompt")}</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {AI_PROMPTS.map(p => (
              <Button key={p.id} size="sm" variant={promptId === p.id ? "default" : "outline"} onClick={() => setPromptId(p.id)}>
                {t(p.vi.slice(0, 20) + "...", p.en.slice(0, 20) + "...")}
              </Button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">{t(AI_PROMPTS.find(p => p.id === promptId)!.vi, AI_PROMPTS.find(p => p.id === promptId)!.en)}</div>
        </div>
        <div className="flex gap-2">
          {(["A1", "A2", "B1"] as const).map(l => (
            <Button key={l} size="sm" variant={level === l ? "default" : "outline"} onClick={() => setLevel(l)}>{l}</Button>
          ))}
        </div>
        <Textarea rows={6} value={text} onChange={e => setText(e.target.value)} placeholder={t("Viết bằng tiếng Việt có dấu...", "Write in Vietnamese with diacritics...")} />
        <Button onClick={submit} disabled={busy || !text.trim()} className="w-full">
          {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("AI đang chấm...", "Grading...")}</> : <><Sparkles className="w-4 h-4 mr-2" />{t("Chấm bài", "Grade my writing")}</>}
        </Button>

        {result && (
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-primary/10 border">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">{t("Điểm tổng", "Overall")}</div>
                <div className="text-4xl font-black bg-gradient-to-r from-fuchsia-500 to-primary bg-clip-text text-transparent">{result.overall ?? "-"}/10</div>
              </div>
              {result.scores && (
                <div className="grid grid-cols-4 gap-2 mt-3 text-center text-xs">
                  {Object.entries(result.scores).map(([k, v]) => (
                    <div key={k}><Badge variant="outline">{v}/10</Badge><div className="mt-1 capitalize">{k}</div></div>
                  ))}
                </div>
              )}
            </div>
            {result.summary_en && <div className="text-sm p-3 rounded-lg bg-muted"><strong>Feedback:</strong> {result.summary_en}<div className="italic text-xs mt-1 text-muted-foreground">{result.summary_vi}</div></div>}
            {result.corrections && result.corrections.length > 0 && (
              <div>
                <div className="text-sm font-semibold mb-2">{t("Sửa lỗi", "Corrections")}</div>
                <ul className="space-y-2">
                  {result.corrections.map((c, i) => (
                    <li key={i} className="p-2.5 rounded-lg border-2 border-amber-500/30 bg-amber-500/5 text-sm">
                      <div className="line-through text-red-600">{c.original}</div>
                      <div className="text-emerald-600 font-medium">→ {c.suggestion}</div>
                      <div className="text-xs text-muted-foreground italic mt-1">{c.reason_en}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};



const VFFWritingLab = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Writing Lab | HaiEduTech" description="Practice Vietnamese diacritics and sentence structure with typing drills and sentence builders." path="/learn-vietnamese/for-foreigners/lab/writing" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 border border-fuchsia-500/20 mb-6">
            <PenLine className="w-10 h-10 text-fuchsia-600 mb-2" />
            <h1 className="text-3xl font-bold mb-1">{t("Phòng luyện viết", "Writing Lab")}</h1>
            <p className="text-muted-foreground">{t("Gõ có dấu (Telex/VNI) và ghép câu để làm quen cú pháp.", "Type with diacritics (Telex/VNI) and build sentences to master word order.")}</p>
          </div>

          <Tabs defaultValue="diacritic">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="diacritic"><Type className="w-4 h-4 mr-2" />{t("Gõ dấu", "Diacritics")}</TabsTrigger>
              <TabsTrigger value="builder"><Blocks className="w-4 h-4 mr-2" />{t("Ghép câu", "Builder")}</TabsTrigger>
              <TabsTrigger value="ai"><Sparkles className="w-4 h-4 mr-2" />{t("AI chấm", "AI Grader")}</TabsTrigger>
            </TabsList>
            <TabsContent value="diacritic" className="mt-4"><DiacriticDrill /></TabsContent>
            <TabsContent value="builder" className="mt-4"><SentenceBuilder /></TabsContent>
            <TabsContent value="ai" className="mt-4"><AIGrader /></TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFWritingLab;
