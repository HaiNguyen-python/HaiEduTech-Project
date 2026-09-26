import { useVocabIllustration } from "@/hooks/useVocabIllustration";
import { useState } from "react";
import { BookOpen } from "lucide-react";

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

  // IELTS shows only reviewed images; other subjects retain their existing cache.
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

  // A neutral placeholder avoids implying an unrelated meaning for unmapped words.
  return (
    <div
      className="rounded-lg border border-border bg-secondary/30 flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      title={word}
    >
      {subject === "ielts" ? <BookOpen className="h-6 w-6 text-muted-foreground" aria-hidden="true" /> : <span className="text-2xl text-muted-foreground" aria-hidden="true">{fallbackEmoji}</span>}
    </div>
  );
};

export default VocabIllustration;
