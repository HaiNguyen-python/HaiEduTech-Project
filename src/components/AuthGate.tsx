/**
 * Requires a signed-in session for every route that is not explicitly public.
 * Guests keep the same URL but see a polite sign-in invitation instead of the
 * learning content, so search engines still see a real page for each address.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpenCheck, ClipboardList, Loader2, LogIn, Sparkles, Trophy, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { isPublicPath, sectionLabel } from "@/lib/publicRoutes";
import teacherLogo from "@/assets/teacher-logo.webp";

const setMeta = (name: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const LoginInvite = ({ pathname, search }: { pathname: string; search: string }) => {
  const { t, language } = useLanguage();
  const isVi = language === "vi";
  const label = sectionLabel(pathname, isVi);
  const next = encodeURIComponent(`${pathname}${search || ""}`);

  // Keep each address indexable with a meaningful title/description.
  useEffect(() => {
    document.title = `${label} | HaiEduTech`;
    setMeta(
      "description",
      isVi
        ? `${label} tại HaiEduTech - đăng nhập để học, luyện tập và lưu tiến độ của bạn.`
        : `${label} at HaiEduTech - sign in to learn, practise and save your progress.`,
    );
  }, [label, isVi]);

  const benefits = [
    { icon: BookOpenCheck, text: t("Tiến độ học được lưu tự động", "Your progress is saved automatically") },
    { icon: ClipboardList, text: t("Nhận bài tập và nhận xét của thầy", "Get assignments and teacher feedback") },
    { icon: Trophy, text: t("Tham gia bảng xếp hạng và huy hiệu", "Join leaderboards and earn badges") },
    { icon: Sparkles, text: t("Dùng trợ lý AI và toàn bộ bài học", "Use the AI assistant and every lesson") },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-14 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-xl p-6 sm:p-9 text-center"
      >
        <img
          src={teacherLogo}
          alt="HaiEduTech"
          className="w-16 h-16 mx-auto rounded-full object-cover shadow-md"
          loading="lazy"
        />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">{label}</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
          {t("Đăng nhập để tiếp tục", "Sign in to continue")}
        </h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          {t(
            "Phần này dành riêng cho học viên HaiEduTech. Hãy đăng nhập hoặc tạo tài khoản miễn phí để bắt đầu học.",
            "This area is for HaiEduTech learners. Sign in or create a free account to start learning.",
          )}
        </p>

        <ul className="mt-6 space-y-3 text-left">
          {benefits.map((b) => (
            <li key={b.text} className="flex items-start gap-3 text-sm sm:text-base text-foreground">
              <span className="mt-0.5 p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
                <b.icon className="w-4 h-4" />
              </span>
              {b.text}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="flex-1 gap-2">
            <Link to={`/login?next=${next}`}>
              <LogIn className="w-4 h-4" />
              {t("Đăng nhập", "Sign in")}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex-1 gap-2">
            <Link to={`/signup?next=${next}`}>
              <UserPlus className="w-4 h-4" />
              {t("Tạo tài khoản miễn phí", "Create free account")}
            </Link>
          </Button>
        </div>

        <Link
          to="/"
          className="mt-5 inline-block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          {t("Về trang chủ", "Back to home")}
        </Link>
      </motion.section>
    </main>
  );
};

const AuthGate = ({ children }: { children: ReactNode }) => {
  const { pathname, search } = useLocation();
  const [status, setStatus] = useState<"loading" | "authed" | "guest">("loading");

  useEffect(() => {
    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (mounted) setStatus(session?.user ? "authed" : "guest");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) setStatus(session?.user ? "authed" : "guest");
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  if (isPublicPath(pathname)) return <>{children}</>;

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "guest") return <LoginInvite pathname={pathname} search={search} />;

  return <>{children}</>;
};

export default AuthGate;
