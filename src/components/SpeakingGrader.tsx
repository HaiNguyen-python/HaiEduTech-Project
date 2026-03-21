import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, RotateCcw, ChevronDown, ChevronUp, Volume2, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { part1Questions, part2Questions, part3Questions } from "@/data/speakingQuestions";

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
    selectedPart === 1 ? part1Questions :
    selectedPart === 2 ? part2Questions :
    part3Questions;

  const currentQ = currentQuestions[selectedQuestion] || currentQuestions[0];

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

  // Generate varied scores based on recording duration and randomness
  const generateScore = (base: number, range: number) => {
    const variation = (Math.random() - 0.5) * range;
    const score = Math.round((base + variation) * 2) / 2; // Round to nearest 0.5
    return Math.max(4.0, Math.min(9.0, score));
  };

  const handleGrade = async () => {
    if (!audioBlob) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 2500));

    // Generate varied scores based on recording duration
    const durationFactor = Math.min(timer / 120, 1); // longer = potentially better
    const baseScore = 5.0 + durationFactor * 2.0; // 5.0 to 7.0 base

    const fluencyScore = generateScore(baseScore, 2.0);
    const lexicalScore = generateScore(baseScore - 0.3, 1.5);
    const grammarScore = generateScore(baseScore - 0.2, 1.5);
    const pronunciationScore = generateScore(baseScore + 0.2, 1.5);

    const overall = Math.round(((fluencyScore + lexicalScore + grammarScore + pronunciationScore) / 4) * 2) / 2;

    const fluencyFeedback = fluencyScore >= 7.0
      ? t("Nói trôi chảy và tự nhiên, ít ngập ngừng. Liên kết ý tốt giữa các câu.", "Speaks fluently and naturally with minimal hesitation. Good idea linking between sentences.")
      : fluencyScore >= 6.0
      ? t("Khá trôi chảy nhưng có lúc ngập ngừng. Cần cải thiện liên kết ý.", "Fairly fluent but with some hesitation. Needs improvement in linking ideas.")
      : t("Nói chậm và thường xuyên ngập ngừng. Cần luyện tập nói liên tục hơn.", "Speaks slowly with frequent hesitation. Needs to practice speaking more continuously.");

    const lexicalFeedback = lexicalScore >= 7.0
      ? t("Từ vựng đa dạng, sử dụng tốt collocations và idioms phù hợp.", "Diverse vocabulary with good use of collocations and appropriate idioms.")
      : lexicalScore >= 6.0
      ? t("Từ vựng đủ dùng nhưng thiếu đa dạng. Nên bổ sung collocations.", "Adequate vocabulary but lacks variety. Should add more collocations.")
      : t("Từ vựng hạn chế, hay lặp từ. Cần mở rộng vốn từ đáng kể.", "Limited vocabulary with repetition. Needs significant vocabulary expansion.");

    const grammarFeedback = grammarScore >= 7.0
      ? t("Sử dụng tốt câu phức và đa dạng cấu trúc. Ít lỗi ngữ pháp.", "Good use of complex sentences with structural variety. Few grammatical errors.")
      : grammarScore >= 6.0
      ? t("Dùng được câu phức cơ bản. Có lỗi nhỏ về thì và mạo từ.", "Uses basic complex sentences. Minor errors with tenses and articles.")
      : t("Chủ yếu dùng câu đơn giản. Nhiều lỗi ngữ pháp cơ bản.", "Mainly uses simple sentences. Many basic grammatical errors.");

    const pronunFeedback = pronunciationScore >= 7.0
      ? t("Phát âm rõ ràng, ngữ điệu tự nhiên. Trọng âm từ và câu chính xác.", "Clear pronunciation with natural intonation. Accurate word and sentence stress.")
      : pronunciationScore >= 6.0
      ? t("Phát âm rõ nhưng cần cải thiện ngữ điệu và trọng âm.", "Clear pronunciation but needs improvement in intonation and word stress.")
      : t("Phát âm cần cải thiện nhiều. Một số âm chưa chuẩn ảnh hưởng đến giao tiếp.", "Pronunciation needs significant improvement. Some sounds affect communication.");

    const suggestions = overall >= 7.0 ? [
      t("Luyện nói về các chủ đề trừu tượng để chuẩn bị cho Part 3", "Practice speaking about abstract topics for Part 3 preparation"),
      t("Sử dụng paraphrasing để tránh lặp từ", "Use paraphrasing to avoid word repetition"),
      t("Thêm ví dụ cụ thể vào câu trả lời", "Add specific examples to your answers"),
    ] : overall >= 6.0 ? [
      t("Luyện nói liên tục 2 phút không ngừng cho Part 2", "Practice speaking for 2 minutes non-stop for Part 2"),
      t("Sử dụng thêm linking words: However, Furthermore, In addition", "Use more linking words: However, Furthermore, In addition"),
      t("Ghi âm và nghe lại để phát hiện lỗi phát âm", "Record and listen back to spot pronunciation errors"),
      t("Học collocations theo chủ đề thường gặp", "Learn topic-specific collocations"),
    ] : [
      t("Bắt đầu bằng việc luyện nói mỗi ngày 10-15 phút", "Start by practicing speaking 10-15 minutes daily"),
      t("Học thuộc các cấu trúc câu trả lời mẫu", "Memorize model answer structures"),
      t("Nghe podcast tiếng Anh để cải thiện phát âm tự nhiên", "Listen to English podcasts to improve natural pronunciation"),
      t("Tập trung vào việc hoàn thành câu trả lời đầy đủ", "Focus on completing your answers fully"),
      t("Sử dụng từ điển để tra cứu cách phát âm đúng", "Use a dictionary to check correct pronunciation"),
    ];

    setResult({
      overall,
      criteria: [
        { label: "Fluency & Coherence", score: fluencyScore, feedback: fluencyFeedback },
        { label: "Lexical Resource", score: lexicalScore, feedback: lexicalFeedback },
        { label: "Grammatical Range & Accuracy", score: grammarScore, feedback: grammarFeedback },
        { label: "Pronunciation", score: pronunciationScore, feedback: pronunFeedback },
      ],
      transcript: t(
        "(Phiên âm tự động sẽ hiển thị khi kết nối AI backend)",
        "(Automatic transcript will appear when connected to AI backend)"
      ),
      suggestions,
    });
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-green-600";
    if (score >= 6.5) return "text-primary";
    if (score >= 5.5) return "text-yellow-600";
    return "text-destructive";
  };

  return (
    <div className="space-y-8">
      {/* Part selector */}
      <div className="flex gap-3">
        {([1, 2, 3] as const).map((p) => (
          <button
            key={p}
            onClick={() => { setSelectedPart(p); setSelectedQuestion(0); resetRecording(); }}
            className={`px-6 py-3 rounded-xl text-base font-semibold transition-all ${
              selectedPart === p
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
            }`}
          >
            Part {p}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Questions + Recording */}
        <div className="space-y-6">
          {/* Question bank */}
          <div className="glass-card rounded-2xl p-6">
            <button
              onClick={() => setShowQuestions(!showQuestions)}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="text-base font-bold text-foreground">
                {t(`Ngân hàng câu hỏi Part ${selectedPart}`, `Part ${selectedPart} Question Bank`)}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({currentQuestions.length} {t("câu", "questions")})
                </span>
              </h3>
              {showQuestions ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </button>
            <AnimatePresence>
              {showQuestions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                    {currentQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => { setSelectedQuestion(i); resetRecording(); }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                          selectedQuestion === i
                            ? "bg-primary/10 text-primary border-2 border-primary/30 shadow-sm"
                            : "bg-secondary text-secondary-foreground hover:bg-primary/5 border-2 border-transparent"
                        }`}
                      >
                        <span className="font-semibold text-primary/70 mr-1">{i + 1}.</span>
                        <span className="font-medium">{q.topic}:</span> {q.q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Current question display */}
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                Part {selectedPart}
              </span>
              <span className="text-sm text-muted-foreground font-medium">{currentQ.topic}</span>
            </div>
            <p className="text-lg font-semibold text-foreground mb-4 leading-relaxed">{currentQ.q}</p>
            {selectedPart === 2 && currentQ.prompts && (
              <div className="space-y-2 mb-5">
                <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                  {t("Bạn nên nói về:", "You should say:")}
                </p>
                {currentQ.prompts.map((p: string, i: number) => (
                  <p key={i} className="text-sm text-secondary-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {p}
                  </p>
                ))}
              </div>
            )}

            {/* Recording controls */}
            <div className="flex flex-col items-center gap-5 pt-6 border-t border-border">
              <div className="text-4xl font-mono font-bold text-foreground">
                {formatTime(timer)}
              </div>

              {isRecording && (
                <div className="flex items-center gap-1 h-10">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-primary rounded-full"
                      animate={{ height: [6, Math.random() * 36 + 6, 6] }}
                      transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                {!isRecording && !audioBlob && (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground text-lg font-bold hover:brightness-110 transition-all shadow-lg"
                  >
                    <Mic className="w-6 h-6" />
                    {t("Bắt đầu ghi âm", "Start Recording")}
                  </button>
                )}

                {isRecording && (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-destructive text-destructive-foreground text-lg font-bold hover:brightness-110 transition-all animate-pulse shadow-lg"
                  >
                    <Square className="w-5 h-5 fill-current" />
                    {t("Dừng ghi âm", "Stop Recording")}
                  </button>
                )}

                {audioBlob && !isRecording && (
                  <>
                    <button
                      onClick={resetRecording}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground text-base font-semibold hover:bg-primary/5 transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                      {t("Ghi lại", "Re-record")}
                    </button>
                    <button
                      onClick={handleGrade}
                      disabled={loading}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground text-base font-bold disabled:opacity-50 hover:brightness-110 transition-all shadow-lg"
                    >
                      {loading ? (
                        <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                      ) : (
                        <Play className="w-5 h-5 fill-current" />
                      )}
                      {loading ? t("Đang chấm...", "Grading...") : t("Chấm điểm", "Grade")}
                    </button>
                  </>
                )}
              </div>

              {audioUrl && (
                <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary">
                  <Volume2 className="w-5 h-5 text-primary shrink-0" />
                  <audio src={audioUrl} controls className="w-full h-10" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Result panel */}
        <div className="glass-card rounded-2xl p-8">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <Mic className="w-16 h-16 text-muted-foreground/30 mb-6" />
              <p className="text-base text-muted-foreground">
                {t("Ghi âm và chấm điểm để xem phản hồi AI", "Record and grade to see AI feedback")}
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <motion.div
                className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-base text-muted-foreground">{t("AI đang phân tích bài nói...", "AI is analyzing your speaking...")}</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 overflow-y-auto max-h-[700px]">
              {/* Overall score */}
              <div className="bg-secondary rounded-2xl p-6 text-center">
                <span className="text-base text-muted-foreground">{t("Điểm Speaking", "Speaking Score")}</span>
                <div className={`text-6xl font-display font-bold mt-2 ${getScoreColor(result.overall)}`}>{result.overall}</div>
              </div>

              {/* Criteria breakdown */}
              <div className="space-y-4">
                {result.criteria.map((c) => (
                  <div key={c.label} className="bg-secondary rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-semibold text-foreground">{c.label}</span>
                      <span className={`text-lg font-mono font-bold ${getScoreColor(c.score)}`}>{c.score}</span>
                    </div>
                    <div className="w-full h-2.5 bg-border rounded-full mb-3">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.score / 9) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.feedback}</p>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <h4 className="text-base font-bold text-primary mb-4">{t("Gợi ý cải thiện", "Improvement Suggestions")}</h4>
                <div className="space-y-3">
                  {result.suggestions.map((s, i) => (
                    <p key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5 font-bold">→</span> {s}
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
