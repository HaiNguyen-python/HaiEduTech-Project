import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type Status = "validating" | "ready" | "already" | "invalid" | "submitting" | "done" | "error";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [status, setStatus] = useState<Status>("validating");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const data = await res.json();
        if (data?.valid === true) setStatus("ready");
        else if (data?.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("invalid");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setStatus("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if ((data as any)?.success) setStatus("done");
      else if ((data as any)?.reason === "already_unsubscribed") setStatus("already");
      else {
        setErrorMsg("Không thể xử lý yêu cầu. Vui lòng thử lại.");
        setStatus("error");
      }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Lỗi không xác định");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Hủy đăng ký email · HaiEduTech</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {status === "validating" && (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p>Đang kiểm tra liên kết...</p>
            </div>
          )}
          {status === "invalid" && (
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <p>Liên kết không hợp lệ hoặc đã hết hạn.</p>
            </div>
          )}
          {status === "already" && (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <p>Email của bạn đã được gỡ khỏi danh sách trước đó. Bạn sẽ không nhận thêm email từ chúng tôi.</p>
            </div>
          )}
          {(status === "ready" || status === "submitting") && (
            <>
              <p className="text-muted-foreground">
                Nhấn xác nhận để ngừng nhận tất cả email từ HaiEduTech (bao gồm báo cáo học tập định kỳ).
              </p>
              <Button onClick={confirm} disabled={status === "submitting"} className="w-full">
                {status === "submitting" ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý...</>
                ) : (
                  "Xác nhận hủy đăng ký"
                )}
              </Button>
            </>
          )}
          {status === "done" && (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <p>Bạn đã ngừng đăng ký thành công. Cảm ơn bạn đã đồng hành cùng HaiEduTech.</p>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <p>{errorMsg}</p>
              <Button variant="outline" onClick={() => setStatus("ready")}>Thử lại</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
