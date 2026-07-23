// Dialog to create or edit a study goal.
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { GOAL_CATEGORIES, type StudyGoal } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: StudyGoal | null;
  onSubmit: (values: Partial<StudyGoal>) => void;
}

export default function GoalFormDialog({ open, onOpenChange, initial, onSubmit }: Props) {
  const { t, lang } = useLanguage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("other");
  const [target_date, setTargetDate] = useState("");
  const [target_metric, setTargetMetric] = useState("");
  const [progress_pct, setProgress] = useState(0);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? "");
      setDescription(initial?.description ?? "");
      setCategory(initial?.category ?? "other");
      setTargetDate(initial?.target_date ?? "");
      setTargetMetric(initial?.target_metric ?? "");
      setProgress(Number(initial?.progress_pct ?? 0));
    }
  }, [open, initial]);

  const submit = () => {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      category,
      target_date: target_date || null,
      target_metric: target_metric.trim() || null,
      progress_pct: Math.max(0, Math.min(100, Number(progress_pct) || 0)),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? t("Chỉnh sửa mục tiêu", "Edit goal") : t("Thêm mục tiêu mới", "New study goal")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>{t("Tiêu đề", "Title")}</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("VD: Đạt IELTS 7.5 vào tháng 12/2026", "e.g. Reach IELTS 7.5 by Dec 2026")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{t("Danh mục", "Category")}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {GOAL_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{lang === "vi" ? c.labelVi : c.labelEn}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("Hạn chót", "Target date")}</Label>
              <Input type="date" value={target_date} onChange={(e) => setTargetDate(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>{t("Chỉ số mục tiêu (tuỳ chọn)", "Target metric (optional)")}</Label>
            <Input value={target_metric} onChange={(e) => setTargetMetric(e.target.value)} placeholder={t("VD: Band 7.5", "e.g. Band 7.5")} />
          </div>
          <div>
            <Label>{t("Tiến độ hiện tại (%)", "Current progress (%)")}</Label>
            <Input type="number" min={0} max={100} value={progress_pct} onChange={(e) => setProgress(Number(e.target.value))} />
          </div>
          <div>
            <Label>{t("Mô tả", "Description")}</Label>
            <Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t("Huỷ", "Cancel")}</Button>
          <Button onClick={submit} disabled={!title.trim()}>{initial ? t("Lưu", "Save") : t("Tạo", "Create")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
