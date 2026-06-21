import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, Loader2, Send, X, Smile, Tag, Globe2, GraduationCap, Lock, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { SUBJECTS, MOODS, SubjectKey, subjectMap, VISIBILITY_OPTIONS, Visibility, visibilityMap } from "@/lib/yourCornerMeta";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const visIcon = (k: Visibility) =>
  k === "public" ? Globe2 : k === "teacher_only" ? GraduationCap : Lock;


interface Props {
  userId: string;
  onPosted: () => void;
  userName?: string | null;
  userAvatar?: string | null;
}

export default function PostComposer({ userId, onPosted, userName, userAvatar }: Props) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [subject, setSubject] = useState<SubjectKey | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [expanded, setExpanded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);


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
    if (!trimmed) {
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
      const { error } = await supabase
        .from("your_corner_posts")
        .insert({
          user_id: userId,
          content: trimmed,
          image_url: imageUrl,
          subject: subject ?? null,
          mood: mood ?? null,
          visibility,
        });
      if (error) throw error;
      setContent("");
      clearImage();
      setSubject(null);
      setMood(null);
      setVisibility("public");
      setExpanded(false);
      toast.success("Đã đăng bài! 🎉");
      onPosted();

    } catch (e: any) {
      toast.error(e?.message || "Không đăng được bài");
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
        <Textarea
          value={content}
          onFocus={() => setExpanded(true)}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              if (!submitting && content.trim()) submit();
            }
          }}
          placeholder={`${displayName} ơi, hôm nay bạn học được gì? Chia sẻ với cả lớp nhé ✨ (dùng #hashtag để gắn chủ đề, Ctrl+Enter để đăng)`}
          className="min-h-[80px] resize-none border-0 focus-visible:ring-0 text-base p-0 bg-transparent"
          maxLength={5000}
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

      <div className="flex items-center justify-between border-t pt-3 flex-wrap gap-2">
        <div className="flex items-center gap-1 flex-wrap">
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
            className="text-emerald-600 hover:text-emerald-700"
          >
            <ImagePlus className="w-4 h-4 mr-1.5" /> Hình
          </Button>

          {/* Subject picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                <Tag className="w-4 h-4 mr-1.5" /> Chủ đề
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
              <Button type="button" variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700">
                <Smile className="w-4 h-4 mr-1.5" /> Cảm xúc
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
        </div>

        <div className="flex items-center gap-2">
          {/* Visibility picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 border-primary/20"
              >
                {(() => {
                  const Icn = visIcon(visibility);
                  return <Icn className="w-3.5 h-3.5" />;
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

          <Button
            onClick={submit}
            disabled={submitting || !content.trim()}
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
