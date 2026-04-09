import { useState } from "react";
import { useVocabIllustration } from "@/hooks/useVocabIllustration";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";

interface VocabIllustrationProps {
  word: string;
  definition: string;
  category?: string;
  size?: number;
}

const VocabIllustration = ({ word, definition, category, size = 64 }: VocabIllustrationProps) => {
  const { imageUrl, isLoading, fallbackEmoji, generate } = useVocabIllustration(word, definition, category);
  const [imgError, setImgError] = useState(false);

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

  if (isLoading) {
    return <Skeleton className="rounded-lg shrink-0" style={{ width: size, height: size }} />;
  }

  // Clickable placeholder to generate
  return (
    <button
      onClick={(e) => { e.stopPropagation(); generate(); }}
      className="rounded-lg border border-border bg-secondary/30 flex items-center justify-center shrink-0 hover:bg-secondary/60 transition-colors group"
      style={{ width: size, height: size }}
      title={`Generate illustration for "${word}"`}
    >
      <span className="text-2xl group-hover:hidden">{fallbackEmoji}</span>
      <ImageIcon className="w-5 h-5 text-muted-foreground hidden group-hover:block" />
    </button>
  );
};

export default VocabIllustration;
