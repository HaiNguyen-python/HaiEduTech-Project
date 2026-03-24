import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import ReactMarkdown from "react-markdown";
import chatbotIcon from "@/assets/chatbot-icon.png";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatBot = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [shake, setShake] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) return;

    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setShowTooltip(true);
        tooltipTimerRef.current = setTimeout(() => setShowTooltip(false), 5000);
      }, 600);
    }, 12000);

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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
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
          setMessages((prev) => [...prev, { role: "assistant", content: t("⚠️ Quá nhiều yêu cầu. Vui lòng thử lại sau.", "⚠️ Too many requests. Please try again later.") }]);
        } else if (resp.status === 402) {
          setMessages((prev) => [...prev, { role: "assistant", content: t("⚠️ Hết hạn mức sử dụng. Vui lòng liên hệ quản trị.", "⚠️ Usage limit reached. Please contact admin.") }]);
        } else {
          setMessages((prev) => [...prev, { role: "assistant", content: t("⚠️ Lỗi kết nối. Vui lòng thử lại.", "⚠️ Connection error. Please try again.") }]);
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
      setMessages((prev) => [...prev, { role: "assistant", content: t("⚠️ Lỗi kết nối. Vui lòng thử lại.", "⚠️ Connection error. Please try again.") }]);
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
      <AnimatePresence>
        {!open && (
          <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
            <AnimatePresence>
              {showTooltip && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-[220px] rounded-xl border border-border bg-card px-4 py-2.5 text-center text-sm text-foreground shadow-lg"
                >
                  <span>{t("👋 Xin chào, thầy Hải đây!", "👋 Hi there! I'm Teacher Hai!")}</span>
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
              title={t("Alo, thầy Hải nghe", "Chat with Teacher Hai")}
            >
              <img src={chatbotIcon} alt="Thầy Hải" className="h-12 w-12 object-cover sm:h-14 sm:w-14" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-50 flex h-[70vh] max-h-[560px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-[400px]"
          >
            <div className="flex items-center gap-3 border-b border-border bg-primary/5 p-4">
              <img src={chatbotIcon} alt="Thầy Hải" className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground">{t("📞 Alo, thầy Hải nghe", "📞 Teacher Hai is here")}</h3>
                <p className="text-xs text-muted-foreground">{t("Trợ lý học tập AI", "AI Learning Assistant")}</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 transition-colors hover:bg-secondary">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="py-8 text-center">
                  <img src={chatbotIcon} alt="Thầy Hải" className="mx-auto mb-4 h-20 w-20 opacity-50" />
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t("Xin chào em! Thầy là thầy Hải 👋\nEm cứ hỏi thầy về Tiếng Anh, Tiếng Trung hoặc Lập trình nhé!", "Hello! I'm Teacher Hai 👋\nAsk me about English, Chinese or Programming!")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      t("Giải thích thì hiện tại hoàn thành", "Explain present perfect tense"),
                      t("你好 nghĩa là gì?", "What does 你好 mean?"),
                      t("Python là gì?", "What is Python?"),
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInput(suggestion);
                        }}
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
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
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

            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder={t("Hỏi thầy Hải...", "Ask Teacher Hai...")}
                  className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
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
