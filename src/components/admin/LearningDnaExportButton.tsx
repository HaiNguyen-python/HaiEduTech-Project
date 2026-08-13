/**
 * @file LearningDnaExportButton.tsx
 * @description Exports a branded bilingual PDF progress report for the selected
 *              student so teachers can share it with parents or the learner.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildReportData, exportLearningDnaPdf, type ReportPeriod } from "@/lib/learningDnaReport";

interface Props {
  userId: string;
  studentName: string;
}

const LearningDnaExportButton = ({ userId, studentName }: Props) => {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<ReportPeriod>("30d");
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      const data = await buildReportData(userId, studentName, period);
      await exportLearningDnaPdf(data);
      toast.success(t("Đã xuất báo cáo PDF", "PDF report exported"));
    } catch {
      toast.error(t("Không xuất được báo cáo", "Could not export the report"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={period} onValueChange={(v) => setPeriod(v as ReportPeriod)}>
        <SelectTrigger className="h-8 w-[112px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper" side="bottom">
          <SelectItem value="30d">{t("30 ngày", "30 days")}</SelectItem>
          <SelectItem value="90d">{t("90 ngày", "90 days")}</SelectItem>
          <SelectItem value="all">{t("Tất cả", "All time")}</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" variant="outline" className="h-8 text-xs" onClick={handleExport} disabled={busy}>
        {busy ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <FileDown className="w-3.5 h-3.5 mr-1" />}
        {t("Xuất PDF", "Export PDF")}
      </Button>
    </div>
  );
};

export default LearningDnaExportButton;
