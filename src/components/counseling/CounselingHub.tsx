import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Compass, MessageCircle, Sparkles, Send, Loader2, BookHeart,
  Smile, BarChart3, Lightbulb, Phone, Lock, Brain, Quote, ArrowRight, X, Check, AlertCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  IKIGAI_QUESTIONS, MBTI_QUESTIONS, HOLLAND_QUESTIONS, COMMON_DILEMMAS, MOOD_OPTIONS,
} from "@/data/ikigaiAndPersonality";
import MbtiFullTest from "@/components/counseling/MbtiFullTest";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

type Mode = "psychological" | "career";
type Msg = { role: "user" | "assistant"; content: string };
type SectionTab = "chat" | "mood" | "journal" | "ikigai" | "personality" | "dilemmas" | "quote";

interface Props {
  userId: string;
}

const SECTION_TABS: { id: SectionTab; icon: any; en: string; vi: string }[] = [
  { id: "chat", icon: MessageCircle, en: "AI Counselor", vi: "Trợ lý AI" },
  { id: "mood", icon: Smile, en: "Mood Tracker", vi: "Cảm xúc" },
  { id: "journal", icon: BookHeart, en: "My Thoughts", vi: "Nhật ký" },
  { id: "ikigai", icon: Compass, en: "IKIGAI", vi: "IKIGAI" },
  { id: "personality", icon: Brain, en: "Personality", vi: "Trắc nghiệm" },
  { id: "dilemmas", icon: Lightbulb, en: "Dilemmas", vi: "Tình huống" },
  { id: "quote", icon: Quote, en: "Daily Quote", vi: "Câu nói hôm nay" },
];

const CounselingHub = ({ userId }: Props) => {
  const { t, lang } = useLanguage();
  const [activeSection, setActiveSection] = useState<SectionTab>("chat");

  return (
    <div className="space-y-6">
      {/* Privacy banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 bg-gradient-to-br from-sky-100/60 via-emerald-50/60 to-rose-50/40 dark:from-sky-950/30 dark:via-emerald-950/20 dark:to-rose-950/20 border border-sky-200/50 dark:border-sky-900/40"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground text-lg flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              {t("Không gian riêng tư của bạn", "This is Your Private Space")}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {t(
                "Mọi cuộc trò chuyện và ghi chép tại đây đều được bảo mật, chỉ phục vụ sự phát triển cá nhân của bạn. Đây không phải là chẩn đoán y khoa.",
                "All conversations and notes here are secure, aimed only at supporting your growth. This is not a clinical diagnosis."
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-secondary/40">
        {SECTION_TABS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
              activeSection === s.id
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <s.icon className="w-4 h-4" />
            <span>{t(s.vi, s.en)}</span>
          </button>
        ))}
      </div>

      {/* Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeSection === "chat" && <ChatSection userId={userId} />}
          {activeSection === "mood" && <MoodSection userId={userId} />}
          {activeSection === "journal" && <JournalSection userId={userId} />}
          {activeSection === "ikigai" && <IkigaiSection userId={userId} />}
          {activeSection === "personality" && <PersonalitySection userId={userId} />}
          {activeSection === "dilemmas" && <DilemmasSection onPick={() => setActiveSection("chat")} />}
          {activeSection === "quote" && <QuoteSection userId={userId} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ============= CHAT SECTION =============
const ChatSection = ({ userId }: { userId: string }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>("psychological");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [distressFlag, setDistressFlag] = useState(false);
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load latest conversation for this mode
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("counseling_conversations")
        .select("*")
        .eq("user_id", userId)
        .eq("mode", mode)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setConversationId(data.id);
        setMessages((data.messages as any) || []);
        setDistressFlag(data.distress_flagged || false);
      } else {
        setConversationId(null);
        setMessages([]);
        setDistressFlag(false);
      }
    })();
  }, [mode, userId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Pre-fill from "Ask AI" buttons (custom event)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      if (detail) setInput(detail);
    };
    window.addEventListener("counseling:prefill", handler);
    return () => window.removeEventListener("counseling:prefill", handler);
  }, []);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data: session } = await supabase.auth.getSession();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/counseling-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.session?.access_token}`,
          },
          body: JSON.stringify({ mode, messages: newMessages }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.error || t("Lỗi AI", "AI error"));
        setMessages(messages); // rollback
        return;
      }
      const reply = data.reply || data.raw_text || JSON.stringify(data);
      const finalMessages = [...newMessages, { role: "assistant" as const, content: reply }];
      setMessages(finalMessages);

      const isDistress = !!data.distress_high;
      if (isDistress) {
        setDistressFlag(true);
        toast.warning(t("AI gợi ý em nên trao đổi với Thầy Hải", "AI suggests talking to Teacher Hai"));
      }

      // Persist conversation
      if (conversationId) {
        await supabase
          .from("counseling_conversations")
          .update({
            messages: finalMessages,
            distress_flagged: distressFlag || isDistress,
          })
          .eq("id", conversationId);
      } else {
        const title = userMsg.content.slice(0, 50);
        const { data: created } = await supabase
          .from("counseling_conversations")
          .insert({
            user_id: userId,
            mode,
            title,
            messages: finalMessages,
            distress_flagged: isDistress,
          })
          .select()
          .single();
        if (created) setConversationId(created.id);
      }
    } catch (e: any) {
      toast.error(e.message || "Network error");
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  };

  const startNew = () => {
    setConversationId(null);
    setMessages([]);
    setDistressFlag(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Mode switcher */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-sky-50/50 to-emerald-50/50 dark:from-sky-950/20 dark:to-emerald-950/20">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("psychological")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              mode === "psychological"
                ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/30"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Heart className="w-4 h-4" /> {t("Tâm lý", "Psychological")}
          </button>
          <button
            onClick={() => setMode("career")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              mode === "career"
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Compass className="w-4 h-4" /> {t("Hướng nghiệp", "Career")}
          </button>
        </div>
        <button
          onClick={startNew}
          className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-secondary transition-all"
        >
          {t("Cuộc trò chuyện mới", "New chat")}
        </button>
      </div>

      {/* Distress banner */}
      {distressFlag && (
        <div className="flex items-center justify-between gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50">
          <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
            <AlertCircle className="w-4 h-4" />
            {t(
              "Có vẻ em đang trải qua giai đoạn khó khăn. Hãy cân nhắc trao đổi với Thầy Hải.",
              "It looks like you're going through a tough time. Consider reaching out to Teacher Hai."
            )}
          </div>
          <button
            onClick={() => setShowTeacherDialog(true)}
            className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white font-semibold hover:brightness-110"
          >
            <Phone className="w-3 h-3 inline mr-1" /> {t("Liên hệ Thầy", "Talk to Teacher")}
          </button>
        </div>
      )}

      {/* Chat area */}
      <div ref={scrollRef} className="h-[420px] overflow-y-auto p-5 space-y-4 bg-background">
        {messages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="w-10 h-10 mx-auto mb-3 text-primary/40" />
            <p className="text-sm max-w-md mx-auto">
              {mode === "psychological"
                ? t(
                    "Hôm nay em cảm thấy thế nào? Hãy chia sẻ bất kỳ điều gì đang khiến em lo lắng hoặc trăn trở.",
                    "How are you feeling today? Share anything that's on your mind."
                  )
                : t(
                    "Em đang phân vân về ngành học, sự nghiệp, hay du học? Hãy kể cho thầy nghe.",
                    "Wondering about majors, careers, or studying abroad? Tell me about it."
                  )}
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-secondary rounded-2xl px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("Đang suy nghĩ...", "Thinking...")}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={t("Nhập cảm nhận của em... (Enter để gửi)", "Share your thoughts... (Enter to send)")}
            className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[60px] max-h-[120px]"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-[11px] text-muted-foreground">
            {t("Bảo mật & không phải chẩn đoán y khoa", "Confidential · Not a medical diagnosis")}
          </p>
          <button
            onClick={() => setShowTeacherDialog(true)}
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <Phone className="w-3 h-3" /> {t("Liên hệ Thầy Hải", "Talk to Teacher Hai")}
          </button>
        </div>
      </div>

      {showTeacherDialog && (
        <TalkToTeacherDialog
          userId={userId}
          conversationExcerpt={messages.slice(-4).map((m) => `${m.role}: ${m.content}`).join("\n")}
          onClose={() => setShowTeacherDialog(false)}
        />
      )}
    </div>
  );
};

// ============= TALK TO TEACHER DIALOG =============
const TalkToTeacherDialog = ({
  userId, conversationExcerpt, onClose,
}: { userId: string; conversationExcerpt: string; onClose: () => void }) => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState<"low" | "normal" | "high">("normal");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!topic.trim() || !message.trim()) {
      toast.error(t("Vui lòng nhập chủ đề và nội dung", "Please enter topic and message"));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("teacher_contact_requests").insert({
      user_id: userId,
      topic: topic.trim(),
      message: message.trim(),
      urgency,
      conversation_excerpt: conversationExcerpt || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("Đã gửi yêu cầu. Thầy sẽ phản hồi sớm!", "Request sent. Teacher Hai will respond soon!"));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-2xl bg-card border border-border p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              {t("Liên hệ Thầy Hải", "Talk to Teacher Hai")}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t("Tin nhắn riêng tư chỉ Thầy đọc được", "Private message — only Teacher Hai can read")}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">{t("Chủ đề", "Topic")}</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t("VD: Cần tư vấn ngành học", "e.g. Need career advice")}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
              maxLength={120}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">{t("Nội dung", "Message")}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("Em chia sẻ với Thầy...", "Share with Teacher Hai...")}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm min-h-[120px] resize-none"
              maxLength={2000}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">{t("Mức độ khẩn", "Urgency")}</label>
            <div className="flex gap-2 mt-1">
              {(["low", "normal", "high"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUrgency(u)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    urgency === u
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {u === "low" ? t("Thấp", "Low") : u === "normal" ? t("Bình thường", "Normal") : t("Cao", "High")}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-secondary">
            {t("Hủy", "Cancel")}
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 disabled:opacity-50"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : t("Gửi cho Thầy", "Send to Teacher")}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ============= MOOD SECTION =============
const MoodSection = ({ userId }: { userId: string }) => {
  const { t } = useLanguage();
  const [history, setHistory] = useState<{ created_at: string; mood: string; mood_score: number; note: string | null }[]>([]);
  const [note, setNote] = useState("");
  const [todayDone, setTodayDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("mood_checkins")
      .select("created_at, mood, mood_score, note")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(30);
    setHistory(data || []);
    const today = new Date().toDateString();
    setTodayDone((data || []).some((d) => new Date(d.created_at).toDateString() === today));
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const submit = async (mood: typeof MOOD_OPTIONS[number]) => {
    setLoading(true);
    const { error } = await supabase.from("mood_checkins").insert({
      user_id: userId,
      mood: mood.value,
      mood_score: mood.score,
      note: note.trim() || null,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("Đã lưu cảm xúc hôm nay 💙", "Mood saved 💙"));
    setNote("");
    load();
  };

  // Aggregate by day (average score if multiple check-ins per day, keep dominant emoji)
  const dailyMap = new Map<string, { scores: number[]; moods: string[]; iso: string }>();
  history.forEach((h) => {
    const d = new Date(h.created_at);
    const key = d.toISOString().slice(0, 10);
    if (!dailyMap.has(key)) dailyMap.set(key, { scores: [], moods: [], iso: key });
    const entry = dailyMap.get(key)!;
    entry.scores.push(h.mood_score);
    entry.moods.push(h.mood);
  });
  const chartData = Array.from(dailyMap.values())
    .sort((a, b) => a.iso.localeCompare(b.iso))
    .map((d) => {
      const avgScore = d.scores.reduce((s, x) => s + x, 0) / d.scores.length;
      // Find emoji matching closest mood option to avg score
      const closest = MOOD_OPTIONS.reduce((best, m) =>
        Math.abs(m.score - avgScore) < Math.abs(best.score - avgScore) ? m : best
      );
      return {
        date: new Date(d.iso).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        score: Number(avgScore.toFixed(2)),
        emoji: closest.emoji,
        label: t(closest.vi, closest.en),
        count: d.scores.length,
      };
    });
  const avg = history.length ? (history.reduce((s, h) => s + h.mood_score, 0) / history.length).toFixed(1) : "—";

  // Custom dot renders the emoji
  const EmojiDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (cx == null || cy == null) return null;
    return (
      <g>
        <circle cx={cx} cy={cy} r={12} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth={2} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={13}>{payload.emoji}</text>
      </g>
    );
  };

  const MoodTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const p = payload[0].payload;
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-lg">
        <div className="font-medium mb-1">{p.date}</div>
        <div className="flex items-center gap-2">
          <span className="text-base">{p.emoji}</span>
          <span>{p.label}</span>
          <span className="text-muted-foreground">· {p.score}/5</span>
        </div>
        {p.count > 1 && (
          <div className="text-[10px] text-muted-foreground mt-1">
            {t(`${p.count} lần ghi nhận`, `${p.count} check-ins`)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display font-bold text-lg flex items-center gap-2 mb-1">
          <Smile className="w-5 h-5 text-rose-500" />
          {t("Hôm nay em cảm thấy thế nào?", "How do you feel today?")}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {todayDone
            ? t("Em đã ghi nhận cảm xúc hôm nay rồi. Có thể cập nhật lại bất kỳ lúc nào.", "You've already checked in today. You can update anytime.")
            : t("Chọn biểu tượng phù hợp với cảm xúc của em.", "Pick the emoji that matches your feeling.")}
        </p>
        <div className="grid grid-cols-5 gap-2">
          {MOOD_OPTIONS.map((m) => (
            <button
              key={m.value}
              onClick={() => submit(m)}
              disabled={loading}
              className="flex flex-col items-center gap-1 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-secondary/40 transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{m.emoji}</span>
              <span className="text-xs font-medium text-muted-foreground">{t(m.vi, m.en)}</span>
            </button>
          ))}
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("Ghi chú thêm (tùy chọn)...", "Optional note...")}
          className="w-full mt-4 px-3 py-2 rounded-lg border border-input bg-background text-sm min-h-[60px] resize-none"
          maxLength={300}
        />
      </div>

      {chartData.length >= 1 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-bold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              {t("Biểu đồ cảm xúc theo ngày", "Daily Mood Chart")}
            </h3>
            <span className="text-xs text-muted-foreground">
              {t("Trung bình:", "Avg:")} <span className="font-bold text-foreground">{avg}/5</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            {t(
              `${chartData.length} ngày ghi nhận · ${history.length} lượt check-in trong 30 ngày qua`,
              `${chartData.length} days tracked · ${history.length} check-ins in last 30 days`
            )}
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  tickFormatter={(v) => MOOD_OPTIONS.find((m) => m.score === v)?.emoji || String(v)}
                  width={36}
                />
                <Tooltip content={<MoodTooltip />} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  dot={<EmojiDot />}
                  activeDot={{ r: 14, fill: "hsl(var(--primary) / 0.15)", stroke: "hsl(var(--primary))" }}
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            {MOOD_OPTIONS.slice().reverse().map((m) => (
              <span key={m.value} className="inline-flex items-center gap-1">
                <span>{m.emoji}</span>
                <span>{m.score} · {t(m.vi, m.en)}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============= JOURNAL SECTION =============
const JournalSection = ({ userId }: { userId: string }) => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<{ id: string; content: string; created_at: string }[]>([]);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("counseling_journal")
      .select("id, content, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
    setEntries(data || []);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!content.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("counseling_journal").insert({
      user_id: userId,
      content: content.trim(),
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("Đã lưu ghi chú", "Note saved"));
    setContent("");
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("counseling_journal").delete().eq("id", id);
    load();
  };


  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display font-bold flex items-center gap-2 mb-3">
          <BookHeart className="w-5 h-5 text-rose-500" />
          {t("My Thoughts — Suy nghĩ của em", "My Thoughts")}
        </h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("Hôm nay em đang nghĩ gì? Hãy viết tự do, không ai khác đọc được.", "What's on your mind? Write freely — no one else can read this.")}
          className="w-full px-3 py-3 rounded-xl border border-input bg-background text-sm min-h-[120px] resize-none focus:ring-2 focus:ring-primary/30 focus:outline-none"
          maxLength={3000}
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground">{content.length}/3000</span>
          <button
            onClick={save}
            disabled={saving || !content.trim()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : t("Lưu ghi chú", "Save")}
          </button>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="space-y-3">
          {entries.map((e) => (
            <div key={e.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-2">{new Date(e.created_at).toLocaleString()}</p>
                  <p className="text-sm whitespace-pre-wrap text-foreground leading-relaxed">{e.content}</p>
                </div>
                <button onClick={() => remove(e.id)} className="text-muted-foreground hover:text-destructive p-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============= IKIGAI SECTION =============
const IkigaiSection = ({ userId }: { userId: string }) => {
  const { t, lang } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load previous result
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("career_assessments")
        .select("*")
        .eq("user_id", userId)
        .eq("assessment_type", "ikigai")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setAnswers((data.answers as any) || {});
        setResult(data.result);
      }
    })();
  }, [userId]);

  const submit = async () => {
    if (IKIGAI_QUESTIONS.some((q) => !answers[q.id]?.trim())) {
      toast.error(t("Vui lòng trả lời cả 4 câu", "Please answer all 4 questions"));
      return;
    }
    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/counseling-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.session?.access_token}`,
          },
          body: JSON.stringify({
            mode: "ikigai",
            payload: { answers, language: lang },
          }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) { toast.error(data.error || "Error"); return; }
      setResult(data);
      await supabase.from("career_assessments").insert({
        user_id: userId,
        assessment_type: "ikigai",
        answers,
        result: data,
      });
      toast.success(t("Đã tạo IKIGAI cá nhân!", "IKIGAI generated!"));
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display font-bold flex items-center gap-2 mb-1">
          <Compass className="w-5 h-5 text-emerald-500" />
          {t("Khám phá IKIGAI của em", "Discover Your IKIGAI")}
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          {t(
            "Giao điểm của: điều em yêu, điều em giỏi, điều thế giới cần, và điều em được trả tiền.",
            "The intersection of: what you love, what you're good at, what the world needs, and what you can be paid for."
          )}
        </p>
        <div className="space-y-4">
          {IKIGAI_QUESTIONS.map((q) => (
            <div key={q.id}>
              <label className="text-sm font-medium text-foreground">{lang === "vi" ? q.vi : q.en}</label>
              <textarea
                value={answers[q.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                placeholder={lang === "vi" ? q.placeholder_vi : q.placeholder_en}
                className="w-full mt-1.5 px-3 py-2 rounded-lg border border-input bg-background text-sm min-h-[70px] resize-none"
                maxLength={500}
              />
            </div>
          ))}
        </div>
        <button
          onClick={submit}
          disabled={loading}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> {t("Tạo IKIGAI", "Generate IKIGAI")}</>}
        </button>
      </div>

      {result && (
        <div className="rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-50/60 to-sky-50/60 dark:from-emerald-950/20 dark:to-sky-950/20 p-6">
          <h4 className="font-display font-bold text-lg flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            {t("IKIGAI của em", "Your IKIGAI")}
          </h4>
          <p className="text-base font-medium text-foreground italic mb-5 leading-relaxed">
            "{result.ikigai_statement}"
          </p>
          {result.intersections && (
            <div className="grid grid-cols-2 gap-3 mb-5">
              {Object.entries(result.intersections).map(([k, v]) => (
                <div key={k} className="rounded-lg bg-background/60 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-bold mb-1">{k}</p>
                  <p className="text-sm text-foreground">{v as string}</p>
                </div>
              ))}
            </div>
          )}
          {result.career_suggestions && (
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                {t("Gợi ý nghề nghiệp", "Career suggestions")}
              </p>
              <div className="flex flex-wrap gap-2">
                {result.career_suggestions.map((c: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-medium">{c}</span>
                ))}
              </div>
            </div>
          )}
          {result.next_steps && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                {t("Bước kế tiếp", "Next steps")}
              </p>
              <ul className="space-y-1">
                {result.next_steps.map((s: string, i: number) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============= PERSONALITY SECTION =============
const PersonalitySection = ({ userId }: { userId: string }) => {
  const { t, lang } = useLanguage();
  const [test, setTest] = useState<"mbti" | "holland">("mbti");
  const [hollandScores, setHollandScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const submitHolland = async () => {
    if (Object.keys(hollandScores).length < HOLLAND_QUESTIONS.length) {
      toast.error(t("Đánh giá đủ các mục", "Rate all items"));
      return;
    }
    const top3 = HOLLAND_QUESTIONS
      .map((q) => ({ code: q.code, score: hollandScores[q.id] || 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.code)
      .join("");
    const payload = { test: "holland", code: top3, language: lang };

    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/counseling-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.session?.access_token}`,
          },
          body: JSON.stringify({ mode: "personality", payload }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) { toast.error(data.error); return; }
      setResult(data);
      await supabase.from("career_assessments").insert({
        user_id: userId,
        assessment_type: "holland",
        answers: hollandScores,
        result: data,
      });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display font-bold flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-violet-500" />
          {t("Trắc nghiệm tính cách", "Personality Test")}
        </h3>
        <div className="flex gap-2 mb-5 p-1 bg-secondary/40 rounded-xl w-fit">
          <button onClick={() => { setTest("mbti"); setResult(null); }} className={`px-4 py-1.5 rounded-lg text-sm font-medium ${test === "mbti" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>
            {t("MBTI (40 câu)", "MBTI (40 Q)")}
          </button>
          <button onClick={() => { setTest("holland"); setResult(null); }} className={`px-4 py-1.5 rounded-lg text-sm font-medium ${test === "holland" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>Holland Code</button>
        </div>

        {test === "mbti" && (
          <MbtiFullTest userId={userId} />
        )}

        {test === "holland" && (
          <>
            <div className="space-y-4">
              {HOLLAND_QUESTIONS.map((q) => (
                <div key={q.id} className="border-b border-border last:border-0 pb-3">
                  <p className="text-sm font-medium mb-2">{lang === "vi" ? q.vi : q.en}</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setHollandScores({ ...hollandScores, [q.id]: n })}
                        className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                          hollandScores[q.id] === n ? "bg-violet-500 text-white border-violet-500" : "border-border hover:bg-secondary text-muted-foreground"
                        }`}
                      >{n}</button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>{t("Không đồng ý", "Disagree")}</span>
                    <span>{t("Rất đồng ý", "Strongly agree")}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={submitHolland}
              disabled={loading}
              className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4" /> {t("Phân tích kết quả", "Analyze Result")}</>}
            </button>
          </>
        )}
      </div>

      {result && test === "holland" && (
        <div className="rounded-2xl border border-violet-200/60 dark:border-violet-900/40 bg-gradient-to-br from-violet-50/60 to-pink-50/60 dark:from-violet-950/20 dark:to-pink-950/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl font-display font-bold text-violet-600 dark:text-violet-400">{result.code}</span>
            <h4 className="font-display font-bold text-lg">{result.title}</h4>
          </div>
          <p className="text-sm text-foreground mb-4 leading-relaxed">{result.description}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {result.strengths && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">{t("Điểm mạnh", "Strengths")}</p>
                <ul className="space-y-1">{result.strengths.map((s: string, i: number) => <li key={i} className="text-sm flex items-start gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />{s}</li>)}</ul>
              </div>
            )}
            {result.growth_areas && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">{t("Cần phát triển", "Growth areas")}</p>
                <ul className="space-y-1">{result.growth_areas.map((s: string, i: number) => <li key={i} className="text-sm flex items-start gap-2"><ArrowRight className="w-3.5 h-3.5 text-amber-500 mt-0.5" />{s}</li>)}</ul>
              </div>
            )}
            {result.career_fits && (
              <div className="md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">{t("Nghề nghiệp phù hợp", "Career fits")}</p>
                <div className="flex flex-wrap gap-2">{result.career_fits.map((c: string, i: number) => <span key={i} className="px-3 py-1 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 text-xs font-medium">{c}</span>)}</div>
              </div>
            )}
            {result.study_tips && (
              <div className="md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">{t("Mẹo học tập", "Study tips")}</p>
                <ul className="space-y-1">{result.study_tips.map((s: string, i: number) => <li key={i} className="text-sm flex items-start gap-2"><Lightbulb className="w-3.5 h-3.5 text-yellow-500 mt-0.5" />{s}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============= DILEMMAS SECTION =============
const DilemmasSection = ({ onPick }: { onPick: () => void }) => {
  const { t, lang } = useLanguage();

  const ask = (text: string) => {
    window.dispatchEvent(new CustomEvent("counseling:prefill", { detail: text }));
    onPick();
    toast.info(t("Đã chuyển vào AI Counselor", "Switched to AI Counselor"));
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-bold flex items-center gap-2 mb-1">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        {t("Tình huống thường gặp", "Common Dilemmas")}
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        {t("Chọn một tình huống để trao đổi nhanh với AI Counselor.", "Pick a dilemma to discuss with the AI Counselor.")}
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {COMMON_DILEMMAS.map((d, i) => (
          <button
            key={i}
            onClick={() => ask(lang === "vi" ? d.vi : d.en)}
            className="text-left p-4 rounded-xl border border-border hover:border-amber-400/40 hover:bg-amber-50/30 dark:hover:bg-amber-950/20 transition-all group"
          >
            <p className="text-sm text-foreground leading-relaxed">{lang === "vi" ? d.vi : d.en}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium group-hover:underline">
              {t("Hỏi AI", "Ask AI")} <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============= QUOTE SECTION =============
const QuoteSection = ({ userId }: { userId: string }) => {
  const { t, lang } = useLanguage();
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async () => {
    setLoading(true);
    try {
      // Get latest mood
      const { data: latest } = await supabase
        .from("mood_checkins")
        .select("mood, mood_score")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const { data: session } = await supabase.auth.getSession();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/counseling-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.session?.access_token}`,
          },
          body: JSON.stringify({
            mode: "quote",
            payload: { mood: latest?.mood || "okay", language: lang },
          }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) { toast.error(data.error); return; }
      setQuote(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }, [userId, lang]);

  useEffect(() => { generate(); }, [generate]);

  return (
    <div className="rounded-2xl border border-rose-200/60 dark:border-rose-900/40 bg-gradient-to-br from-rose-50/70 via-amber-50/40 to-sky-50/50 dark:from-rose-950/20 dark:via-amber-950/10 dark:to-sky-950/20 p-8 text-center">
      <Quote className="w-10 h-10 text-rose-400 mx-auto mb-4" />
      {loading || !quote ? (
        <div className="text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin mx-auto" /></div>
      ) : (
        <>
          <p className="text-xl md:text-2xl font-display font-medium text-foreground italic leading-relaxed mb-4">
            "{quote.quote}"
          </p>
          <p className="text-sm text-muted-foreground font-medium mb-5">— {quote.author}</p>
          {quote.reflection && (
            <p className="text-sm text-foreground/80 max-w-xl mx-auto bg-background/60 rounded-xl p-4 leading-relaxed">
              💭 {quote.reflection}
            </p>
          )}
        </>
      )}
      <button
        onClick={generate}
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:brightness-110 disabled:opacity-50"
      >
        <Sparkles className="w-4 h-4" /> {t("Câu nói khác", "Another quote")}
      </button>
    </div>
  );
};

export default CounselingHub;
