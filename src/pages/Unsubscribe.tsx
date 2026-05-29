import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, Mail, CheckCircle2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

type Status = "loading" | "ready" | "already" | "invalid" | "success" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_KEY } },
        );
        const data = await res.json();
        if (data?.valid) setStatus("ready");
        else if (data?.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <SEO title="Hủy đăng ký email · HaiEduTech" description="Hủy đăng ký nhận email từ HaiEduTech." path="/unsubscribe" />
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Hủy đăng ký email</h1>

        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground py-6">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang kiểm tra liên kết…
          </div>
        )}

        {status === "ready" && (
          <>
            <p className="text-muted-foreground mb-6">
              Bạn có chắc muốn ngừng nhận email từ HaiEduTech? Bạn sẽ không nhận được các thông báo và cập nhật trong tương lai.
            </p>
            <Button onClick={confirm} disabled={submitting} className="w-full">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Xác nhận hủy đăng ký
            </Button>
          </>
        )}

        {status === "success" && (
          <div className="text-muted-foreground">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-500" />
            Bạn đã hủy đăng ký thành công. Cảm ơn bạn đã đồng hành cùng HaiEduTech.
          </div>
        )}

        {status === "already" && (
          <div className="text-muted-foreground">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-500" />
            Email này đã được hủy đăng ký trước đó.
          </div>
        )}

        {(status === "invalid" || status === "error") && (
          <div className="text-muted-foreground">
            <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-amber-500" />
            {status === "invalid"
              ? "Liên kết không hợp lệ hoặc đã hết hạn."
              : "Có lỗi xảy ra. Vui lòng thử lại sau."}
          </div>
        )}
      </div>
    </div>
  );
}
