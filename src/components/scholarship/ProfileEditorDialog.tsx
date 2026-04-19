/**
 * @file ProfileEditorDialog.tsx
 * @description Modal form for entering/updating academic profile data used by Match Score.
 */
import { useState, useEffect } from "react";
import { Loader2, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStudentProfile, type StudentProfileFull } from "@/hooks/useStudentProfile";
import { COUNTRIES } from "@/data/globalScholarshipData";

interface ProfileEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileEditorDialog = ({ open, onOpenChange }: ProfileEditorDialogProps) => {
  const { t } = useLanguage();
  const { profile, saveProfile, saving, userId } = useStudentProfile();
  const [form, setForm] = useState<StudentProfileFull>({});

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const update = <K extends keyof StudentProfileFull>(key: K, val: StudentProfileFull[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSave = async () => {
    if (!userId) {
      toast({
        title: t("Vui lòng đăng nhập", "Please sign in"),
        description: t("Tính năng này yêu cầu tài khoản.", "Account required for this feature."),
        variant: "destructive",
      });
      return;
    }
    const res = await saveProfile({
      gpa: form.gpa ? Number(form.gpa) : null,
      ielts_score: form.ielts_score ? Number(form.ielts_score) : null,
      toefl_score: form.toefl_score ? Number(form.toefl_score) : null,
      sat_score: form.sat_score ? Number(form.sat_score) : null,
      current_level: form.current_level || null,
      field_of_study: form.field_of_study || null,
      activities: form.activities || null,
      work_experience_years: form.work_experience_years ? Number(form.work_experience_years) : 0,
      target_country: form.target_country || null,
      target_level: form.target_level || null,
    });
    if ("error" in res) {
      toast({ title: t("Lỗi lưu", "Save failed"), description: res.error, variant: "destructive" });
      return;
    }
    toast({
      title: t("✅ Hồ sơ đã cập nhật", "✅ Profile updated"),
      description: t("Match Score sẽ tính lại tự động.", "Match Scores will recalculate automatically."),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5 text-primary" />
            {t("Hồ sơ học thuật của tôi", "My Academic Profile")}
          </DialogTitle>
          <DialogDescription>
            {t(
              "Càng chi tiết, Match Score càng chính xác. Tất cả dữ liệu đều riêng tư.",
              "The more detail, the more accurate the Match Score. All data stays private."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="gpa">GPA (4.0 scale)</Label>
            <Input id="gpa" type="number" step="0.01" min="0" max="4" placeholder="3.5"
              value={form.gpa ?? ""} onChange={(e) => update("gpa", e.target.value as any)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ielts">IELTS</Label>
            <Input id="ielts" type="number" step="0.5" min="0" max="9" placeholder="7.0"
              value={form.ielts_score ?? ""} onChange={(e) => update("ielts_score", e.target.value as any)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="toefl">TOEFL</Label>
            <Input id="toefl" type="number" min="0" max="120" placeholder="100"
              value={form.toefl_score ?? ""} onChange={(e) => update("toefl_score", e.target.value as any)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sat">SAT</Label>
            <Input id="sat" type="number" min="400" max="1600" placeholder="1450"
              value={form.sat_score ?? ""} onChange={(e) => update("sat_score", e.target.value as any)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="level">{t("Bậc hiện tại", "Current level")}</Label>
            <Select value={form.current_level || ""} onValueChange={(v) => update("current_level", v)}>
              <SelectTrigger><SelectValue placeholder={t("Chọn", "Select")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="Bachelor">Bachelor</SelectItem>
                <SelectItem value="Master">Master</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="target-level">{t("Bậc muốn ứng tuyển", "Target level")}</Label>
            <Select value={form.target_level || ""} onValueChange={(v) => update("target_level", v)}>
              <SelectTrigger><SelectValue placeholder={t("Chọn", "Select")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Bachelor">Bachelor</SelectItem>
                <SelectItem value="Master">Master</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="target-country">{t("Quốc gia mục tiêu", "Target country")}</Label>
            <Select value={form.target_country || ""} onValueChange={(v) => update("target_country", v)}>
              <SelectTrigger><SelectValue placeholder={t("Chọn", "Select")} /></SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.flag} {t(c.labelVi, c.labelEn)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="field">{t("Ngành học", "Field of study")}</Label>
            <Input id="field" placeholder="Computer Science"
              value={form.field_of_study || ""} onChange={(e) => update("field_of_study", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="exp">{t("Năm kinh nghiệm", "Work experience (years)")}</Label>
            <Input id="exp" type="number" min="0" max="40" placeholder="2"
              value={form.work_experience_years ?? ""} onChange={(e) => update("work_experience_years", e.target.value as any)} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="activities">{t("Hoạt động & thành tích", "Activities & achievements")}</Label>
            <Textarea
              id="activities"
              placeholder={t(
                "Ví dụ: Trưởng CLB Tin học, Huy chương Bạc HSG quốc gia, Volunteer dạy code cho 50 học sinh nông thôn...",
                "e.g. CS Club President, National Silver Medal, taught coding to 50 rural students..."
              )}
              rows={4}
              value={form.activities || ""}
              onChange={(e) => update("activities", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {t("Càng chi tiết và đo lường được càng tốt (≥200 ký tự).", "More detail with measurable impact = higher score (≥200 chars).")}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t("Huỷ", "Cancel")}</Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("Lưu hồ sơ", "Save profile")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditorDialog;
