import { useState, useRef, useEffect } from "react";
import { Keyboard, Mic, MicOff, CheckCircle2, XCircle, Eye, EyeOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Normalize Chinese text: remove punctuation/whitespace for comparison
const normalize = (s: string) =>
  s.replace(/[\s\p{P}\p{S}]/gu, "").toLowerCase();

const speakChinese = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.6;
    window.speechSynthesis.speak(u);
  }
};

interface Props {
  example: string;
  examplePinyin: string;
}

const HskExamplePractice = ({ example, examplePinyin }: Props) => {
  const [mode, setMode] = useState<"typing" | "voice">("typing");
  const [typed, setTyped] = useState("");
  const [recognized, setRecognized] = useState("");
  const [listening, setListening] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [checked, setChecked] = useState(false);
  const recogRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      try { recogRef.current?.stop?.(); } catch {}
    };
  }, []);

  const target = normalize(example);
  const userText = mode === "typing" ? typed : recognized;
  const userNorm = normalize(userText);
  const isCorrect = checked && userNorm === target && userNorm.length > 0;
  const isWrong = checked && !isCorrect;

  // Char-by-char diff for visual feedback
  const renderDiff = () => {
    if (!checked || !userText) return null;
    const targetChars = Array.from(example.replace(/\s/g, ""));
    const userChars = Array.from(userText.replace(/\s/g, ""));
    return (
      <div className="text-base font-bold mt-2 flex flex-wrap gap-0.5">
        {targetChars.map((c, i) => {
          if (/\p{P}|\p{S}/u.test(c)) {
            return <span key={i} className="text-muted-foreground">{c}</span>;
          }
          const u = userChars[i];
          const ok = u && normalize(u) === normalize(c);
          return (
            <span key={i} className={ok ? "text-green-500" : "text-red-500"}>
              {c}
            </span>
          );
        })}
      </div>
    );
  };

  const startVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Trình duyệt không hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome/Edge.");
      return;
    }
    const recog = new SR();
    recog.lang = "zh-CN";
    recog.interimResults = true;
    recog.continuous = false;
    recog.onresult = (e: any) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      setRecognized(text);
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
    recogRef.current = recog;
    setRecognized("");
    setChecked(false);
    setListening(true);
    recog.start();
  };

  const stopVoice = () => {
    try { recogRef.current?.stop?.(); } catch {}
    setListening(false);
  };

  const handleCheck = () => setChecked(true);

  const handleReset = () => {
    setTyped("");
    setRecognized("");
    setChecked(false);
  };

  return (
    <div className="mt-3 p-3 rounded-lg border border-border bg-background/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          <Button
            type="button"
            variant={mode === "typing" ? "default" : "outline"}
            size="sm"
            className="h-8 px-3 text-sm gap-1 font-semibold"
            onClick={() => { setMode("typing"); handleReset(); }}
          >
            <Keyboard className="w-3.5 h-3.5" /> Gõ
          </Button>
          <Button
            type="button"
            variant={mode === "voice" ? "default" : "outline"}
            size="sm"
            className="h-8 px-3 text-sm gap-1 font-semibold"
            onClick={() => {
              setMode("voice");
              handleReset();
              // Auto-start recording immediately so users don't need a second click
              if (!listening) {
                setTimeout(() => startVoice(), 50);
              }
            }}
          >
            <Mic className="w-3.5 h-3.5" /> Nói
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => speakChinese(example)}
            className="p-1.5 rounded hover:bg-primary/10"
            title="Nghe mẫu"
          >
            <Volume2 className="w-4 h-4 text-primary" />
          </button>
          <button
            type="button"
            onClick={() => setShowHint(s => !s)}
            className="p-1.5 rounded hover:bg-primary/10"
            title="Gợi ý Pinyin"
          >
            {showHint ? <EyeOff className="w-4 h-4 text-primary" /> : <Eye className="w-4 h-4 text-primary" />}
          </button>
        </div>
      </div>

      {showHint && (
        <p className="text-sm text-muted-foreground italic mb-2">{examplePinyin}</p>
      )}

      {mode === "typing" ? (
        <textarea
          value={typed}
          onChange={(e) => { setTyped(e.target.value); setChecked(false); }}
          placeholder="Gõ lại câu Hán tự..."
          rows={2}
          className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-base text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none resize-none"
        />
      ) : (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={listening ? "destructive" : "outline"}
            size="sm"
            className="h-9 gap-1 text-sm"
            onClick={listening ? stopVoice : startVoice}
          >
            {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            {listening ? "Dừng" : "Nói"}
          </Button>
          <p className="text-base text-foreground flex-1 truncate">
            {recognized || <span className="text-muted-foreground italic">Nhấn "Nói" rồi đọc câu...</span>}
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 mt-2">
        <Button type="button" size="sm" className="h-8 text-sm font-semibold" onClick={handleCheck} disabled={!userText}>
          Kiểm tra
        </Button>
        <Button type="button" size="sm" variant="ghost" className="h-8 text-sm" onClick={handleReset}>
          Xóa
        </Button>
        {isCorrect && (
          <span className="flex items-center gap-1 text-sm text-green-500 font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Tuyệt vời!
          </span>
        )}
        {isWrong && (
          <span className="flex items-center gap-1 text-sm text-red-500 font-semibold">
            <XCircle className="w-4 h-4" /> Chưa đúng
          </span>
        )}
      </div>

      {renderDiff()}
    </div>
  );
};

export default HskExamplePractice;
