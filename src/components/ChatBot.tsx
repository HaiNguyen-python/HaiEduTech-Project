import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";
import chatbotIcon from "@/assets/chatbot-icon.png";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatBot = () => {
  const { t } = useLanguage();
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

  // Periodic gentle shake every 12 seconds
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

    // Show tooltip on first load after 3s
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
  }, [open]);

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
          setMessages(prev => [...prev, { role: "assistant", content: t("⚠️ Quá nhiều yêu cầu. Vui lòng thử lại sau.", "⚠️ Too many requests. Please try again later.") }]);
        } else if (resp.status === 402) {
          setMessages(prev => [...prev, { role: "assistant", content: t("⚠️ Hết hạn mức sử dụng. Vui lòng liên hệ quản trị.", "⚠️ Usage limit reached. Please contact admin.") }]);
        } else {
          setMessages(prev => [...prev, { role: "assistant", content: t("⚠️ Lỗi kết nối. Vui lòng thử lại.", "⚠️ Connection error. Please try again.") }]);
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
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch { /* partial JSON */ }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: t("⚠️ Lỗi kết nối. Vui lòng thử lại.", "⚠️ Connection error. Please try again.") }]);
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
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {/* Tooltip bubble */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card text-foreground text-sm px-4 py-2.5 rounded-xl shadow-lg border border-border max-w-[200px] text-center relative"
                >
                  <span>👋 Hello, thầy Hải chào bạn!</span>
                  <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ scale: 0 }}
              animate={shake ? shakeVariant : { scale: 1 }}
              exit={{ scale: 0 }}
              onClick={handleOpenChat}
              onMouseEnter={() => {
                setShowTooltip(true);
                if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
                tooltipTimerRef.current = setTimeout(() => setShowTooltip(false), 5000);
              }}
              className="w-16 h-16 rounded-full shadow-2xl bg-primary hover:brightness-110 transition-all flex items-center justify-center overflow-hidden border-2 border-primary-foreground/20"
              title="Alo, thầy Hải nghe"
            >
              <img src={chatbotIcon} alt="Thầy Hải" className="w-14 h-14 object-cover" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[560px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border bg-primary/5">
              <img src={chatbotIcon} alt="Thầy Hải" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-base">📞 Alo, thầy Hải nghe</h3>
                <p className="text-xs text-muted-foreground">{t("Trợ lý học tập AI", "AI Learning Assistant")}</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <img src={chatbotIcon} alt="Thầy Hải" className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("Xin chào em! Thầy là thầy Hải 👋\nEm cứ hỏi thầy về Tiếng Anh, Tiếng Trung hoặc Lập trình nhé!", "Hello! I'm Teacher Hai 👋\nAsk me about English, Chinese or Programming!")}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      t("Giải thích thì hiện tại hoàn thành", "Explain present perfect tense"),
                      t("你好 nghĩa là gì?", "What does 你好 mean?"),
                      t("Python là gì?", "What is Python?"),
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => { setInput(suggestion); }}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}>
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
                  <div className="bg-secondary rounded-2xl px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder={t("Hỏi thầy Hải...", "Ask Teacher Hai...")}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 hover:brightness-110 transition-all"
                >
                  <Send className="w-4 h-4" />
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
