import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Mic, MicOff, AlertTriangle, Paperclip, FileText, Image as ImageIcon } from "lucide-react";
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

// Topic filter removed - students can ask freely about any subject

// ── Fun facts the chatbot pops to learners every 3 minutes ──
const FUN_FACTS: { vi: string; en: string }[] = [
  { vi: "Bật mí: hơn 60% từ vựng học thuật tiếng Anh có gốc Latin hoặc Pháp.", en: "Fun fact: over 60% of academic English vocabulary comes from Latin or French roots." },
  { vi: "Bật mí: chữ 好 ghép từ 女 và 子 — một chữ Hán nhỏ chứa cả câu chuyện văn hoá.", en: "Fun fact: the Chinese character 好 combines 女 and 子 — one small symbol with a full cultural story." },
  { vi: "Bật mí: Python được đặt theo nhóm hài Monty Python, không phải theo loài rắn.", en: "Fun fact: Python was named after Monty Python, not the snake." },
  { vi: "Bật mí: luyện nói tiếng Anh 10 phút mỗi ngày hiệu quả hơn học dồn cuối tuần.", en: "Fun fact: 10 minutes of spoken English daily beats one long cramming session on the weekend." },
  { vi: "Bật mí: khoảng 3.000 chữ Hán thông dụng đã đủ đọc phần lớn báo chí cơ bản.", en: "Fun fact: roughly 3,000 common Hanzi are enough to read most basic news content." },
  { vi: "Bật mí: học lập trình sớm giúp não quen với tư duy chia nhỏ vấn đề.", en: "Fun fact: learning to code early trains your brain to break big problems into clear steps." },
  { vi: "Bật mí: IELTS Speaking chỉ 11–14 phút, phản xạ tự nhiên quan trọng hơn nói dài.", en: "Fun fact: IELTS Speaking lasts only 11–14 minutes — natural response beats speaking too long." },
  { vi: "Bật mí: 电脑 trong tiếng Trung nghĩa đen là 'máy não điện', tức computer.", en: "Fun fact: 电脑 in Chinese literally means 'electric brain' — it's the word for computer." },
  { vi: "Bật mí: JavaScript được viết trong khoảng 10 ngày, nhưng nay đứng sau vô số website lớn.", en: "Fun fact: JavaScript was created in about 10 days, yet now powers countless major websites." },
  { vi: "Bật mí: nghe podcast tiếng Anh 15 phút/ngày cải thiện listening rõ rệt sau 1 tháng.", en: "Fun fact: 15 minutes of English podcasts daily noticeably improves listening within a month." },
  { vi: "Bật mí: SQL ra đời từ những năm 1970 và vẫn là ngôn ngữ truy vấn phổ biến nhất.", en: "Fun fact: SQL was born in the 1970s and is still the most widely used query language." },
  { vi: "Bật mí: viết tay từ vựng giúp nhớ lâu hơn gõ phím — kể cả với Hán tự!", en: "Fun fact: writing vocabulary by hand boosts retention better than typing — even for Hanzi!" },
  // —— Programming fun facts ——
  { vi: "Bật mí: máy tính đầu tiên ENIAC nặng 27 tấn, chiếm cả một phòng lớn năm 1945.", en: "Fun fact: the first ENIAC computer weighed 27 tons and filled an entire room in 1945." },
  { vi: "Bật mí: Grace Hopper tìm ra thuật ngữ 'debugging' sau khi gỡ một con bướm ra khỏi máy tính.", en: "Fun fact: Grace Hopper coined 'debugging' after removing a real moth from a computer." },
  { vi: "Bật mí: GitHub lưu trữ hơn 200 triệu kho mã nguồn — lớn như một thư viện khổng lồ của nhân loại.", en: "Fun fact: GitHub hosts over 200 million code repositories — a giant library for humanity." },
  { vi: "Bật mí: Linux được tạo ra bởi Linus Torvalds năm 1991 và hiện chạy 90% cloud server thế giới.", en: "Fun fact: Linux was created by Linus Torvalds in 1991 and now powers 90% of the world's cloud servers." },
  { vi: "Bật mí: Stack Overflow được lập ra năm 2008, mỗi phút có hơn 10 câu hỏi mới từ lập trình viên.", en: "Fun fact: Stack Overflow launched in 2008 and receives over 10 new developer questions every minute." },
  { vi: "Bật mí: mã nhị phân chỉ dùng 0 và 1, nhưng tất cả video, ảnh, game bạn xem đều là nhị phân.", en: "Fun fact: binary only uses 0 and 1, yet every video, photo, and game you see is stored in binary." },
  { vi: "Bật mí: mọi màu sắc trên màn hình chỉ là tổ hợp của 3 giá trị: Red, Green và Blue (RGB).", en: "Fun fact: every color on your screen is just a mix of three values: Red, Green, and Blue (RGB)." },
  { vi: "Bật mí: HTML được phát minh bởi Tim Berners-Lee năm 1993 — nền tảng đầu tiên của World Wide Web.", en: "Fun fact: HTML was invented by Tim Berners-Lee in 1993 — the very foundation of the World Wide Web." },
  { vi: "Bật mí: một ổ cứng SSD hiện đại có thể đọc/ghi nhanh hơn 500 lần so với ổ đĩa cách đây 20 năm.", en: "Fun fact: a modern SSD can read and write data over 500× faster than a hard drive from 20 years ago." },
  { vi: "Bật mí: AI học được nhờ 'neural network' — mô phỏng cách neuron trong não người kết nối với nhau.", en: "Fun fact: AI learns through neural networks — mimicking how neurons connect in the human brain." },
  { vi: "Bật mí: thuật toán tìm kiếm Google xử lý hơn 8 tỷ truy vấn mỗi ngày — nhanh hơn nháy mắt.", en: "Fun fact: Google's search algorithm handles over 8 billion queries daily — faster than a blink." },
  { vi: "Bật mí: ngôn ngữ C được tạo ra năm 1972 và vẫn là nền tảng cho hệ điều hành, trình biên dịch, game engine.", en: "Fun fact: C was created in 1972 and remains the foundation for operating systems, compilers, and game engines." },
  { vi: "Bật mí: CAPTCHA viết tắt từ 'Completely Automated Public Turing test' — dùng AI để đánh giá con người!", en: "Fun fact: CAPTCHA stands for 'Completely Automated Public Turing test' — using AI to judge humans!" },
  { vi: "Bật mí: một lập trình viên trung bình viết khoảng 100 dòng code mỗi ngày làm việc hiệu quả.", en: "Fun fact: an average developer writes about 100 lines of productive code per working day." },
  { vi: "Bật mí: Unicode chứa hơn 149.000 ký tự, bao gồm cả emoji, chữ Hán, cổ ngữ và ký hiệu toán học.", en: "Fun fact: Unicode contains over 149,000 characters, including emojis, Hanzi, ancient scripts, and math symbols." },
];

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
  const [tooltipText, setTooltipText] = useState<string>("Hi! I'm Mr.Hai. Ask me something? 😊");
  const [shake, setShake] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [profanityWarning, setProfanityWarning] = useState(false);
  const [chatLocked, setChatLocked] = useState(false);
  const [studentContext, setStudentContext] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [attachment, setAttachment] = useState<
    | { kind: "text"; name: string; content: string }
    | { kind: "image"; name: string; dataUrl: string }
    | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  // ── Personalization: fetch student profile & learning data when logged in ──
  useEffect(() => {
    let cancelled = false;
    const loadStudentContext = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) return;

        const [profileRes, vocabRes, activityRes, streakRes] = await Promise.all([
          supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
          supabase.from("user_vocab_mastered").select("subject").eq("user_id", user.id),
          supabase
            .from("student_activity_log")
            .select("activity_type, lesson_id, created_at")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(15),
          supabase.rpc("get_streak_leaderboard"),
        ]);

        const fullName = (profileRes.data?.full_name || "").trim() || "Học viên";
        if (!cancelled) setStudentName(fullName);

        // Mastered vocab by subject
        const vocabBySubject: Record<string, number> = {};
        (vocabRes.data || []).forEach((r: any) => {
          const s = r.subject || "unknown";
          vocabBySubject[s] = (vocabBySubject[s] || 0) + 1;
        });
        const vocabSummary = Object.entries(vocabBySubject)
          .sort((a, b) => b[1] - a[1])
          .map(([s, n]) => `${s}: ${n} words`)
          .join(", ") || "no vocabulary mastered yet";

        // Recent activities
        const activities = (activityRes.data || []) as any[];
        const recentList = activities
          .slice(0, 10)
          .map((a) => `- ${a.activity_type}${a.lesson_id ? ` (${a.lesson_id})` : ""} @ ${new Date(a.created_at).toLocaleDateString()}`)
          .join("\n") || "- (no recent activity)";

        // Activity frequency by type
        const typeCount: Record<string, number> = {};
        activities.forEach((a) => {
          typeCount[a.activity_type] = (typeCount[a.activity_type] || 0) + 1;
        });
        const topActivities = Object.entries(typeCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([t, n]) => `${t} (${n}x)`)
          .join(", ") || "none";

        // Current streak
        const streakRow = (streakRes.data || []).find((r: any) => r.user_id === user.id);
        const streakDays = streakRow?.streak_days ?? 0;

        const context = [
          `Student name: ${fullName}`,
          `Current study streak: ${streakDays} day(s)`,
          `Mastered vocabulary by subject: ${vocabSummary}`,
          `Most-used learning activities recently: ${topActivities}`,
          `Latest 10 activities:`,
          recentList,
        ].join("\n");

        if (!cancelled) setStudentContext(context);
      } catch (e) {
        console.warn("[ChatBot] personalization fetch failed", e);
      }
    };

    loadStudentContext();
    const { data: sub } = supabase.auth.onAuthStateChange(() => loadStudentContext());
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Notify other floating widgets (e.g. Notebook) when chatbot opens/closes
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("chatbot:toggle", { detail: { open } }));
  }, [open]);

  // Allow other components (e.g. Home page tiles) to open the chatbot externally
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("chatbot:open", handler);
    return () => window.removeEventListener("chatbot:open", handler);
  }, []);

  // Pop a random fun fact every 3 minutes when chat is closed
  useEffect(() => {
    if (open) return;
    const greeting = lang === "vi" ? "Chào! Mình là thầy Hải. Hỏi mình nhé? 😊" : "Hi! I'm Mr.Hai. Ask me something? 😊";

    const popFact = () => {
      const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
      setTooltipText(`💡 ${lang === "vi" ? fact.vi : fact.en}`);
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
        setTooltipText(greeting);
      }, 12000);
    };

    // First greeting shortly after mount, then fun facts every 3 minutes
    const initial = setTimeout(() => {
      setTooltipText(greeting);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);
    const interval = setInterval(popFact, 3 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, [open, lang]);

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

  // ── Shake animation effect (separate from fun-fact rotation) ──
  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, 180000);

    return () => {
      clearInterval(interval);
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

  // ── File attachment handler ──
  const handleFileSelected = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = ""; // allow re-selecting same file
      if (!file) return;

      const MAX_SIZE = 4 * 1024 * 1024; // 4MB
      if (file.size > MAX_SIZE) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: t(
              "⚠️ File quá lớn (tối đa 4MB). Em chọn file nhỏ hơn nhé.",
              "⚠️ File too large (max 4MB). Please pick a smaller file.",
            ),
          },
        ]);
        return;
      }

      const isImage = file.type.startsWith("image/");
      if (isImage) {
        const reader = new FileReader();
        reader.onload = () => {
          setAttachment({ kind: "image", name: file.name, dataUrl: String(reader.result || "") });
        };
        reader.readAsDataURL(file);
        return;
      }

      // Treat as text-like (txt, md, csv, json, code, etc.)
      try {
        const text = await file.text();
        const trimmed = text.length > 12000 ? text.slice(0, 12000) + "\n…(truncated)" : text;
        setAttachment({ kind: "text", name: file.name, content: trimmed });
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: t(
              "⚠️ Không đọc được file này. Em thử file văn bản hoặc ảnh nhé.",
              "⚠️ Could not read this file. Try a text or image file.",
            ),
          },
        ]);
      }
    },
    [t],
  );

  // ── Send Message ──
  const sendMessage = async () => {
    if ((!input.trim() && !attachment) || isLoading || chatLocked) return;

    // Rate limiting check
    if (isRateLimited()) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: t("⚠️ Bạn gửi quá nhanh. Vui lòng chờ 1 phút.", "⚠️ You're sending too fast. Please wait a minute.")
      }]);
      return;
    }

    const rawInput = input.trim();

    // 1. Profanity check (highest priority)
    if (rawInput && containsProfanity(rawInput)) {
      setProfanityWarning(true);
      logModerationEvent(rawInput);
      setInput("");
      // Auto-dismiss warning after 8 seconds
      setTimeout(() => setProfanityWarning(false), 8000);
      return;
    }

    // Build display message (for UI history)
    let displayContent = rawInput;
    if (attachment) {
      const tag = attachment.kind === "image" ? `🖼️ ${attachment.name}` : `📎 ${attachment.name}`;
      displayContent = rawInput ? `${rawInput}\n\n[${tag}]` : `[${tag}]`;
    }
    const userMsgUi: Message = { role: "user", content: displayContent };

    // Build payload message (what we actually send to Perplexity)
    let payloadContent: any;
    if (attachment?.kind === "image") {
      payloadContent = [
        { type: "text", text: rawInput || t("Em vừa gửi một ảnh, thầy xem giúp em nhé.", "I just attached an image — please take a look.") },
        { type: "image_url", image_url: { url: attachment.dataUrl } },
      ];
    } else if (attachment?.kind === "text") {
      payloadContent = `${rawInput || t("Thầy xem giúp em file này nhé.", "Please review this file for me.")}\n\n--- Attached file: ${attachment.name} ---\n${attachment.content}\n--- end of file ---`;
    } else {
      payloadContent = rawInput;
    }

    const uiMessages = [...messages, userMsgUi];
    setMessages(uiMessages);
    setInput("");
    setAttachment(null);
    setIsLoading(true);

    // Send to backend with text-only history + new (possibly multimodal) message
    const payloadMessages = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: payloadContent },
    ];

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: payloadMessages, studentContext }),
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
                  className="relative max-w-[260px] rounded-xl border border-border bg-card px-4 py-2.5 text-left text-sm leading-snug text-foreground shadow-lg"
                >
                  <span>{tooltipText}</span>
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
              <img
                src={chatbotIcon}
                alt="Thầy Hải"
                className="h-12 w-12 object-cover sm:h-14 sm:w-14"
                style={{ transformOrigin: "50% 75%", animation: "wave-hand 12s ease-in-out infinite" }}
              />
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
                <h3 className="text-base font-bold text-foreground">
                  {studentName
                    ? t(`👋 Chào ${studentName}!`, `👋 Hi ${studentName}!`)
                    : "👋 Hello, I'm Mr. Hai!"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {studentContext
                    ? t("Thầy đã có dữ liệu học tập của em — hỏi gì cũng được nhé!", "I have your learning data — ask me anything!")
                    : t("Cùng nâng cấp kỹ năng cùng thầy hôm nay nhé!", "Level up your skills with me today.")}
                </p>
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
