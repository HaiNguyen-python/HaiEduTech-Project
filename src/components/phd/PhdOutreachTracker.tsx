/**
 * @file PhdOutreachTracker.tsx
 * @description Cold email outreach pipeline tracker - rows stored in localStorage.
 *   Lets students log who they emailed, status, next action, and export to CSV.
 */
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Download, Inbox } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "phd-outreach-log";

type Status = "sent" | "replied" | "interview" | "rejected" | "ghosted";

interface OutreachRow {
  id: string;
  professor: string;
  university: string;
  sentDate: string;
  status: Status;
  nextAction: string;
}

const STATUS_META: Record<Status, { vi: string; en: string; cls: string }> = {
  sent:      { vi: "Đã gửi",   en: "Sent",      cls: "bg-slate-500/15 text-slate-700 border-slate-500/40 dark:text-slate-300" },
  replied:   { vi: "Đã reply", en: "Replied",   cls: "bg-sky-500/15 text-sky-700 border-sky-500/40 dark:text-sky-300" },
  interview: { vi: "Phỏng vấn",en: "Interview", cls: "bg-emerald-500/15 text-emerald-700 border-emerald-500/40 dark:text-emerald-300" },
  rejected:  { vi: "Từ chối",  en: "Rejected",  cls: "bg-rose-500/15 text-rose-700 border-rose-500/40 dark:text-rose-300" },
  ghosted:   { vi: "Không trả lời", en: "Ghosted", cls: "bg-amber-500/15 text-amber-700 border-amber-500/40 dark:text-amber-300" },
};

const today = () => new Date().toISOString().slice(0, 10);

const PhdOutreachTracker = () => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<OutreachRow[]>([]);
  const [draft, setDraft] = useState<Omit<OutreachRow, "id">>({
    professor: "",
    university: "",
    sentDate: today(),
    status: "sent",
    nextAction: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRows(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const persist = (next: OutreachRow[]) => {
    setRows(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addRow = () => {
    if (!draft.professor.trim()) {
      toast({ title: t("Thiếu tên giáo sư", "Missing professor name"), variant: "destructive" });
      return;
    }
    const next = [{ id: crypto.randomUUID(), ...draft }, ...rows];
    persist(next);
    setDraft({ professor: "", university: "", sentDate: today(), status: "sent", nextAction: "" });
  };

  const updateRow = (id: string, patch: Partial<OutreachRow>) => {
    persist(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeRow = (id: string) => persist(rows.filter((r) => r.id !== id));

  const stats = useMemo(() => {
    const total = rows.length;
    const replied = rows.filter((r) => ["replied", "interview"].includes(r.status)).length;
    const ghosted = rows.filter((r) => r.status === "ghosted").length;
    const interview = rows.filter((r) => r.status === "interview").length;
    const replyRate = total ? Math.round((replied / total) * 100) : 0;
    return { total, replied, ghosted, interview, replyRate };
  }, [rows]);

  const exportCsv = () => {
    if (!rows.length) {
      toast({ title: t("Chưa có dòng nào", "Nothing to export") });
      return;
    }
    const header = "Professor,University,Sent date,Status,Next action";
    const csv = [header, ...rows.map((r) =>
      [r.professor, r.university, r.sentDate, r.status, r.nextAction]
        .map((c) => `"${(c || "").replace(/"/g, '""')}"`)
        .join(","),
    )].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `phd-outreach-${today()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mt-6 border-amber-300/70 dark:border-amber-800/50">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
              <Inbox className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold">{t("Outreach Tracker", "Outreach Tracker")}</h3>
              <p className="text-xs text-muted-foreground">
                {t("Theo dõi email cold đã gửi, status & next action — lưu cục bộ.",
                  "Track every cold email you sent, status & next action — saved locally.")}
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="gap-2" onClick={exportCsv}>
            <Download className="w-4 h-4" /> {t("Xuất CSV", "Export CSV")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <div className="p-3 rounded-md bg-muted/40 border text-center">
            <div className="text-lg font-bold">{stats.total}</div>
            <div className="text-[11px] text-muted-foreground">{t("Tổng gửi", "Total sent")}</div>
          </div>
          <div className="p-3 rounded-md bg-sky-500/10 border border-sky-500/30 text-center">
            <div className="text-lg font-bold text-sky-700 dark:text-sky-300">{stats.replied}</div>
            <div className="text-[11px] text-muted-foreground">{t("Đã reply", "Replied")}</div>
          </div>
          <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-center">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{stats.interview}</div>
            <div className="text-[11px] text-muted-foreground">{t("Phỏng vấn", "Interviews")}</div>
          </div>
          <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/30 text-center">
            <div className="text-lg font-bold text-amber-700 dark:text-amber-300">{stats.replyRate}%</div>
            <div className="text-[11px] text-muted-foreground">{t("Tỉ lệ reply", "Reply rate")}</div>
          </div>
        </div>

        {/* Add row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mb-3 p-3 rounded-md bg-muted/30 border">
          <Input className="sm:col-span-3" placeholder={t("Tên giáo sư *", "Professor *")} value={draft.professor} onChange={(e) => setDraft({ ...draft, professor: e.target.value })} />
          <Input className="sm:col-span-3" placeholder={t("Trường", "University")} value={draft.university} onChange={(e) => setDraft({ ...draft, university: e.target.value })} />
          <Input className="sm:col-span-2" type="date" value={draft.sentDate} onChange={(e) => setDraft({ ...draft, sentDate: e.target.value })} />
          <Select value={draft.status} onValueChange={(v) => setDraft({ ...draft, status: v as Status })}>
            <SelectTrigger className="sm:col-span-2"><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.entries(STATUS_META).map(([k, v]) => (
                <SelectItem key={k} value={k}>{t(v.vi, v.en)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addRow} className="sm:col-span-2 gap-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white">
            <Plus className="w-4 h-4" /> {t("Thêm", "Add")}
          </Button>
          <Input className="sm:col-span-12" placeholder={t("Next action (vd: gửi follow-up ngày 15/3)", "Next action (e.g. follow-up on Mar 15)")} value={draft.nextAction} onChange={(e) => setDraft({ ...draft, nextAction: e.target.value })} />
        </div>

        {/* Table */}
        {rows.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground border-2 border-dashed rounded-md">
            {t("Chưa có dòng nào — thêm professor đầu tiên ở trên.", "No rows yet — add your first professor above.")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[700px] border rounded-lg overflow-hidden">
              <thead className="bg-muted/60">
                <tr>
                  <th className="text-left p-2 font-semibold">{t("Giáo sư", "Professor")}</th>
                  <th className="text-left p-2 font-semibold">{t("Trường", "University")}</th>
                  <th className="text-left p-2 font-semibold">{t("Ngày gửi", "Sent")}</th>
                  <th className="text-left p-2 font-semibold">{t("Trạng thái", "Status")}</th>
                  <th className="text-left p-2 font-semibold">{t("Next action", "Next action")}</th>
                  <th className="p-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const meta = STATUS_META[r.status];
                  return (
                    <tr key={r.id} className="border-t hover:bg-muted/30">
                      <td className="p-2 font-medium">{r.professor}</td>
                      <td className="p-2 text-muted-foreground">{r.university || "—"}</td>
                      <td className="p-2 text-muted-foreground">{r.sentDate}</td>
                      <td className="p-2">
                        <Select value={r.status} onValueChange={(v) => updateRow(r.id, { status: v as Status })}>
                          <SelectTrigger className="h-7 text-xs w-[120px]"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.entries(STATUS_META).map(([k, v]) => (
                              <SelectItem key={k} value={k}>{t(v.vi, v.en)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Badge className={`hidden ${meta.cls}`}>{t(meta.vi, meta.en)}</Badge>
                      </td>
                      <td className="p-2">
                        <Input className="h-7 text-xs" value={r.nextAction} onChange={(e) => updateRow(r.id, { nextAction: e.target.value })} />
                      </td>
                      <td className="p-2">
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => removeRow(r.id)}>
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhdOutreachTracker;
