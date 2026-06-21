import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, Loader2, Send, X } from "lucide-react";
import { toast } from "sonner";

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
        .insert({ user_id: userId, content: trimmed, image_url: imageUrl });
      if (error) throw error;
      setContent("");
      clearImage();
      toast.success("Đã đăng bài!");
      onPosted();
    } catch (e: any) {
      toast.error(e?.message || "Không đăng được bài");
    } finally {
      setSubmitting(false);
    }
  };

  const displayName = userName?.trim() || "Học viên";
  const initials = displayName.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";

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
          onChange={(e) => setContent(e.target.value)}
          placeholder={`${displayName} ơi, hôm nay bạn học được gì? Chia sẻ với cả lớp nhé ✨`}
          className="min-h-[90px] resize-none border-0 focus-visible:ring-0 text-base p-0 bg-transparent"
          maxLength={5000}
        />
      </div>


      {imagePreview && (
        <div className="relative inline-block">
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

      <div className="flex items-center justify-between border-t pt-3">
        <div>
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
            <ImagePlus className="w-4 h-4 mr-2" />
            Thêm hình
          </Button>
        </div>
        <Button
          onClick={submit}
          disabled={submitting || !content.trim()}
          className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
        >
          {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          Đăng bài
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-right">{content.length}/5000</p>
    </Card>
  );
}
