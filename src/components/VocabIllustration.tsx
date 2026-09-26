import { useVocabIllustration } from "@/hooks/useVocabIllustration";
import { useState } from "react";

interface VocabIllustrationProps {
  word: string;
  definition: string;
  category?: string;
  size?: number;
  subject?: "ielts";
}

const VocabIllustration = ({ word, definition, category, size = 64, subject }: VocabIllustrationProps) => {
  const { imageUrl, fallbackEmoji } = useVocabIllustration(word, definition, category, subject);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  // Show cached AI image if available from previous sessions
  if (imageUrl && imageUrl !== failedUrl) {
    return (
      <img
        src={imageUrl}
        alt={`Illustration for ${word}`}
        className="rounded-lg object-cover shrink-0"
        style={{ width: size, height: size }}
        onError={() => setFailedUrl(imageUrl)}
        loading="lazy"
        width={size}
        height={size}
      />
    );
  }

  // Emoji fallback (no AI generation)
  return (
    <div
      className="rounded-lg border border-border bg-secondary/30 flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      title={word}
    >
      <span className="text-2xl text-muted-foreground" aria-hidden="true">{fallbackEmoji}</span>
    </div>
  );
};

export default VocabIllustration;
