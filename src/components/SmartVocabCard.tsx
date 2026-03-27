// Smart Vocabulary Card with audio, IPA, color-coded badges, and contextual examples
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import type { VietnameseVocabEntry } from "@/data/vietnamese/types";

// Color-coded part-of-speech badge mapping
const posColors: Record<string, string> = {
  verb: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  noun: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  adjective: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  phrase: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  number: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  "verb phrase": "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border-teal-200 dark:border-teal-800",
  "verb/noun": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
  "noun/verb": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
};

interface SmartVocabCardProps {
  vocab: VietnameseVocabEntry;
  index: number;
}

const SmartVocabCard = ({ vocab, index }: SmartVocabCardProps) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  // Play Vietnamese pronunciation using SpeechSynthesis
  const playAudio = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    utterance.lang = "vi-VN";
    utterance.rate = 0.8;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const posClass = posColors[vocab.partOfSpeech?.toLowerCase() || ""] || posColors.noun;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all duration-300"
    >
      {/* Header: Word + Badge + Audio in one row */}
      <div className="flex items-center gap-2 mb-2">
        <h3
          className="font-bold text-foreground leading-tight"
          style={{ fontSize: "1.5rem", textRendering: "optimizeLegibility" }}
        >
          {vocab.word}
        </h3>

        {/* Part of speech badge */}
        {vocab.partOfSpeech && (
          <Badge className={`text-xs border ${posClass}`}>
            {vocab.partOfSpeech}
          </Badge>
        )}

        {/* Audio button */}
        <button
          onClick={playAudio}
          className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors ml-auto shrink-0"
          aria-label={`Play pronunciation for ${vocab.word}`}
        >
          {isPlaying ? (
            <VolumeX className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-primary" />
          )}
        </button>
      </div>

      {/* Meaning in Vietnamese */}
      <p className="text-primary font-semibold mb-1" style={{ fontSize: "1rem" }}>
        {t(vocab.meaning, vocab.meaningEn)}
      </p>

      {/* Literal meaning (for idioms) */}
      {vocab.literalMeaning && (
        <p className="text-xs text-muted-foreground italic mb-2">
          💬 {t(vocab.literalMeaning, vocab.literalMeaningEn || vocab.literalMeaning)}
        </p>
      )}

      {/* Example sentence */}
      <div className="mt-3 pt-3 border-t border-border/60">
        <p className="text-foreground font-medium leading-relaxed" style={{ fontSize: "1.05rem" }}>
          {t(vocab.example, vocab.example)}
        </p>
        <p className="text-foreground font-medium leading-relaxed" style={{ fontSize: "1.05rem" }}>
          {t(vocab.example, vocab.example)}
        </p>
        <p className="text-sm text-muted-foreground italic mt-1">
          {t(vocab.exampleEn, vocab.exampleEn)}
        </p>
      </div>
    </motion.div>
  );
};

export default SmartVocabCard;
