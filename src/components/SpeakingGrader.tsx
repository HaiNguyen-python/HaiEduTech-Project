import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Play, Square, RotateCcw, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// IELTS Speaking question bank
const questionBank = {
  part1: [
    { topic: "Work & Study", q: "Do you work or are you a student?" },
    { topic: "Hometown", q: "Can you describe your hometown?" },
    { topic: "Daily Routine", q: "What does a typical day look like for you?" },
    { topic: "Hobbies", q: "What do you enjoy doing in your free time?" },
    { topic: "Food", q: "What kind of food do you like?" },
    { topic: "Weather", q: "What's the weather like in your country?" },
    { topic: "Reading", q: "Do you like reading books? What kind?" },
    { topic: "Music", q: "What type of music do you enjoy listening to?" },
  ],
  part2: [
    {
      topic: "A memorable trip",
      q: "Describe a memorable trip you have taken.",
      prompts: ["Where you went", "Who you went with", "What you did there", "Why it was memorable"],
    },
    {
      topic: "A person you admire",
      q: "Describe a person you admire.",
      prompts: ["Who this person is", "How you know them", "What they do", "Why you admire them"],
    },
    {
      topic: "A skill you learned",
      q: "Describe a skill you learned recently.",
      prompts: ["What the skill is", "How you learned it", "How long it took", "How it has helped you"],
    },
    {
      topic: "An important event",
      q: "Describe an important event in your life.",
      prompts: ["What happened", "When it happened", "Who was involved", "Why it was important"],
    },
  ],
  part3: [
    { topic: "Education", q: "How has technology changed the way people learn?" },
    { topic: "Environment", q: "What can individuals do to protect the environment?" },
    { topic: "Culture", q: "How important is it to preserve traditional culture?" },
    { topic: "Future", q: "How do you think AI will affect jobs in the future?" },
    { topic: "Travel", q: "Why do people enjoy traveling to new places?" },
    { topic: "Health", q: "What are the benefits of regular physical exercise?" },
  ],
};

interface SpeakingResult {
  overall: number;
  criteria: { label: string; score: number; feedback: string }[];
  transcript: string;
  suggestions: string[];
}

const SpeakingGrader = () => {
  const { t } = useLanguage();
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3>(1);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeakingResult | null>(null);
  const [showQuestions, setShowQuestions] = useState(true);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const currentQuestions =
    selectedPart === 1 ? questionBank.part1 :
    selectedPart === 2 ? questionBank.part2 :
    questionBank.part3;

  const currentQ = currentQuestions[selectedQuestion];

  // Cleanup audio URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setIsRecording(true);
      setResult(null);
      setTimer(0);
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } catch {
      alert(t("Vui lòng cho phép truy cập microphone", "Please allow microphone access"));
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetRecording = () => {
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setTimer(0);
    setResult(null);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleGrade = async () => {
    if (!audioBlob) return;
    setLoading(true);

    // Mock grading - simulates AI response
    await new Promise((r) => setTimeout(r, 2500));

    setResult({
      overall: 6.0,
      criteria: [
        {
          label: "Fluency & Coherence",
          score: 6.0,
          feedback: t(
            "Nói khá trôi chảy nhưng có một số lần ngập ngừng. Cần cải thiện cách nối ý giữa các câu.",
            "Fairly fluent but with some hesitation. Need to improve linking ideas between sentences."
          ),
        },
        {
          label: "Lexical Resource",
          score: 6.0,
          feedback: t(
            "Từ vựng đủ dùng nhưng thiếu đa dạng. Nên sử dụng thêm collocations và idioms phù hợp.",
            "Adequate vocabulary but lacks variety. Should use more collocations and appropriate idioms."
          ),
        },
        {
          label: "Grammatical Range & Accuracy",
          score: 6.0,
          feedback: t(
            "Sử dụng được câu phức cơ bản. Có một số lỗi nhỏ về thì và mạo từ.",
            "Uses basic complex sentences. Some minor errors with tenses and articles."
          ),
        },
        {
          label: "Pronunciation",
          score: 6.0,
          feedback: t(
            "Phát âm rõ ràng nhưng cần cải thiện ngữ điệu và trọng âm từ.",
            "Clear pronunciation but needs improvement in intonation and word stress."
          ),
        },
      ],
      transcript: t(
        "(Phiên âm tự động sẽ hiển thị ở đây khi kết nối AI backend thực tế)",
        "(Automatic transcript will appear here when connected to a real AI backend)"
      ),
      suggestions: [
        t("Luyện nói liên tục 2 phút không ngừng cho Part 2", "Practice speaking for 2 minutes non-stop for Part 2"),
        t("Sử dụng thêm linking words: However, Furthermore, In addition", "Use more linking words: However, Furthermore, In addition"),
        t("Ghi âm và nghe lại để phát hiện lỗi phát âm", "Record and listen back to spot pronunciation errors"),
        t("Học thêm collocations theo chủ đề thường gặp", "Learn more topic-specific collocations"),
      ],
    });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Part selector */}
      <div className="flex gap-2">
        {([1, 2, 3] as const).map((p) => (
          <button
            key={p}
            onClick={() => { setSelectedPart(p); setSelectedQuestion(0); resetRecording(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPart === p
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-secondary text-secondary-foreground hover:bg-primary/5"
            }`}
          >
            Part {p}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Questions + Recording */}
        <div className="space-y-4">
          {/* Question bank */}
          <div className="glass-card rounded-xl p-4">
            <button
              onClick={() => setShowQuestions(!showQuestions)}
              className="w-full flex items-center justify-between mb-2"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {t(`Câu hỏi Part ${selectedPart}`, `Part ${selectedPart} Questions`)}
              </h3>
              {showQuestions ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
            <AnimatePresence>
              {showQuestions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  {currentQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedQuestion(i); resetRecording(); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                        selectedQuestion === i
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-secondary text-secondary-foreground hover:bg-primary/5"
                      }`}
                    >
                      <span className="font-medium">{q.topic}:</span> {q.q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Current question display */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                Part {selectedPart}
              </span>
              <span className="text-xs text-muted-foreground">{currentQ.topic}</span>
            </div>
            <p className="text-sm font-medium text-foreground mb-3">{currentQ.q}</p>
            {selectedPart === 2 && "prompts" in currentQ && (
              <div className="space-y-1 mb-3">
                <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                  {t("Bạn nên nói về:", "You should say:")}
                </p>
                {(currentQ as any).prompts.map((p: string, i: number) => (
                  <p key={i} className="text-xs text-secondary-foreground flex items-center gap-1.5">
                    <span className="text-primary">•</span> {p}
                  </p>
                ))}
              </div>
            )}

            {/* Recording controls */}
            <div className="flex flex-col items-center gap-4 pt-4 border-t border-border">
              {/* Timer */}
              <div className="text-2xl font-mono font-bold text-foreground">
                {formatTime(timer)}
              </div>

              {/* Waveform placeholder */}
              {isRecording && (
                <div className="flex items-center gap-0.5 h-8">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary rounded-full"
                      animate={{
                        height: [4, Math.random() * 28 + 4, 4],
                      }}
                      transition={{
                        duration: 0.5 + Math.random() * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                {!isRecording && !audioBlob && (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all"
                  >
                    <Mic className="w-5 h-5" />
                    {t("Bắt đầu ghi âm", "Start Recording")}
                  </button>
                )}

                {isRecording && (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-destructive text-destructive-foreground font-semibold hover:brightness-110 transition-all animate-pulse"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    {t("Dừng ghi âm", "Stop Recording")}
                  </button>
                )}

                {audioBlob && !isRecording && (
                  <>
                    <button
                      onClick={resetRecording}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-primary/5 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t("Ghi lại", "Re-record")}
                    </button>
                    <button
                      onClick={handleGrade}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-50 hover:brightness-110 transition-all"
                    >
                      {loading ? (
                        <motion.div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                      {loading ? t("Đang chấm...", "Grading...") : t("Chấm điểm", "Grade")}
                    </button>
                  </>
                )}
              </div>

              {/* Audio playback */}
              {audioUrl && (
                <div className="w-full flex items-center gap-2 p-2 rounded-lg bg-secondary">
                  <Volume2 className="w-4 h-4 text-primary shrink-0" />
                  <audio src={audioUrl} controls className="w-full h-8" style={{ minHeight: 32 }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Result panel */}
        <div className="glass-card rounded-xl p-6">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Mic className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground">
                {t("Ghi âm và chấm điểm để xem phản hồi AI", "Record and grade to see AI feedback")}
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <motion.div
                className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-sm text-muted-foreground">{t("AI đang phân tích bài nói...", "AI is analyzing your speaking...")}</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4 overflow-y-auto max-h-[600px]">
              {/* Overall score */}
              <div className="bg-secondary rounded-lg p-4 text-center">
                <span className="text-sm text-muted-foreground">{t("Điểm Speaking", "Speaking Score")}</span>
                <div className="text-4xl font-display font-bold text-primary mt-1">{result.overall}</div>
              </div>

              {/* Criteria breakdown */}
              <div className="space-y-2">
                {result.criteria.map((c) => (
                  <div key={c.label} className="bg-secondary rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">{c.label}</span>
                      <span className="text-xs font-mono font-bold text-primary">{c.score}</span>
                    </div>
                    {/* Score bar */}
                    <div className="w-full h-1.5 bg-border rounded-full mb-2">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.score / 9) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{c.feedback}</p>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-primary mb-2">{t("Gợi ý cải thiện", "Improvement Suggestions")}</h4>
                <div className="space-y-1.5">
                  {result.suggestions.map((s, i) => (
                    <p key={i} className="text-xs text-secondary-foreground flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">→</span> {s}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakingGrader;
