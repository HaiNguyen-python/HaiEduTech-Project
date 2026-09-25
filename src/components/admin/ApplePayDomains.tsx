import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Dom { domain: string; apple_pay: string; google_pay: string; apple_pay_error: string | null }

const ApplePayDomains = () => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Dom[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async (action?: "register") => {
    setBusy(true);
    const { data } = await supabase.functions.invoke("stripe-payment-domains", { body: { action, environment: "live" } });
    setRows((data?.domains as Dom[]) ?? []);
    setBusy(false);
  };
  useEffect(() => { run(); }, []);

  const badge = (s: string) => (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s === "active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>{s}</span>
  );

  return (
    <div className="mb-4 rounded-lg border border-border bg-secondary/30 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-foreground">{t("Tên miền Apple Pay / Google Pay", "Apple Pay domains")}</p>
        <button onClick={() => run("register")} disabled={busy} className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground disabled:opacity-60">
          {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : t("Đăng ký / Kiểm tra lại", "Register / Re-check")}
        </button>
      </div>
      <div className="space-y-1">
        {rows.map((r) => (
          <div key={r.domain} className="flex flex-wrap items-center gap-2 text-sm">
            <span className="min-w-0 flex-1 break-all font-mono text-foreground">{r.domain}</span>
            Apple {badge(r.apple_pay)} Google {badge(r.google_pay)}
            {r.apple_pay_error && <span className="w-full text-xs text-destructive">{r.apple_pay_error}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplePayDomains;
