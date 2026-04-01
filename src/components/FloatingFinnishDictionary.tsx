// Floating Finnish-English-Vietnamese dictionary component
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, Search, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { finnishDictionary, type FinnishDictEntry } from "@/data/finnishCurriculum/finnishDictData";
import { playFinnishTts } from "@/lib/finnishTts";

const posColors: Record<string, string> = {
  verb: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  noun: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  adjective: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  pronoun: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  adverb: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  numeral: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  phrase: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  interjection: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
};

const speakFinnish = (text: string) => {
  void playFinnishTts(text).then((played) => {
    if (!played) {
      toast.error("Không thể phát âm chuẩn tiếng Phần Lan trên thiết bị này.");
    }
  });
};

const FloatingFinnishDictionary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return finnishDictionary.slice(0, 15);
    const q = query.toLowerCase();
    return finnishDictionary.filter(
      (e) =>
        e.finnish.toLowerCase().includes(q) ||
        e.english.toLowerCase().includes(q) ||
        e.vietnamese.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [query]);

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#003580] text-white shadow-lg hover:bg-[#002a66] flex items-center justify-center transition-colors"
            aria-label="Open Finnish Dictionary"
          >
            <BookOpen className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dictionary panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 w-80 max-h-[70vh] bg-card border-2 border-[#003580]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#003580] text-white">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="font-bold text-sm">Suomi-sanakirja 🇫🇮</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="px-3 py-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Hae sanaa... (FI/EN/VI)"
                  className="pl-8 h-8 text-sm border-[#003580]/15"
                  autoFocus
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
              {results.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Ei tuloksia 😕</p>
              ) : (
                results.map((entry, i) => (
                  <DictEntryCard key={`${entry.finnish}-${i}`} entry={entry} />
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-3 py-2 border-t border-border text-center">
              <span className="text-xs text-muted-foreground">{finnishDictionary.length} sanaa</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DictEntryCard = ({ entry }: { entry: FinnishDictEntry }) => (
  <div className="p-2.5 rounded-lg border border-border/60 hover:border-[#003580]/20 transition-colors bg-background">
    <div className="flex items-center gap-1.5 mb-1">
      <button
        onClick={() => speakFinnish(entry.finnish)}
        className="shrink-0 w-5 h-5 rounded-full bg-[#003580]/10 hover:bg-[#003580]/20 flex items-center justify-center"
      >
        <Volume2 className="w-2.5 h-2.5 text-[#003580]" />
      </button>
      <span className="font-bold text-sm text-foreground">{entry.finnish}</span>
      <Badge className={`text-[10px] px-1.5 py-0 ${posColors[entry.partOfSpeech] || posColors.noun}`}>
        {entry.partOfSpeech}
      </Badge>
    </div>
    <p className="text-xs text-primary font-medium">{entry.english}</p>
    <p className="text-xs text-muted-foreground">{entry.vietnamese}</p>
    {entry.example && (
      <p className="text-[10px] text-muted-foreground italic mt-1 border-t border-border/40 pt-1">{entry.example}</p>
    )}
  </div>
);

export default FloatingFinnishDictionary;
