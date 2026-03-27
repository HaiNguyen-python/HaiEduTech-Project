// Interactive horizontal scrollable timeline for Vietnamese History
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { historyTimeline, type HistoryEvent } from "@/data/vietnameseCurriculumData";

const HistoryTimeline = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<HistoryEvent | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 border border-border rounded-full p-2 shadow-lg hover:bg-accent transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 border border-border rounded-full p-2 shadow-lg hover:bg-accent transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Timeline track */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent px-10 py-6"
      >
        <div className="flex items-center gap-0 min-w-max">
          {historyTimeline.map((event, idx) => (
            <div key={event.year} className="flex items-center">
              {/* Event node */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(event)}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Year badge */}
                <span className="text-xs font-bold text-primary mb-2 whitespace-nowrap">
                  {event.year}
                </span>
                {/* Dot */}
                <div className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md group-hover:shadow-primary/40 transition-shadow" />
                {/* Title */}
                <span className="text-xs text-center mt-2 max-w-[120px] leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                  {t(event.title, event.titleEn)}
                </span>
              </motion.button>

              {/* Connector line */}
              {idx < historyTimeline.length - 1 && (
                <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 p-5 bg-card border border-border rounded-xl shadow-lg relative"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-primary">{selected.year}</span>
            <h3 className="text-lg font-bold text-foreground mt-1">
              {t(selected.title, selected.titleEn)}
            </h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {t(selected.description, selected.descriptionEn)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryTimeline;
