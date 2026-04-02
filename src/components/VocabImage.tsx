import { useState } from "react";
import { useVocabImage } from "@/hooks/useVocabImage";
import { ImageIcon, Loader2 } from "lucide-react";

interface VocabImageProps {
  character: string;
  pinyin: string;
  definition: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-full h-32",
};

const VocabImage = ({ character, pinyin, definition, size = "sm" }: VocabImageProps) => {
  const { imageUrl, isLoading, error, generateImage } = useVocabImage(character, pinyin, definition);
  const [imgError, setImgError] = useState(false);

  if (imageUrl && !imgError) {
    return (
      <img
        src={imageUrl}
        alt={`${character} illustration`}
        className={`${sizeClasses[size]} rounded-lg object-cover border border-border`}
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  if (isLoading) {
    return (
      <div className={`${sizeClasses[size]} rounded-lg border border-border bg-secondary/50 flex items-center justify-center`}>
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <button
      onClick={(e) => { e.stopPropagation(); generateImage(); }}
      className={`${sizeClasses[size]} rounded-lg border border-dashed border-border bg-secondary/30 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors group`}
      title={`Generate illustration for ${character}`}
    >
      <ImageIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  );
};

export default VocabImage;
