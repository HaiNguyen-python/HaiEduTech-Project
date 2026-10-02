import type { ReactNode } from "react";
import ieltsBg from "@/assets/headers/ielts-header-bg.jpg";
import chineseBg from "@/assets/headers/chinese-header-bg.jpg";
import { cn } from "@/lib/utils";

const BACKGROUNDS = { ielts: ieltsBg, chinese: chineseBg } as const;

interface Props {
  variant: keyof typeof BACKGROUNDS;
  children: ReactNode;
  className?: string;
}

/** Rounded illustrated banner behind a page title; overlay keeps text readable in light and dark mode. */
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
      <div className="absolute inset-0 bg-background/40 dark:bg-background/75" aria-hidden="true" />
      <div className="relative px-5 py-10 sm:px-10 md:py-14">{children}</div>
    </div>
  );
}
