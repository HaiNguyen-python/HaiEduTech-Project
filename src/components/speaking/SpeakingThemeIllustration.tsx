import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSpeakingThemeIllustration } from "@/data/speakingCoachThemeIllustrations";

interface Props {
  theme: { id: string; name: string; nameVi: string; icon: string };
  variant?: "thumbnail" | "practice";
}

const SpeakingThemeIllustration = ({ theme, variant = "practice" }: Props) => {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const illustration = getSpeakingThemeIllustration(theme);

  if (failed) {
    return (
      <div
        className={variant === "thumbnail"
          ? "grid h-28 w-full place-items-center bg-primary/5 text-4xl"
          : "grid h-40 w-full place-items-center rounded-md bg-primary/5 text-6xl sm:h-52"}
        role="img"
        aria-label={t(theme.nameVi, theme.name)}
      >
        {theme.icon}
      </div>
    );
  }

  return (
    <div className={variant === "thumbnail" ? "h-28 w-full overflow-hidden bg-muted" : "mx-auto h-40 w-full max-w-2xl overflow-hidden rounded-md bg-muted sm:h-52"}>
      <img
        src={illustration.src}
        alt={t(illustration.altVi, illustration.altEn)}
        width={1024}
        height={640}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default SpeakingThemeIllustration;
