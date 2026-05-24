/**
 * @file KidsSpeechCheck.tsx
 * @description Tiny mic button that asks the child to repeat the target word.
 * Uses the Web Speech API (SpeechRecognition). Compares the heard text against
 * the target with normalization + Levenshtein tolerance and shows a friendly
 * visual result (✅ correct / ❌ try again / ⚠️ unsupported).
 */
import { useCallback, useRef, useState } from "react";
import { Mic, Square, Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Status = "idle" | "listening" | "correct" | "wrong" | "unsupported";

// Levenshtein for short words
const lev = (a: string, b: string): number => {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
};

const norm = (s: string) => s.toLowerCase().trim().replace(/[^a-z ]/g, "");

interface Props {
  word: string;
  accentColor: string;
}

const KidsSpeechCheck = ({ word, accentColor }: Props) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [heard, setHeard] = useState<string>("");
  const recRef = useRef<any>(null);

  const start = useCallback(() => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setStatus("unsupported");
      return;
    }
    // Stop any prior session
    try { recRef.current?.stop(); } catch { /* noop */ }
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.continuous = false;
    recRef.current = r;
    setHeard("");
    setStatus("listening");

    r.onresult = (e: any) => {
      const target = norm(word);
      const alts: string[] = [];
      for (let i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
      const heardRaw = alts[0] || "";
      setHeard(heardRaw);

      const ok = alts.some((a) => {
        const n = norm(a);
        if (!n) return false;
        // Direct match, contains match, or close edit distance
        if (n === target) return true;
        if (n.split(" ").includes(target)) return true;
        const d = lev(n, target);
        return d <= Math.max(1, Math.floor(target.length / 4));
      });
      setStatus(ok ? "correct" : "wrong");
    };
    r.onerror = () => setStatus("wrong");
    r.onend = () => {
      setStatus((s) => (s === "listening" ? "idle" : s));
    };
    try { r.start(); } catch { setStatus("wrong"); }
  }, [word]);

  const stop = useCallback(() => {
    try { recRef.current?.stop(); } catch { /* noop */ }
    setStatus("idle");
  }, []);

  const tip =
    status === "listening" ? t("Đang nghe…", "Listening…") :
    status === "correct"   ? t("Chuẩn rồi! 🎉", "Perfect! 🎉") :
    status === "wrong"     ? t(`Thử lại nhé`, `Try again`) :
    status === "unsupported" ? t("Trình duyệt không hỗ trợ mic", "Mic not supported") :
    t("Bấm để nói", "Tap to speak");

  const bgByStatus =
    status === "correct" ? "#10B981" :
    status === "wrong"   ? "#F43F5E" :
    status === "listening" ? accentColor :
    "#FFFFFF";

  const fgByStatus =
    status === "correct" || status === "wrong" || status === "listening" ? "#FFFFFF" : accentColor;

  const Icon =
    status === "correct" ? Check :
    status === "wrong"   ? X :
    status === "listening" ? Square :
    Mic;

  return (
    <div className="mt-2 flex items-center gap-2">
      <button
        type="button"
        onClick={status === "listening" ? stop : start}
        disabled={status === "unsupported"}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide border-2 transition-all shadow-sm"
        style={{
          background: bgByStatus,
          color: fgByStatus,
          borderColor: accentColor,
        }}
        aria-label="Practice pronunciation"
      >
        <Icon className={`w-3.5 h-3.5 ${status === "listening" ? "animate-pulse" : ""}`} />
        {status === "listening" ? t("Dừng", "Stop") : t("Đọc theo", "Say it")}
      </button>
      <span className="text-[11px] font-semibold text-slate-600">
        {tip}
        {heard && status === "wrong" && (
          <span className="ml-1 text-slate-500">· {t("Nghe được", "Heard")}: "{heard}"</span>
        )}
      </span>
    </div>
  );
};

export default KidsSpeechCheck;
