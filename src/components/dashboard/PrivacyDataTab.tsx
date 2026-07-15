/**
 * @file PrivacyDataTab.tsx
 * @description Self-service GDPR tools inside the Dashboard: export personal data
 * as JSON, and permanently delete the account via the delete-my-account edge function.
 */
import { useState } from "react";
import { Download, Trash2, ShieldCheck, Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Props {
  userId: string;
  email: string | null;
}

// Tables the user owns — mirrors the server-side deletion helper.
const EXPORT_TABLES: { table: string; column?: string }[] = [
  { table: "profiles", column: "id" },
  { table: "student_profiles" },
  { table: "student_activity_log" },
  { table: "user_vocab_mastered" },
  { table: "student_notebooks" },
  { table: "student_submissions" },
  { table: "writing_drafts" },
  { table: "daily_reports" },
  { table: "your_corner_posts" },
  { table: "your_corner_comments" },
  { table: "your_corner_reactions" },
  { table: "player_badges" },
  { table: "mood_checkins" },
  { table: "career_assessments" },
  { table: "counseling_journal" },
  { table: "motivation_letter_drafts" },
  { table: "university_shortlist" },
];

const PrivacyDataTab = ({ userId, email }: Props) => {
  const { t } = useLanguage();
  const [exporting, setExporting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const bundle: Record<string, unknown> = {
        exported_at: new Date().toISOString(),
        user: { id: userId, email },
        tables: {},
      };
      const results: Record<string, unknown> = {};
      for (const { table, column } of EXPORT_TABLES) {
        const col = column ?? "user_id";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase as any).from(table).select("*").eq(col, userId);
        results[table] = error ? { error: error.message } : data ?? [];
      }
      bundle.tables = results;

      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `haiedutech-export-${userId}-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(t("Đã xuất dữ liệu của bạn.", "Your data has been exported."));
    } catch (err) {
      toast.error(t("Xuất dữ liệu thất bại.", "Export failed."), {
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    if (confirmText !== "DELETE") {
      toast.error(t("Vui lòng gõ chính xác DELETE để xác nhận.", "Please type DELETE exactly to confirm."));
      return;
    }
    setDeleting(true);
    try {
      const { data, error } = await supabase.functions.invoke("delete-my-account", {
        body: { confirm: "DELETE" },
      });
      if (error) throw error;
      if (data && (data as { ok?: boolean }).ok === false) {
        throw new Error((data as { error?: string }).error || "delete_failed");
      }
      toast.success(t("Tài khoản đã được xoá vĩnh viễn.", "Your account has been permanently deleted."));
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err) {
      toast.error(t("Xoá tài khoản thất bại.", "Account deletion failed."), {
        description: err instanceof Error ? err.message : String(err),
      });
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-3 mb-3">
          <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="text-base font-bold text-foreground">
              {t("Quyền riêng tư & dữ liệu", "Privacy & Data")}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t(
                "Thực hiện quyền GDPR của bạn: truy cập dữ liệu và quyền được lãng quên.",
                "Exercise your GDPR rights: data access and right-to-be-forgotten."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h4 className="text-sm font-bold text-foreground mb-1">
          {t("Xuất dữ liệu cá nhân", "Export My Personal Data")}
        </h4>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          {t(
            "Tải xuống một file JSON chứa hồ sơ, tiến độ học tập, bài luận và bài đăng của bạn.",
            "Download a JSON file containing your profile, learning progress, essays and posts."
          )}
        </p>
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {t("Tải dữ liệu (JSON)", "Download Data (JSON)")}
        </button>
      </div>

      {/* Delete */}
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-start gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
          <h4 className="text-sm font-bold text-destructive">
            {t("Xoá tài khoản & dữ liệu vĩnh viễn", "Delete My Account & Data Permanently")}
          </h4>
        </div>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          {t(
            "Hành động này không thể hoàn tác. Tất cả tiến độ học, ghi chú, bài luận và bài đăng của bạn sẽ bị xoá vĩnh viễn.",
            "This action is irreversible. All your learning progress, notes, essays and posts will be permanently deleted."
          )}
        </p>
        {!confirmOpen ? (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold hover:brightness-110 transition"
          >
            <Trash2 className="w-4 h-4" />
            {t("Xoá tài khoản của tôi", "Delete My Account")}
          </button>
        ) : (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-foreground block">
              {t("Gõ", "Type")} <span className="font-mono text-destructive">DELETE</span>{" "}
              {t("để xác nhận:", "to confirm:")}
            </label>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full max-w-xs px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground focus:border-destructive/50 focus:outline-none"
              placeholder="DELETE"
              autoComplete="off"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting || confirmText !== "DELETE"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-bold hover:brightness-110 transition disabled:opacity-50"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {t("Xoá vĩnh viễn", "Delete Permanently")}
              </button>
              <button
                type="button"
                onClick={() => { setConfirmOpen(false); setConfirmText(""); }}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-foreground text-sm font-semibold hover:bg-secondary transition"
              >
                {t("Huỷ", "Cancel")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyDataTab;
