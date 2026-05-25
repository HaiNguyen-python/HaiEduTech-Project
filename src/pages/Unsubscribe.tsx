import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle, CheckCircle2, Loader2, MailX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "valid" | "success" | "already" | "invalid" | "error";

const Unsubscribe = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  const token = searchParams.get("token") || "";
  const supabaseUrl = useMemo(() => import.meta.env.VITE_SUPABASE_URL, []);
  const supabaseAnonKey = useMemo(() => import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, []);

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setStatus("invalid");
        return;
      }

      try {
        const response = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          {
            headers: {
              apikey: supabaseAnonKey,
            },
          },
        );

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.valid) {
          setStatus("valid");
          return;
        }

        if (data.reason === "already_unsubscribed") {
          setStatus("already");
          return;
        }

        setStatus(response.status === 404 ? "invalid" : "error");
      } catch {
        setStatus("error");
      }
    };

    validate();
  }, [supabaseAnonKey, supabaseUrl, token]);

  const confirmUnsubscribe = async () => {
    if (!token) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });

      if (error) throw error;

      if (data?.reason === "already_unsubscribed") {
        setStatus("already");
        return;
      }

      setStatus(data?.success ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const content = {
    loading: {
      icon: <Loader2 className="h-10 w-10 animate-spin text-primary" />,
      title: t("Đang kiểm tra yêu cầu", "Checking your request"),
      description: t("Vui lòng chờ một chút để xác thực liên kết hủy nhận email.", "Please wait while we validate your unsubscribe link."),
    },
    valid: {
      icon: <MailX className="h-10 w-10 text-primary" />,
      title: t("Xác nhận hủy nhận email", "Confirm unsubscribe"),
      description: t("Bạn sẽ ngừng nhận các email thông báo từ biểu mẫu trên website này.", "You will stop receiving app email notifications from this website."),
    },
    success: {
      icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
      title: t("Đã hủy nhận email", "You are unsubscribed"),
      description: t("Yêu cầu của bạn đã được ghi nhận thành công.", "Your request has been processed successfully."),
    },
    already: {
      icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
      title: t("Bạn đã hủy trước đó", "Already unsubscribed"),
      description: t("Email này trước đó đã được đưa ra khỏi danh sách nhận thông báo.", "This email address has already been removed from future app email notifications."),
    },
    invalid: {
      icon: <AlertCircle className="h-10 w-10 text-destructive" />,
      title: t("Liên kết không hợp lệ", "Invalid link"),
      description: t("Liên kết hủy nhận email không hợp lệ hoặc đã hết hạn.", "This unsubscribe link is invalid or has expired."),
    },
    error: {
      icon: <AlertCircle className="h-10 w-10 text-destructive" />,
      title: t("Không thể xử lý", "We couldn't process this"),
      description: t("Đã xảy ra lỗi tạm thời. Vui lòng thử lại sau.", "A temporary issue occurred. Please try again later."),
    },
  }[status];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hủy nhận email | HaiEduTech"
        description="Quản lý tùy chọn nhận email từ HaiEduTech."
        path="/unsubscribe"
      />
      <Navbar />
      <main className="container mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-16 sm:px-6">
        <Card className="mx-auto w-full border-border/80 shadow-xl shadow-primary/10">
          <CardHeader className="items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">{content.icon}</div>
            <CardTitle>{content.title}</CardTitle>
            <CardDescription className="max-w-lg text-base">{content.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 text-center">
            {status === "valid" && (
              <Button size="lg" onClick={confirmUnsubscribe} disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {t("Xác nhận hủy nhận", "Confirm unsubscribe")}
              </Button>
            )}
            {(status === "error" || status === "invalid") && (
              <Button size="lg" variant="outline" onClick={() => window.location.reload()}>
                {t("Thử lại", "Try again")}
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribe;