// AI Roleplay chat component for Conversational English practice
// Provides an inline chat interface where students practice speaking scenarios
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, RotateCcw, Sparkles, Volume2, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

interface ConversationalRoleplayProps {
  lessonTitle: string;
  pillar: string;
  speakingTopics: string[];
  keySituationTitles: string[];
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/roleplay-chat`;

// Stream chat from the roleplay edge function
async function streamRoleplay({
  messages,
  topic,
  situation,
  lessonTitle,
  pillar,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  topic: string;
  situation: string;
  lessonTitle: string;
  pillar: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, topic, situation, lessonTitle, pillar }),
  });

  if (!resp.ok) {
    if (resp.status === 429) { onError("Rate limit. Please wait a moment."); return; }
    if (resp.status === 402) { onError("Credits exhausted. Please try later."); return; }
    onError("Failed to connect to AI."); return;
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

const ConversationalRoleplay = ({ lessonTitle, pillar, speakingTopics, keySituationTitles }: ConversationalRoleplayProps) => {
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

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages([{ role: "assistant", content: assistantSoFar }]);
    };

    await streamRoleplay({
      messages: [{ role: "user", content: `Start the roleplay scenario. The topic/situation is: "${topic}". Set the scene and ask me the first question in character.` }],
      topic,
      situation: topic,
      lessonTitle,
      pillar,
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
    setInput("");

    const userMsg: Msg = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > updated.length) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...updated, { role: "assistant", content: assistantSoFar }];
      });
    };

    // Filter out the initial "start" prompt — only send visible messages
    const visibleMessages = updated.map(m => ({ role: m.role, content: m.content }));

    await streamRoleplay({
      messages: visibleMessages,
      topic: selectedTopic,
      situation: selectedTopic,
      lessonTitle,
      pillar,
      onDelta: upsert,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        setMessages(prev => [...prev, { role: "assistant", content: `⚠️ ${err}` }]);
        setIsLoading(false);
      },
    });
  }, [input, messages, isLoading, selectedTopic, lessonTitle, pillar]);

  // Voice recording using Web Speech API
  const toggleRecording = useCallback(() => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start speech recognition if available
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            sendMessage(transcript);
          }
          setIsRecording(false);
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);

        recognition.start();
        setIsRecording(true);
      } else {
        alert(t("Trình duyệt không hỗ trợ nhận diện giọng nói", "Speech recognition is not supported in this browser"));
      }
    }
  }, [isRecording, sendMessage, t]);

  // Text-to-speech for AI messages
  const speakText = (text: string) => {
    const clean = text.replace(/[*#_`~\[\]()]/g, "").replace(/💡.*$/gm, "");
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const resetChat = () => {
    setMessages([]);
    setHasStarted(false);
    setSelectedTopic("");
    speechSynthesis.cancel();
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
  return (
    <div className="flex flex-col h-[500px] sm:h-[600px] bg-card rounded-xl border overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <div>
            <p className="text-sm font-bold">{t("Luyện nói AI", "AI Roleplay")}</p>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shrink-0 mt-1">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === "user" ? "order-first" : ""}`}>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted rounded-bl-sm"
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-muted p-3 rounded-2xl rounded-bl-sm">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-3">
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

          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={isRecording
                ? t("🎤 Đang nghe...", "🎤 Listening...")
                : t("Nhập tin nhắn bằng tiếng Anh...", "Type your message in English...")}
              disabled={isLoading || isRecording}
              rows={1}
              className="w-full resize-none rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            />
          </div>

          {/* Send button */}
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {isRecording && (
          <p className="text-xs text-center text-red-500 mt-2 animate-pulse">
            {t("🎤 Đang nghe... Nói tiếng Anh rồi dừng lại", "🎤 Listening... Speak in English then stop")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConversationalRoleplay;
