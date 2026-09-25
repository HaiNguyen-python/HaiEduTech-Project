import { useEffect, useState } from "react";
import { Crown, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Row {
  id: string;
  user_id: string;
  user_email: string | null;
  status: string;
  source: string;
  expires_at: string | null;
  transfer_reference: string | null;
}

const SOURCE_LABEL: Record<string, [string, string]> = {
  code: ["Mã kích hoạt", "Activation code"],
  stripe: ["Thanh toán online", "Online payment"],
  bank: ["Chuyển khoản", "Bank transfer"],
};

const PremiumMembersCard = () => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("user_subscriptions")
      .select("id, user_id, user_email, status, source, expires_at, transfer_reference")
      .order("updated_at", { ascending: false })
      .limit(200);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
    const ch = supabase.channel("premium-subs-admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "user_subscriptions" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const update = async (r: Row, patch: Partial<Row>) => {
    const { error } = await supabase.from("user_subscriptions").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", r.id);
    if (error) toast.error(error.message); else { toast.success(t("Đã cập nhật", "Updated")); load(); }
  };
  const extend = (r: Row) => {
    const base = r.expires_at && new Date(r.expires_at) > new Date() ? new Date(r.expires_at) : new Date();
    base.setFullYear(base.getFullYear() + 1);
    update(r, { status: "active", expires_at: base.toISOString() });
  };

  const pending = rows.filter((r) => r.status === "pending_verification");
  const activate = (r: Row) => {
    const other = rows.find((x) => x.user_id === r.user_id && x.status === "active" && x.expires_at && new Date(x.expires_at) > new Date());
    const base = other ? new Date(other.expires_at!) : new Date();
    base.setFullYear(base.getFullYear() + 1);
    update(r, { status: "active", expires_at: base.toISOString() });
  };

  return (
    <div id="premium-members" className="rounded-xl border border-border bg-card p-4 sm:p-5">
      {pending.length > 0 && (
        <div className="mb-4 rounded-lg border-2 border-amber-500/50 bg-amber-500/10 p-3">
          <p className="mb-2 text-sm font-bold text-foreground">
            {t(`${pending.length} chuyển khoản chờ kích hoạt`, `${pending.length} bank transfer(s) awaiting activation`)}
          </p>
          <div className="space-y-2">
            {pending.map((r) => (
              <div key={r.id} className="flex flex-col gap-2 rounded-md bg-card p-2 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1 text-sm">
                  <div className="break-all font-semibold text-foreground">{r.user_email ?? r.user_id.slice(0, 8)}</div>
                  <div className="break-all font-mono text-xs text-muted-foreground">{r.transfer_reference}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => activate(r)} className="rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">{t("Kích hoạt 12 tháng", "Activate 12 months")}</button>
                  <button onClick={() => update(r, { status: "rejected" })} className="rounded-md border border-destructive px-3 py-1.5 text-xs font-bold text-destructive">{t("Từ chối", "Reject")}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <h3 className="flex items-center gap-2 text-base font-bold text-foreground mb-3">
        <Crown className="w-4 h-4 text-amber-500" /> {t("Thành viên Premium", "Premium members")}
      </h3>
      {loading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("Chưa có ai.", "No members yet.")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr><th className="py-2">Email</th><th>{t("Nguồn", "Source")}</th><th>{t("Trạng thái", "Status")}</th><th>{t("Hết hạn", "Expires")}</th><th /></tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const expired = r.expires_at && new Date(r.expires_at) < new Date();
                return (
                  <tr key={r.id} className="border-t border-border">
                    <td className="py-2 pr-2 break-all">{r.user_email ?? r.user_id.slice(0, 8)}</td>
                    <td>{t(...(SOURCE_LABEL[r.source] ?? [r.source, r.source]))}</td>
                    <td className={expired ? "text-destructive" : r.status === "active" ? "text-emerald-600" : "text-amber-600"}>
                      {expired ? t("Hết hạn", "Expired") : r.status}
                    </td>
                    <td>{r.expires_at ? new Date(r.expires_at).toLocaleDateString() : "-"}</td>
                    <td className="text-right whitespace-nowrap space-x-2">
                      <button onClick={() => extend(r)} className="text-xs font-semibold text-primary hover:underline">
                        {r.status === "pending_verification" ? t("Duyệt +1 năm", "Approve +1 year") : t("+1 năm", "+1 year")}
                      </button>
                      {r.status === "active" && (
                        <button onClick={() => update(r, { status: "revoked" })} className="text-xs font-semibold text-destructive hover:underline">
                          {t("Thu hồi", "Revoke")}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PremiumMembersCard;
