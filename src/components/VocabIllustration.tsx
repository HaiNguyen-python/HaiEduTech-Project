import { ImageIcon } from "lucide-react";
import { useVocabIllustration } from "@/hooks/useVocabIllustration";
import { useState } from "react";

interface VocabIllustrationProps {
  word: string;
  definition: string;
  category?: string;
  size?: number;
}

const VocabIllustration = ({ word, definition, category, size = 64 }: VocabIllustrationProps) => {
  const { imageUrl, fallbackEmoji } = useVocabIllustration(word, definition, category);
  const [imgError, setImgError] = useState(false);

  // Show cached AI image if available from previous sessions
  if (imageUrl && !imgError) {
    return (
      <img
        src={imageUrl}
        alt={`Illustration for ${word}`}
        className="rounded-lg object-cover shrink-0"
        style={{ width: size, height: size }}
        onError={() => setImgError(true)}
        loading="lazy"
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
      <span className="text-2xl">{fallbackEmoji}</span>
    </div>
  );
};

export default VocabIllustration;
