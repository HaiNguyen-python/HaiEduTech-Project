// AI Roleplay chat component for Conversational English practice
// Provides an inline chat interface where students practice speaking scenarios
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, RotateCcw, Sparkles, Volume2, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";
import roleplayMascot from "@/assets/roleplay-mascot.png";
import businessChibi from "@/assets/chibi-business-vest.png";
import businessManChibi from "@/assets/chibi-business-man.png";
import businessWomanChibi from "@/assets/chibi-business-woman.png";
import { bannerImageFor } from "@/lib/conversationalSituationVisuals";

// Pick a professional mascot (man/woman) based on a stable hash of the topic
// so learners see consistent character variety across scenarios.
const pickPartnerAvatar = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h) % 2 === 0 ? businessManChibi : businessWomanChibi;
};

// Handy phrases & structures shown in side panels during voice practice.
// Language- and topic-aware: general core + business + topical add-ons so
// learners always see scaffolds that match the current scenario.

// ---------- ENGLISH ----------
const EN_GENERAL_STRUCTURES = [
  "I think that ...", "In my opinion, ...", "It depends on ...",
  "One reason is ...", "For example, ...", "On the other hand, ...",
  "That's a good point, but ...", "Could you explain ...?",
  "What do you mean by ...?", "I'd say ...", "If I were you, I would ...",
  "It seems to me that ...", "The way I see it, ...", "To be honest, ...",
  "Speaking of which, ...", "Have you ever thought about ...?",
  "What if we ...?", "I couldn't agree more.", "I see your point, however ...",
  "Let me put it this way: ...",
];
const EN_GENERAL_VOCAB = [
  "actually", "basically", "honestly", "definitely", "obviously",
  "kind of", "sort of", "to be fair", "I guess", "somehow",
  "make sense", "figure out", "come up with", "look forward to",
  "hang out", "keep in touch", "get along", "run into",
  "point out", "bring up", "end up", "turn out",
];
const EN_BUSINESS_STRUCTURES = [
  "Let's kick off the meeting with ...", "The main agenda today is ...",
  "Just to clarify, ...", "Could we circle back to ...?",
  "Let's take that offline.", "The action item for me is ...",
  "From a business perspective, ...", "Long story short, ...",
  "Let's align on ...", "Moving forward, we should ...",
  "To summarise the key takeaways, ...", "Can I get your buy-in on ...?",
  "Let's park that for now.", "Do we have bandwidth to ...?",
  "What's the timeline for ...?", "I'd like to loop in ...",
];
const EN_BUSINESS_VOCAB = [
  "agenda", "stakeholder", "deliverable", "deadline", "milestone",
  "KPI", "ROI", "follow up", "touch base", "on the same page",
  "get the ball rolling", "reach out", "bandwidth", "leverage",
  "streamline", "ramp up", "scope", "roadmap", "synergy", "buy-in",
];

// Topic add-ons (English)
const EN_TOPIC_PACKS: Record<string, { s: string[]; v: string[] }> = {
  travel: {
    s: ["I'd like to book ...", "Is there a direct flight to ...?", "How do I get to ...?", "Do you have any rooms available?"],
    v: ["itinerary", "boarding pass", "check-in", "layover", "sightseeing", "book in advance"],
  },
  food: {
    s: ["Could I see the menu, please?", "What do you recommend?", "I'll have the ...", "Could we get the bill?"],
    v: ["appetizer", "main course", "dessert", "spicy", "vegetarian", "medium rare"],
  },
  shopping: {
    s: ["How much is this?", "Do you have this in ...?", "Can I try it on?", "Is there a discount?"],
    v: ["fitting room", "receipt", "refund", "on sale", "brand new", "a bargain"],
  },
  health: {
    s: ["I've been feeling ...", "It hurts when I ...", "Should I see a doctor?", "How often should I take it?"],
    v: ["symptom", "prescription", "check-up", "side effect", "sore throat", "run a fever"],
  },
  interview: {
    s: ["Thank you for the opportunity.", "One of my strengths is ...", "In my previous role, I ...", "A challenge I overcame was ..."],
    v: ["strength", "weakness", "achievement", "responsibility", "team player", "problem-solver"],
  },
};

// ---------- CHINESE ----------
const ZH_GENERAL_STRUCTURES = [
  "我觉得 ... (Wǒ juéde ...)", "我认为 ... (Wǒ rènwéi ...)",
  "对我来说 ... (Duì wǒ láishuō ...)", "比如说 ... (Bǐrú shuō ...)",
  "一方面 ... 另一方面 ...", "虽然 ... 但是 ...", "如果 ... 就 ...",
  "你觉得怎么样? (Nǐ juéde zěnmeyàng?)", "为什么呢? (Wèishéme ne?)",
  "可以再说一遍吗? (Kěyǐ zàishuō yíbiàn ma?)",
  "我不太明白 ... (Wǒ bú tài míngbái ...)", "听起来不错。(Tīng qǐlái búcuò.)",
];
const ZH_GENERAL_VOCAB = [
  "其实 qíshí", "当然 dāngrán", "可能 kěnéng", "也许 yěxǔ",
  "一般 yìbān", "特别 tèbié", "有点儿 yǒudiǎnr", "非常 fēicháng",
  "习惯 xíguàn", "喜欢 xǐhuān", "打算 dǎsuàn", "希望 xīwàng",
];
const ZH_BUSINESS_STRUCTURES = [
  "我们开始开会吧。", "今天的议程是 ...", "请让我确认一下 ...",
  "关于这个问题, 我建议 ...", "下一步我们要 ...", "我会跟进这件事。",
];
const ZH_BUSINESS_VOCAB = [
  "会议 huìyì", "项目 xiàngmù", "客户 kèhù", "报告 bàogào",
  "计划 jìhuà", "合作 hézuò", "预算 yùsuàn", "目标 mùbiāo",
];

// ---------- FINNISH ----------
const FI_GENERAL_STRUCTURES = [
  "Minun mielestäni ...", "Olen sitä mieltä, että ...",
  "Se riippuu ...", "Esimerkiksi ...", "Toisaalta ... toisaalta ...",
  "Vaikka ..., silti ...", "Jos ..., niin ...",
  "Mitä mieltä olet?", "Voitko selittää tarkemmin?",
  "En ole aivan varma.", "Kuulostaa hyvältä!", "Olen samaa mieltä.",
];
const FI_GENERAL_VOCAB = [
  "itse asiassa", "yleensä", "ehkä", "varmasti",
  "vähän", "todella", "tietysti", "melko",
  "tykätä", "haluta", "aikoa", "toivoa",
];
const FI_BUSINESS_STRUCTURES = [
  "Aloitetaan kokous.", "Tämän päivän aihe on ...",
  "Haluaisin tarkentaa ...", "Ehdotan, että ...",
  "Seuraava askel on ...", "Palaan asiaan pian.",
];
const FI_BUSINESS_VOCAB = [
  "kokous", "projekti", "asiakas", "raportti",
  "suunnitelma", "yhteistyö", "budjetti", "tavoite",
];

const isBusinessPillar = (pillar?: string, lessonTitle?: string) => {
  const s = `${pillar ?? ""} ${lessonTitle ?? ""}`.toLowerCase();
  return /business|professional|work|office|meeting|presentation|interview|negotiat|corporate/.test(s);
};

const detectTopicPack = (pillar?: string, lessonTitle?: string, topic?: string): string | null => {
  const s = `${pillar ?? ""} ${lessonTitle ?? ""} ${topic ?? ""}`.toLowerCase();
  if (/travel|trip|flight|hotel|airport|tour/.test(s)) return "travel";
  if (/food|restaurant|menu|cook|eat|cuisine/.test(s)) return "food";
  if (/shop|store|buy|market|mall|purchase/.test(s)) return "shopping";
  if (/health|doctor|hospital|medic|clinic|symptom/.test(s)) return "health";
  if (/interview|resume|cv|hiring|recruit/.test(s)) return "interview";
  return null;
};

const getHelperSets = (
  language: string,
  business: boolean,
  topicPack: string | null,
): { structures: string[]; vocab: string[] } => {
  if (language === "chinese") {
    return {
      structures: business ? [...ZH_BUSINESS_STRUCTURES, ...ZH_GENERAL_STRUCTURES.slice(0, 6)] : ZH_GENERAL_STRUCTURES,
      vocab: business ? [...ZH_BUSINESS_VOCAB, ...ZH_GENERAL_VOCAB.slice(0, 6)] : ZH_GENERAL_VOCAB,
    };
  }
  if (language === "finnish") {
    return {
      structures: business ? [...FI_BUSINESS_STRUCTURES, ...FI_GENERAL_STRUCTURES.slice(0, 6)] : FI_GENERAL_STRUCTURES,
      vocab: business ? [...FI_BUSINESS_VOCAB, ...FI_GENERAL_VOCAB.slice(0, 6)] : FI_GENERAL_VOCAB,
    };
  }
  // English (default)
  const base = business
    ? { s: EN_BUSINESS_STRUCTURES, v: EN_BUSINESS_VOCAB }
    : { s: EN_GENERAL_STRUCTURES, v: EN_GENERAL_VOCAB };
  const pack = topicPack ? EN_TOPIC_PACKS[topicPack] : null;
  return {
    structures: pack ? [...pack.s, ...base.s] : base.s,
    vocab: pack ? [...pack.v, ...base.v] : base.v,
  };
};

type Msg = { role: "user" | "assistant"; content: string };

// Remove em/en dashes from assistant replies to sound more natural and less AI-like
const stripDashes = (s: string) => s.replace(/\s*[—–]\s*/g, ", ");

interface ConversationalRoleplayProps {
  lessonTitle: string;
  pillar: string;
  speakingTopics: string[];
  keySituationTitles: string[];
  language?: "english" | "chinese" | "finnish";
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/roleplay-chat`;

// Stream chat from the roleplay edge function
async function streamRoleplay({
  messages,
  topic,
  situation,
  lessonTitle,
  pillar,
  language,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  topic: string;
  situation: string;
  lessonTitle: string;
  pillar: string;
  language: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  let resp: Response;
  try {
    resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, topic, situation, lessonTitle, pillar, language }),
    });
  } catch (networkErr) {
    console.error("Roleplay network error:", networkErr);
    onError("Network error. Please check your connection and try again.");
    return;
  }

  if (!resp.ok) {
    let errMsg = `AI service error (${resp.status})`;
    try {
      const data = await resp.json();
      if (data?.error) errMsg = data.error;
    } catch { /* ignore */ }
    console.error("Roleplay API error:", resp.status, errMsg);
    if (resp.status === 429) { onError(errMsg || "Rate limit. Please wait a moment."); return; }
    if (resp.status === 402) { onError(errMsg || "AI credits exhausted."); return; }
    onError(errMsg);
    return;
  }

  if (!resp.body) { onError("No response stream"); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let nlIdx: number;
    while ((nlIdx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, nlIdx);
      buffer = buffer.slice(nlIdx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }
  onDone();
}

const ConversationalRoleplay = ({ lessonTitle, pillar, speakingTopics, keySituationTitles, language = "english" }: ConversationalRoleplayProps) => {
  const langCode = language === "chinese" ? "zh-CN" : language === "finnish" ? "fi-FI" : "en-US";
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const messageTimestamps = useRef<number[]>([]);
  const recognitionRef = useRef<any>(null);
  const manualStopRef = useRef(false);
  const keepListeningRef = useRef(false);
  const speechActiveRef = useRef(false);
  const finalTranscriptRef = useRef("");
  const liveTranscriptRef = useRef("");
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rate limit: max 20 messages per minute
  const isRateLimited = useCallback(() => {
    const now = Date.now();
    messageTimestamps.current = messageTimestamps.current.filter(ts => now - ts < 60000);
    if (messageTimestamps.current.length >= 20) return true;
    messageTimestamps.current.push(now);
    return false;
  }, []);

  // Combine speaking topics and situation titles for selection
  const allTopics = [...new Set([...keySituationTitles, ...speakingTopics])];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Start conversation with AI initiating the scene
  const startConversation = useCallback(async (topic: string) => {
    setSelectedTopic(topic);
    setHasStarted(true);
    setMessages([]);
    setIsLoading(true);

    const initUserMsg: Msg = { role: "user", content: `Start the roleplay scenario. The topic/situation is: "${topic}". Set the scene and ask me the first question in character.` };
    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages([initUserMsg, { role: "assistant", content: stripDashes(assistantSoFar) }]);
    };

    await streamRoleplay({
      messages: [initUserMsg],
      topic,
      situation: topic,
      lessonTitle,
      pillar,
      language,
      onDelta: upsert,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        setMessages([{ role: "assistant", content: `⚠️ ${err}` }]);
        setIsLoading(false);
      },
    });
  }, [lessonTitle, pillar]);

  // Send a message
  const sendMessage = useCallback(async (text?: string) => {
    const content = text || input.trim();
    if (!content || isLoading) return;

    if (isRateLimited()) {
      setMessages(prev => [...prev, {
        role: "assistant" as const,
        content: t("⚠️ Bạn gửi quá nhanh. Vui lòng chờ 1 phút.", "⚠️ You're sending too fast. Please wait a minute.")
      }]);
      return;
    }
    setInput("");

    const userMsg: Msg = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      const clean = stripDashes(assistantSoFar);
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > updated.length) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: clean } : m);
        }
        return [...updated, { role: "assistant", content: clean }];
      });
    };

    // Sanitize: ensure alternating user/assistant starting with user
    const allMsgs = updated.map(m => ({ role: m.role, content: m.content }));
    const sanitized = allMsgs.filter((m, i) => {
      if (i === 0) return m.role === "user";
      return m.role !== allMsgs[i - 1].role;
    });

    await streamRoleplay({
      messages: sanitized,
      topic: selectedTopic,
      situation: selectedTopic,
      lessonTitle,
      pillar,
      language,
      onDelta: upsert,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        setMessages(prev => [...prev, { role: "assistant", content: `⚠️ ${err}` }]);
        setIsLoading(false);
      },
    });
  }, [input, messages, isLoading, selectedTopic, lessonTitle, pillar]);

  // Voice recording using Web Speech API - continuous mode so learners are
  // not cut off mid-sentence. Auto-submit only after a longer natural pause,
  // or when the user taps the mic again to stop.
  const finishRecording = useCallback((send: boolean) => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    manualStopRef.current = true;
    keepListeningRef.current = false;
    speechActiveRef.current = false;
    try { recognitionRef.current?.stop(); } catch { /* noop */ }
    setIsRecording(false);
    const finalText = liveTranscriptRef.current.trim();
    if (send && finalText) {
      finalTranscriptRef.current = "";
      liveTranscriptRef.current = "";
      setInput("");
      sendMessage(finalText);
    }
  }, [sendMessage]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      finishRecording(true);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t("Trình duyệt không hỗ trợ nhận diện giọng nói", "Speech recognition is not supported in this browser"));
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = langCode;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    manualStopRef.current = false;
    keepListeningRef.current = true;
    speechActiveRef.current = false;
    finalTranscriptRef.current = "";
    liveTranscriptRef.current = "";
    setInput("");

    const resetSilenceTimer = (hasSpeech: boolean) => {
      if (!hasSpeech) return;
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        if (speechActiveRef.current) return;
        // Long natural pause - treat as end of turn.
        finishRecording(true);
      }, 6500);
    };

    recognition.onspeechstart = () => {
      speechActiveRef.current = true;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };

    recognition.onspeechend = () => {
      speechActiveRef.current = false;
      resetSilenceTimer(liveTranscriptRef.current.trim().length > 0);
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) {
          finalTranscriptRef.current += res[0].transcript + " ";
        } else {
          interim += res[0].transcript;
        }
      }
      const transcript = (finalTranscriptRef.current + interim).replace(/\s+/g, " ").trim();
      liveTranscriptRef.current = transcript;
      setInput(transcript);
    };

    recognition.onerror = (e: any) => {
      // Ignore transient no-speech / aborted errors so the mic keeps listening.
      if (e?.error === "no-speech" || e?.error === "aborted") return;
      keepListeningRef.current = false;
      speechActiveRef.current = false;
      setIsRecording(false);
    };

    recognition.onend = () => {
      // Auto-restart if the browser closed the stream but user hasn't stopped.
      if (keepListeningRef.current && !manualStopRef.current) {
        window.setTimeout(() => {
          if (!keepListeningRef.current || manualStopRef.current) return;
          try {
            speechActiveRef.current = false;
            recognition.start();
            setIsRecording(true);
          } catch { /* browser may still be closing the previous session */ }
        }, 250);
        return;
      }
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setIsRecording(true);
    } catch {
      keepListeningRef.current = false;
      speechActiveRef.current = false;
      setIsRecording(false);
    }
  }, [isRecording, finishRecording, langCode, t]);

  // Text-to-speech for AI messages - uses OpenAI natural voices (dialog-tts)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const speakText = async (text: string) => {
    const clean = text
      .replace(/\*\*.*?\*\*/g, (m) => m.replace(/\*\*/g, ""))
      .replace(/[*#_`~\[\]()]/g, "")
      .replace(/💡.*$/gm, "")
      .replace(/🎯.*$/gm, "")
      .trim();
    if (!clean) return;

    // Stop any playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    const langMap: Record<string, string> = { english: "en", chinese: "zh", finnish: "fi" };
    const voiceMap: Record<string, string> = { english: "nova", chinese: "shimmer", finnish: "sage" };
    const lang = langMap[language] ?? "en";
    const voice = voiceMap[language] ?? "nova";

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dialog-tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text: clean.slice(0, 800), voice, lang, speed: 1.0 }),
      });
      if (!res.ok) throw new Error(`tts ${res.status}`);
      const data = await res.json();
      const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
      currentAudioRef.current = audio;
      await audio.play();
    } catch (err) {
      // Fallback to system voice if natural TTS fails
      console.warn("dialog-tts failed, falling back to system voice", err);
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      speechSynthesis.speak(utterance);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setHasStarted(false);
    setSelectedTopic("");
    speechSynthesis.cancel();
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
  };

  // Topic selection screen
  if (!hasStarted) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-primary/20">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="font-bold text-lg">{t("Luyện nói với AI", "AI Roleplay Practice")}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t(
              "Chọn một tình huống bên dưới để bắt đầu trò chuyện với AI bằng tiếng Anh",
              "Choose a scenario below to start chatting with AI in English"
            )}
          </p>
        </div>

        {/* Topic cards */}
        <div className="space-y-2">
          {allTopics.map((topic, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => startConversation(topic)}
              className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border hover:border-primary hover:shadow-md transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {i + 1}
              </div>
              <span className="text-sm flex-1">{topic}</span>
              <Sparkles className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Chat interface
  const sceneBg = bannerImageFor(selectedTopic);
  const business = isBusinessPillar(pillar, lessonTitle);
  const partnerAvatar = pickPartnerAvatar(`${lessonTitle}::${selectedTopic}`);
  const topicPack = detectTopicPack(pillar, lessonTitle, selectedTopic);
  const { structures, vocab } = getHelperSets(language, business, topicPack);
  const partnerLabel = language === "chinese"
    ? t("Bạn luyện nói", "Speaking Buddy")
    : language === "finnish"
      ? t("Bạn luyện nói", "Speaking Buddy")
      : t("Bạn luyện nói", "Speaking Buddy");

  const LeftHelperPanel = () => (
    <aside className="hidden xl:flex flex-col gap-3 w-64 shrink-0">
      <div className="rounded-xl border bg-card/95 backdrop-blur-sm p-4 shadow-sm">
        <p className="text-sm font-extrabold uppercase tracking-wide text-primary mb-3">
          {t("💬 Cấu trúc hữu ích", "💬 Handy Structures")}
        </p>
        <ul className="space-y-2">
          {structures.map((s) => (
            <li key={s} className="text-sm font-semibold leading-snug text-foreground border-l-[3px] border-primary/60 pl-2.5">
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border bg-card/95 backdrop-blur-sm p-4 shadow-sm">
        <p className="text-sm font-extrabold uppercase tracking-wide text-emerald-600 mb-3">
          {t("📚 Từ vựng gợi ý", "📚 Suggested Vocab")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {vocab.map((w) => (
            <span key={w} className="text-sm font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/40">
              {w}
            </span>
          ))}
        </div>
        {business && (
          <div className="mt-3 pt-3 border-t flex flex-col items-center">
            <img src={businessChibi} alt="" width={96} height={96} loading="lazy" className="w-24 h-24 object-contain drop-shadow" />
            <p className="text-xs font-medium text-muted-foreground italic mt-1 text-center">
              {t("Chào mừng đến buổi họp!", "Ready for business!")}
            </p>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <div className="flex gap-4 items-start">
      <LeftHelperPanel />
      <div className="flex-1 min-w-0 flex flex-col h-[620px] sm:h-[760px] xl:h-[820px] bg-card rounded-xl border overflow-hidden relative">



      {/* Scene background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-15 pointer-events-none"
        style={{ backgroundImage: `url(${sceneBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80 pointer-events-none" />

      {/* Chat header */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="flex items-center gap-2">
          <img src={partnerAvatar} alt="" className="h-8 w-8 rounded-full bg-white/90 p-0.5 object-contain" width={32} height={32} />
          <div>
            <p className="text-sm font-bold">{partnerLabel}</p>
            <p className="text-[10px] opacity-80 truncate max-w-[200px]">{selectedTopic}</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetChat}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
            title={t("Chọn lại chủ đề", "Pick new topic")}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>


      {/* Messages */}
      <div ref={chatContainerRef} className="relative flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <img src={partnerAvatar} alt="" className="w-9 h-9 rounded-full bg-white shadow-md shrink-0 mt-1 p-0.5" width={36} height={36} />
            )}
            <div className={`max-w-[80%] ${msg.role === "user" ? "order-first" : ""}`}>
              <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card/95 backdrop-blur-sm border rounded-bl-sm"
              }`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-1 [&>p:last-child]:mb-0">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
              {msg.role === "assistant" && msg.content && (
                <button
                  onClick={() => speakText(msg.content)}
                  className="mt-1 ml-1 text-muted-foreground hover:text-primary transition-colors"
                  title={t("Nghe phát âm", "Listen")}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </motion.div>
        ))}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-2 items-center">
            <img src={partnerAvatar} alt="" className="w-9 h-9 rounded-full bg-white shadow-md p-0.5" width={36} height={36} />
            <div className="bg-card/95 backdrop-blur-sm border p-3 rounded-2xl rounded-bl-sm shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>


      {/* Input area */}
      <div className="relative border-t p-3 bg-card/95 backdrop-blur-sm">

        <div className="flex gap-2 items-end">
          {/* Voice button */}
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={toggleRecording}
            disabled={isLoading}
            className={`shrink-0 h-10 w-10 rounded-full ${isRecording ? "animate-pulse" : ""}`}
            title={isRecording ? t("Dừng ghi âm", "Stop recording") : t("Nói tiếng Anh", "Speak English")}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          {/* Live transcript display (read-only, voice-only mode) */}
          <div className="flex-1 relative">
            <div
              className={`w-full min-h-[56px] rounded-xl border bg-background px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap transition-all ${
                isRecording
                  ? "min-h-[110px] ring-2 ring-red-300 bg-red-50/40 dark:bg-red-950/20"
                  : ""
              } ${!input ? "text-muted-foreground italic" : "text-foreground"}`}
              aria-live="polite"
            >
              {input || (isRecording
                ? t("🎤 Đang nghe... cứ nói thoải mái", "🎤 Listening... take your time")
                : t("Bấm mic và nói để bắt đầu luyện nói", "Tap the mic and speak to practice"))}
            </div>
          </div>
        </div>




        {isRecording && (
          <p className="text-xs text-center text-red-500 mt-2 animate-pulse">
            {t("🎤 Đang nghe... Nói xong tạm dừng khoảng 6 giây hoặc bấm mic để gửi", "🎤 Listening... pause about 6s or tap the mic to send")}
          </p>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default ConversationalRoleplay;
