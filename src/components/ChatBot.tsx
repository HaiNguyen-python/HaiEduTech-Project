import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Mic, MicOff, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import chatbotIcon from "@/assets/chatbot-icon.png";

// Chat-tuned markdown components: lock typography to a uniform ~14px rhythm
// so headings, code, and lists never blow up inside the narrow chat bubble.
const chatMarkdownComponents = {
  p: ({ node, ...props }: any) => (
    <p className="text-sm leading-relaxed break-words" {...props} />
  ),
  h1: ({ node, ...props }: any) => (
    <h1 className="text-base font-bold mt-2 mb-1" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-sm font-bold mt-2 mb-1" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-sm font-semibold mt-1.5 mb-1" {...props} />
  ),
  h4: ({ node, ...props }: any) => (
    <h4 className="text-sm font-semibold mt-1.5 mb-1" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="text-sm pl-4 space-y-1 list-disc" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="text-sm pl-4 space-y-1 list-decimal" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="text-sm leading-relaxed" {...props} />
  ),
  strong: ({ node, ...props }: any) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: ({ node, ...props }: any) => <em className="italic" {...props} />,
  code: ({ node, inline, className, children, ...props }: any) =>
    inline ? (
      <code
        className="text-[13px] font-mono px-1.5 py-0.5 rounded bg-background/60 border border-border/40"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code className={`text-[12.5px] font-mono ${className || ""}`} {...props}>
        {children}
      </code>
    ),
  pre: ({ node, ...props }: any) => (
    <pre
      className="text-[12.5px] font-mono p-3 rounded-lg bg-zinc-900 text-zinc-100 overflow-x-auto my-2 whitespace-pre"
      {...props}
    />
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      className="text-sm italic border-l-2 border-primary/40 pl-3 my-2 text-muted-foreground"
      {...props}
    />
  ),
  a: ({ node, ...props }: any) => (
    <a
      className="text-primary underline underline-offset-2 hover:brightness-110"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-2">
      <table className="text-xs border-collapse" {...props} />
    </div>
  ),
  th: ({ node, ...props }: any) => (
    <th className="border border-border px-2 py-1 text-left font-semibold" {...props} />
  ),
  td: ({ node, ...props }: any) => (
    <td className="border border-border px-2 py-1" {...props} />
  ),
  hr: ({ node, ...props }: any) => (
    <hr className="my-2 border-border" {...props} />
  ),
};

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

// ── Profanity filter (Vietnamese + English common toxic words) ──
const PROFANITY_LIST = [
  // Vietnamese profanity
  "đụ",
  "địt",
  "đéo",
  "đ.m",
  "dm",
  "dcm",
  "đcm",
  "vãi",
  "vl",
  "vcl",
  "clgt",
  "cặc",
  "buồi",
  "lồn",
  "đĩ",
  "cave",
  "dâm",
  "súc vật",
  "ngu",
  "đần",
  "khốn",
  "chó",
  "con chó",
  "thằng chó",
  "con đĩ",
  // English profanity
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "damn",
  "dick",
  "pussy",
  "bastard",
  "cunt",
  "wtf",
  "stfu",
  "fck",
  "f*ck",
  "sh*t",
  "motherfucker",
  "mf",
  "retard",
  "idiot",
  "stupid",
];

/**
 * Check if a message contains profanity.
 * Uses word boundary matching to reduce false positives.
 */
function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return PROFANITY_LIST.some((word) => {
    // For short words (<=3 chars), exact or bounded match
    if (word.length <= 3) {
      const regex = new RegExp(
        `(^|\\s|[^a-zA-ZÀ-ỹ])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|\\s|[^a-zA-ZÀ-ỹ])`,
        "i",
      );
      return regex.test(` ${lower} `);
    }
    return lower.includes(word);
  });
}

// Topic filter removed — students can ask freely about any subject

// ── Speech Recognition type shim ──
interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

const ChatBot = () => {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [shake, setShake] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [profanityWarning, setProfanityWarning] = useState(false);
  const [chatLocked, setChatLocked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const messageTimestamps = useRef<number[]>([]);

  // Rate limit: max 20 messages per minute
  const isRateLimited = useCallback(() => {
    const now = Date.now();
    messageTimestamps.current = messageTimestamps.current.filter(ts => now - ts < 60000);
    if (messageTimestamps.current.length >= 20) return true;
    messageTimestamps.current.push(now);
    return false;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check lockout status on mount
  useEffect(() => {
    checkLockout();
  }, []);

  // Notify other floating widgets (e.g. Notebook) when chatbot opens/closes
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("chatbot:toggle", { detail: { open } }));
  }, [open]);

  // Show tooltip popup every 5 minutes when chat is closed
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 300000);
    // Show immediately on mount after a short delay
    const initial = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, [open]);

  /**
   * Check if the user has 3+ warnings in the last 24 hours → lock chat for 1 hour.
   */
  const checkLockout = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: logs } = await supabase
      .from("moderation_logs")
      .select("created_at")
      .eq("user_id", user.id)
      .gte("created_at", twentyFourHoursAgo)
      .order("created_at", { ascending: false });

    if (logs && logs.length >= 3) {
      // Lock for 1 hour from the 3rd warning
      const thirdWarningTime = new Date(logs[2].created_at).getTime();
      const lockUntil = thirdWarningTime + 60 * 60 * 1000;
      if (Date.now() < lockUntil) {
        setChatLocked(true);
        // Auto-unlock after remaining time
        setTimeout(() => setChatLocked(false), lockUntil - Date.now());
      }
    }
  }, []);

  // ── Tooltip / shake animation effect ──
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setShowTooltip(true);
        tooltipTimerRef.current = setTimeout(() => setShowTooltip(false), 5000);
      }, 600);
    }, 300000);

    const initialTimer = setTimeout(() => {
      if (!open) {
        setShowTooltip(true);
        tooltipTimerRef.current = setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    };
  }, [open, isMobile]);

  const handleOpenChat = () => {
    setOpen(true);
    setShowTooltip(false);
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
  };

  // ── Voice Input via Web Speech API ──
  const toggleRecording = useCallback(() => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t(
            "⚠️ Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge.",
            "⚠️ Your browser doesn't support voice recognition. Please use Chrome or Edge.",
          ),
        },
      ]);
      return;
    }

    const recognition: ISpeechRecognition = new SpeechRecognition();
    // Set language based on current app language, default to Vietnamese
    recognition.lang = lang === "en" ? "en-US" : "vi-VN";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
  }, [isRecording, lang, t]);

  /**
   * Log a profanity warning to moderation_logs table.
   */
  const logModerationEvent = useCallback(
    async (content: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from("moderation_logs").insert({
        user_id: user.id,
        blocked_content: content,
        reason: "profanity",
      });

      // Re-check lockout after logging
      checkLockout();
    },
    [checkLockout],
  );

  // ── Send Message ──
  const sendMessage = async () => {
    if (!input.trim() || isLoading || chatLocked) return;

    // Rate limiting check
    if (isRateLimited()) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: t("⚠️ Bạn gửi quá nhanh. Vui lòng chờ 1 phút.", "⚠️ You're sending too fast. Please wait a minute.")
      }]);
      return;
    }

    const userMsg: Message = { role: "user", content: input.trim() };

    // 1. Profanity check (highest priority)
    if (containsProfanity(userMsg.content)) {
      setProfanityWarning(true);
      logModerationEvent(userMsg.content);
      setInput("");
      // Auto-dismiss warning after 8 seconds
      setTimeout(() => setProfanityWarning(false), 8000);
      return;
    }

    // Topic filter removed — students can ask freely

    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: t(
                "⚠️ Quá nhiều yêu cầu. Vui lòng thử lại sau.",
                "⚠️ Too many requests. Please try again later.",
              ),
            },
          ]);
        } else if (resp.status === 402) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: t(
                "⚠️ Hết hạn mức sử dụng. Vui lòng liên hệ quản trị.",
                "⚠️ Usage limit reached. Please contact admin.",
              ),
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: t("⚠️ Lỗi kết nối. Vui lòng thử lại.", "⚠️ Connection error. Please try again."),
            },
          ]);
        }
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            /* partial JSON */
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("⚠️ Lỗi kết nối. Vui lòng thử lại.", "⚠️ Connection error. Please try again."),
        },
      ]);
    }
    setIsLoading(false);
  };

  const shakeVariant: import("framer-motion").TargetAndTransition = {
    rotate: [0, -3, 3, -3, 3, -2, 2, 0],
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  };

  return (
    <>
      {/* ── Profanity Warning Modal ── */}
      <AnimatePresence>
        {profanityWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
            onClick={() => setProfanityWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md overflow-hidden rounded-2xl border-2 border-destructive bg-card shadow-2xl"
            >
              {/* Pulsing red border effect */}
              <div className="absolute inset-0 animate-pulse rounded-2xl border-2 border-destructive/50" />

              <div className="relative p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-7 w-7 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-destructive">{t("⚠️ CẢNH BÁO!", "⚠️ WARNING!")}</h3>
                    <p className="text-xs text-muted-foreground">Teacher Hai</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-foreground">
                  {t(
                    "Hệ thống ghi nhận bạn đã sử dụng ngôn từ không chuẩn mực. Để đảm bảo môi trường học tập, nội dung này cùng với tài khoản của bạn sẽ được tự động gửi báo cáo trực tiếp đến Giáo viên quản lý và Phụ huynh nếu còn tái phạm.",
                    "The system has detected inappropriate language. To maintain a safe learning environment, this content along with your account will be automatically reported to the managing Teacher and Parents if repeated.",
                  )}
                </p>

                <p className="mt-3 text-xs font-semibold text-destructive">
                  {t("🔒 3 lần vi phạm trong 24h = khóa chat 1 giờ", "🔒 3 violations in 24h = chat locked for 1 hour")}
                </p>

                <button
                  onClick={() => setProfanityWarning(false)}
                  className="mt-4 w-full rounded-xl bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground transition-all hover:brightness-110"
                >
                  {t("Tôi đã hiểu", "I understand")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Chat Button ── */}
      <AnimatePresence>
        {!open && (
          <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-[220px] rounded-xl border border-border bg-card px-4 py-2.5 text-center text-sm text-foreground shadow-lg"
                >
                  <span>Hi! I'm Mr.Hai. Ask me something? 😊</span>
                  <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-border bg-card" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ scale: 0 }}
              animate={shake ? shakeVariant : { scale: 1 }}
              exit={{ scale: 0 }}
              onClick={handleOpenChat}
              onMouseEnter={() => {
                if (isMobile) return;
                setShowTooltip(true);
                if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
                tooltipTimerRef.current = setTimeout(() => setShowTooltip(false), 5000);
              }}
              className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-primary-foreground/20 bg-primary shadow-2xl transition-all hover:brightness-110 sm:h-16 sm:w-16"
              title="Chat with Teacher Hai"
            >
              <img src={chatbotIcon} alt="Thầy Hải" className="h-12 w-12 object-cover sm:h-14 sm:w-14" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-50 flex h-[70vh] max-h-[560px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-primary/5 p-4">
              <img src={chatbotIcon} alt="Thầy Hải" className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground">👋 Hello, I'm Mr. Hai!</h3>
                <p className="text-xs text-muted-foreground">Level up your skills with Mr. Hai.</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 transition-colors hover:bg-secondary">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Chat Locked Banner */}
            {chatLocked && (
              <div className="flex items-center gap-2 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span>
                  {t(
                    "🔒 Chat đã bị khóa 1 giờ do vi phạm liên tục.",
                    "🔒 Chat locked for 1 hour due to repeated violations.",
                  )}
                </span>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="py-8 text-center">
                  <img src={chatbotIcon} alt="Thầy Hải" className="mx-auto mb-4 h-20 w-20 opacity-50" />
                  <p className="mb-4 text-sm text-muted-foreground">
                    {"Hi there! 👋\nAsk me about English, Chinese or Programming!"}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Explain present perfect tense", "What does 你好 mean?", "What is Python?"].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setInput(suggestion)}
                        className="rounded-full bg-primary/10 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/20"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 space-y-2">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={chatMarkdownComponents}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-secondary px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                {/* Microphone button */}
                <button
                  onClick={toggleRecording}
                  disabled={isLoading || chatLocked}
                  className={`flex items-center justify-center rounded-xl px-3 py-2.5 transition-all ${
                    isRecording
                      ? "animate-pulse bg-destructive text-destructive-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  } disabled:opacity-50`}
                  title={isRecording ? t("Dừng ghi âm", "Stop recording") : t("Nhấn để nói", "Click to speak")}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder={
                    chatLocked
                      ? t("Chat đã bị khóa...", "Chat is locked...")
                      : t("Hỏi thầy Hải...", "Ask Teacher Hai...")
                  }
                  className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none disabled:opacity-50"
                  disabled={isLoading || chatLocked}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim() || chatLocked}
                  className="rounded-xl bg-primary px-4 py-2.5 text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
