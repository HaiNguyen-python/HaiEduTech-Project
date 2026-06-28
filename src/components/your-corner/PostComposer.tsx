import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, Loader2, Send, X, Smile, Tag, Globe2, GraduationCap, Lock, ChevronDown, BarChart3, Plus, Trash2 } from "lucide-react";

import { toast } from "sonner";
import { SUBJECTS, MOODS, SubjectKey, subjectMap, VISIBILITY_OPTIONS, Visibility, visibilityMap } from "@/lib/yourCornerMeta";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MentionInput, { Mentionable } from "./MentionInput";

const visIcon = (k: Visibility) =>
  k === "public" ? Globe2 : k === "teacher_only" ? GraduationCap : Lock;


interface Props {
  userId: string;
  onPosted: (newRow?: any) => void;
  userName?: string | null;
  userAvatar?: string | null;
  mentionables?: Mentionable[];
}

export default function PostComposer({ userId, onPosted, userName, userAvatar, mentionables = [] }: Props) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [subject, setSubject] = useState<SubjectKey | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [expanded, setExpanded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Poll state
  const [pollMode, setPollMode] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const updateOpt = (i: number, v: string) =>
    setPollOptions((arr) => arr.map((o, idx) => (idx === i ? v : o)));
  const addOpt = () => setPollOptions((arr) => (arr.length >= 6 ? arr : [...arr, ""]));
  const removeOpt = (i: number) =>
    setPollOptions((arr) => (arr.length <= 2 ? arr : arr.filter((_, idx) => idx !== i)));
  const resetPoll = () => {
    setPollMode(false);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setPollTopic("");
    setPollHint(null);
  };

  const [pollTopic, setPollTopic] = useState("");
  const [pollGenerating, setPollGenerating] = useState(false);
  const [pollHint, setPollHint] = useState<string | null>(null);

  const generatePollWithAI = async () => {
    if (pollGenerating) return;
    setPollGenerating(true);
    setPollHint(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-poll", {
        body: {
          subject: subject ?? null,
          topic: pollTopic.trim() || null,
          lang: "vi",
        },
      });
      // supabase.functions.invoke turns non-2xx into `error` but the JSON body is still in `data`
      const payload: any = data ?? (error as any)?.context?.body ?? null;
      if (payload?.code === "PAYMENT_REQUIRED" || payload?.error?.toString?.().toLowerCase?.().includes("credit")) {
        throw new Error("402:" + (payload?.error || "Hết credit AI"));
      }
      if (payload?.code === "RATE_LIMITED") throw new Error("429:" + payload.error);
      if (error) throw error;
      if (payload?.error) throw new Error(typeof payload.error === "string" ? payload.error : "AI lỗi");
      const result = payload;
      const q = String(result?.question || "").trim();
      const opts: string[] = Array.isArray(result?.options) ? result.options.map((o: any) => String(o).trim()) : [];
      if (!q || opts.length < 2) throw new Error("AI trả về dữ liệu không hợp lệ");
      setPollQuestion(q);
      setPollOptions(opts.slice(0, 6));
      const correct = Number.isInteger(result?.correct_index) ? result.correct_index : null;
      const expl = String(result?.explanation || "").trim();
      if (correct !== null && opts[correct]) {
        setPollHint(`✅ Đáp án đúng: ${String.fromCharCode(65 + correct)}. ${opts[correct]}${expl ? ` — ${expl}` : ""}`);
      } else if (expl) {
        setPollHint(expl);
      }
      toast.success("AI đã tạo poll - kiểm tra & chỉnh sửa trước khi đăng");
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (msg.includes("429")) toast.error("AI đang quá tải, thử lại sau ít phút");
      else if (msg.includes("402")) toast.error("Hết credit AI - vui lòng nạp thêm");
      else toast.error("Không tạo được poll: " + msg);
    } finally {
      setPollGenerating(false);
    }
  };




  const pickImage = (f: File | null) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Hình quá lớn (tối đa 5MB)");
      return;
    }
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async () => {
    const trimmed = content.trim();
    let pollPayload: { question: string; options: string[]; subject?: string | null; allow_change: boolean } | null = null;

    if (pollMode) {
      const q = pollQuestion.trim();
      const opts = pollOptions.map((o) => o.trim()).filter(Boolean);
      if (!q) {
        toast.error("Hãy nhập câu hỏi cho poll");
        return;
      }
      if (q.length > 280) {
        toast.error("Câu hỏi tối đa 280 ký tự");
        return;
      }
      if (opts.length < 2) {
        toast.error("Cần ít nhất 2 đáp án");
        return;
      }
      if (opts.some((o) => o.length > 120)) {
        toast.error("Mỗi đáp án tối đa 120 ký tự");
        return;
      }
      pollPayload = { question: q, options: opts, subject: subject ?? null, allow_change: true };
    } else if (!trimmed) {
      toast.error("Hãy nhập nội dung");
      return;
    }

    if (trimmed.length > 5000) {
      toast.error("Nội dung tối đa 5000 ký tự");
      return;
    }
    setSubmitting(true);
    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        const ext = imageFile.name.split(".").pop() || "jpg";
        const path = `your-corner/${userId}/${Date.now()}.${ext}`;
        const up = await supabase.storage
          .from("marketing-images")
          .upload(path, imageFile, { upsert: false, contentType: imageFile.type });
        if (up.error) throw up.error;
        const { data } = supabase.storage.from("marketing-images").getPublicUrl(path);
        imageUrl = data.publicUrl;
      }

      const now = new Date().toISOString();
      const newPost = {
        id: crypto.randomUUID(),
        user_id: userId,
        content: trimmed || (pollPayload ? `📊 ${pollPayload.question}` : ""),
        image_url: imageUrl,
        subject: subject ?? null,
        mood: mood ?? null,
        visibility,
        poll: pollPayload as any,
        created_at: now,
        updated_at: now,
      };

      const abortController = new AbortController();
      const timeoutId = window.setTimeout(() => abortController.abort(), 4500);
      const insertQuery = supabase
        .from("your_corner_posts")
        .insert(newPost as any);

      const { error } = await (typeof (insertQuery as any).abortSignal === "function"
        ? (insertQuery as any).abortSignal(abortController.signal)
        : insertQuery);
      window.clearTimeout(timeoutId);
      if (error) throw error;

      // Reset form & dismiss spinner immediately - don't wait for feed refresh
      setContent("");
      clearImage();
      setSubject(null);
      setMood(null);
      setVisibility("public");
      setExpanded(false);
      resetPoll();
      setSubmitting(false);
      toast.success(pollPayload ? "Đã đăng poll! 📊" : "Đã đăng bài! 🎉");
      // Defer parent update to next tick so the spinner UI flushes first
      setTimeout(() => onPosted(newPost), 0);
      return;
    } catch (e: any) {
      toast.error(e?.name === "AbortError" ? "Kết nối chậm, vui lòng thử lại" : e?.message || "Không đăng được bài");
    } finally {
      setSubmitting(false);
    }
  };


  const displayName = userName?.trim() || "Học viên";
  const initials = displayName.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
  const subjMeta = subject ? subjectMap.get(subject) : null;

  return (
    <Card className="p-5 space-y-3 backdrop-blur-md bg-white/85 dark:bg-card/85 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-3">
        <Avatar className="h-11 w-11 ring-2 ring-primary/20">
          {userAvatar && <AvatarImage src={userAvatar} alt={displayName} />}
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <MentionInput
          value={content}
          onChange={setContent}
          onFocus={() => setExpanded(true)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              if (!submitting && content.trim()) submit();
            }
          }}
          placeholder={`${displayName} ơi, hôm nay bạn học được gì? Dùng @ để tag bạn, #hashtag để gắn chủ đề ✨`}
          className="min-h-[80px] resize-none border-0 focus-visible:ring-0 text-base p-0 bg-transparent"
          maxLength={5000}
          mentionables={mentionables}
        />


      </div>

      {/* Subject + mood pills */}
      {(expanded || subject || mood) && (
        <div className="flex flex-wrap items-center gap-2 pl-14">
          {subjMeta && (
            <button
              type="button"
              onClick={() => setSubject(null)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${subjMeta.bg} ${subjMeta.color} hover:opacity-80`}
            >
              <span>{subjMeta.emoji}</span> {subjMeta.label} <X className="w-3 h-3" />
            </button>
          )}
          {mood && (
            <button
              type="button"
              onClick={() => setMood(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:opacity-80"
            >
              <span className="text-base leading-none">{mood}</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {imagePreview && (
        <div className="relative inline-block ml-14">
          <img src={imagePreview} alt="preview" className="max-h-64 rounded-lg" />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 bg-background/80 rounded-full p-1 hover:bg-background"
            aria-label="Xoá hình"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {pollMode && (
        <div className="ml-14 rounded-xl border border-primary/30 bg-gradient-to-br from-blue-50/70 to-emerald-50/70 dark:from-blue-950/30 dark:to-emerald-950/30 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" /> Tạo poll ôn tập
            </div>
            <button type="button" onClick={resetPoll} className="text-muted-foreground hover:text-destructive" aria-label="Huỷ poll">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* AI generator */}
          <div className="rounded-lg border border-violet-300/40 bg-white/70 dark:bg-card/70 p-2 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300 flex items-center gap-1">
              ✨ AI tạo câu hỏi tự động {subject ? `(${subject})` : "(chọn chủ đề để AI bám sát)"}
            </div>
            <div className="flex items-center gap-1.5">
              <Input
                value={pollTopic}
                onChange={(e) => setPollTopic(e.target.value)}
                placeholder="Gợi ý chủ đề con (vd: thì hiện tại hoàn thành, vòng lặp for)"
                maxLength={280}
                className="bg-background h-8 text-xs"
              />
              <Button
                type="button"
                size="sm"
                onClick={generatePollWithAI}
                disabled={pollGenerating}
                className="h-8 px-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs shrink-0"
              >
                {pollGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "✨ Tạo"}
              </Button>
            </div>
            {pollHint && (
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 rounded px-2 py-1 leading-snug">
                {pollHint}
              </p>
            )}
          </div>


          <Input
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Câu hỏi (vd: Thì nào dùng với 'yesterday'?)"
            maxLength={280}
            className="bg-background"
          />
          <div className="space-y-1.5">
            {pollOptions.map((opt, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-xs font-semibold w-5 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                <Input
                  value={opt}
                  onChange={(e) => updateOpt(i, e.target.value)}
                  placeholder={`Đáp án ${i + 1}`}
                  maxLength={120}
                  className="bg-background"
                />
                {pollOptions.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOpt(i)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    aria-label="Xoá đáp án"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {pollOptions.length < 6 && (
            <Button type="button" variant="ghost" size="sm" onClick={addOpt} className="text-xs h-7">
              <Plus className="w-3.5 h-3.5 mr-1" /> Thêm đáp án
            </Button>
          )}
          <p className="text-[10px] text-muted-foreground">Tối đa 6 đáp án. Học viên sẽ bình chọn trực tiếp trong bài viết.</p>
        </div>
      )}



      <div className="flex items-center flex-wrap gap-0.5 border-t pt-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pickImage(e.target.files?.[0] ?? null)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => fileRef.current?.click()}
          className="text-emerald-600 hover:text-emerald-700 px-2 h-8 text-xs"
        >
          <ImagePlus className="w-4 h-4 mr-1" /> Hình
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => { setPollMode((v) => !v); setExpanded(true); }}
          className={`px-2 h-8 text-xs ${pollMode ? "text-primary bg-primary/10" : "text-violet-600 hover:text-violet-700"}`}
        >
          <BarChart3 className="w-4 h-4 mr-1" /> Poll
        </Button>



        {/* Subject picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 px-2 h-8 text-xs">
              <Tag className="w-4 h-4 mr-1" /> Chủ đề
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <p className="text-xs text-muted-foreground px-2 pb-2">Chọn chủ đề bài viết</p>
            <div className="grid grid-cols-2 gap-1">
              {SUBJECTS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSubject(s.key)}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium hover:bg-muted text-left ${
                    subject === s.key ? `${s.bg} ${s.color}` : ""
                  }`}
                >
                  <span>{s.emoji}</span> {s.label}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Mood picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 px-2 h-8 text-xs">
              <Smile className="w-4 h-4 mr-1" /> Cảm xúc
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2">
            <div className="flex flex-wrap gap-1">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`text-2xl p-1.5 rounded-md hover:bg-muted transition-transform hover:scale-125 ${
                    mood === m ? "bg-amber-500/10" : ""
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Visibility picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:text-purple-700 px-2 h-8 text-xs gap-1"
            >
              {(() => {
                const Icn = visIcon(visibility);
                return <Icn className="w-4 h-4" />;
              })()}
              {visibilityMap.get(visibility)?.label}
              <ChevronDown className="w-3 h-3 opacity-60" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-1" align="end">
            {VISIBILITY_OPTIONS.map((v) => {
              const Icn = visIcon(v.key);
              const active = visibility === v.key;
              return (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setVisibility(v.key)}
                  className={`w-full flex items-start gap-2 p-2 rounded-md text-left text-sm hover:bg-muted transition ${
                    active ? "bg-primary/10" : ""
                  }`}
                >
                  <Icn className="w-4 h-4 mt-0.5 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">{v.label}</div>
                    <div className="text-xs text-muted-foreground">{v.hint}</div>
                  </div>
                  {active && <span className="text-primary text-xs">✓</span>}
                </button>
              );
            })}
          </PopoverContent>
        </Popover>

        <div className="ml-auto">
          <Button
            onClick={submit}
            disabled={submitting || (!content.trim() && !(pollMode && pollQuestion.trim() && pollOptions.filter((o) => o.trim()).length >= 2))}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-md disabled:opacity-50"
          >
            {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            Đăng bài
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-right">{content.length}/5000</p>

    </Card>
  );
}
