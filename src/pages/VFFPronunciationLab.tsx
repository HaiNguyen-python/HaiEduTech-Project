/**
 * @file VFFPronunciationLab.tsx
 * @description Tone practice + minimal pairs + record-and-score with Web Speech API.
 */
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2, Mic, Square, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { vietnameseTones } from "@/data/vietnamese/vietnameseForForeignersData";
import { vffMinimalPairs, minimalPairCategories } from "@/data/vietnamese/vffMinimalPairs";
import { playVietnameseTts } from "@/lib/vietnameseTts";

const speak = (text: string) => playVietnameseTts(text, { playbackRate: 0.85 }).catch(() => {});

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

function ScoreDisplay({ target, transcript }: { target: string; transcript: string }) {
  const { t } = useLanguage();
  const norm = (s: string) => s.toLowerCase().normalize("NFC").replace(/[.,!?"'-]/g, "").trim();
  const targetW = norm(target).split(/\s+/);
  const spokenW = norm(transcript).split(/\s+/);
  const matched = targetW.filter(w => spokenW.includes(w)).length;
  const pct = targetW.length ? Math.round((matched / targetW.length) * 100) : 0;
  return (
    <div className="mt-3 p-3 rounded-md bg-primary/5 border border-primary/20">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{t("Độ chính xác", "Accuracy")}</span>
        <span className={`text-2xl font-bold ${pct >= 80 ? "text-emerald-500" : pct >= 50 ? "text-amber-500" : "text-red-500"}`}>{pct}%</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {t("Bạn nói", "You said")}: <span className="italic">"{transcript || "..."}"</span>
      </div>
    </div>
  );
}

function RecordButton({ target, onResult }: { target: string; onResult: (t: string) => void }) {
  const { t } = useLanguage();
  const [recording, setRecording] = useState(false);
  const recogRef = useRef<any>(null);

  const start = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert(t("Trình duyệt không hỗ trợ nhận diện giọng nói.", "Speech recognition not supported in this browser.")); return; }
    const r = new SR();
    r.lang = "vi-VN";
    r.interimResults = false;
    r.continuous = false;
    r.onresult = (e: SpeechRecognitionEvent) => {
      const text = (e.results[0][0] as any).transcript ?? "";
      onResult(text);
      setRecording(false);
    };
    r.onerror = () => setRecording(false);
    r.onend = () => setRecording(false);
    r.start();
    recogRef.current = r;
    setRecording(true);
  };

  const stop = () => { recogRef.current?.stop(); setRecording(false); };

  return recording ? (
    <Button size="sm" variant="destructive" onClick={stop}>
      <Square className="w-3.5 h-3.5 mr-1.5 animate-pulse" />{t("Dừng", "Stop")}
    </Button>
  ) : (
    <Button size="sm" onClick={start}>
      <Mic className="w-3.5 h-3.5 mr-1.5" />{t("Ghi âm", "Record")}
    </Button>
  );
}

const VFFPronunciationLab = () => {
  const { t } = useLanguage();
  const [category, setCategory] = useState<string>("tone");
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});

  const setResult = (id: string, text: string) => setTranscripts(p => ({ ...p, [id]: text }));

  const pairs = vffMinimalPairs.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Pronunciation Lab | HaiEduTech" description="Practice Vietnamese tones and minimal pairs with speech recognition scoring." path="/learn-vietnamese/for-foreigners/lab/pronunciation" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Mic className="w-6 h-6 text-emerald-600" />
                <Badge className="bg-emerald-500 text-white">Pronunciation Lab</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-1">{t("Phòng luyện phát âm", "Vietnamese Pronunciation Lab")}</h1>
              <p className="text-muted-foreground">{t("Nghe · Bắt chước · Ghi âm · Chấm điểm tự động.", "Listen · Imitate · Record · Auto-score with speech recognition.")}</p>
            </div>
          </motion.div>

          {/* 6 tones */}
          <Card className="mb-6 border-2 border-emerald-500/25">
            <CardContent className="pt-5">
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                {t("6 Thanh điệu cơ bản", "The 6 Basic Tones")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vietnameseTones.map(tone => (
                  <div key={tone.id} className="p-3 rounded-lg border border-primary/20 bg-background">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">{tone.mark}</div>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => speak(tone.example.split("(")[0].trim())}>
                        <Volume2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="text-xs font-semibold">{tone.nameEn}</div>
                    <div className="text-xs text-muted-foreground italic">{tone.example}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{tone.descriptionEn}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Minimal pairs */}
          <h2 className="font-bold text-lg mb-3">{t("Cặp âm dễ nhầm", "Minimal Pairs")}</h2>
          <Tabs value={category} onValueChange={setCategory} className="mb-4">
            <TabsList className="grid grid-cols-4 w-full">
              {minimalPairCategories.map(c => (
                <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-3">
            {pairs.map(pair => (
              <Card key={pair.id} className="border-primary/20">
                <CardContent className="pt-4">
                  <div className="text-xs font-bold uppercase text-muted-foreground mb-2">{pair.challengeEn}</div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[pair.a, pair.b].map((w, i) => {
                      const id = `${pair.id}-${i}`;
                      return (
                        <div key={i} className="p-3 rounded-md bg-primary/5">
                          <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-primary">{w.word}</div>
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => speak(w.word)}><Volume2 className="w-3 h-3" /></Button>
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground">{w.ipa}</div>
                          <div className="text-xs">{w.meaning}</div>
                          <div className="mt-2">
                            <RecordButton target={w.word} onResult={(t) => setResult(id, t)} />
                          </div>
                          {transcripts[id] && <ScoreDisplay target={w.word} transcript={transcripts[id]} />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-xl p-4 bg-amber-500/10 border border-amber-500/30 text-sm">
            <strong>{t("Mẹo luyện tập:", "Practice tips:")}</strong>{" "}
            {t("Nghe → lặp lại → ghi âm → so sánh. Luyện 5 phút mỗi ngày là bí quyết duy nhất.", "Listen → repeat → record → compare. 5 minutes a day is the only secret.")}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFPronunciationLab;
