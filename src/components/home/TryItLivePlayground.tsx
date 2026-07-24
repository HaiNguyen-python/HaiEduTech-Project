/**
 * @file TryItLivePlayground.tsx
 * @description Two-tab interactive teaser: Language AI waveform + Python snippet toggle.
 * Zero runtime dependencies beyond existing shadcn Tabs. Uses Web Speech API for demo.
 */
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mic, Play, Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PY_SNIPPETS = {
  ingest: `# Ingest raw student events from Lovable Cloud
import pandas as pd
from lovable_cloud import fetch

events = fetch("student_activity_log", limit=10_000)
df = pd.DataFrame(events)
df["ts"] = pd.to_datetime(df["created_at"])
print(df.head())`,
  transform: `# Transform to daily mastery signal for the RL engine
daily = (
    df.groupby([df["user_id"], df["ts"].dt.date])
      .agg(minutes=("time_spent_seconds", "sum"),
           mastered=("was_correct", "mean"))
      .reset_index()
)
daily["minutes"] = daily["minutes"] / 60
daily.to_parquet("mart/daily_mastery.parquet")`,
};

const TryItLivePlayground = () => {
  const { t } = useLanguage();
  const [snippet, setSnippet] = useState<"ingest" | "transform">("ingest");
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const sample = t("Xin chào, tôi đang học tiếng Việt.", "Hei, minä opiskelen suomea.");

  const playSample = () => {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(sample);
    u.lang = t("vi", "en") === "vi" ? "vi-VN" : "fi-FI";
    u.rate = 0.9;
    setSpeaking(true);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(PY_SNIPPETS[snippet]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      className="relative py-16 sm:py-20"
      style={{ contentVisibility: "auto", containIntrinsicSize: "600px" } as any}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Thử ", "Try It ")}
            <span className="text-gradient">{t("Ngay", "Live")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
            {t(
              "Nếm thử hai công cụ AI - chạy ngay trong trình duyệt.",
              "Sample two AI tools - running right in your browser."
            )}
          </p>
        </div>

        <Tabs defaultValue="lang" className="mx-auto w-full max-w-3xl">
          <TabsList className="mx-auto mb-6 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="lang">{t("Language AI", "Language AI")}</TabsTrigger>
            <TabsTrigger value="py">{t("Data / Python", "Data / Python")}</TabsTrigger>
          </TabsList>

          <TabsContent value="lang">
            <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {t("Mẫu câu", "Sample sentence")}
                  </div>
                  <div className="font-display text-lg font-semibold text-foreground">"{sample}"</div>
                </div>
                <button
                  type="button"
                  onClick={playSample}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:brightness-110"
                >
                  <Play className="h-4 w-4" />
                  {t("Nghe mẫu", "Listen Sample")}
                </button>
              </div>

              {/* Waveform simulator */}
              <div className="flex h-24 items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-background/60 p-4">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="wave-bar block w-1.5 rounded-full bg-gradient-to-t from-primary to-emerald-500"
                    style={{
                      animationDelay: `${i * 60}ms`,
                      animationPlayState: speaking ? "running" : "paused",
                      height: speaking ? undefined : "8px",
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-medium text-emerald-600 dark:text-emerald-400">
                  <Mic className="h-3 w-3" />
                  {t("Độ chính xác âm điệu: 92%", "Tone accuracy: 92%")}
                </span>
                <span>{t("Mô phỏng - đăng nhập để nhận phản hồi thật.", "Demo - sign in for real-time feedback.")}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="py">
            <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="inline-flex rounded-lg border border-border/60 bg-background/60 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setSnippet("ingest")}
                    className={`rounded-md px-3 py-1.5 font-medium transition-colors ${snippet === "ingest" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {t("Ingest", "Ingest")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSnippet("transform")}
                    className={`rounded-md px-3 py-1.5 font-medium transition-colors ${snippet === "transform" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {t("Transform", "Transform")}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={copySnippet}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? t("Đã chép", "Copied") : t("Chép", "Copy")}
                </button>
              </div>

              <pre className="overflow-x-auto rounded-xl border border-border/60 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100">
                <code className="whitespace-pre">{PY_SNIPPETS[snippet]}</code>
              </pre>

              <p className="mt-3 text-xs text-muted-foreground">
                {t(
                  "Pipeline mẫu cho EdTech - từ log hoạt động đến tín hiệu mastery hằng ngày.",
                  "Sample EdTech pipeline - from activity log to daily mastery signal."
                )}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style>{`
        .wave-bar {
          height: 8px;
          animation: wave-pulse 900ms ease-in-out infinite alternate;
          will-change: transform;
          transform-origin: center;
        }
        @keyframes wave-pulse {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(3.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-bar { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default TryItLivePlayground;
