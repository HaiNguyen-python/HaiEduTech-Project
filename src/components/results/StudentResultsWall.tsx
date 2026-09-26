/**
 * Student Results Wall - real, teacher-curated results from the
 * `testimonials` table, with verified certificate badges linking to
 * /verify/:code. Renders nothing while loading or when empty, so the home
 * page never shows an empty block.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

export type TestimonialRow = {
  id: string;
  student_name: string;
  course: string;
  score: string;
  score_label: string;
  quote_vi: string;
  quote_en: string;
  avatar_url: string | null;
  certificate_code: string | null;
};

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "HS";

const StudentResultsWall = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("testimonials")
      .select(
        "id, student_name, course, score, score_label, quote_vi, quote_en, avatar_url, certificate_code",
      )
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .limit(12)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) setItems(data as TestimonialRow[]);
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-rotate, pause when there is only one card.
  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!loaded || items.length === 0) return null;

  const item = items[Math.min(current, items.length - 1)];
  const prev = () => setCurrent((p) => (p - 1 + items.length) % items.length);
  const next = () => setCurrent((p) => (p + 1) % items.length);

  return (
    <section
      id="student-results"
      aria-labelledby="student-results-title"
      className="relative py-12 sm:py-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 id="student-results-title" className="mb-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Kết Quả ", "Student ")}
            <span className="text-gradient">{t("Học Viên Thực Tế", "Results")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t(
              "Kết quả và chia sẻ từ học viên thật của HaiEduTech, kèm chứng chỉ có thể xác minh trực tuyến",
              "Real results and words from HaiEduTech students, with certificates anyone can verify online",
            )}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-5 flex items-center gap-4">
                  {item.avatar_url ? (
                    <img
                      src={item.avatar_url}
                      alt={t(`Học viên ${item.student_name}`, `Student ${item.student_name}`)}
                      className="h-14 w-14 shrink-0 rounded-full border border-border object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-base font-bold text-primary"
                      aria-hidden="true"
                    >
                      {initials(item.student_name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-foreground">{item.student_name}</h3>
                    <p className="text-sm text-muted-foreground">{item.course}</p>
                  </div>
                  {(item.score || item.score_label) && (
                    <div className="ml-auto text-right">
                      {item.score && (
                        <div className="font-display text-2xl font-bold text-primary">{item.score}</div>
                      )}
                      {item.score_label && (
                        <div className="text-xs text-muted-foreground">{item.score_label}</div>
                      )}
                    </div>
                  )}
                </div>

                {(item.quote_vi || item.quote_en) && (
                  <p className="mb-4 text-sm italic leading-7 text-foreground/80 sm:text-base">
                    {t(item.quote_vi, item.quote_en)}
                  </p>
                )}

                {item.certificate_code && (
                  <Link
                    to={`/verify/${encodeURIComponent(item.certificate_code)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
                  >
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    {t("Chứng chỉ đã xác minh", "Verified certificate")}
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={prev}
                  className="rounded-full border border-border p-2 transition-colors hover:bg-secondary"
                  aria-label={t("Kết quả trước", "Previous result")}
                >
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                </button>
                <div className="flex gap-2">
                  {items.map((it, i) => (
                    <button
                      key={it.id}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === current ? "w-6 bg-primary" : "w-2 bg-border"
                      }`}
                      aria-label={t(`Kết quả ${i + 1}`, `Go to result ${i + 1}`)}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="rounded-full border border-border p-2 transition-colors hover:bg-secondary"
                  aria-label={t("Kết quả tiếp theo", "Next result")}
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentResultsWall;
