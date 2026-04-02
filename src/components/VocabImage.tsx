import { BookOpen } from "lucide-react";

interface VocabImageProps {
  character: string;
  pinyin: string;
  definition: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-full h-32",
};

const textSizes = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const VocabImage = ({ character, size = "sm" }: VocabImageProps) => {
  return (
    <div
      className={`${sizeClasses[size]} rounded-lg border border-border bg-secondary/30 flex items-center justify-center`}
    >
      <span className={`${textSizes[size]} select-none`}>{character}</span>
    </div>
  );
};

export default VocabImage;
