import type { ReactNode } from "react";
import ieltsBg from "@/assets/headers/ielts-header-bg.jpg";
import chineseBg from "@/assets/headers/chinese-header-bg.jpg";
import toeicBg from "@/assets/headers/toeic-header-bg.jpg";
import { cn } from "@/lib/utils";

const BACKGROUNDS = { ielts: ieltsBg, chinese: chineseBg, toeic: toeicBg } as const;

interface Props {
  variant: keyof typeof BACKGROUNDS;
  children: ReactNode;
  className?: string;
}

/** Rounded illustrated banner behind a page title; strong overlay keeps every title readable. */
export default function IllustratedPageHeader({ variant, children, className }: Props) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-border/60 shadow-sm", className)}>
      <img
        src={BACKGROUNDS[variant]}
        alt=""
        aria-hidden="true"
        width={1920}
        height={640}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px] dark:bg-background/85" aria-hidden="true" />
      <div className="relative px-5 py-10 text-foreground sm:px-10 md:py-14">{children}</div>
    </div>
  );
}
