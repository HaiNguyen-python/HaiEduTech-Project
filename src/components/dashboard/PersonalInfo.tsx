// Personal information panel for student dashboard
// Allows updating display name, phone, school, date of birth, bio, and avatar URL.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { User as UserIcon, Mail, Phone, School, Cake, FileText, Image as ImageIcon, Save, Loader2, Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PersonalInfoProps {
  userId: string;
  email: string | null;
}

const profileSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(80, "Max 80 characters"),
  phone: z.string().trim().max(20, "Max 20 characters").optional().or(z.literal("")),
  school: z.string().trim().max(120, "Max 120 characters").optional().or(z.literal("")),
  date_of_birth: z.string().optional().or(z.literal("")),
  bio: z.string().trim().max(500, "Max 500 characters").optional().or(z.literal("")),
  avatar_url: z.string().trim().url("Invalid URL").max(500).optional().or(z.literal("")),
});

const PersonalInfo = ({ userId, email }: PersonalInfoProps) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    school: "",
    date_of_birth: "",
    bio: "",
    avatar_url: "",
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await (supabase as any)
        .from("profiles")
        .select("full_name, phone, school, date_of_birth, bio, avatar_url")
        .eq("id", userId)
        .maybeSingle();
      if (data) {
        setForm({
          full_name: data.full_name ?? "",
          phone: data.phone ?? "",
          school: data.school ?? "",
          date_of_birth: data.date_of_birth ?? "",
          bio: data.bio ?? "",
          avatar_url: data.avatar_url ?? "",
        });
      }
      setLoading(false);
    };
    load();
  }, [userId]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSave = async () => {
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? t("Dữ liệu không hợp lệ", "Invalid data"));
      return;
    }
    setSaving(true);
    const payload = {
      full_name: parsed.data.full_name,
      phone: parsed.data.phone || null,
      school: parsed.data.school || null,
      date_of_birth: parsed.data.date_of_birth || null,
      bio: parsed.data.bio || null,
      avatar_url: parsed.data.avatar_url || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = await (supabase as any).from("profiles").update(payload).eq("id", userId);
    setSaving(false);
    if (error) {
      toast.error(t("Lưu thất bại", "Failed to save"));
      return;
    }
    toast.success(t("Đã cập nhật thông tin!", "Profile updated!"));
  };

  // Upload avatar to storage (marketing-images public bucket, scoped to avatars/<userId>/)
  const handleAvatarUpload = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error(t("Vui lòng chọn tệp ảnh", "Please choose an image file"));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("Ảnh tối đa 5MB", "Max image size is 5MB"));
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `avatars/${userId}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("marketing-images")
        .upload(path, file, { upsert: true, contentType: file.type, cacheControl: "3600" });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("marketing-images").getPublicUrl(path);
      const url = pub.publicUrl;
      // Persist immediately so the new avatar survives without needing Save
      const { error: dbErr } = await (supabase as any)
        .from("profiles")
        .update({ avatar_url: url, updated_at: new Date().toISOString() })
        .eq("id", userId);
      if (dbErr) throw dbErr;
      setForm((f) => ({ ...f, avatar_url: url }));
      toast.success(t("Đã cập nhật ảnh đại diện!", "Avatar updated!"));
    } catch (e: any) {
      toast.error(e?.message || t("Tải ảnh thất bại", "Upload failed"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Loader2 className="w-6 h-6 mx-auto animate-spin mb-2 text-primary" />
        {t("Đang tải...", "Loading...")}
      </div>
    );
  }

  const initials = (form.full_name || email || "U").trim().charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Avatar preview + upload */}
      <div className="flex items-center gap-4 mb-6 p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-emerald-500/10 border border-primary/20">
        <div className="relative group">
          {form.avatar_url ? (
            <img
              src={form.avatar_url}
              alt={form.full_name || "Avatar"}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow-sm"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary border-2 border-primary">
              {initials}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-105 transition disabled:opacity-60"
            title={t("Đổi ảnh đại diện", "Change avatar")}
            aria-label={t("Đổi ảnh đại diện", "Change avatar")}
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleAvatarUpload(f);
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-foreground truncate">{form.full_name || t("Học sinh", "Student")}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
            <Mail className="w-3 h-3 shrink-0" /> {email}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 h-7 text-xs gap-1.5"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="w-3 h-3" />
            {uploading ? t("Đang tải...", "Uploading...") : t("Tải ảnh đại diện", "Upload avatar")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="full_name" className="flex items-center gap-1.5 mb-1.5 text-sm">
            <UserIcon className="w-3.5 h-3.5 text-primary" />
            {t("Tên hiển thị", "Display name")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="full_name"
            value={form.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
            maxLength={80}
            placeholder={t("VD: Nguyễn Văn An", "e.g., John Doe")}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-1.5 mb-1.5 text-sm">
            <Phone className="w-3.5 h-3.5 text-primary" />
            {t("Số điện thoại", "Phone")}
          </Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            maxLength={20}
            placeholder="0xxx xxx xxx"
          />
        </div>

        <div>
          <Label htmlFor="dob" className="flex items-center gap-1.5 mb-1.5 text-sm">
            <Cake className="w-3.5 h-3.5 text-primary" />
            {t("Ngày sinh", "Date of birth")}
          </Label>
          <Input
            id="dob"
            type="date"
            value={form.date_of_birth}
            onChange={(e) => handleChange("date_of_birth", e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="school" className="flex items-center gap-1.5 mb-1.5 text-sm">
            <School className="w-3.5 h-3.5 text-primary" />
            {t("Trường học", "School")}
          </Label>
          <Input
            id="school"
            value={form.school}
            onChange={(e) => handleChange("school", e.target.value)}
            maxLength={120}
            placeholder={t("VD: THPT Chuyên Lê Hồng Phong", "e.g., Highschool name")}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="avatar_url" className="flex items-center gap-1.5 mb-1.5 text-sm">
            <ImageIcon className="w-3.5 h-3.5 text-primary" />
            {t("Link ảnh đại diện", "Avatar URL")}
          </Label>
          <Input
            id="avatar_url"
            value={form.avatar_url}
            onChange={(e) => handleChange("avatar_url", e.target.value)}
            maxLength={500}
            placeholder="https://..."
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="bio" className="flex items-center gap-1.5 mb-1.5 text-sm">
            <FileText className="w-3.5 h-3.5 text-primary" />
            {t("Giới thiệu bản thân", "About me")}
          </Label>
          <Textarea
            id="bio"
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            maxLength={500}
            rows={4}
            placeholder={t("Vài dòng về bạn, mục tiêu học tập...", "A few lines about yourself, learning goals...")}
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {form.bio.length}/500
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {t("Lưu thay đổi", "Save changes")}
        </Button>
      </div>
    </motion.div>
  );
};

export default PersonalInfo;
