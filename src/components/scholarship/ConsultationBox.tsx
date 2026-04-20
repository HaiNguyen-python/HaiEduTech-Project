import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export interface AdvisorInput {
  dream: string;
  level: string;
  gpa: string;
  country: string;
  field: string;
  scholarshipType: string;
}

interface ConsultationBoxProps {
  onSubmit: (input: AdvisorInput) => void;
  loading: boolean;
}

const LEVELS = [
  { value: "High school senior", labelVi: "Học sinh lớp 12", labelEn: "High school senior" },
  { value: "Bachelor freshman/sophomore", labelVi: "Đại học năm 1-2", labelEn: "Bachelor (Year 1-2)" },
  { value: "Bachelor final year", labelVi: "Đại học năm cuối", labelEn: "Bachelor (Final year)" },
  { value: "Bachelor graduate", labelVi: "Đã tốt nghiệp Cử nhân", labelEn: "Bachelor graduate" },
  { value: "Master student", labelVi: "Đang học Thạc sĩ", labelEn: "Master student" },
  { value: "Master graduate", labelVi: "Đã tốt nghiệp Thạc sĩ", labelEn: "Master graduate" },
  { value: "Working professional", labelVi: "Đi làm", labelEn: "Working professional" },
];

const TYPES = [
  { value: "Any", labelVi: "Bất kỳ", labelEn: "Any" },
  { value: "Full funded", labelVi: "Toàn phần", labelEn: "Fully funded" },
  { value: "Partial", labelVi: "Bán phần", labelEn: "Partial" },
  { value: "Research / PhD funding", labelVi: "Nghiên cứu / PhD", labelEn: "Research / PhD" },
  { value: "Tuition waiver", labelVi: "Miễn học phí", labelEn: "Tuition waiver" },
];

const ConsultationBox = ({ onSubmit, loading }: ConsultationBoxProps) => {
  const { t } = useLanguage();
  const [form, setForm] = useState<AdvisorInput>({
    dream: "",
    level: "",
    gpa: "",
    country: "",
    field: "",
    scholarshipType: "Any",
  });

  const update = (k: keyof AdvisorInput, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    if (!form.dream.trim() && !form.field.trim()) return;
    onSubmit(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 p-5 sm:p-8 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-emerald-500 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            {t("Tư vấn học bổng cùng Mr. Hai", "Scholarship Consulting with Mr. Hai")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t(
              "Điền hồ sơ — Mr. Hai sẽ tìm 5 học bổng phù hợp & lộ trình ứng tuyển",
              "Share your profile — Mr. Hai finds 5 matched scholarships + roadmap",
            )}
          </p>
        </div>
      </div>

      {/* Dream textarea */}
      <div className="mb-4">
        <Label className="text-sm font-semibold mb-1.5 block">
          {t("✨ Kể về ước mơ học tập của bạn", "✨ Tell me about your academic dream")}
        </Label>
        <Textarea
          value={form.dream}
          onChange={(e) => update("dream", e.target.value)}
          placeholder={t(
            "VD: Tôi muốn học mô hình kinh doanh thời trang bền vững ở Bắc Âu với học bổng toàn phần...",
            "e.g. I want to study sustainable fashion business models in Scandinavia with a full scholarship...",
          )}
          className="min-h-[100px] resize-y text-sm"
          maxLength={1000}
        />
        <p className="text-[11px] text-muted-foreground mt-1">
          {t(
            "💡 Càng chi tiết, Mr. Hai càng tìm trúng học bổng cho bạn",
            "💡 The more specific, the better Mr. Hai matches scholarships",
          )}
        </p>
      </div>

      {/* Grid fields */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
        <div>
          <Label className="text-xs font-semibold mb-1 block">
            {t("Trình độ hiện tại", "Current Level")}
          </Label>
          <Select value={form.level} onValueChange={(v) => update("level", v)}>
            <SelectTrigger><SelectValue placeholder={t("Chọn...", "Select...")} /></SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {t(l.labelVi, l.labelEn)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs font-semibold mb-1 block">
            {t("GPA / Điểm trung bình", "GPA / Academic Score")}
          </Label>
          <Input
            value={form.gpa}
            onChange={(e) => update("gpa", e.target.value)}
            placeholder={t("VD: 3.5/4.0 hoặc 8.0/10", "e.g. 3.5/4.0 or 8.0/10")}
            maxLength={50}
          />
        </div>

        <div>
          <Label className="text-xs font-semibold mb-1 block">
            {t("Quốc gia mục tiêu", "Target Country")}
          </Label>
          <Input
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder={t("VD: Phần Lan, Đức, Hàn Quốc", "e.g. Finland, Germany, South Korea")}
            maxLength={100}
          />
        </div>

        <div>
          <Label className="text-xs font-semibold mb-1 block">
            {t("Ngành học", "Field of Study")}
          </Label>
          <Input
            value={form.field}
            onChange={(e) => update("field", e.target.value)}
            placeholder={t("VD: Khoa học dữ liệu, EdTech", "e.g. Data Science, EdTech")}
            maxLength={150}
          />
        </div>

        <div className="sm:col-span-2">
          <Label className="text-xs font-semibold mb-1 block">
            {t("Loại học bổng mong muốn", "Preferred Scholarship Type")}
          </Label>
          <Select value={form.scholarshipType} onValueChange={(v) => update("scholarshipType", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TYPES.map((t2) => (
                <SelectItem key={t2.value} value={t2.value}>
                  {t(t2.labelVi, t2.labelEn)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || (!form.dream.trim() && !form.field.trim())}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:shadow-xl hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t("Mr. Hai đang tìm học bổng...", "Mr. Hai is searching...")}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {t("🚀 Bắt đầu tư vấn cùng Mr. Hai", "🚀 Start Consultation with Mr. Hai")}
          </>
        )}
      </button>
    </motion.div>
  );
};

export default ConsultationBox;
