/**
 * NewSignupsCard - "Báo danh học sinh mới": the newest accounts created on
 * HaiEduTech so Teacher Hai can greet and place them right away.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { UserPlus, Loader2, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string | null;
};

const DAY = 86_400_000;

const NewSignupsCard = ({ onOpenStudents }: { onOpenStudents?: () => void }) => {
  const { t, lang } = useLanguage();
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, created_at")
        .order("created_at", { ascending: false })
        .limit(30);
      if (cancelled) return;
      setRows((data ?? []) as ProfileRow[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = expanded ? rows : rows.slice(0, 8);

  const newThisWeek = useMemo(
    () => rows.filter((r) => r.created_at && Date.now() - new Date(r.created_at).getTime() < 7 * DAY).length,
    [rows],
  );

  const fmt = (iso: string | null) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isNew = (iso: string | null) => !!iso && Date.now() - new Date(iso).getTime() < 7 * DAY;

  return (
    <div className="rounded-2xl border bg-card p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary grid place-items-center">
            <UserPlus className="w-4.5 h-4.5" />
          </span>
          <div>
            <h3 className="font-semibold text-base leading-tight">
              {t("Báo danh học sinh mới", "New student sign-ups")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t(
                `${newThisWeek} bạn đăng ký trong 7 ngày qua`,
                `${newThisWeek} joined in the last 7 days`,
              )}
            </p>
          </div>
        </div>
        {onOpenStudents && (
          <Button size="sm" variant="outline" onClick={onOpenStudents} className="text-xs">
            {t("Mở danh sách học sinh", "Open student list")}
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          {t("Đang tải danh sách...", "Loading sign-ups...")}
        </div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6">
          {t("Chưa có học sinh nào đăng ký.", "No sign-ups yet.")}
        </p>
      ) : (
        <>
          <ul className="divide-y">
            {visible.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-2.5">
                {r.avatar_url ? (
                  <img src={r.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <span className="w-9 h-9 rounded-full bg-muted grid place-items-center text-xs font-semibold text-muted-foreground">
                    {(r.full_name ?? "?").trim().charAt(0).toUpperCase() || "?"}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {r.full_name?.trim() || t("Chưa đặt tên", "Unnamed learner")}
                  </p>
                  <p className="text-xs text-muted-foreground">{fmt(r.created_at)}</p>
                </div>
                {isNew(r.created_at) && (
                  <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                    {t("MỚI", "NEW")}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {rows.length > 8 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {expanded ? t("Thu gọn", "Show less") : t("Xem thêm", "Show more")}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default NewSignupsCard;
