/**
 * @file VFFRoleplayAI.tsx
 * @description Live AI roleplay - speak Vietnamese, get natural NPC replies via Gemini Flash.
 */
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, MicOff, Loader2, Send, Lightbulb, RefreshCw, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { playVietnameseTts } from "@/lib/vietnameseTts";
import { toast } from "sonner";

const SCENARIOS = [
  { id: "pho", emoji: "🍜", vi: "Cô bán phở", en: "Phở vendor", opening: "Cháu ăn gì?" },
  { id: "grab", emoji: "🛵", vi: "Anh Grab", en: "Grab driver", opening: "Em đi đâu?" },
  { id: "hotel", emoji: "🏨", vi: "Lễ tân khách sạn", en: "Hotel reception", opening: "Chào anh/chị, em giúp gì được ạ?" },
  { id: "doctor", emoji: "🩺", vi: "Bác sĩ", en: "Doctor", opening: "Bạn thấy trong người thế nào?" },
  { id: "police", emoji: "👮", vi: "Cảnh sát", en: "Traffic police", opening: "Cho xem giấy tờ." },
];

type Msg = { role: "user" | "assistant"; content: string; hint?: string };

const VFFRoleplayAI = () => {
  const { t } = useLanguage();
  const [scenarioId, setScenarioId] = useState("pho");
  const scenario = SCENARIOS.find(s => s.id === scenarioId)!;
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const recogRef = useRef<any>(null);

  useEffect(() => {
    setMessages([{ role: "assistant", content: scenario.opening }]);
    playVietnameseTts(scenario.opening, { playbackRate: 0.95 }).catch(() => {});
  }, [scenarioId, scenario.opening]);

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    const userMsg: Msg = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("vff-roleplay-ai", {
        body: { scenario: scenarioId, userMessage: text, history: history.map(m => ({ role: m.role, content: m.content })) },
      });
      if (error) throw error;
      if (data?.error === "rate_limit") { toast.error(t("Quá nhiều yêu cầu, thử lại sau ít phút.", "Too many requests, try again shortly.")); return; }
      if (data?.error === "credits") { toast.error(t("Hết credit AI - liên hệ admin.", "AI credits exhausted - contact admin.")); return; }
      if (data?.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply, hint: data.hint }]);
        playVietnameseTts(data.reply, { playbackRate: 0.95 }).catch(() => {});
      }
    } catch (e) {
      toast.error(t("Lỗi kết nối AI", "AI connection error"));
    } finally {
      setBusy(false);
    }
  };

  const startListen = () => {
    const W = window as any;
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!SR) { toast.error(t("Trình duyệt không hỗ trợ mic. Dùng Chrome.", "Browser doesn't support mic. Use Chrome.")); return; }
    const r = new SR();
    r.lang = "vi-VN"; r.interimResults = false; r.maxAlternatives = 1;
    r.onresult = (e: SpeechRecognitionEvent) => { const txt = e.results[0][0].transcript; setInput(txt); send(txt); };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recogRef.current = r; r.start(); setListening(true);
  };
  const stopListen = () => { recogRef.current?.stop(); setListening(false); };

  const reset = () => setMessages([{ role: "assistant", content: scenario.opening }]);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="AI Vietnamese Roleplay | HaiEduTech" description="Practice real Vietnamese conversations with an AI partner - order phở, take a Grab, check into a hotel, visit a doctor." path="/learn-vietnamese/for-foreigners/lab/roleplay-ai" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-rose-500/20 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-rose-500" />
              <div>
                <h1 className="text-2xl font-bold">{t("Đóng vai với AI", "AI Roleplay")}</h1>
                <p className="text-sm text-muted-foreground">{t("Nói tiếng Việt tự nhiên - AI đóng vai người bản xứ.", "Speak natural Vietnamese - the AI plays a native.")}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {SCENARIOS.map(s => (
              <Button key={s.id} size="sm" variant={s.id === scenarioId ? "default" : "outline"} onClick={() => setScenarioId(s.id)}>
                <span className="mr-1">{s.emoji}</span>{t(s.vi, s.en)}
              </Button>
            ))}
          </div>

          <Card className="border-2 border-rose-500/25">
            <CardContent className="pt-5">
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {messages.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "flex justify-end" : "flex items-start gap-2"}>
                    {m.role === "assistant" && <Badge variant="secondary" className="mt-1">{scenario.emoji}</Badge>}
                    <div className={`inline-block max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <div>{m.content}</div>
                      {m.hint && (
                        <div className="mt-1.5 text-[11px] italic opacity-80 flex items-start gap-1">
                          <Lightbulb className="w-3 h-3 mt-0.5 shrink-0" />{m.hint}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {busy && <div className="text-xs text-muted-foreground flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" />{t("AI đang trả lời...", "AI is thinking...")}</div>}
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="icon" variant={listening ? "destructive" : "outline"} onClick={listening ? stopListen : startListen} disabled={busy} aria-label="Mic">
                  {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Input value={input} onChange={e => setInput(e.target.value)} placeholder={t("Gõ tiếng Việt hoặc bấm mic...", "Type Vietnamese or tap the mic...")} onKeyDown={e => e.key === "Enter" && send(input)} disabled={busy} />
                <Button size="icon" onClick={() => send(input)} disabled={busy || !input.trim()} aria-label="Send"><Send className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={reset} aria-label="Reset"><RefreshCw className="w-4 h-4" /></Button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">{t("Mẹo: nói chậm, dùng câu ngắn. AI sẽ gợi ý bản dịch tiếng Anh dưới mỗi câu.", "Tip: speak slowly, short sentences. AI shows an English hint under each reply.")}</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFRoleplayAI;
