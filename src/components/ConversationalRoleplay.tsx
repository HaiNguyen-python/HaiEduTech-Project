// AI Roleplay chat component for Conversational English practice
// Provides an inline chat interface where students practice speaking scenarios
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, RotateCcw, Sparkles, Volume2, User, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";

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

/** Groups the handy structures into short labelled rows so the panel is scannable. */
const STRUCTURE_GROUPS: { key: string; labelVi: string; labelEn: string; test: RegExp }[] = [
  { key: "opinion", labelVi: "Nêu ý kiến", labelEn: "Give an opinion", test: /^(i think|in my opinion|i'd say|it seems to me|the way i see it|to be honest|from a business|i couldn't|minun|olen sitä|我觉得|我认为|对我来说)/i },
  { key: "reason", labelVi: "Lý do & ví dụ", labelEn: "Reasons & examples", test: /(one reason|for example|it depends|long story short|to summarise|to sum up|esimerkiksi|se riippuu|比如说|一方面)/i },
  { key: "react", labelVi: "Đồng ý / phản hồi", labelEn: "Agree & disagree", test: /(good point|on the other hand|however|i see your point|let me put it|olen samaa|kuulostaa|听起来|虽然)/i },
  { key: "ask", labelVi: "Hỏi & làm rõ", labelEn: "Ask & clarify", test: /(\?|could you explain|what do you mean|just to clarify|voitko|selittää|吗|为什么|请让我确认)/i },
  { key: "work", labelVi: "Họp & công việc", labelEn: "Meetings & work", test: /(meeting|agenda|action item|align|circle back|offline|timeline|loop in|bandwidth|moving forward|park that|buy-in|kokous|aihe|ehdotan|askel|议程|开会|跟进|下一步)/i },
];

export const groupStructures = (items: string[]) => {
  const used = new Set<string>();
  const groups = STRUCTURE_GROUPS.map((group) => {
    const matched = items.filter((item) => !used.has(item) && group.test.test(item));
    matched.forEach((item) => used.add(item));
    return { ...group, items: matched };
  }).filter((group) => group.items.length > 0);
  const rest = items.filter((item) => !used.has(item));
  if (rest.length) {
    groups.push({ key: "more", labelVi: "Cụm khác", labelEn: "More phrases", test: /.^/, items: rest });
  }
  return groups;
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
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [helpersOpen, setHelpersOpen] = useState(true);
  const [helpersExpanded, setHelpersExpanded] = useState(false);

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
  const lastSpokenIdxRef = useRef<number>(-1);

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
  const speakText = useCallback(async (text: string) => {
    const clean = text
      .replace(/\*\*.*?\*\*/g, (m) => m.replace(/\*\*/g, ""))
      .replace(/[*#_`~\[\]()]/g, "")
      .replace(/💡.*$/gm, "")
      .replace(/🎯.*$/gm, "")
      .trim();
    if (!clean) return;

    // Stop any playing audio
    if (currentAudioRef.current) {
      try { currentAudioRef.current.pause(); } catch { /* ignore */ }
      currentAudioRef.current = null;
    }
    speechSynthesis.cancel();

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
      audio.onplay = () => setAiSpeaking(true);
      audio.onended = () => setAiSpeaking(false);
      audio.onpause = () => setAiSpeaking(false);
      audio.onerror = () => setAiSpeaking(false);
      await audio.play();
    } catch (err) {
      // Fallback to system voice if natural TTS fails
      console.warn("dialog-tts failed, falling back to system voice", err);
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      utterance.onstart = () => setAiSpeaking(true);
      utterance.onend = () => setAiSpeaking(false);
      utterance.onerror = () => setAiSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  }, [language, langCode]);

  // Auto-play AI reply once streaming finishes for a natural conversation feel
  useEffect(() => {
    if (isLoading) return;
    if (!messages.length) return;
    const lastIdx = messages.length - 1;
    const last = messages[lastIdx];
    if (last.role !== "assistant" || !last.content) return;
    if (last.content.startsWith("⚠️")) return;
    if (lastSpokenIdxRef.current === lastIdx) return;
    lastSpokenIdxRef.current = lastIdx;
    void speakText(last.content);
  }, [isLoading, messages, speakText]);


  const resetChat = () => {
    setMessages([]);
    setHasStarted(false);
    setSelectedTopic("");
    setAiSpeaking(false);
    lastSpokenIdxRef.current = -1;
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
          <h3 className="font-bold text-lg">{t("Luyện nói với AI", "Roleplay Practice")}</h3>
          <p className="mt-1 text-base font-medium text-muted-foreground">
            {t(
              "Chọn một tình huống bên dưới để bắt đầu trò chuyện với AI bằng tiếng Anh",
              "Choose a scenario below to start chatting in English"
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
              <span className="flex-1 text-base font-semibold">{topic}</span>
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
  // Student mascot = the opposite chibi so both characters look distinct on stage
  const studentAvatar = partnerAvatar === businessManChibi ? businessWomanChibi : businessManChibi;
  const topicPack = detectTopicPack(pillar, lessonTitle, selectedTopic);
  const { structures, vocab } = getHelperSets(language, business, topicPack);
  const partnerLabel = language === "chinese"
    ? t("Bạn luyện nói", "Speaking Buddy")
    : language === "finnish"
      ? t("Bạn luyện nói", "Speaking Buddy")
      : t("Bạn luyện nói", "Speaking Buddy");

  // Chibi with mouth-movement animation used on the speaker stage
  const TalkingChibi = ({ src, speaking, label, side }: { src: string; speaking: boolean; label: string; side: "left" | "right" }) => (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="relative">
        <motion.div
          animate={speaking ? { y: [0, -3, 0], rotate: side === "left" ? [0, -2, 2, 0] : [0, 2, -2, 0] } : { y: 0, rotate: 0 }}
          transition={speaking ? { duration: 0.55, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          className="relative"
        >
          <img
            src={src}
            alt={label}
            width={96}
            height={96}
            className={`w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg ${side === "right" ? "scale-x-[-1]" : ""}`}
          />
          {/* Mouth overlay: a small oval that opens/closes to fake lip sync */}
          <motion.span
            aria-hidden
            className="absolute left-1/2 bg-rose-500/90 rounded-full pointer-events-none"
            style={{ top: "63%" }}
            animate={speaking ? { height: [2, 8, 3, 9, 2], width: [8, 10, 9, 11, 8], opacity: 0.85, x: "-50%" } : { height: 2, width: 8, opacity: 0.55, x: "-50%" }}
            transition={speaking ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
          />
        </motion.div>
        {speaking && (
          <motion.span
            aria-hidden
            className="absolute -inset-1 rounded-full border-2 border-emerald-400/60 pointer-events-none"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <span className={`rounded-full px-2 py-1 text-sm font-bold ${speaking ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
        {speaking ? t("🗣 Đang nói", "🗣 Speaking") : label}
      </span>
    </div>
  );


  const structureGroups = groupStructures(structures);
  const visibleVocab = helpersExpanded ? vocab : vocab.slice(0, 10);

  /** Adds a helper phrase to the reply box so learners can practise using it. */
  const insertHelper = (text: string) => {
    setInput((current) => (current.trim() ? `${current.trim()} ${text}` : text));
    inputRef.current?.focus();
  };


  const HelperChip = ({ text, tone }: { text: string; tone: "structure" | "vocab" }) => (
    <span
      className={
        tone === "structure"
          ? "inline-flex items-center gap-1 rounded-lg border-l-[3px] border-primary/60 bg-primary/10 pl-2 pr-1 py-0.5"
          : "inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 pl-2.5 pr-1 py-0.5"
      }
    >
      <button
        type="button"
        onClick={() => insertHelper(text)}
        className="text-left text-base font-semibold text-foreground hover:underline focus-visible:outline-none focus-visible:underline"
        title={t("Chèn vào câu trả lời", "Insert into your reply")}
      >
        {text}
      </button>
      <button
        type="button"
        onClick={() => void speakText(text)}
        aria-label={t(`Nghe: ${text}`, `Listen: ${text}`)}
        className="rounded-full p-1 text-muted-foreground hover:text-primary"
      >
        <Volume2 className="h-3.5 w-3.5" />
      </button>
    </span>
  );

  const TopHelperPanel = () => (
    <div className="mb-3 rounded-xl border bg-card/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <button
          type="button"
          onClick={() => setHelpersOpen((open) => !open)}
          className="flex items-center gap-2 text-base font-extrabold uppercase tracking-wide text-primary"
        >
          {helpersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {t("Trợ giúp nói", "Speaking helper")}
        </button>
        {business && (
          <img src={businessChibi} alt="" width={32} height={32} loading="lazy" className="h-8 w-8 shrink-0 object-contain drop-shadow" />
        )}
      </div>
      {helpersOpen && (
        <div className="grid gap-4 border-t px-4 py-3 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-primary">
              {t("💬 Cấu trúc hữu ích", "💬 Handy structures")}
            </p>
            <div className="space-y-2.5">
              {structureGroups.map((group) => (
                <div key={group.key}>
                  <p className="mb-1 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    {t(group.labelVi, group.labelEn)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(helpersExpanded ? group.items : group.items.slice(0, 4)).map((item) => (
                      <HelperChip key={item} text={item} tone="structure" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-primary">
              {t("📚 Từ vựng gợi ý", "📚 Suggested vocab")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {visibleVocab.map((word) => (
                <HelperChip key={word} text={word} tone="vocab" />
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <Button variant="ghost" size="sm" onClick={() => setHelpersExpanded((open) => !open)} className="h-8 text-primary">
              {helpersExpanded ? t("Thu gọn", "Show less") : t("Xem thêm", "Show more")}
            </Button>
            <p className="mt-1 text-base font-medium text-muted-foreground">
              {t("Bấm vào cụm từ để chèn vào câu trả lời, bấm loa để nghe.", "Tap a phrase to insert it into your reply, tap the speaker to hear it.")}
            </p>
          </div>
        </div>
      )}
    </div>
  );


  return (
    <div className="flex flex-col">
      <TopHelperPanel />
      <div className="w-full flex flex-col h-[620px] sm:h-[760px] xl:h-[880px] bg-card rounded-xl border overflow-hidden relative">



      {/* Scene background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-15 pointer-events-none"
        style={{ backgroundImage: `url(${sceneBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80 pointer-events-none" />

      {/* Chat header */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="flex items-center gap-2">
          <img src={partnerAvatar} alt="" className="h-11 w-11 rounded-full bg-white/90 p-0.5 object-contain" width={44} height={44} />
          <div>
            <p className="text-lg sm:text-xl font-extrabold leading-tight">{partnerLabel}</p>
            <p className="text-sm sm:text-base font-semibold opacity-95 truncate max-w-[420px]">{selectedTopic}</p>

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

      {/* Speaker stage: two chibi characters with lip-sync animation */}
      <div className="relative flex items-end justify-between gap-3 px-6 py-3 border-b bg-gradient-to-b from-background/60 to-background/20 backdrop-blur-sm">
        <TalkingChibi src={partnerAvatar} speaking={aiSpeaking} label={partnerLabel} side="left" />
        <div className="flex-1 text-center text-base font-semibold italic text-muted-foreground">
          {aiSpeaking
            ? t("AI đang nói...", "AI is speaking...")
            : isRecording
              ? t("Bạn đang nói...", "You're speaking...")
              : t("Nhấn mic để đối thoại", "Tap the mic to talk")}
        </div>
        <TalkingChibi src={studentAvatar} speaking={isRecording} label={t("Bạn", "You")} side="right" />
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
              <div className={`rounded-2xl p-3 text-base font-medium leading-7 shadow-sm ${
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
              className={`min-h-[56px] w-full whitespace-pre-wrap rounded-xl border bg-background px-4 py-2.5 text-base font-medium leading-relaxed transition-all ${
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
          <p className="mt-2 animate-pulse text-center text-base font-semibold text-destructive">
            {t("🎤 Đang nghe... Nói xong tạm dừng khoảng 6 giây hoặc bấm mic để gửi", "🎤 Listening... pause about 6s or tap the mic to send")}
          </p>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default ConversationalRoleplay;
