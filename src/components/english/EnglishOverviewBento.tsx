import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Headphones, MessageCircle, Mic, Music2, PenLine } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export interface EnglishProgramSummary {
  title: string;
  level: string;
  desc: string;
  features: string[];
}

interface EnglishOverviewBentoProps {
  programs: EnglishProgramSummary[];
}

const secondaryCards = [
  { index: 1, href: "/english/toeic", icon: Headphones, tone: "bg-accent/15 text-foreground" },
  { index: 2, href: "/english/conversational/curriculum", icon: MessageCircle, tone: "bg-primary/10 text-primary" },
  { index: 3, href: "/english/sat", icon: GraduationCap, tone: "bg-secondary text-secondary-foreground" },
] as const;

export default function EnglishOverviewBento({ programs }: EnglishOverviewBentoProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const ielts = programs[0];

  if (!ielts) return null;

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section aria-labelledby="english-pathways-title" className="mb-10">
      <div className="mb-5 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">{t("Chọn điểm bắt đầu", "Choose your starting point")}</p>
          <h2 id="english-pathways-title" className="font-display text-2xl font-bold text-foreground">
            {t("Lộ trình học nổi bật", "Featured learning paths")}
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground sm:text-right">
          {t("Luyện thi, giao tiếp hoặc phát âm theo đúng mục tiêu của bạn.", "Pick exam prep, conversation, or pronunciation for your goal.")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        <motion.article {...enter(0.04)} className="relative overflow-hidden rounded-lg border border-primary/30 bg-primary p-6 text-primary-foreground md:col-span-2 lg:col-span-8 lg:min-h-[300px]">
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-md bg-primary-foreground/15 px-3 py-1 text-sm font-semibold">
                <GraduationCap className="h-4 w-4" /> IELTS 6.5 - 8.0+
              </span>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{ielts.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">{ielts.desc}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {ielts.features.slice(0, 2).map((feature) => (
                  <p key={feature} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" /> {feature}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="secondary" className="sm:w-auto">
                <Link to="/english/ielts">{t("Khám phá IELTS", "Explore IELTS")} <ArrowRight /></Link>
              </Button>
              <Button asChild className="border border-primary-foreground/35 bg-primary-foreground/10 hover:bg-primary-foreground/20 sm:w-auto">
                <Link to="/ielts-writing-practice"><PenLine /> {t("Luyện Writing", "Practice Writing")}</Link>
              </Button>
            </div>
          </div>
          <BookOpen className="absolute -bottom-8 -right-5 h-44 w-44 text-primary-foreground/10" aria-hidden="true" />
        </motion.article>

        <motion.article {...enter(0.08)} className="flex flex-col justify-between rounded-lg border border-border bg-card p-6 lg:col-span-4">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mic className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold uppercase text-primary">{t("Nói tự tin", "Speak confidently")}</span>
            <h3 className="mt-2 font-display text-xl font-bold text-card-foreground">{t("Phát âm & Ngữ điệu", "Pronunciation & Intonation")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("IPA, minimal pairs, nối âm và luyện nghe giọng Anh - Mỹ.", "IPA, minimal pairs, linking, and British - American listening practice.")}
            </p>
          </div>
          <Button asChild className="mt-6 w-full sm:w-fit">
            <Link to="/english/pronunciation">{t("Học phát âm", "Start Pronunciation")} <ArrowRight /></Link>
          </Button>
        </motion.article>

        {secondaryCards.map(({ index, href, icon: Icon, tone }, cardIndex) => {
          const program = programs[index];
          if (!program) return null;
          return (
            <motion.article key={href} {...enter(0.12 + cardIndex * 0.04)} className="flex min-h-[260px] flex-col rounded-lg border border-border bg-card p-5 lg:col-span-3">
              <div className="flex items-start justify-between gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", tone)}><Icon className="h-5 w-5" /></div>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">{program.level}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-card-foreground">{program.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{program.desc}</p>
              <div className="mt-4 space-y-2">
                {program.features.slice(0, 2).map((feature) => (
                  <p key={feature} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {feature}
                  </p>
                ))}
              </div>
              <Button asChild variant="link" className="mt-auto h-auto justify-start px-0 pt-5">
                <Link to={href}>{t("Xem chi tiết", "View details")} <ArrowRight /></Link>
              </Button>
            </motion.article>
          );
        })}

        <motion.article {...enter(0.26)} className="flex min-h-[260px] flex-col rounded-lg border border-accent/35 bg-accent/10 p-5 lg:col-span-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-foreground"><Music2 className="h-5 w-5" /></div>
          <span className="mt-5 text-xs font-semibold uppercase text-foreground">{t("Học nhẹ nhàng", "Learn through music")}</span>
          <h3 className="mt-2 font-display text-lg font-bold text-card-foreground">{t("Học qua bài hát", "Learn through Songs")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t("Lyrics song ngữ, karaoke highlight, từ vựng và bài tập điền từ.", "Bilingual lyrics, karaoke highlights, vocabulary, and fill-in practice.")}
          </p>
          <Button asChild variant="link" className="mt-auto h-auto justify-start px-0 pt-5 text-foreground">
            <Link to="/songs/english">{t("Mở mục bài hát", "Open Songs")} <ArrowRight /></Link>
          </Button>
        </motion.article>
      </div>
    </section>
  );
}