import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Headphones, Mic, Pause, Play, RotateCcw, Square, Trash2, Volume2 } from "lucide-react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageAction, MessageActions, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { supabase } from "@/integrations/supabase/client";
import {
  countSpokenWords,
  MR_HAI_TOPICS,
  normalizeMrHaiResponse,
  sessionStorageKey,
  speakingText,
  type MrHaiMessage,
  type MrHaiResponse,
  type MrHaiSessionSummary,
  type MrHaiVoiceState,
} from "@/lib/mrHaiVoicePractice";
import { micErrorMessage, playSpeakingTts, stopSpeakingTts, type SpeakingLang } from "@/lib/speakingModeShared";
import { safeStorage } from "@/lib/safeStorage";
import haiAvatar from "@/assets/hai-avatar.png.asset.json";

interface Props { language: SpeakingLang; }
const WAVEFORM = [4, 8, 5, 11, 7, 13, 6, 10, 4, 12, 8, 5, 11, 7, 4, 9, 6, 12, 5, 8];

const SpeakWithMrHaiMode = ({ language }: Props) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const topics = MR_HAI_TOPICS[language];
  const languageConfig = speakingCoachLanguages[language];
  const [topicId, setTopicId] = useState(topics[0]?.id ?? "daily");
  const [messages, setMessages] = useState<MrHaiMessage[]>([]);
  const [voiceState, setVoiceState] = useState<MrHaiVoiceState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<MrHaiSessionSummary | null>(null);
  const startedAtRef = useRef(Date.now());
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const topic = topics.find((item) => item.id === topicId) ?? topics[0];
  const isBusy = voiceState === "thinking" || voiceState === "speaking";
  const hasStarted = messages.length > 0;

  const speakReply = useCallback(async (reply: string) => {
    setVoiceState("speaking");
    await playSpeakingTts(language, speakingText(reply), 0.95);
    setVoiceState((current) => current === "paused" || current === "ended" ? current : "idle");
  }, [language]);

  const requestMrHai = useCallback(async (nextMessages: MrHaiMessage[], mode: "turn" | "summary" = "turn") => {
    if (!topic) return null;
    setVoiceState("thinking");
    setError(null);
    const { data, error: invokeError } = await supabase.functions.invoke("speak-with-mr-hai", {
      body: {
        language,
        topic: topic.prompt,
        mode,
        messages: nextMessages.map(({ role, content }) => ({ role, content })),
      },
    });
    if (invokeError) throw invokeError;
    const parsed = normalizeMrHaiResponse(data);
    if (!parsed) throw new Error("Invalid Mr. Hai response");
    return parsed;
  }, [language, topic]);

  const addLearnerTurn = useCallback(async (rawText: string) => {
    const content = rawText.normalize("NFC").trim().slice(0, 1200);
    if (!content || isBusy || voiceState === "ended") return;
    const learnerMessage: MrHaiMessage = { id: crypto.randomUUID(), role: "user", content };
    const nextMessages = [...messagesRef.current, learnerMessage];
    setMessages(nextMessages);
    try {
      const response = await requestMrHai(nextMessages);
      if (!response) return;
      const coachMessage: MrHaiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
        correction: response.correction,
        encouragement: response.encouragement,
      };
      setMessages((current) => [...current, coachMessage]);
      await speakReply(response.reply);
    } catch {
      setVoiceState("error");
      setError(t("Mr. Hai chưa thể trả lời. Câu nói của bạn vẫn được giữ lại để thử lại.", "Mr. Hai could not respond. Your turn is kept so you can retry."));
    }
  }, [isBusy, requestMrHai, speakReply, t, voiceState]);

  const rec = useSpeechRecognizer({
    speechLang: languageConfig.speechLang,
    maxSeconds: 45,
    onFinal: (transcript) => void addLearnerTurn(transcript),
  });

  useEffect(() => () => stopSpeakingTts(language), [language]);
  useEffect(() => {
    stopSpeakingTts(language);
    rec.reset();
    setMessages([]);
    setSummary(null);
    setVoiceState("idle");
    setError(null);
    startedAtRef.current = Date.now();
  }, [language, topicId]);

  const startSession = async () => {
    setMessages([]);
    setSummary(null);
    startedAtRef.current = Date.now();
    try {
      const response = await requestMrHai([]);
      if (!response) return;
      const opening: MrHaiMessage = { id: crypto.randomUUID(), role: "assistant", content: response.reply };
      setMessages([opening]);
      await speakReply(response.reply);
    } catch {
      setVoiceState("error");
      setError(t("Chưa thể bắt đầu phiên nói. Hãy thử lại sau ít phút.", "The speaking session could not start. Please try again shortly."));
    }
  };

  const pauseSession = () => {
    rec.reset();
    stopSpeakingTts(language);
    setVoiceState("paused");
  };

  const resumeSession = () => setVoiceState("idle");

  const endSession = async () => {
    rec.reset();
    stopSpeakingTts(language);
    if (!topic || messages.length === 0) return;
    try {
      const report = await requestMrHai(messages, "summary");
      if (!report) return;
      const durationSec = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
      const session: MrHaiSessionSummary = {
        date: new Date().toISOString(),
        language,
        topic: topic.label,
        durationSec,
        turns: messages.filter((message) => message.role === "user").length,
        words: countSpokenWords(messages, language),
        strengths: report.strengths,
        corrections: report.corrections,
        modelSentences: report.modelSentences,
      };
      setSummary(session);
      setVoiceState("ended");
      const previous = safeStorage.get<MrHaiSessionSummary[]>(sessionStorageKey(language), []) ?? [];
      safeStorage.set(sessionStorageKey(language), [session, ...previous].slice(0, 8));
      void logStudentActivity({
        activityType: `speaking_coach_mr_hai_${language}`,
        score: Math.min(10, Math.max(1, session.turns * 2)),
        maxScore: 10,
        timeSpentSeconds: durationSec,
        metadata: { language, topic: topic.id, turns: session.turns, words: session.words },
      });
    } catch {
      setVoiceState("error");
      setError(t("Chưa tạo được tổng kết. Bạn có thể tiếp tục nói hoặc thử kết thúc lại.", "The summary is not ready. You can continue or try ending again."));
    }
  };

  const clearSession = () => {
    pauseSession();
    setMessages([]);
    setSummary(null);
    setVoiceState("idle");
    setError(null);
    startedAtRef.current = Date.now();
  };

  const retryLastTurn = async () => {
    const withoutLastAssistant = messages[messages.length - 1]?.role === "assistant" ? messages.slice(0, -1) : messages;
    if (withoutLastAssistant.at(-1)?.role !== "user") return;
    try {
      const response = await requestMrHai(withoutLastAssistant);
      if (!response) return;
      const coachMessage: MrHaiMessage = { id: crypto.randomUUID(), role: "assistant", content: response.reply, correction: response.correction, encouragement: response.encouragement };
      setMessages([...withoutLastAssistant, coachMessage]);
      await speakReply(response.reply);
    } catch {
      setVoiceState("error");
      setError(t("Chưa thể thử lại lúc này.", "Unable to retry right now."));
    }
  };

  const micError = micErrorMessage(rec.error, t);
  const statusText = useMemo(() => ({
    idle: t("Sẵn sàng nghe bạn", "Ready for your turn"),
    listening: t("Đang lắng nghe", "Listening"),
    thinking: t("Mr. Hai đang suy nghĩ", "Mr. Hai is thinking"),
    speaking: t("Mr. Hai đang nói", "Mr. Hai is speaking"),
    paused: t("Phiên đã tạm dừng", "Session paused"),
    error: t("Cần thử lại", "Retry needed"),
    ended: t("Đã hoàn thành", "Session complete"),
  }[rec.isRecording ? "listening" : voiceState]), [rec.isRecording, t, voiceState]);

  return (
    <div className="speaking-studio space-y-4">
      <Card className="speaking-studio-shell overflow-hidden border-primary/20 bg-card/95 shadow-xl">
        <CardHeader className="border-b border-border/70 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl">Speak with Mr. Hai</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{t("Hội thoại hai chiều theo tình huống, có sửa lỗi nhẹ nhàng sau từng lượt.", "Two-way situational voice practice with gentle corrections after each turn.")}</p>
            </div>
            <Select value={topicId} onValueChange={setTopicId} disabled={hasStarted && voiceState !== "ended"}>
              <SelectTrigger className="w-full sm:w-[220px]" aria-label={t("Chọn tình huống", "Choose a situation")}><SelectValue /></SelectTrigger>
              <SelectContent>{topics.map((item) => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="flex flex-col items-center rounded-md border border-primary/20 bg-primary/5 p-4 text-center">
            <div className="relative grid h-40 w-40 place-items-center">
              {(rec.isRecording || voiceState === "speaking") && [1, 2, 3].map((ring) => (
                <motion.span key={ring} className="absolute rounded-full border border-primary/30" initial={false} animate={reduceMotion ? { width: 150, height: 150, opacity: 0.25 } : { width: [140, 190], height: [140, 190], opacity: [0.45, 0] }} transition={{ duration: 1.4, delay: ring * 0.25, repeat: Infinity }} />
              ))}
              <motion.img
                src={haiAvatar.url}
                alt={t("Avatar thầy Hải", "Mr. Hai avatar")}
                className="relative z-10 h-32 w-32 rounded-full border-4 border-background object-cover shadow-lg"
                animate={reduceMotion ? undefined : voiceState === "thinking" ? { rotate: [-2, 2, -2] } : voiceState === "speaking" ? { y: [0, -5, 0] } : rec.isRecording ? { scale: [1, 1.03, 1] } : { y: [0, -2, 0] }}
                transition={{ duration: voiceState === "speaking" ? 0.55 : 2, repeat: Infinity }}
              />
            </div>
            <Badge className="mt-2" variant={voiceState === "error" ? "destructive" : "secondary"}>{statusText}</Badge>
            <div className={`speaking-waveform mt-3 w-full ${rec.isRecording ? "is-recording" : voiceState === "speaking" ? "is-playing" : ""}`} aria-hidden="true">
              {WAVEFORM.map((height, index) => <motion.span key={`${height}-${index}`} className="speaking-waveform-bar" style={{ height: `${height * 2}px` }} animate={(rec.isRecording || voiceState === "speaking") && !reduceMotion ? { scaleY: [0.45, 1, 0.6] } : { scaleY: 0.5 }} transition={{ duration: 0.55, delay: index * 0.025, repeat: Infinity }} />)}
            </div>
            {!hasStarted ? (
              <Button className="mt-4 w-full" onClick={() => void startSession()} disabled={isBusy}><Play className="h-4 w-4" />{t("Bắt đầu hội thoại", "Start conversation")}</Button>
            ) : (
              <div className="mt-4 grid w-full grid-cols-2 gap-2">
                {voiceState === "paused" ? <Button onClick={resumeSession}><Play className="h-4 w-4" />{t("Tiếp tục", "Resume")}</Button> : <Button variant="outline" onClick={pauseSession}><Pause className="h-4 w-4" />{t("Tạm dừng", "Pause")}</Button>}
                <Button variant="outline" onClick={() => void endSession()} disabled={isBusy || voiceState === "ended"}><Square className="h-4 w-4" />{t("Kết thúc", "Finish")}</Button>
              </div>
            )}
            <Button variant="ghost" size="sm" className="mt-2 text-muted-foreground" onClick={clearSession} disabled={!hasStarted}><Trash2 className="h-4 w-4" />{t("Xóa phiên", "Clear session")}</Button>
          </aside>

          <section className="min-w-0 space-y-3">
            <div className="relative h-[430px] overflow-hidden rounded-md border bg-background/80">
              <Conversation>
                <ConversationContent className="gap-5 p-4">
                  {messages.length === 0 ? (
                    <ConversationEmptyState title={t("Chọn tình huống và bắt đầu", "Choose a situation and start")} description={t("Mr. Hai sẽ mở đầu bằng một câu hỏi ngắn. Microphone chỉ bật khi bạn nhấn nút.", "Mr. Hai will open with a short question. The microphone activates only when you press it.")} icon={<img src={haiAvatar.url} alt="" className="h-16 w-16 rounded-full object-cover" />} />
                  ) : messages.map((message) => (
                    <Message key={message.id} from={message.role}>
                      <MessageContent className={message.role === "user" ? "bg-primary text-primary-foreground" : undefined}>
                        <MessageResponse>{message.content}</MessageResponse>
                        {message.correction && <div className="mt-2 rounded-md border border-accent/50 bg-accent/10 p-2 text-xs text-foreground"><strong>{t("Gợi ý sửa:", "Correction:")}</strong> {message.correction}</div>}
                        {message.encouragement && <p className="text-xs font-semibold text-primary">{message.encouragement}</p>}
                      </MessageContent>
                      {message.role === "assistant" && <MessageActions><MessageAction tooltip={t("Nghe lại", "Replay")} onClick={() => void speakReply(message.content)}><Volume2 className="h-4 w-4" /></MessageAction></MessageActions>}
                    </Message>
                  ))}
                  {voiceState === "thinking" && <Message from="assistant"><MessageContent><Shimmer>{t("Mr. Hai đang suy nghĩ...", "Mr. Hai is thinking...")}</Shimmer></MessageContent></Message>}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </div>

            {(micError || error) && <div role="alert" className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"><span>{micError || error}</span>{error && messages.at(-1)?.role === "user" && <Button size="sm" variant="outline" onClick={() => void retryLastTurn()}><RotateCcw className="h-4 w-4" />{t("Thử lại", "Retry")}</Button>}</div>}

            <PromptInput onSubmit={({ text }) => addLearnerTurn(text)} className="bg-background" accept="">
              <PromptInputTextarea placeholder={t("Nói bằng microphone hoặc nhập câu trả lời...", "Speak with the microphone or type your reply...")} disabled={!hasStarted || isBusy || voiceState === "paused" || voiceState === "ended"} />
              <PromptInputFooter>
                <div className="flex items-center gap-2">
                  {rec.isRecording ? <Button type="button" size="sm" variant="destructive" onClick={rec.stop}><Square className="h-4 w-4" />{t("Dừng", "Stop")} {rec.seconds}s</Button> : <Button type="button" size="sm" variant="outline" disabled={!hasStarted || isBusy || voiceState === "paused" || voiceState === "ended"} onClick={() => { setVoiceState("listening"); void rec.start(); }}><Mic className="h-4 w-4" />{t("Nói", "Speak")}</Button>}
                  {rec.transcript && <span className="line-clamp-1 max-w-[210px] text-xs text-muted-foreground">{rec.transcript}</span>}
                </div>
                <PromptInputSubmit status={voiceState === "thinking" ? "submitted" : "ready"} disabled={!hasStarted || isBusy || voiceState === "paused" || voiceState === "ended"} />
              </PromptInputFooter>
            </PromptInput>
          </section>
        </CardContent>
      </Card>

      {summary && <Card className="border-primary/20"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><CheckCircle2 className="h-5 w-5 text-primary" />{t("Tổng kết buổi nói", "Session summary")}</CardTitle></CardHeader><CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[[summary.durationSec, t("Giây", "Seconds")], [summary.turns, t("Lượt nói", "Turns")], [summary.words, t("Từ đã nói", "Words")], [summary.topic, t("Tình huống", "Situation")]].map(([value, label]) => <div key={label} className="rounded-md border p-3 text-center"><p className="font-bold text-primary">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>)}</div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border p-4"><p className="mb-2 font-semibold">{t("Điểm mạnh", "Strengths")}</p><ul className="space-y-1 text-sm">{summary.strengths.map((item) => <li key={item}>• {item}</li>)}</ul></div>
          <div className="rounded-md border p-4"><p className="mb-2 font-semibold">{t("Câu cần cải thiện", "Corrections")}</p><ul className="space-y-1 text-sm">{summary.corrections.map((item) => <li key={item}>• {item}</li>)}</ul></div>
        </div>
        {summary.modelSentences.length > 0 && <div className="rounded-md border border-primary/20 bg-primary/5 p-4"><p className="mb-2 font-semibold">{t("Câu mẫu nâng cấp", "Upgraded model sentences")}</p><div className="space-y-2">{summary.modelSentences.map((sentence) => <div key={sentence} className="flex items-center justify-between gap-3 rounded-md bg-background p-3 text-sm"><span>{sentence}</span><Button size="icon" variant="ghost" aria-label={t("Nghe câu mẫu", "Listen to model sentence")} onClick={() => void speakReply(sentence)}><Headphones className="h-4 w-4" /></Button></div>)}</div></div>}
      </CardContent></Card>}
    </div>
  );
};

export default SpeakWithMrHaiMode;